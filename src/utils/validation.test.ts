import test from 'node:test';
import assert from 'node:assert/strict';
import { BIRTHDAY_CONFIG } from '../config/birthday';
import { TRANSLATIONS } from '../translations';
import { WISHES_DATA } from '../data/wishes';
import { fadeSlideUpProps, SECTION_VIEWPORT } from './motionPresets';

function collectStrings(obj: unknown): string[] {
  if (typeof obj === 'string') return [obj];
  if (Array.isArray(obj)) return obj.flatMap(collectStrings);
  if (obj && typeof obj === 'object') {
    return Object.values(obj).flatMap(collectStrings);
  }
  return [];
}

function collectKeys(obj: unknown, prefix = ''): string[] {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return [prefix];
  return Object.entries(obj).flatMap(([k, v]) =>
    collectKeys(v, prefix ? `${prefix}.${k}` : k)
  );
}

test('birthday configuration matches exact dates, age, candles, and wishes', () => {
  assert.equal(BIRTHDAY_CONFIG.recipientName, 'Begim Apa');
  assert.equal(BIRTHDAY_CONFIG.birthDate, '2004-11-16');
  assert.equal(BIRTHDAY_CONFIG.celebrationDate, '2026-11-16');
  assert.equal(BIRTHDAY_CONFIG.age, 22);
  assert.equal(BIRTHDAY_CONFIG.candleCount, 22);
  assert.equal(BIRTHDAY_CONFIG.wishCount, 22);
  assert.equal(WISHES_DATA.length, 22);
});

test('all 22 wishes are uniquely numbered 1 through 22 and have all 3 languages', () => {
  const numbers = WISHES_DATA.map((w) => w.number);
  assert.deepEqual(
    numbers,
    Array.from({ length: 22 }, (_, i) => i + 1)
  );
  for (const wish of WISHES_DATA) {
    for (const lang of ['uz', 'ru', 'en'] as const) {
      assert.ok(wish.title[lang].trim().length > 0, `Empty wish title ${wish.number} in ${lang}`);
      assert.ok(wish.message[lang].trim().length > 0, `Empty wish message ${wish.number} in ${lang}`);
    }
  }
});

test('Uzbek translations and wishes strictly use respectful Siz (never sen/sening/san)', () => {
  const uzStrings = [
    ...collectStrings(TRANSLATIONS.uz),
    ...WISHES_DATA.flatMap((w) => [w.title.uz, w.message.uz]),
  ];

  const informalUzPattern = /\b(sen|sening|san|senga|seni|sendan|senda|seniki)\b/i;

  for (const text of uzStrings) {
    assert.equal(
      informalUzPattern.test(text),
      false,
      `Found informal Uzbek address in: "${text}"`
    );
  }
});

test('Russian translations and wishes strictly use formal Вы (never ты/тебя/твой)', () => {
  const ruStrings = [
    ...collectStrings(TRANSLATIONS.ru),
    ...WISHES_DATA.flatMap((w) => [w.title.ru, w.message.ru]),
  ];

  const informalRuPattern =
    /(^|[^\p{L}])(ты|тебя|тебе|тобой|тобою|твой|твоя|твоё|твое|твои|твоих|твоим|твоими|твоего|твоей|твоему|твою)([^\p{L}]|$)/iu;

  for (const text of ruStrings) {
    assert.equal(
      informalRuPattern.test(text),
      false,
      `Found informal Russian address in: "${text}"`
    );
  }
});

test('translation keys have full parity across uz, ru, and en', () => {
  const uzKeys = collectKeys(TRANSLATIONS.uz).sort();
  const ruKeys = collectKeys(TRANSLATIONS.ru).sort();
  const enKeys = collectKeys(TRANSLATIONS.en).sort();

  assert.deepEqual(ruKeys, uzKeys);
  assert.deepEqual(enKeys, uzKeys);
});

test('scroll reveal presets respect reduced-motion preferences', () => {
  const normal = fadeSlideUpProps(false, 0.15);
  assert.deepEqual(normal.initial, { opacity: 0, y: 26 });
  assert.deepEqual(normal.whileInView, { opacity: 1, y: 0 });
  assert.equal(normal.viewport, SECTION_VIEWPORT);
  assert.equal(normal.transition.delay, 0.15);

  const reduced = fadeSlideUpProps(true);
  assert.equal(reduced.initial, false);
});
