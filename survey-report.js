// Shared, deterministic calculations for the report screen and Excel snapshot.
// This module deliberately has no dependency on UI state or browser globals.
const TYPE_NAMES = { text: 'Açık uçlu', number: 'Sayısal', yesno: 'Evet / Hayır', single: 'Tek seçim', multi: 'Çoklu seçim', date: 'Tarih', photo: 'Fotoğraf', gps: 'Konum' };
export function reportQuestionType(q) {
  const type = String(q.type || 'text').toLowerCase();
  return ({ single_choice: 'single', multiple_choice: 'multi', yes_no: 'yesno', location: 'gps' })[type] || type;
}
export function reportQuestions(survey) {
  const sections = [...(survey.sections || [])].sort((a, b) => (a.order || 0) - (b.order || 0));
  const found = new Map();
  for (const q of [...(survey.questions || []), ...sections.flatMap(s => s.questions || [])]) {
    if (!q.id) throw new Error('Rapor oluşturulamadı: kimliği eksik soru var.');
    if (!found.has(q.id)) found.set(q.id, q);
  }
  return [...found.values()].sort((a, b) => (a.order || 0) - (b.order || 0));
}
export function reportAnswers(sub) {
  const answers = Array.isArray(sub.answers)
    ? Object.fromEntries(sub.answers.map(a => [a.questionId, a.answerValue || a.filePath || '']))
    : { ...(sub.answers || {}) };
  for (const a of sub.answerItems || []) if (!present(answers[a.questionId]) && a.filePath) answers[a.questionId] = a.filePath;
  return answers;
}
const present = v => Array.isArray(v) ? v.some(present) : v !== null && v !== undefined && String(v).trim() !== '';
const normalized = v => String(v).trim().toLocaleLowerCase('tr-TR');
function optionsFor(q) {
  const options = (q.options || []).map(o => typeof o === 'string' ? { label: o, value: o } : { label: String(o.label ?? o.value ?? ''), value: String(o.value ?? o.label ?? '') });
  return options.length ? options : reportQuestionType(q) === 'yesno' ? [{ label: 'Evet', value: 'true' }, { label: 'Hayır', value: 'false' }] : [];
}
function optionIndex(value, options, type) {
  const v = normalized(value);
  let index = options.findIndex(o => normalized(o.value) === v || normalized(o.label) === v);
  if (index < 0 && type === 'yesno') {
    const yes = ['true', 'yes', 'evet', '1'].includes(v);
    const no = ['false', 'no', 'hayır', 'hayir', '0'].includes(v);
    if (yes || no) index = options.findIndex(o => (yes ? ['true', 'yes', 'evet', '1'] : ['false', 'no', 'hayır', 'hayir', '0']).includes(normalized(o.value)) || normalized(o.label) === (yes ? 'evet' : 'hayır'));
  }
  return index;
}
function selections(value, options) {
  if (Array.isArray(value)) return value.map(String);
  const text = String(value).trim();
  if (options.some(o => o.value === text || o.label === text)) return [text];
  if (text.startsWith('[')) {
    try { const parsed = JSON.parse(text); if (Array.isArray(parsed)) return parsed.map(String); } catch { /* Preserve unparseable source. */ }
  }
  return text.split('|').map(s => s.trim()).filter(Boolean);
}
function visible(q, answers) {
  if (!q.conditionSourceQuestionId) return true;
  const source = answers[q.conditionSourceQuestionId];
  if (!present(source)) return false;
  const matches = selections(source, []).includes(String(q.conditionValue ?? ''));
  return String(q.conditionOperator || 'EQUALS').toUpperCase() === 'NOT_EQUALS' ? !matches : matches;
}
function numeric(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  const text = String(value).trim();
  if (!/^[+-]?(?:\d+(?:[.,]\d+)?|[.,]\d+)$/.test(text)) return null;
  const n = Number(text.replace(',', '.'));
  return Number.isFinite(n) ? n : null;
}
export function displayReportAnswer(q, value) {
  if (!present(value)) return '';
  const type = reportQuestionType(q);
  const options = optionsFor(q);
  if (['single', 'multi', 'yesno'].includes(type)) {
    return (type === 'multi' ? selections(value, options) : [value]).map(v => {
      const i = optionIndex(v, options, type);
      return i >= 0 ? options[i].label : String(v);
    }).join(' | ');
  }
  return typeof value === 'object' ? JSON.stringify(value) : String(value);
}
export function buildSurveyReport(survey, submissions, assignments = [], generatedAt = new Date()) {
  if (!survey?.id) throw new Error('Önce raporlanacak anketi seçin.');
  const questions = reportQuestions(survey);
  // Match stable IDs only. Identical survey titles must never mix results.
  const records = submissions.filter(s => s.surveyId === survey.id);
  const ids = new Set();
  for (const s of records) {
    const id = s.clientSubmissionId || s.id;
    if (!id || ids.has(id)) throw new Error('Rapor oluşturulamadı: eksik veya tekrarlanan form kimliği var. Verileri yenileyin.');
    ids.add(id);
  }
  const valid = records.filter(s => !s.isInvalid);
  const targetAssignments = assignments.filter(a => a.surveyId === survey.id);
  const assignedTarget = targetAssignments.reduce((n, a) => n + (Number(a.targetCount) || 0), 0);
  const target = assignedTarget > 0 ? assignedTarget : Number(survey.targetCount) > 0 ? Number(survey.targetCount) : null;
  const results = questions.map((q, index) => {
    const type = reportQuestionType(q);
    const eligible = valid.filter(s => visible(q, reportAnswers(s)));
    const answered = eligible.filter(s => present(reportAnswers(s)[q.id]));
    const values = answered.map(s => reportAnswers(s)[q.id]);
    const options = optionsFor(q);
    let unknown = 0;
    const counts = options.map(() => 0);
    if (['single', 'multi', 'yesno'].includes(type)) {
      for (const value of values) {
        const tokens = type === 'multi' ? selections(value, options) : [value];
        const chosen = new Set(tokens.map(v => optionIndex(v, options, type)));
        if (chosen.has(-1)) unknown++;
        for (const i of chosen) if (i >= 0) counts[i]++;
      }
    }
    const numbers = type === 'number' ? values.map(numeric).filter(n => n !== null).sort((a, b) => a - b) : [];
    const n = numbers.length;
    const stats = n ? { n, mean: numbers.reduce((a, b) => a + b, 0) / n, median: n % 2 ? numbers[(n - 1) / 2] : (numbers[n / 2 - 1] + numbers[n / 2]) / 2, min: numbers[0], max: numbers[n - 1] } : null;
    return { q, code: `S${index + 1}`, type, typeLabel: TYPE_NAMES[type] || type, answered: answered.length, missing: eligible.length - answered.length, notAsked: valid.length - eligible.length,
      options: options.map((o, i) => ({ ...o, count: counts[i], share: answered.length ? counts[i] / answered.length : null })), unknown, stats,
      invalidNumbers: type === 'number' ? values.length - n : 0,
      texts: answered.map(s => ({ id: s.clientSubmissionId || s.id, value: displayReportAnswer(q, reportAnswers(s)[q.id]) })) };
  });
  const dates = records.map(s => Date.parse(s.submittedAt)).filter(Number.isFinite).sort((a, b) => a - b);
  const questionIds = new Set(questions.map(q => q.id));
  const unmatchedAnswers = records.reduce((n, s) => n + Object.keys(reportAnswers(s)).filter(id => !questionIds.has(id)).length, 0);
  return { survey, records, valid, invalid: records.length - valid.length, target, progress: target ? valid.length / target : null, results, generatedAt,
    unmatchedAnswers, start: dates.length ? new Date(dates[0]) : null, end: dates.length ? new Date(dates.at(-1)) : null };
}

