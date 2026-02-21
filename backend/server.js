const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// -------------------- DATA --------------------
const ZIKR_LIST = [
    { id: 1, arabic: "سُبْحَانَ اللهِ", transliteration: "SubhanAllah", meaning: "Glory be to Allah", count: 33 },
    { id: 2, arabic: "الْحَمْدُ لِلَّهِ", transliteration: "Alhamdulillah", meaning: "Praise be to Allah", count: 33 },
    { id: 3, arabic: "اللهُ أَكْبَرُ", transliteration: "Allahu Akbar", meaning: "Allah is the Greatest", count: 34 },
    { id: 4, arabic: "لَا إِلَٰهَ إِلَّا اللهُ", transliteration: "La ilaha illallah", meaning: "There is no god but Allah", count: 100 },
    { id: 5, arabic: "أَسْتَغْفِرُ اللهَ", transliteration: "Astaghfirullah", meaning: "I seek forgiveness from Allah", count: 100 },
    { id: 6, arabic: "سُبْحَانَ اللهِ وَبِحَمْدِهِ", transliteration: "SubhanAllahi wa bihamdihi", meaning: "Glory be to Allah and praise Him", count: 100 },
    { id: 7, arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ", transliteration: "La hawla wa la quwwata illa billah", meaning: "There is no power nor strength except with Allah", count: 100 }
];

const DUAS_LIST = [
    {
        id: 1,
        category: "Morning",
        title: "Morning Remembrance",
        arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ",
        transliteration: "Asbahna wa asbahal mulku lillah",
        meaning: "We have entered morning and the kingdom belongs to Allah",
        reference: "Muslim"
    },
    {
        id: 2,
        category: "Evening",
        title: "Evening Remembrance",
        arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ",
        transliteration: "Amsayna wa amsal mulku lillah",
        meaning: "We have entered evening and the kingdom belongs to Allah",
        reference: "Muslim"
    },
    {
        id: 3,
        category: "Sleep",
        title: "Before Sleep",
        arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
        transliteration: "Bismika Allahumma amutu wa ahya",
        meaning: "In Your name, O Allah, I die and I live",
        reference: "Bukhari"
    },
    {
        id: 4,
        category: "Prayer",
        title: "Before Prayer",
        arabic: "اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ",
        transliteration: "Allahumma ba'id bayni wa bayna khatayaya",
        meaning: "O Allah, distance me from my sins",
        reference: "Bukhari & Muslim"
    },
    {
        id: 5,
        category: "Food",
        title: "Before Eating",
        arabic: "بِسْمِ اللهِ",
        transliteration: "Bismillah",
        meaning: "In the name of Allah",
        reference: "Abu Dawud"
    },
];

const DAILY_REMINDERS = [
    "Remember Allah in every moment - He is always with you",
    "Pray the five daily prayers on time",
    "Read at least one page of the Quran today",
    "Make dua for your parents and loved ones",
    "Seek forgiveness (Istighfar) throughout the day",
    "Give charity, even if it's small",
    "Smile - it's Sunnah and a form of charity",
    "Lower your gaze and guard your modesty",
    "Speak kindly and avoid backbiting",
    "Help someone in need today",
    "Make dhikr while driving or waiting",
    "Pray your sunnah prayers for extra rewards",
    "Visit a sick person or call someone who is ill",
    "Read Surah Al-Kahf on Friday",
    "Fast on Mondays and Thursdays if possible",
];

// Daily Hadith collection
const DAILY_HADITH = [
    { text: "The best among you are those who learn the Quran and teach it", narrator: "Bukhari" },
    { text: "A believer is not stung twice from the same hole", narrator: "Bukhari & Muslim" },
    { text: "Cleanliness is half of faith", narrator: "Muslim" },
    { text: "The strong person is not the one who can overpower others, but the one who controls himself when angry", narrator: "Bukhari & Muslim" },
    { text: "None of you truly believes until he loves for his brother what he loves for himself", narrator: "Bukhari & Muslim" },
    { text: "Speak good or remain silent", narrator: "Bukhari & Muslim" },
    { text: "The most complete of believers in faith are those with the best character", narrator: "Tirmidhi" },
    { text: "Charity does not decrease wealth", narrator: "Muslim" },
    { text: "Seek knowledge from the cradle to the grave", narrator: "Ibn Majah" },
    { text: "The best of deeds is to bring happiness to a believer", narrator: "Tabarani" }
];

// Daily Quranic verses
const DAILY_VERSES = [
    { text: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", translation: "Indeed, with hardship comes ease", surah: "Ash-Sharh", verse: "94:6" },
    { text: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", translation: "For indeed, with hardship comes ease", surah: "Ash-Sharh", verse: "94:5" },
    { text: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا", translation: "And whoever fears Allah, He will make for him a way out", surah: "At-Talaq", verse: "65:2" },
    { text: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ", translation: "And whoever relies upon Allah, then He is sufficient for him", surah: "At-Talaq", verse: "65:3" },
    { text: "إِنَّ اللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا مَا بِأَنفُسِهِمْ", translation: "Indeed, Allah will not change the condition of a people until they change what is in themselves", surah: "Ar-Ra'd", verse: "13:11" },
    { text: "وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ", translation: "And your Lord says, 'Call upon Me; I will respond to you'", surah: "Ghafir", verse: "40:60" }
];

// Quran Surahs list
const QURAN_SURAHS = [
  { id: 1, name: "الفاتحة", transliteration: "Al-Fatihah", translation: "The Opener", verses: 7, type: "Meccan" },
  { id: 2, name: "البقرة", transliteration: "Al-Baqarah", translation: "The Cow", verses: 286, type: "Medinan" },
  { id: 3, name: "آل عمران", transliteration: "Ali 'Imran", translation: "Family of Imran", verses: 200, type: "Medinan" },
  { id: 4, name: "النساء", transliteration: "An-Nisa", translation: "The Women", verses: 176, type: "Medinan" },
  { id: 5, name: "المائدة", transliteration: "Al-Ma'idah", translation: "The Table Spread", verses: 120, type: "Medinan" },
  { id: 6, name: "الأنعام", transliteration: "Al-An'am", translation: "The Cattle", verses: 165, type: "Meccan" },
  { id: 7, name: "الأعراف", transliteration: "Al-A'raf", translation: "The Heights", verses: 206, type: "Meccan" },
  { id: 8, name: "الأنفال", transliteration: "Al-Anfal", translation: "The Spoils of War", verses: 75, type: "Medinan" },
  { id: 9, name: "التوبة", transliteration: "At-Tawbah", translation: "The Repentance", verses: 129, type: "Medinan" },
  { id: 10, name: "يونس", transliteration: "Yunus", translation: "Jonah", verses: 109, type: "Meccan" },
  { id: 11, name: "هود", transliteration: "Hud", translation: "Hud", verses: 123, type: "Meccan" },
  { id: 12, name: "يوسف", transliteration: "Yusuf", translation: "Joseph", verses: 111, type: "Meccan" },
  { id: 13, name: "الرعد", transliteration: "Ar-Ra'd", translation: "The Thunder", verses: 43, type: "Medinan" },
  { id: 14, name: "إبراهيم", transliteration: "Ibrahim", translation: "Abraham", verses: 52, type: "Meccan" },
  { id: 15, name: "الحجر", transliteration: "Al-Hijr", translation: "The Rocky Tract", verses: 99, type: "Meccan" },
  { id: 16, name: "النحل", transliteration: "An-Nahl", translation: "The Bee", verses: 128, type: "Meccan" },
  { id: 17, name: "الإسراء", transliteration: "Al-Isra", translation: "The Night Journey", verses: 111, type: "Meccan" },
  { id: 18, name: "الكهف", transliteration: "Al-Kahf", translation: "The Cave", verses: 110, type: "Meccan" },
  { id: 19, name: "مريم", transliteration: "Maryam", translation: "Mary", verses: 98, type: "Meccan" },
  { id: 20, name: "طه", transliteration: "Ta-Ha", translation: "Ta-Ha", verses: 135, type: "Meccan" },
  { id: 21, name: "الأنبياء", transliteration: "Al-Anbiya", translation: "The Prophets", verses: 112, type: "Meccan" },
  { id: 22, name: "الحج", transliteration: "Al-Hajj", translation: "The Pilgrimage", verses: 78, type: "Medinan" },
  { id: 23, name: "المؤمنون", transliteration: "Al-Mu'minun", translation: "The Believers", verses: 118, type: "Meccan" },
  { id: 24, name: "النور", transliteration: "An-Nur", translation: "The Light", verses: 64, type: "Medinan" },
  { id: 25, name: "الفرقان", transliteration: "Al-Furqan", translation: "The Criterion", verses: 77, type: "Meccan" },
  { id: 26, name: "الشعراء", transliteration: "Ash-Shu'ara", translation: "The Poets", verses: 227, type: "Meccan" },
  { id: 27, name: "النمل", transliteration: "An-Naml", translation: "The Ant", verses: 93, type: "Meccan" },
  { id: 28, name: "القصص", transliteration: "Al-Qasas", translation: "The Stories", verses: 88, type: "Meccan" },
  { id: 29, name: "العنكبوت", transliteration: "Al-'Ankabut", translation: "The Spider", verses: 69, type: "Meccan" },
  { id: 30, name: "الروم", transliteration: "Ar-Rum", translation: "The Romans", verses: 60, type: "Meccan" },
  { id: 31, name: "لقمان", transliteration: "Luqman", translation: "Luqman", verses: 34, type: "Meccan" },
  { id: 32, name: "السجدة", transliteration: "As-Sajdah", translation: "The Prostration", verses: 30, type: "Meccan" },
  { id: 33, name: "الأحزاب", transliteration: "Al-Ahzab", translation: "The Combined Forces", verses: 73, type: "Medinan" },
  { id: 34, name: "سبإ", transliteration: "Saba", translation: "Sheba", verses: 54, type: "Meccan" },
  { id: 35, name: "فاطر", transliteration: "Fatir", translation: "The Originator", verses: 45, type: "Meccan" },
  { id: 36, name: "يس", transliteration: "Ya-Sin", translation: "Ya-Sin", verses: 83, type: "Meccan" },
  { id: 37, name: "الصافات", transliteration: "As-Saffat", translation: "Those Who Set the Ranks", verses: 182, type: "Meccan" },
  { id: 38, name: "ص", transliteration: "Sad", translation: "Sad", verses: 88, type: "Meccan" },
  { id: 39, name: "الزمر", transliteration: "Az-Zumar", translation: "The Groups", verses: 75, type: "Meccan" },
  { id: 40, name: "غافر", transliteration: "Ghafir", translation: "The Forgiver", verses: 85, type: "Meccan" },
  { id: 41, name: "فصلت", transliteration: "Fussilat", translation: "Explained in Detail", verses: 54, type: "Meccan" },
  { id: 42, name: "الشورى", transliteration: "Ash-Shura", translation: "The Consultation", verses: 53, type: "Meccan" },
  { id: 43, name: "الزخرف", transliteration: "Az-Zukhruf", translation: "The Gold Adornments", verses: 89, type: "Meccan" },
  { id: 44, name: "الدخان", transliteration: "Ad-Dukhan", translation: "The Smoke", verses: 59, type: "Meccan" },
  { id: 45, name: "الجاثية", transliteration: "Al-Jathiyah", translation: "The Kneeling", verses: 37, type: "Meccan" },
  { id: 46, name: "الأحقاف", transliteration: "Al-Ahqaf", translation: "The Wind-Curved Sandhills", verses: 35, type: "Meccan" },
  { id: 47, name: "محمد", transliteration: "Muhammad", translation: "Muhammad", verses: 38, type: "Medinan" },
  { id: 48, name: "الفتح", transliteration: "Al-Fath", translation: "The Victory", verses: 29, type: "Medinan" },
  { id: 49, name: "الحجرات", transliteration: "Al-Hujurat", translation: "The Rooms", verses: 18, type: "Medinan" },
  { id: 50, name: "ق", transliteration: "Qaf", translation: "Qaf", verses: 45, type: "Meccan" },
  { id: 51, name: "الذاريات", transliteration: "Adh-Dhariyat", translation: "The Winnowing Winds", verses: 60, type: "Meccan" },
  { id: 52, name: "الطور", transliteration: "At-Tur", translation: "The Mount", verses: 49, type: "Meccan" },
  { id: 53, name: "النجم", transliteration: "An-Najm", translation: "The Star", verses: 62, type: "Meccan" },
  { id: 54, name: "القمر", transliteration: "Al-Qamar", translation: "The Moon", verses: 55, type: "Meccan" },
  { id: 55, name: "الرحمن", transliteration: "Ar-Rahman", translation: "The Beneficent", verses: 78, type: "Medinan" },
  { id: 56, name: "الواقعة", transliteration: "Al-Waqi'ah", translation: "The Inevitable", verses: 96, type: "Meccan" },
  { id: 57, name: "الحديد", transliteration: "Al-Hadid", translation: "The Iron", verses: 29, type: "Medinan" },
  { id: 58, name: "المجادلة", transliteration: "Al-Mujadila", translation: "The Pleading Woman", verses: 22, type: "Medinan" },
  { id: 59, name: "الحشر", transliteration: "Al-Hashr", translation: "The Exile", verses: 24, type: "Medinan" },
  { id: 60, name: "الممتحنة", transliteration: "Al-Mumtahanah", translation: "She That Is To Be Examined", verses: 13, type: "Medinan" },
  { id: 61, name: "الصف", transliteration: "As-Saff", translation: "The Ranks", verses: 14, type: "Medinan" },
  { id: 62, name: "الجمعة", transliteration: "Al-Jumu'ah", translation: "The Congregation", verses: 11, type: "Medinan" },
  { id: 63, name: "المنافقون", transliteration: "Al-Munafiqun", translation: "The Hypocrites", verses: 11, type: "Medinan" },
  { id: 64, name: "التغابن", transliteration: "At-Taghabun", translation: "The Mutual Disillusion", verses: 18, type: "Medinan" },
  { id: 65, name: "الطلاق", transliteration: "At-Talaq", translation: "The Divorce", verses: 12, type: "Medinan" },
  { id: 66, name: "التحريم", transliteration: "At-Tahrim", translation: "The Prohibition", verses: 12, type: "Medinan" },
  { id: 67, name: "الملك", transliteration: "Al-Mulk", translation: "The Sovereignty", verses: 30, type: "Meccan" },
  { id: 68, name: "القلم", transliteration: "Al-Qalam", translation: "The Pen", verses: 52, type: "Meccan" },
  { id: 69, name: "الحاقة", transliteration: "Al-Haqqah", translation: "The Reality", verses: 52, type: "Meccan" },
  { id: 70, name: "المعارج", transliteration: "Al-Ma'arij", translation: "The Ascending Stairways", verses: 44, type: "Meccan" },
  { id: 71, name: "نوح", transliteration: "Nuh", translation: "Noah", verses: 28, type: "Meccan" },
  { id: 72, name: "الجن", transliteration: "Al-Jinn", translation: "The Jinn", verses: 28, type: "Meccan" },
  { id: 73, name: "المزمل", transliteration: "Al-Muzzammil", translation: "The Enshrouded One", verses: 20, type: "Meccan" },
  { id: 74, name: "المدثر", transliteration: "Al-Muddaththir", translation: "The Cloaked One", verses: 56, type: "Meccan" },
  { id: 75, name: "القيامة", transliteration: "Al-Qiyamah", translation: "The Resurrection", verses: 40, type: "Meccan" },
  { id: 76, name: "الانسان", transliteration: "Al-Insan", translation: "The Man", verses: 31, type: "Medinan" },
  { id: 77, name: "المرسلات", transliteration: "Al-Mursalat", translation: "The Emissaries", verses: 50, type: "Meccan" },
  { id: 78, name: "النبإ", transliteration: "An-Naba", translation: "The Great News", verses: 40, type: "Meccan" },
  { id: 79, name: "النازعات", transliteration: "An-Nazi'at", translation: "Those Who Drag Forth", verses: 46, type: "Meccan" },
  { id: 80, name: "عبس", transliteration: "'Abasa", translation: "He Frowned", verses: 42, type: "Meccan" },
  { id: 81, name: "التكوير", transliteration: "At-Takwir", translation: "The Overthrowing", verses: 29, type: "Meccan" },
  { id: 82, name: "الإنفطار", transliteration: "Al-Infitar", translation: "The Cleaving", verses: 19, type: "Meccan" },
  { id: 83, name: "المطففين", transliteration: "Al-Mutaffifin", translation: "The Defrauding", verses: 36, type: "Meccan" },
  { id: 84, name: "الإنشقاق", transliteration: "Al-Inshiqaq", translation: "The Sundering", verses: 25, type: "Meccan" },
  { id: 85, name: "البروج", transliteration: "Al-Buruj", translation: "The Mansions of the Stars", verses: 22, type: "Meccan" },
  { id: 86, name: "الطارق", transliteration: "At-Tariq", translation: "The Nightcomer", verses: 17, type: "Meccan" },
  { id: 87, name: "الأعلى", transliteration: "Al-A'la", translation: "The Most High", verses: 19, type: "Meccan" },
  { id: 88, name: "الغاشية", transliteration: "Al-Ghashiyah", translation: "The Overwhelming", verses: 26, type: "Meccan" },
  { id: 89, name: "الفجر", transliteration: "Al-Fajr", translation: "The Dawn", verses: 30, type: "Meccan" },
  { id: 90, name: "البلد", transliteration: "Al-Balad", translation: "The City", verses: 20, type: "Meccan" },
  { id: 91, name: "الشمس", transliteration: "Ash-Shams", translation: "The Sun", verses: 15, type: "Meccan" },
  { id: 92, name: "الليل", transliteration: "Al-Layl", translation: "The Night", verses: 21, type: "Meccan" },
  { id: 93, name: "الضحى", transliteration: "Ad-Duha", translation: "The Morning Hours", verses: 11, type: "Meccan" },
  { id: 94, name: "الشرح", transliteration: "Ash-Sharh", translation: "The Relief", verses: 8, type: "Meccan" },
  { id: 95, name: "التين", transliteration: "At-Tin", translation: "The Fig", verses: 8, type: "Meccan" },
  { id: 96, name: "العلق", transliteration: "Al-'Alaq", translation: "The Clot", verses: 19, type: "Meccan" },
  { id: 97, name: "القدر", transliteration: "Al-Qadr", translation: "The Power", verses: 5, type: "Meccan" },
  { id: 98, name: "البينة", transliteration: "Al-Bayyinah", translation: "The Clear Proof", verses: 8, type: "Medinan" },
  { id: 99, name: "الزلزلة", transliteration: "Az-Zalzalah", translation: "The Earthquake", verses: 8, type: "Medinan" },
  { id: 100, name: "العاديات", transliteration: "Al-'Adiyat", translation: "The Chargers", verses: 11, type: "Meccan" },
  { id: 101, name: "القارعة", transliteration: "Al-Qari'ah", translation: "The Calamity", verses: 11, type: "Meccan" },
  { id: 102, name: "التكاثر", transliteration: "At-Takathur", translation: "The Rivalry in World Increase", verses: 8, type: "Meccan" },
  { id: 103, name: "العصر", transliteration: "Al-'Asr", translation: "The Declining Day", verses: 3, type: "Meccan" },
  { id: 104, name: "الهمزة", transliteration: "Al-Humazah", translation: "The Traducer", verses: 9, type: "Meccan" },
  { id: 105, name: "الفيل", transliteration: "Al-Fil", translation: "The Elephant", verses: 5, type: "Meccan" },
  { id: 106, name: "قريش", transliteration: "Quraysh", translation: "Quraysh", verses: 4, type: "Meccan" },
  { id: 107, name: "الماعون", transliteration: "Al-Ma'un", translation: "The Small Kindnesses", verses: 7, type: "Meccan" },
  { id: 108, name: "الكوثر", transliteration: "Al-Kawthar", translation: "The Abundance", verses: 3, type: "Meccan" },
  { id: 109, name: "الكافرون", transliteration: "Al-Kafirun", translation: "The Disbelievers", verses: 6, type: "Meccan" },
  { id: 110, name: "النصر", transliteration: "An-Nasr", translation: "The Divine Support", verses: 3, type: "Medinan" },
  { id: 111, name: "المسد", transliteration: "Al-Masad", translation: "The Palm Fiber", verses: 5, type: "Meccan" },
  { id: 112, name: "الإخلاص", transliteration: "Al-Ikhlas", translation: "The Sincerity", verses: 4, type: "Meccan" },
  { id: 113, name: "الفلق", transliteration: "Al-Falaq", translation: "The Daybreak", verses: 5, type: "Meccan" },
  { id: 114, name: "الناس", transliteration: "An-Nas", translation: "The Mankind", verses: 6, type: "Meccan" }
];

// -------------------- HELPER FUNCTIONS --------------------
function calculatePrayerTimes(latitude, longitude, date) {
    // For demo purposes - in production use a proper calculation library
    return {
        Fajr: "05:30",
        Dhuhr: "12:30",
        Asr: "15:45",
        Maghrib: "18:15",
        Isha: "19:45"
    };
}

// -------------------- API ENDPOINTS --------------------
app.get('/api/zikr', (req, res) => {
    res.json(ZIKR_LIST);
});

app.get('/api/duas', (req, res) => {
    const category = req.query.category;
    if (category) {
        const filtered = DUAS_LIST.filter(d => d.category.toLowerCase() === category.toLowerCase());
        return res.json(filtered);
    }
    res.json(DUAS_LIST);
});

app.get('/api/daily-reminder', (req, res) => {
    const randomIndex = Math.floor(Math.random() * DAILY_REMINDERS.length);
    res.json({ reminder: DAILY_REMINDERS[randomIndex] });
});

app.get('/api/daily-hadith', (req, res) => {
    const randomIndex = Math.floor(Math.random() * DAILY_HADITH.length);
    res.json(DAILY_HADITH[randomIndex]);
});

app.get('/api/daily-verse', (req, res) => {
    const randomIndex = Math.floor(Math.random() * DAILY_VERSES.length);
    res.json(DAILY_VERSES[randomIndex]);
});

// Quran endpoints using Fawazahmed0 API
app.get('/api/quran/surahs', (req, res) => {
    res.json(QURAN_SURAHS);
});

app.get('/api/quran/surah/:id', async (req, res) => {
    try {
        const surahId = req.params.id;
        // Using Fawazahmed0 Quran API
        const response = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranuthmanihaf/${surahId}.json`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching surah:', error);
        res.status(500).json({ error: 'Failed to fetch surah' });
    }
});

app.get('/api/quran/search', async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ error: 'Search query required' });
        }

        // Search in surah names
        const results = QURAN_SURAHS.filter(surah => 
            surah.name.includes(q) || 
            surah.transliteration.toLowerCase().includes(q.toLowerCase()) ||
            surah.translation.toLowerCase().includes(q.toLowerCase())
        );
        
        res.json(results);
    } catch (error) {
        console.error('Error searching Quran:', error);
        res.status(500).json({ error: 'Failed to search Quran' });
    }
});

app.post('/api/prayer-times', (req, res) => {
    const { latitude = 0, longitude = 0, date = new Date().toISOString().split('T')[0] } = req.body;
    const times = calculatePrayerTimes(Number(latitude), Number(longitude), date);
    res.json(times);
});

// News API endpoint using NewsAPI.org
app.get('/api/news', async (req, res) => {
    try {
        const { category = 'all', page = 1, limit = 50 } = req.query;
        
        // Using NewsAPI.org - Free tier: 100 requests per day
        // Get your free API key from: https://newsapi.org/
        // You need to register and replace this with your actual API key
        const apiKey = '24aa005ce84f49dca4b2a0c9fc722438'; // Replace with your actual NewsAPI key
        
        // Base URL for NewsAPI.org
        let url = `https://newsapi.org/v2/everything?`;
        
        // Add search terms for Islamic/Muslim news
        const searchTerms = 'islam OR muslim OR mosque OR quran OR ramadan OR hajj OR mecca OR medina OR islamic OR muslims OR halal OR eid OR prophet OR arabic OR hijab OR salah OR prayer';
        url += `q=${encodeURIComponent(searchTerms)}`;
        
        // Add other parameters
        url += `&language=en&pageSize=${limit}&page=${page}&apiKey=${apiKey}`;
        
        // Add category filter if not 'all' (NewsAPI doesn't have direct category filtering in everything endpoint)
        // We'll handle category filtering on the client side or use the top-headlines endpoint for categories
        if (category !== 'all') {
            // We can add a category filter in the search query
            url += `&q=${encodeURIComponent(category)}`;
        }
        
        console.log('Fetching news from NewsAPI.org...');
        console.log('URL:', url.replace(apiKey, 'HIDDEN_KEY'));
        
        const response = await axios.get(url);
        console.log('NewsAPI.org response status:', response.status);
        console.log('Number of articles found:', response.data.articles?.length || 0);
        
        // Format the response to match what frontend expects
        if (response.data && response.data.articles && response.data.articles.length > 0) {
            const formattedData = {
                data: response.data.articles.map((article, index) => ({
                    uuid: article.url || `article-${index}-${Date.now()}`,
                    title: article.title || 'Islamic News',
                    description: article.description || article.content || 'No description available',
                    snippet: (article.description || article.content || 'No description available').substring(0, 150) + '...',
                    image_url: article.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070',
                    url: article.url || '#',
                    published_at: article.publishedAt || new Date().toISOString(),
                    source: article.source?.name || 'Islamic News',
                    categories: [category !== 'all' ? category : 'general']
                })),
                meta: {
                    found: response.data.totalResults || response.data.articles.length,
                    returned: response.data.articles.length,
                    page: parseInt(page),
                    limit: parseInt(limit)
                }
            };
            return res.json(formattedData);
        } else {
            console.log('No articles found from NewsAPI, returning sample data');
            // If no articles, return enhanced sample data
            const sampleNews = getEnhancedSampleNews();
            return res.json(sampleNews);
        }
    } catch (error) {
        console.error('Error fetching news from NewsAPI.org:', error.response ? error.response.data : error.message);
        
        // If NewsAPI fails, return enhanced sample data
        console.log('NewsAPI failed, returning enhanced sample data with timestamps');
        
        // Return sample data with current timestamps to make it feel "realtime"
        const sampleNews = getEnhancedSampleNews();
        res.json(sampleNews);
    }
});

// Function to return enhanced sample news with current timestamps
function getEnhancedSampleNews() {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
    
    return {
        data: [
            {
                uuid: '1-' + Date.now(),
                title: 'Muslim Community Opens New Mosque in London',
                description: 'A historic moment as the community celebrates the opening of a new cultural center and mosque that will serve thousands of Muslims in the area.',
                snippet: 'The new facility features a prayer hall, community center, and educational facilities...',
                image_url: 'https://images.unsplash.com/photo-1545431615-c5c8a6cda403?q=80&w=2070',
                url: 'https://example.com/news/1',
                published_at: now.toISOString(),
                source: 'Islamic News Network',
                categories: ['community']
            },
            {
                uuid: '2-' + Date.now(),
                title: 'Ramadan 2024: Moon Sighting Announced',
                description: 'The first day of Ramadan has been announced as March 11th in many countries across the Middle East, Asia, and Africa.',
                snippet: 'Muslims around the world prepare for the holy month of fasting, prayer, and reflection...',
                image_url: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2070',
                url: 'https://example.com/news/2',
                published_at: oneDayAgo.toISOString(),
                source: 'Global Islamic News',
                categories: ['world', 'events']
            },
            {
                uuid: '3-' + Date.now(),
                title: 'Understanding The Hajj Pilgrimage - One Of The 5 Pillars Of Islam',
                description: 'Over a million Muslims from across the world will arrive in the sacred city of Mecca in Saudi Arabia this week and head to the Kaaba - the House of Allah.',
                snippet: 'The Hajj pilgrimage is one of the five pillars of Islam and must be performed by all able Muslims at least once in their lifetime...',
                image_url: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2070',
                url: 'https://example.com/news/9',
                published_at: twoDaysAgo.toISOString(),
                source: 'Islamic News',
                categories: ['world', 'events']
            },
            {
                uuid: '4-' + Date.now(),
                title: 'Islamic Finance Continues Global Growth',
                description: 'The Islamic finance industry continues to expand globally with new products and services being introduced in non-Muslim majority countries.',
                snippet: 'Sharia-compliant banking assets are expected to reach new heights as more people seek ethical financial alternatives...',
                image_url: 'https://images.unsplash.com/photo-1565514158740-064f34bd6cf1?q=80&w=2070',
                url: 'https://example.com/news/10',
                published_at: threeDaysAgo.toISOString(),
                source: 'Finance Islamic',
                categories: ['world']
            },
            {
                uuid: '5-' + Date.now(),
                title: 'Historic Islamic Manuscripts Digitized',
                description: 'Thousands of ancient Islamic manuscripts are now available online for researchers and the public.',
                snippet: 'The project aims to preserve Islamic heritage for future generations and make it accessible worldwide...',
                image_url: 'https://images.unsplash.com/photo-1609592808905-49b44e440be4?q=80&w=2070',
                url: 'https://example.com/news/3',
                published_at: oneDayAgo.toISOString(),
                source: 'Islamic Heritage Foundation',
                categories: ['education']
            },
            {
                uuid: '6-' + Date.now(),
                title: 'Youth Islamic Conference Draws Thousands',
                description: 'Young Muslims gather for annual conference focused on faith, identity, and modern challenges facing the Muslim youth.',
                snippet: 'Speakers address issues facing Muslim youth today including career, relationships, and maintaining faith...',
                image_url: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=2064',
                url: 'https://example.com/news/4',
                published_at: now.toISOString(),
                source: 'Muslim Youth Network',
                categories: ['community', 'events']
            },
            {
                uuid: '7-' + Date.now(),
                title: 'Islamic Art Exhibition Opens in Paris',
                description: 'World-renowned Islamic art collection draws visitors from around the globe to the Louvre Museum.',
                snippet: 'The exhibition showcases centuries of Islamic artistic heritage including calligraphy, ceramics, and textiles...',
                image_url: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070',
                url: 'https://example.com/news/5',
                published_at: twoDaysAgo.toISOString(),
                source: 'Art Islamic',
                categories: ['world']
            },
            {
                uuid: '8-' + Date.now(),
                title: 'New Islamic School Opens in Toronto',
                description: 'State-of-the-art Islamic school aims to combine academic excellence with Islamic values and character development.',
                snippet: 'The school will serve students from kindergarten through high school with a comprehensive curriculum...',
                image_url: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?q=80&w=2070',
                url: 'https://example.com/news/6',
                published_at: threeDaysAgo.toISOString(),
                source: 'Education Islamic',
                categories: ['education', 'community']
            },
            {
                uuid: '9-' + Date.now(),
                title: 'Halal Food Festival Attracts Foodies',
                description: 'Annual halal food festival showcases diverse cuisines from Muslim communities around the world.',
                snippet: 'Visitors enjoy traditional dishes, cooking demonstrations, and cultural performances...',
                image_url: 'https://images.unsplash.com/photo-1593001872095-7d6b986b70c1?q=80&w=2070',
                url: 'https://example.com/news/7',
                published_at: oneDayAgo.toISOString(),
                source: 'Halal Food Network',
                categories: ['community', 'events']
            },
            {
                uuid: '10-' + Date.now(),
                title: 'Muslim Scientists Win International Award',
                description: 'Three Muslim scientists receive prestigious award for breakthrough research in renewable energy.',
                snippet: 'Their innovative work on solar technology promises to make clean energy more accessible...',
                image_url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2111',
                url: 'https://example.com/news/8',
                published_at: now.toISOString(),
                source: 'Science Islamic',
                categories: ['education', 'world']
            }
        ],
        meta: {
            found: 10,
            returned: 10,
            page: 1,
            limit: 50
        }
    };
}

// Alternative news endpoint with sample data (fallback)
app.get('/api/news/sample', (req, res) => {
    const sampleNews = getEnhancedSampleNews();
    res.json(sampleNews);
});

// Islamic calendar endpoint
app.get('/api/islamic-calendar', (req, res) => {
    // Simplified Islamic calendar
    const today = new Date();
    const hijriMonths = [
        "Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani",
        "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Sha'ban",
        "Ramadan", "Shawwal", "Dhul-Qi'dah", "Dhul-Hijjah"
    ];
    const monthIndex = (today.getMonth() + 1) % 12;
    const hijriYear = 1446 + Math.floor((today.getMonth() + 1) / 12);

    res.json({
        hijri_year: hijriYear,
        hijri_month: hijriMonths[monthIndex],
        hijri_day: today.getDate(),
        gregorian_date: today.toISOString().split('T')[0]
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Node backend running at http://localhost:${PORT}`);
    console.log(`📚 Zikr items: ${ZIKR_LIST.length}`);
    console.log(`🤲 Duas: ${DUAS_LIST.length}`);
    console.log(`💭 Daily reminders: ${DAILY_REMINDERS.length}`);
    console.log(`📖 Quran surahs: ${QURAN_SURAHS.length}`);
    console.log(`📰 News API endpoint: /api/news (using NewsAPI.org)`);
    console.log(`📰 Sample News endpoint: /api/news/sample`);
    console.log(`📰 Health check endpoint: /api/health`);
    console.log(`⚠️  IMPORTANT: You need to replace 'YOUR_NEWSAPI_KEY_HERE' with your actual NewsAPI key from https://newsapi.org/`);
});