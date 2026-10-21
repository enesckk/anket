import { strict as assert } from 'node:assert';
import { buildSurveyReport, reportSheets, displayReportAnswer } from './survey-report.js';
import { createReportXlsx } from './report-xlsx.js';

const single = { id: 'choice', title: 'Hizmetten memnun musunuz?', type: 'SINGLE_CHOICE', order: 1, options: [{value:'a',label:'Memnun'}, {value:'b',label:'Memnun değil'}] };
const multi = { id: 'multi', title: 'Hangi hizmetleri kullanıyorsunuz?', type: 'MULTIPLE_CHOICE', order: 2, options: [{value:'park',label:'Park'}, {value:'road',label:'Yol'}, {value:'none',label:'Hiçbiri'}] };
const number = { id: 'number', title: 'Hizmeti ayda kaç kez kullanıyorsunuz?', type: 'NUMBER', order: 3 };
const boolean = { id: 'bool', title: 'Öneriniz var mı?', type: 'YES_NO', order: 4 };
const conditional = { id: 'conditional', title: 'Önerinizi yazın', type: 'TEXT', order: 5, conditionSourceQuestionId:'choice', conditionOperator:'EQUALS', conditionValue:'a' };
const text = { id: 'text', title: 'Diğer görüşleriniz', type: 'TEXT', order: 6 };
const survey = {id:'survey',title:'Hizmet Memnuniyeti (TEST VERİSİ)',targetCount:10, questions:[single,multi,number,boolean,text],sections:[{order:1,questions:[single,conditional]}]};
const make = (id, answers, extra={}) => ({id,surveyId:'survey',fieldUserName:'Test Anketörü',villageName:'Test Mahallesi',submittedAt:'2026-10-21T10:00:00Z',answers,...extra});
const submissions = [
  make('form-1',{choice:'a',multi:['park','road','park'],number:0,bool:false,conditional:'Daha fazla ağaç',text:'=HYPERLINK("https://example.com")'}),
  make('form-2',{choice:'b',multi:'park|road',number:'2,5',bool:true,text:'Satır 1; "alıntı"\nSatır 2'}),
  make('form-3',{multi:'["park"]',number:'12abc',text:'<script>alert(1)</script>'}),
  make('invalid',{choice:'a',number:999999}, {isInvalid:true}),
  make('other',{choice:'b'}, {surveyId:'another-survey',surveyTitle:survey.title})
];
const r = buildSurveyReport(survey, submissions, [], new Date('2026-10-21T11:00:00Z'));
assert.equal(r.records.length,4);
assert.equal(r.valid.length,3);
assert.equal(r.invalid,1);
assert.equal(r.results.length,6, 'Section-only questions must be included and repeated IDs deduplicated.');
const [s,m,n,b,c,t]=r.results;
assert.equal(s.answered,2);
assert.equal(s.missing,1);
assert.deepEqual(s.options.map(o=>o.count),[1,1], 'Exact matches must not confuse Memnun with Memnun değil.');
assert.deepEqual(s.options.map(o=>o.share),[0.5,0.5]);
assert.deepEqual(m.options.map(o=>o.count),[3,2,0], 'Multi-select counts forms, not repeated tokens.');
assert(m.options.reduce((sum,o)=>sum+o.share,0)>1);
assert.deepEqual(n.stats,{n:2,mean:1.25,median:1.25,min:0,max:2.5});
assert.equal(n.invalidNumbers,1);
assert.equal(b.answered,2, 'Boolean false is an answer.');
assert.deepEqual(b.options.map(o=>o.count),[1,1]);
assert.equal(c.answered,1); assert.equal(c.notAsked,2); assert.equal(c.missing,0);
assert.equal(t.answered,3);
assert.equal(r.progress,0.3);
const empty=buildSurveyReport(survey,[]);
assert.equal(empty.valid.length,0);
assert.equal(empty.results[0].options[0].share,null, 'No denominator must not produce a fabricated zero percent.');
assert.equal(buildSurveyReport({...survey,targetCount:0},[]).progress,null);
assert.throws(()=>buildSurveyReport(survey,[make('same',{}),make('same',{})]),/tekrarlanan/);
assert.equal(buildSurveyReport(survey,[make('unknown',{choice:'unknown'})]).results[0].unknown,1);
const prefixSurvey={...survey,questions:[{...single,options:[{label:'A, B',value:'A, B'}]}],sections:[]};
assert.equal(displayReportAnswer(prefixSurvey.questions[0],'A, B'),'A, B');
const arrayRecord=make('array',[{questionId:'choice',answerValue:'a'},{questionId:'number',answerValue:'0'}]);
assert.equal(buildSurveyReport(survey,[arrayRecord]).results[2].stats.mean,0);
const archived=buildSurveyReport(survey,[make('archived',{removedQuestion:'Original value'})]);
assert.equal(archived.unmatchedAnswers,1);
assert(reportSheets(archived)[2].rows[0].at(-1).includes('Original value'));
const photoSurvey={id:'photo-survey',questions:[{id:'photo',title:'Fotoğraf',type:'PHOTO'}]};
assert.equal(buildSurveyReport(photoSurvey,[{id:'photo-form',surveyId:'photo-survey',answers:{photo:''},answerItems:[{questionId:'photo',filePath:'/uploads/real.jpg'}]}]).results[0].answered,1);
const sheets=reportSheets(r);
assert.equal(sheets.length,4);
assert.equal(sheets[2].rows.length,4, 'Invalid forms stay visible in raw data.');
assert.equal(sheets[2].rows[0][7+2],0);
assert.equal(sheets[2].rows[1][7+4],'Koşul dışı');
assert.equal(sheets[2].rows[0][2].style,6, 'Dates must be numeric Excel dates with a date style.');
const bytes=createReportXlsx(sheets);
assert.equal(new DataView(bytes.buffer).getUint32(0,true),0x04034b50);
assert.throws(()=>createReportXlsx([{name:'test',title:'Test',subtitle:'',headers:['A'],widths:[20],rows:[['a'.repeat(32768)]]}]),/hücre sınırını/);

// Store failure paths must never download made-up values or return a false success.
globalThis.localStorage={getItem:()=>null,setItem:()=>{},removeItem:()=>{}};
const {store}=await import('./store.js');
store.state.auth={user:{role:'ADMIN'}};
store.setToast=(message,type)=>{store.lastToast={message,type};};
store.apiFetch=async()=>{throw new Error('test network failure');};
assert.equal(await store.downloadReportExcel('survey'),false);
assert.equal(store.lastToast.type,'error');
assert.equal(store._reportExportPending,false);
store.state.auth={user:{role:'FIELD_USER'}};
let apiCalls=0;store.apiFetch=async()=>{apiCalls++;};
assert.equal(await store.downloadReportExcel('survey'),false);assert.equal(apiCalls,0);

// Optional disposable output for independent ZIP/Excel-reader and browser tests.
if(process.env.REPORT_TEST_OUTPUT){
  const fs=await import('node:fs/promises');
  await fs.writeFile(`${process.env.REPORT_TEST_OUTPUT}.xlsx`,bytes);
  await fs.writeFile(`${process.env.REPORT_TEST_OUTPUT}.json`,JSON.stringify({survey,submissions:submissions.filter(s=>s.surveyId==='survey'),assignments:[]}));
}
console.log('Survey report tests passed: isolation, exact choices, multiple answers, zero/false, conditions, numeric parsing, empty data, XLSX and failed downloads.');
