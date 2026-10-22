// Browser-compatible OOXML writer. Text is always an inline string, never a formula.
// ZIP uses the standard stored method so exports need no CDN or third-party runtime.
const enc = new TextEncoder();
const xml = value => String(value ?? '').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
function column(n) { let s = ''; for (; n > 0; n = Math.floor((n - 1) / 26)) s = String.fromCharCode(65 + (n - 1) % 26) + s; return s; }
function cell(value, ref, style = 0) {
  if (value && typeof value === 'object') { style = value.style ?? style; value = value.value; }
  if (value === null || value === undefined) return `<c r="${ref}" s="${style}"/>`;
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new Error('Excel çıktısında geçersiz sayısal değer var.');
    return `<c r="${ref}" s="${style}"><v>${value}</v></c>`;
  }
  if (String(value).length > 32767) throw new Error('Bir yanıt Excel hücre sınırını aşıyor (32.767 karakter).');
  return `<c r="${ref}" s="${style}" t="inlineStr"><is><t xml:space="preserve">${xml(value)}</t></is></c>`;
}
function sheetXml(sheet) {
  const n = sheet.headers.length, last = column(n), end = Math.max(4, sheet.rows.length + 4);
  if (n > 16384 || end > 1048576) throw new Error('Veri Excel sayfa sınırını aşıyor.');
  let rows = `<row r="1" ht="32" customHeight="1">${cell(sheet.title, 'A1', 1)}</row><row r="2" ht="38" customHeight="1">${cell(sheet.subtitle, 'A2', 5)}</row><row r="4" ht="38" customHeight="1">${sheet.headers.map((v,i) => cell(v, `${column(i+1)}4`, 2)).join('')}</row>`;
  sheet.rows.forEach((values, i) => {
    const lines = Math.max(1, ...values.map((v, j) => String(v?.value ?? v ?? '').split('\n').reduce((sum, text) => sum + Math.max(1, Math.ceil(text.length / Math.max(8, sheet.widths[j] - 4))), 0)));
    rows += `<row r="${i+5}" ht="${Math.min(409, Math.max(30, lines * 16 + 10))}" customHeight="1">${values.map((v,j) => cell(v, `${column(j+1)}${i+5}`, i % 2 ? 3 : 0)).join('')}</row>`;
  });
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><dimension ref="A1:${last}${end}"/><sheetViews><sheetView workbookViewId="0" showGridLines="0"><pane xSplit="1" ySplit="4" topLeftCell="B5" activePane="bottomRight" state="frozen"/></sheetView></sheetViews><sheetFormatPr defaultRowHeight="30"/><cols>${sheet.widths.map((w,i)=>`<col min="${i+1}" max="${i+1}" width="${w}" customWidth="1"/>`).join('')}</cols><sheetData>${rows}</sheetData><autoFilter ref="A4:${last}${end}"/><mergeCells count="2"><mergeCell ref="A1:${last}1"/><mergeCell ref="A2:${last}2"/></mergeCells><pageMargins left="0.3" right="0.3" top="0.5" bottom="0.5" header="0.2" footer="0.2"/><pageSetup paperSize="9" orientation="landscape" fitToWidth="1" fitToHeight="0"/></worksheet>`;
}
const styles = `<?xml version="1.0" encoding="UTF-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><numFmts count="1"><numFmt numFmtId="164" formatCode="0.0%"/></numFmts><fonts count="4"><font><sz val="11"/><color rgb="FF01214A"/><name val="Calibri"/></font><font><b/><sz val="18"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font><font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font><font><b/><sz val="11"/><color rgb="FF01214A"/><name val="Calibri"/></font></fonts><fills count="5"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF01214A"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FF2A9D38"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFF4F7F9"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="8"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="center"/></xf><xf numFmtId="0" fontId="2" fillId="3" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf><xf numFmtId="0" fontId="0" fillId="4" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf><xf numFmtId="164" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="4" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf><xf numFmtId="22" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="4" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`;
const crcTable = Uint32Array.from({length:256}, (_, i) => { for(let k=0;k<8;k++) i=(i&1)?0xedb88320^(i>>>1):i>>>1; return i>>>0; });
function crc32(bytes) { let n=0xffffffff; for(const b of bytes) n=crcTable[(n^b)&255]^(n>>>8); return (n^0xffffffff)>>>0; }
function concat(parts) { const out=new Uint8Array(parts.reduce((n,p)=>n+p.length,0)); let pos=0; for(const p of parts){out.set(p,pos);pos+=p.length;} return out; }
function header(length, fields) { const b=new Uint8Array(length), v=new DataView(b.buffer); for(const [at,size,value] of fields) size===4?v.setUint32(at,value,true):v.setUint16(at,value,true); return b; }
function zip(files) {
  const parts=[], central=[]; let offset=0;
  for(const [path,content] of files){
    const name=enc.encode(path), data=enc.encode(content), crc=crc32(data);
    const local=header(30,[[0,4,0x04034b50],[4,2,20],[6,2,0x800],[12,2,33],[14,4,crc],[18,4,data.length],[22,4,data.length],[26,2,name.length]]);
    const dir=header(46,[[0,4,0x02014b50],[4,2,20],[6,2,20],[8,2,0x800],[14,2,33],[16,4,crc],[20,4,data.length],[24,4,data.length],[28,2,name.length],[42,4,offset]]);
    parts.push(local,name,data); central.push(dir,name); offset+=local.length+name.length+data.length;
  }
  const c=concat(central), end=header(22,[[0,4,0x06054b50],[8,2,files.length],[10,2,files.length],[12,4,c.length],[16,4,offset]]);
  return concat([...parts,c,end]);
}
export function createReportXlsx(sheets) {
  const files=[
    ['[Content_Types].xml', `<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>${sheets.map((s,i)=>`<Override PartName="/xl/worksheets/sheet${i+1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('')}</Types>`],
    ['_rels/.rels', '<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>'],
    ['xl/workbook.xml',`<?xml version="1.0" encoding="UTF-8"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${sheets.map((s,i)=>`<sheet name="${xml(s.name)}" sheetId="${i+1}" r:id="rId${i+1}"/>`).join('')}</sheets></workbook>`],
    ['xl/_rels/workbook.xml.rels',`<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${sheets.map((s,i)=>`<Relationship Id="rId${i+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i+1}.xml"/>`).join('')}<Relationship Id="rId${sheets.length+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`],
    ['xl/styles.xml',styles], ...sheets.map((s,i)=>[`xl/worksheets/sheet${i+1}.xml`,sheetXml(s)])
  ];
  return zip(files);
}
