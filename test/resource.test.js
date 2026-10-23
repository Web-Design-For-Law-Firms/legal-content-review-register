import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {analyse,render} from '../src/index.js';import {parseCSV,toCSV,escape} from '../src/util.js';
const data=JSON.parse(fs.readFileSync(new URL('../examples/input.json',import.meta.url),'utf8'));
test('the complete synthetic example produces a readable report',()=>{const r=analyse(data);assert.ok(r.title);assert.ok(r.summary);assert.match(render(r),/<h2>/);assert.ok(Array.isArray(r.issues));});
test('quoted CSV and dangerous spreadsheet values remain safe',()=>{assert.equal(parseCSV('id,note\r\n1,"one, two"')[0].note,'one, two');assert.throws(()=>parseCSV('id,note\n1,"unclosed'),/Unclosed/);assert.match(toCSV([{name:'=HYPERLINK("x")'}]),/'=HYPERLINK/);});
test('HTML escaping never emits an executable supplied tag',()=>{assert.equal(escape('<script>"&'), '&lt;script&gt;&quot;&amp;');});

test('changed content does not inherit approval and overdue is distinct',()=>{const r=analyse(data);assert.equal(r.pages[1].state,'changed since approval');assert.equal(r.pages[0].state,'review overdue');assert.equal(r.pages[3].state,'approved');});
test('approval without reviewer or date is rejected',()=>{const d=structuredClone(data);d.pages[0].reviewer='';assert.throws(()=>analyse(d),/requires reviewer/);});
test('impossible dates and reverse review chronology are rejected',()=>{const d=structuredClone(data);d.pages[0].last_reviewed='2026-02-30';assert.throws(()=>analyse(d),/date/);d.pages[0].last_reviewed='2026-08-01';d.pages[0].next_review_due='2026-07-01';assert.throws(()=>analyse(d),/precede/);});
