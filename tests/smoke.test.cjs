const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {calculateSavings} = require('../pricing.js');
const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'medicines.json'), 'utf8'));

test('bundled medicine dataset has expected shape and size', () => {
  assert.equal(data.length, 2308);
  for (const medicine of data) {
    assert.ok(medicine.code);
    assert.ok(medicine.name);
    assert.ok(Object.hasOwn(medicine, 'strength'));
    assert.ok(Object.hasOwn(medicine, 'pack'));
    assert.ok(Object.hasOwn(medicine, 'price'));
    assert.ok(medicine.reviewStatus.includes('needs_human_review'));
  }
});

test('drug codes are unique in the bundled source', () => {
  const codes = data.map(m => m.code);
  assert.equal(new Set(codes).size, codes.length);
});

test('savings calculation is correct and rounded to paise', () => {
  assert.deepEqual(calculateSavings('120', 28, {strength:'500 mg', pack:"10's"}), {status:'saving', difference:92, percent:76.67});
  assert.deepEqual(calculateSavings('28', 28, {strength:'500 mg', pack:"10's"}), {status:'equal', difference:0, percent:0});
  assert.deepEqual(calculateSavings('20', 28, {strength:'500 mg', pack:"10's"}), {status:'higher', difference:8, percent:40});
});

test('savings are blocked when strength or pack is missing', () => {
  assert.equal(calculateSavings('120', 28, {strength:'500 mg', pack:''}).status, 'incomplete');
  assert.equal(calculateSavings('120', 28, {strength:'', pack:"10's"}).status, 'incomplete');
});

test('empty and invalid branded prices are not treated as savings', () => {
  assert.equal(calculateSavings('', 28, {strength:'500 mg', pack:"10's"}).status, 'empty');
  assert.equal(calculateSavings('0', 28, {strength:'500 mg', pack:"10's"}).status, 'invalid');
  assert.equal(calculateSavings('abc', 28, {strength:'500 mg', pack:"10's"}).status, 'invalid');
});

test('prescription image OCR UI is present and explains review/offline limits', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const app = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
  const readme = fs.readFileSync(path.join(__dirname, '..', 'README.md'), 'utf8');
  assert.match(html, /id="prescriptionImage"[^>]*accept="image\/\*"/);
  assert.match(html, /id="ocrText"/);
  assert.match(html, /id="searchOcrText"/);
  assert.match(app, /Tesseract\.createWorker\('eng'/);
  assert.match(app, /worker\.recognize\(file\)/);
  assert.match(readme, /OCR is not guaranteed offline/);
  assert.match(readme, /users must review\/edit detected text/);
});