export const REPORT_METHOD = [
  ['Kapsam', 'Yalnızca seçilen anket kimliğine ait sunucuda kayıtlı formlar kullanılır. Her satır bir formdur; tekil kişi sayısı değildir.'],
  ['Analiz tabanı', 'Geçersiz işaretlenen formlar soru sonuçlarından çıkarılır. Ham Yanıtlar sayfasında durumlarıyla birlikte korunur.'],
  ['Yüzde hesabı', 'Seçeneği işaretleyen form sayısı / ilgili soruya yanıt veren geçerli form sayısı. Yanıtsız ve koşul dışı formlar paydaya alınmaz.'],
  ['Çoklu seçim', 'Bir form birden fazla seçeneği işaretleyebilir. Aynı seçenek form başına bir kez sayılır; yüzdelerin toplamı %100’ü aşabilir.'],
  ['Yanıtsız / koşul dışı', 'Yanıtsız: soru gösterilmeli fakat cevap boş. Koşul dışı: soru dallanma koşulu nedeniyle gösterilmiyor.'],
  ['Sayısal sonuçlar', 'Ortalama, medyan, en küçük ve en büyük değer yalnızca sayıya çevrilebilen yanıtlardan hesaplanır. Sayı olmayan yanıtlar ayrıca gösterilir.'],
  ['Hedef gerçekleşmesi', 'Geçerli form / kayıtlı hedef. Bu ölçü bilimsel yanıt oranı değildir. Hedef bilinmiyorsa oran hesaplanmaz.'],
  ['Yorum sınırı', 'Sonuçlar ağırlıklandırılmamıştır. Örnekleme yöntemi ve hedef evren bilgisi kayıtlı olmadığından genelleme, hata payı veya temsiliyet iddiası üretilmez.'],
  ['Dosyanın niteliği', 'İndirme anındaki veri görünümüdür. Dosya kendiliğinden güncellenmez; güncel sonuç için yeniden indirin. Tarihler Türkiye saatindedir.'],
  ['Kaynak', 'Uygulamanın seçili anket tanımı, form yanıtları ve görev atamaları.'],
  ['Raporlama ilkeleri', 'https://aapor.org/standards-and-ethics/disclosure-standards/'],
  ['Çoklu yanıt açıklaması', 'https://support.google.com/surveys/answer/2998498']
];

