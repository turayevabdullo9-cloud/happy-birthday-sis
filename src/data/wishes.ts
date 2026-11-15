import type { Language } from '../translations/types';

export interface WishItem {
  number: number;
  title: Record<Language, string>;
  message: Record<Language, string>;
}

export const WISHES_DATA: WishItem[] = [
  {
    number: 1,
    title: {
      uz: "Mustahkam sog'lik.",
      ru: 'Крепкого здоровья.',
      en: 'Strong health.',
    },
    message: {
      uz: "Har doim o'zingizni tetik, bardam va sog'lom his qilishingizni tilayman, Begim apa.",
      ru: 'Желаю Вам всегда чувствовать себя бодрой, полной сил и крепкого здоровья, Бегим апа.',
      en: 'May you always feel vibrant, energized, and blessed with lasting health, Begim Apa.',
    },
  },
  {
    number: 2,
    title: {
      uz: 'Cheksiz baxt.',
      ru: 'Безграничного счастья.',
      en: 'Endless happiness.',
    },
    message: {
      uz: "Qalbingizni quvonchga to'ldiradigan cheksiz baxtli onlar hayotingizda ko'p bo'lsin.",
      ru: 'Пусть в Вашей жизни будет бесконечно много моментов, наполняющих сердце счастьем.',
      en: 'May your days overflow with quiet joy and boundless happiness.',
    },
  },
  {
    number: 3,
    title: {
      uz: 'Oilaviy xotirjamlik.',
      ru: 'Семейного спокойствия.',
      en: 'Peace within your family.',
    },
    message: {
      uz: "Xonadoningizda doimo tinchlik, totuvlik va iliq muhit hukm sursin.",
      ru: 'Пусть в Вашем доме всегда царят мир, согласие, уют и душевное тепло.',
      en: 'May your home always be filled with harmony, warmth, and gentle peace.',
    },
  },
  {
    number: 4,
    title: {
      uz: 'Qalbingizga doim quvonch.',
      ru: 'Постоянной радости в сердце.',
      en: 'Everlasting joy in your heart.',
    },
    message: {
      uz: "Har bir tong Sizga ko'tarinki kayfiyat va yorug' hislar olib kelsin.",
      ru: 'Пусть каждое утро приносит Вам светлое настроение и тихую радость.',
      en: 'May every morning bring light, warmth, and gladness to your heart.',
    },
  },
  {
    number: 5,
    title: {
      uz: 'Ulkan muvaffaqiyatlar.',
      ru: 'Больших успехов.',
      en: 'Great success.',
    },
    message: {
      uz: "Boshlagan har bir ishingizda yuksak natijalar va munosib e'tirof hamrohingiz bo'lsin.",
      ru: 'Пусть каждое Ваше начинание увенчивается большими достижениями и заслуженным успехом.',
      en: 'May every endeavor you pursue be met with remarkable success and pride.',
    },
  },
  {
    number: 6,
    title: {
      uz: "Barcha orzularingiz ro'yobi.",
      ru: 'Исполнения всех Ваших мечтаний.',
      en: 'Fulfillment of all your dreams.',
    },
    message: {
      uz: "Dilingizdagi eng ezgu va go'zal orzularingiz birin-ketin amalga oshsin.",
      ru: 'Пусть самые заветные и светлые Ваши мечты обязательно воплотятся в жизнь.',
      en: 'May every cherished dream in your heart gently unfold into reality.',
    },
  },
  {
    number: 7,
    title: {
      uz: 'Chiroyli sayohatlar.',
      ru: 'Красивых путешествий.',
      en: 'Beautiful journeys.',
    },
    message: {
      uz: "Dunyoning eng go'zal maskanlarini ko'rish va unutilmas taassurotlar olish nasib etsin.",
      ru: 'Пусть Вам посчастливится увидеть самые прекрасные уголки мира и сохранить яркие впечатления.',
      en: 'May you travel to inspiring places and collect unforgettable memories along the way.',
    },
  },
  {
    number: 8,
    title: {
      uz: 'Samimiy insonlar.',
      ru: 'Искренних людей рядом.',
      en: 'Sincere people around you.',
    },
    message: {
      uz: "Atrofingizda doimo Sizni tushunadigan, chin ko'ngildan yaxshi ko'radigan insonlar bo'lsin.",
      ru: 'Пусть рядом с Вами всегда будут люди, которые искренне понимают, ценят и берегут Вас.',
      en: 'May you always be surrounded by kind, genuine people who truly value you.',
    },
  },
  {
    number: 9,
    title: {
      uz: 'Hayotingizda baraka.',
      ru: 'Благополучия в Вашей жизни.',
      en: 'Abundance and blessing in life.',
    },
    message: {
      uz: "Qadam qo'ygan har bir kuningizda fayz, baraka va mo'l-ko'lchilik bo'lsin.",
      ru: 'Пусть каждый Ваш день будет наполнен благодатью, достатком и светлой гармонией.',
      en: 'May abundance, grace, and quiet blessings follow every step of your path.',
    },
  },
  {
    number: 10,
    title: {
      uz: "Ko'nglingizda xotirjamlik.",
      ru: 'Душевного покоя.',
      en: 'Serenity of soul.',
    },
    message: {
      uz: "Hech qanday tashvish ko'nglingizdagi sokinlik va muvozanatni buzmasin.",
      ru: 'Пусть никакие тревоги не нарушают внутреннюю гармонию и покой Вашей души.',
      en: 'May a calm, reassuring serenity stay with your heart through every season.',
    },
  },
  {
    number: 11,
    title: {
      uz: 'Unutilmas xotiralar.',
      ru: 'Незабываемых воспоминаний.',
      en: 'Unforgettable memories.',
    },
    message: {
      uz: "Yillar o'tib ham tabassum bilan eslanadigan go'zal lahzalaringiz ko'paysin.",
      ru: 'Пусть в Вашей жизни будет как можно больше моментов, которые с улыбкой вспоминаются спустя годы.',
      en: 'May you gather countless radiant moments you will look back on with a smile.',
    },
  },
  {
    number: 12,
    title: {
      uz: 'Doimiy tabassum.',
      ru: 'Искренней улыбки всегда.',
      en: 'An ever-present smile.',
    },
    message: {
      uz: "Sizga juda yarashadigan samimiy tabassum yuzingizdan hech qachon arimasin.",
      ru: 'Пусть Ваша светлая улыбка, которая так Вам идёт, никогда не сходит с Вашего лица.',
      en: 'May the warm smile that suits you so well never fade from your face.',
    },
  },
  {
    number: 13,
    title: {
      uz: 'Yangi imkoniyatlar.',
      ru: 'Новых возможностей.',
      en: 'New opportunities.',
    },
    message: {
      uz: "22 yoshingiz Siz uchun yangi eshiklar va porloq istiqbollarni ochsin.",
      ru: 'Пусть Ваш 22-й год жизни откроет перед Вами новые двери и светлые перспективы.',
      en: 'May your 22nd year open inspiring doors and bright horizons ahead of you.',
    },
  },
  {
    number: 14,
    title: {
      uz: 'Mehr va muhabbat.',
      ru: 'Тепла и любви.',
      en: 'Warmth and love.',
    },
    message: {
      uz: "Hayotingiz yaqinlaringizning mehr-muhabbati va e'tibori bilan doim yorug' bo'lsin.",
      ru: 'Пусть Ваша жизнь всегда будет согрета искренней любовью, заботой и вниманием близких.',
      en: 'May your life always feel held by deep affection, care, and genuine love.',
    },
  },
  {
    number: 15,
    title: {
      uz: 'Omadli kunlar.',
      ru: 'Удачных дней.',
      en: 'Fortunate days.',
    },
    message: {
      uz: "Omad har doim Siz tomonda bo'lib, ishlaringiz oson va xayrli bitsin.",
      ru: 'Пусть удача всегда сопровождает Вас, а все дела складываются легко и благополучно.',
      en: 'May good fortune accompany you smoothly in everything you set out to do.',
    },
  },
  {
    number: 16,
    title: {
      uz: "Baxtga to'la uzoq umr.",
      ru: 'Долгой жизни, полной счастья.',
      en: 'A long life filled with happiness.',
    },
    message: {
      uz: "Har bir fasli mazmunli, fayzli va baxtga to'la uzoq umr tilayman.",
      ru: 'Желаю Вам долгой, наполненной смыслом, светом и радостью жизни.',
      en: 'Wishing you a long, meaningful life illuminated by happiness at every turn.',
    },
  },
  {
    number: 17,
    title: {
      uz: 'Har bir kuningizga fayz.',
      ru: 'Уюта и света каждому Вашему дню.',
      en: 'Grace in every single day.',
    },
    message: {
      uz: "Kichik lahzalarda ham go'zallik va fayzni his qilib yashashingizni tilayman.",
      ru: 'Пусть каждый Ваш день, даже самый тихий, будет наполнен особой красотой и теплом.',
      en: 'May even the quietest days feel touched with elegance, warmth, and grace.',
    },
  },
  {
    number: 18,
    title: {
      uz: "Go'zal yangiliklar.",
      ru: 'Прекрасных новостей.',
      en: 'Wonderful news.',
    },
    message: {
      uz: "Quloqlaringiz faqat quvonchli xabarlar va dilni yayratadigan yangiliklarni eshitsin.",
      ru: 'Пусть в Вашу жизнь приходят только добрые вести и события, радующие сердце.',
      en: 'May you continually receive uplifting news that fills your heart with joy.',
    },
  },
  {
    number: 19,
    title: {
      uz: 'Yaxshi insonlar davrasi.',
      ru: 'Круга достойных и добрых людей.',
      en: 'Company of good-hearted people.',
    },
    message: {
      uz: "Yo'lingizda faqat olijanob, mehribon va qalbi toza insonlar uchrasin.",
      ru: 'Пусть на Вашем жизненном пути встречаются только светлые, добрые и благородные люди.',
      en: 'May you always walk alongside kind, noble, and supportive souls.',
    },
  },
  {
    number: 20,
    title: {
      uz: 'Qalbingizdagi ezgu niyatlar amalga oshishi.',
      ru: 'Исполнения светлых намерений Вашего сердца.',
      en: 'Realization of your noble intentions.',
    },
    message: {
      uz: "Yuragingizda asrab yurgan barcha pokiza niyatlaringizning ijobatini ko'ring.",
      ru: 'Пусть все добрые и светлые замыслы, которые Вы храните в сердце, обязательно сбудутся.',
      en: 'May every sincere hope you quietly carry in your heart come gently to fruition.',
    },
  },
  {
    number: 21,
    title: {
      uz: 'Doimo qadrlanish va hurmat.',
      ru: 'Всеобщего уважения и признания.',
      en: 'Always cherished and respected.',
    },
    message: {
      uz: "Sizning mehnatingiz, mehribonligingiz va samimiyligingiz doimo yuksak qadrlansin.",
      ru: 'Пусть Ваша доброта, искренность и душевная щедрость всегда встречают глубокое уважение.',
      en: 'May your kindness and sincerity always be met with deep respect and appreciation.',
    },
  },
  {
    number: 22,
    title: {
      uz: "Har doim baxtli bo'lish.",
      ru: 'Всегда быть счастливой.',
      en: 'To always be happy.',
    },
    message: {
      uz: "Bugun ham, ertaga ham, umringizning barcha yillarida chinakam baxtli bo'ling, Begim apa!",
      ru: 'Будьте по-настоящему счастливы сегодня, завтра и во все годы Вашей жизни, Бегим апа!',
      en: 'Today, tomorrow, and through every year to come—may you always be truly happy, Begim Apa!',
    },
  },
];