function excelDate(value) {
  if (!value || !Number.isFinite(new Date(value).getTime())) return null;
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Istanbul', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' }).formatToParts(new Date(value)).map(p => [p.type, p.value]));
  return { value: Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute, +parts.second) / 86400000 + 25569, style: 6 };
}
export function reportSheets(report) {
  const r = report;
  const summary = [
    ['Anket', r.survey.title, ''], ['Oluşturulma zamanı', excelDate(r.generatedAt), 'Türkiye saati'],
    ['İlk kayıt', excelDate(r.start) ?? 'Kayıt yok', 'Kayıtlı formların başlangıcı'], ['Son kayıt', excelDate(r.end) ?? 'Kayıt yok', 'Kayıtlı formların sonu'],
    ['Toplam form', r.records.length, 'Geçerli ve geçersiz formların toplamı'], ['Geçerli form', r.valid.length, 'Soru sonuçlarının analiz tabanı'],
    ['Geçersiz form', r.invalid, 'Soru sonuçlarına dahil edilmez'], ['Soru sayısı', r.results.length, 'Anket tanımındaki sorular'],
    ['Kayıtlı hedef', r.target ?? 'Belirtilmedi', 'Görev hedefleri toplamı; yoksa anket hedefi'],
    ['Hedef gerçekleşmesi', r.progress === null ? 'Hedef belirtilmedi' : { value: r.progress, style: 4 }, 'Geçerli form / hedef. Yanıt oranı değildir.'],
    ['Sonuçları okuma', 'Önce Soru Sonuçları sayfasını inceleyin.', 'Ham Yanıtlar sayfasında her form ve cevapları ayrı satırdadır.'],
    ['Veri kapsamı', r.records.length ? 'Sunucuda kayıtlı formlar' : 'Henüz form yok', 'Sıfır yanıt durumunda örnek sonuç üretilmez.'],
    ['Analiz notu', 'Ağırlıklandırılmamış form sonuçları', 'Örnekleme yöntemi kayıtlı değil. Hata payı veya temsil iddiası hesaplanmadı.']
  ];
  if (r.unmatchedAnswers) summary.push(['Tanımla eşleşmeyen yanıt alanı', r.unmatchedAnswers, 'Soru sonuçlarına alınmadı. Ham Yanıtlar sayfasının son sütununda kaynak kimlikleriyle korundu.']);
  const resultRows = [];
  for (const q of r.results) {
    const base = [q.code, q.q.title, q.typeLabel];
    const note = q.type === 'multi' ? 'Birden fazla seçenek seçilebilir; toplam yüzde %100’ü aşabilir.' : 'Yüzde tabanı: bu soruya yanıt veren geçerli formlar.';
    for (const o of q.options) resultRows.push([...base, o.label, o.count, o.share === null ? null : { value: o.share, style: 4 }, q.answered, q.missing, q.notAsked, note]);
    if (q.unknown) resultRows.push([...base, 'Tanımsız seçenek içeren form', q.unknown, null, q.answered, q.missing, q.notAsked, 'Kaynak yanıtı Ham Yanıtlar sayfasından kontrol edin.']);
    if (q.type === 'number') {
      for (const [key, label] of [['n','Sayısal yanıt sayısı'], ['mean','Ortalama'], ['median','Medyan'], ['min','En küçük değer'], ['max','En büyük değer']]) {
        resultRows.push([...base, label, q.stats?.[key] ?? (key === 'n' ? 0 : null), null, q.answered, q.missing, q.notAsked, 'Ortalama ve medyan için yalnızca sayısal yanıtlar kullanılır.']);
      }
      if (q.invalidNumbers) resultRows.push([...base, 'Sayıya çevrilemeyen yanıt', q.invalidNumbers, null, q.answered, q.missing, q.notAsked, 'İstatistiklerden çıkarıldı; kaynak değer ham veride korunur.']);
    } else if (!q.options.length) resultRows.push([...base, 'Yanıt sayısı', q.answered, null, q.answered, q.missing, q.notAsked, 'Yanıtların tamamı Ham Yanıtlar sayfasında soru başlıklarının altında yer alır.']);
  }
  const compactResults = [];
  for (const q of r.results) {
    compactResults.push([{ value: `${q.code}. ${q.q.title}`, style: 7 }, null, null, q.answered, q.missing, q.notAsked,
      `${q.typeLabel}. ${q.type === 'multi' ? 'Çoklu seçim; yüzde toplamı %100’ü aşabilir.' : 'Yüzde tabanı: yanıtlayan geçerli formlar.'}`]);
    for (const row of resultRows.filter(row => row[0] === q.code)) compactResults.push([row[3], row[4], row[5], null, null, null,
      row[3].includes('çevrilemeyen') || row[3].includes('Tanımsız') ? row[9] : '']);
  }
  const raw = r.records.map(s => {
    const answers = reportAnswers(s);
    return [s.clientSubmissionId || s.id, s.isInvalid ? 'Geçersiz' : 'Geçerli', excelDate(s.submittedAt), s.villageName || 'Belirtilmedi', s.fieldUserName || s.userFullName || 'Belirtilmedi', s.latitude ?? null, s.longitude ?? null,
      ...r.results.map(q => {
        const value = answers[q.q.id];
        if (!present(value)) return visible(q.q, answers) ? 'Yanıtsız' : 'Koşul dışı';
        return q.type === 'number' && numeric(value) !== null ? numeric(value) : displayReportAnswer(q.q, value);
      }), ...(r.unmatchedAnswers ? [JSON.stringify(Object.fromEntries(Object.entries(answers).filter(([id]) => !r.results.some(q => q.q.id === id))))] : [])];
  });
  return [
    { name: 'Genel Özet', title: 'Anket Sonuç Raporu', subtitle: r.survey.title, headers: ['Gösterge', 'Değer', 'Açıklama'], widths: [29, 53, 85], rows: summary },
    { name: 'Soru Sonuçları', title: 'Soru Bazlı Sonuçlar', subtitle: `${r.valid.length} geçerli form. Oranlar yanıtlayan form tabanındadır.`, headers: ['Soru / Seçenek / Ölçüt', 'Adet / Değer', 'Oran', 'Yanıtlayan', 'Yanıtsız', 'Koşul dışı', 'Açıklama'], widths: [60, 18, 16, 15, 14, 14, 60], rows: compactResults },
    { name: 'Ham Yanıtlar', title: 'Form Bazlı Yanıtlar', subtitle: 'Her satır bir formdur. Geçersiz formlar yalnızca denetim amacıyla burada korunur.', headers: ['Form ID', 'Durum', 'Tarih ve saat (Türkiye)', 'Bölge', 'Saha personeli / Anketör', 'Enlem', 'Boylam', ...r.results.map(q => `${q.code}. ${q.q.title}`), ...(r.unmatchedAnswers ? ['Tanımla eşleşmeyen yanıtlar (Soru ID: değer)'] : [])], widths: [40, 14, 26, 28, 30, 14, 14, ...r.results.map(() => 48), ...(r.unmatchedAnswers ? [60] : [])], rows: raw },
    { name: 'Yöntem ve Sorular', title: 'Raporun Kapsamı ve Soru Tanımları', subtitle: r.survey.title, headers: ['Konu / Kod', 'Açıklama / Soru', 'Tür / Seçenekler'], widths: [28, 105, 75], rows: [...REPORT_METHOD.map(([a,b]) => [a,b,'']), ...r.results.map(q => [q.code, q.q.title, `${q.typeLabel}; ${optionsFor(q.q).map(o => `${o.value} = ${o.label}`).join(' | ')}${q.q.conditionSourceQuestionId ? `; Koşul: ${q.q.conditionSourceQuestionId} ${q.q.conditionOperator || 'EQUALS'} ${q.q.conditionValue}` : ''}`])] }
  ];
}
