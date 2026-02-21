// IslamicApp.jsx - Updated version with News/Reels section instead of Calendar
import React, { useState, useEffect } from 'react';
import './IslamicApp.css';
import {
  Moon, Sun, Compass, Calendar, BookOpen, Clock, Heart, MapPin,
  Home, Coffee, Moon as MoonIcon, Cloud, Sun as SunIcon, Sunset,
  Book, Star, Users, Globe, Leaf, Smile, Wind, Shield,
  Sparkles, Heart as HeartIcon, Battery, Activity, Music,
  Award, Zap, Gift, Pen, Coffee as CoffeeIcon, Search,
  Menu, X, ChevronRight, Quote, Volume2, VolumeX,
  Bell, Settings, User, Download, Share2, Bookmark,
  Image, Camera, Film, ArrowLeft, Info, Phone,
  MessageCircle, ThumbsUp, ThumbsDown, Meh, Frown,
  Smile as SmileIcon, AlertCircle, Sun as SunLight,
  CloudRain, CloudSnow, CloudLightning, CloudDrizzle,
  Wind as WindIcon, Umbrella, Droplet, Thermometer,
  Sunrise, Sunset as SunsetIcon, Star as StarIcon,
  Award as AwardIcon, Gift as GiftIcon, Zap as ZapIcon,
  Heart as HeartIcon2, Users as UsersIcon, Shield as ShieldIcon,
  Globe as GlobeIcon, Leaf as LeafIcon, Coffee as CoffeeIcon2,
  Book as BookIcon, Music as MusicIcon, Pen as PenIcon,
  Sparkles as SparklesIcon, Battery as BatteryIcon,
  Activity as ActivityIcon, Camera as CameraIcon,
  Film as FilmIcon, Download as DownloadIcon,
  Share as ShareIcon, User as UserIcon, Settings as SettingsIcon,
  Bell as BellIcon, MapPin as MapPinIcon, Compass as CompassIcon,
  Calendar as CalendarIcon, Clock as ClockIcon,
  BookOpen as BookOpenIcon, Moon as MoonIcon2,
  Crown, Gem, Sparkle, Infinity, Wind as WindIcon2,
  Scale, Sword, Eye, EyeOff, Anchor, Feather, List, Grid,
  Newspaper, TrendingUp, ExternalLink, ThumbsUp as ThumbsUpIcon,
  MessageSquare, Share as ShareIcon2, Play, Pause,
  Volume2 as Volume2Icon, VolumeX as VolumeXIcon,
  ChevronLeft, ChevronRight as ChevronRightIcon
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

// Enhanced image database with premium Islamic images
const images = {
  backgrounds: {
    geometricGold: 'https://images.unsplash.com/photo-1609592808905-49b44e440be4?q=80&w=2070',
    greenMosque: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=2064',
    blueMosque: 'https://images.unsplash.com/photo-1545431615-c5c8a6cda403?q=80&w=2070',
    kaaba: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2070',
    madina: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2070',
    quran: 'https://images.unsplash.com/photo-1609592808905-49b44e440be4?q=80&w=2070',
    prayer: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=2064',
    hands: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2070',
    stars: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2111',
    moon: 'https://images.unsplash.com/photo-1532767153582-b2a7e6c4242b?q=80&w=2070',
    sunset: 'https://images.unsplash.com/photo-1507525425510-56f92e5e7a2a?q=80&w=2073',
    sunrise: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2132',
    water: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2070',
    desert: 'https://images.unsplash.com/photo-1682686580024-580519d4b2d2?q=80&w=2070',
    olives: 'https://images.unsplash.com/photo-1593001872095-7d6b986b70c1?q=80&w=2070',
    dates: 'https://images.unsplash.com/photo-1593001872095-7d6b986b70c1?q=80&w=2070',
    peace: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2070',
    calm: 'https://images.unsplash.com/photo-1507525425510-56f92e5e7a2a?q=80&w=2073',
    hope: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2132',
    strength: 'https://images.unsplash.com/photo-1682686580024-580519d4b2d2?q=80&w=2070',
    gratitude: 'https://images.unsplash.com/photo-1593001872095-7d6b986b70c1?q=80&w=2070',
    rain: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=2080',
    tasbih: 'https://images.unsplash.com/photo-1593001872095-7d6b986b70c1?q=80&w=2070',
    // Premium background additions
    premiumGold: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070',
    premiumGreen: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?q=80&w=2070',
    premiumBlue: 'https://images.unsplash.com/photo-1513002749550-c59d786f8e6c?q=80&w=2070',
    premiumPurple: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2070',
    premiumTeal: 'https://images.unsplash.com/photo-1528459801415-a9e53c3f2b6b?q=80&w=2070',
    arabesque: 'https://images.unsplash.com/photo-1609592808905-49b44e440be4?q=80&w=2070',
    calligraphy: 'https://images.unsplash.com/photo-1585036156171-384164a8c9a8?q=80&w=2070',
    pattern: 'https://images.unsplash.com/photo-1609592808905-49b44e440be4?q=80&w=2070',
    dome: 'https://images.unsplash.com/photo-1545431615-c5c8a6cda403?q=80&w=2070',
    minaret: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=2064',
    // News backgrounds
    newsDefault: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070',
    newsWorld: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072',
    newsCommunity: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2069',
    newsEvents: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070'
  }
};

// Categorized 99 Names of Allah
const namesCategories = [
  {
    id: 'greatest',
    title: '🌟 Greatest Names',
    description: 'The most comprehensive and greatest Names of Allah',
    icon: 'Crown',
    color: 'linear-gradient(135deg, #FFD700, #FFA500)',
    names: [
      { number: 1, name: "اللَّهُ", transliteration: "Allah", meaning: "The Greatest Name", description: "The proper name of God, encompassing all His attributes" },
      { number: 2, name: "الرَّحْمَنُ", transliteration: "Ar-Rahman", meaning: "The Most Compassionate", description: "The One who showers mercy upon all creation" },
      { number: 3, name: "الرَّحِيمُ", transliteration: "Ar-Rahim", meaning: "The Most Merciful", description: "The One who bestows mercy specifically on the believers" },
      { number: 4, name: "الْحَيُّ", transliteration: "Al-Hayy", meaning: "The Ever-Living", description: "The One who is eternally alive without beginning or end" },
      { number: 5, name: "الْقَيُّومُ", transliteration: "Al-Qayyum", meaning: "The Self-Subsisting", description: "The One who sustains all existence" },
      { number: 6, name: "الْأَحَدُ", transliteration: "Al-Ahad", meaning: "The One", description: "The One who is indivisible and unique in His essence" },
      { number: 7, name: "الصَّمَدُ", transliteration: "As-Samad", meaning: "The Self-Sufficient", description: "The Eternal Refuge upon whom all depend" },
      { number: 8, name: "الْأَوَّلُ", transliteration: "Al-Awwal", meaning: "The First", description: "The One who is before all things" },
      { number: 9, name: "الْآخِرُ", transliteration: "Al-Akhir", meaning: "The Last", description: "The One who remains after all things cease" },
      { number: 10, name: "الظَّاهِرُ", transliteration: "Az-Zahir", meaning: "The Manifest", description: "The One whose existence is evident through His creation" },
      { number: 11, name: "الْبَاطِنُ", transliteration: "Al-Batin", meaning: "The Hidden", description: "The One who is hidden from physical perception" }
    ]
  },
  {
    id: 'response',
    title: '🤲 Names With Which When We Ask, Allah Responds',
    description: 'Powerful Names for supplication, reported in authentic narrations',
    icon: 'Gem',
    color: 'linear-gradient(135deg, #2196F3, #1976D2)',
    names: [
      { number: 12, name: "الْوَاحِدُ", transliteration: "Al-Wahid", meaning: "The Unique", description: "The One who is unparalleled in His essence and attributes" },
      { number: 13, name: "الْقَادِرُ", transliteration: "Al-Qadir", meaning: "The All-Powerful", description: "The One who has power over all things" },
      { number: 14, name: "الْمُقْتَدِرُ", transliteration: "Al-Muqtadir", meaning: "The Determiner", description: "The One who determines all affairs with perfect power" },
      { number: 15, name: "الْكَرِيمُ", transliteration: "Al-Karim", meaning: "The Most Generous", description: "The One whose generosity knows no bounds" },
      { number: 16, name: "الْجَوَادُ", transliteration: "Al-Jawad", meaning: "The Most Giving", description: "The One who gives freely and continuously" },
      { number: 17, name: "السَّمِيعُ", transliteration: "As-Sami", meaning: "The All-Hearing", description: "The One who hears all sounds and whispers" },
      { number: 18, name: "الْبَصِيرُ", transliteration: "Al-Basir", meaning: "The All-Seeing", description: "The One who sees all things, hidden and apparent" },
      { number: 19, name: "الْمُجِيبُ", transliteration: "Al-Mujib", meaning: "The Responsive", description: "The One who answers the prayers of those who call upon Him" },
      { number: 20, name: "الْوَهَّابُ", transliteration: "Al-Wahhab", meaning: "The Bestower", description: "The One who gives generously without expecting return" },
      { number: 21, name: "الرَّزَّاقُ", transliteration: "Ar-Razzaq", meaning: "The Provider", description: "The One who provides sustenance for all creation" }
    ]
  },
  {
    id: 'love',
    title: '❤️ Love & Respect',
    description: 'Names that inspire deep love, hope, and reverence',
    icon: 'Heart',
    color: 'linear-gradient(135deg, #E91E63, #C2185B)',
    names: [
      { number: 22, name: "الْغَفَّارُ", transliteration: "Al-Ghaffar", meaning: "The Constant Forgiver", description: "The One who repeatedly forgives sins" },
      { number: 23, name: "الْغَفُورُ", transliteration: "Al-Ghafur", meaning: "The All-Forgiving", description: "The One whose forgiveness encompasses all" },
      { number: 24, name: "التَّوَّابُ", transliteration: "At-Tawwab", meaning: "The Accepter of Repentance", description: "The One who accepts repentance and returns to forgiving" },
      { number: 25, name: "الْعَفُوُّ", transliteration: "Al-Afuww", meaning: "The Pardoner", description: "The One who erases sins completely" },
      { number: 26, name: "اللَّطِيفُ", transliteration: "Al-Latif", meaning: "The Subtle, Gentle", description: "The One who is kind and gentle to His servants" },
      { number: 27, name: "الشَّكُورُ", transliteration: "Ash-Shakur", meaning: "The Appreciative", description: "The One who rewards gratitude abundantly" },
      { number: 28, name: "الْوَدُودُ", transliteration: "Al-Wadud", meaning: "The Most Loving", description: "The One who loves His believers and is beloved to them" },
      { number: 29, name: "الرَّؤُوفُ", transliteration: "Ar-Ra'uf", meaning: "The Most Kind", description: "The One who is extremely compassionate and kind" },
      { number: 30, name: "الْبَرُّ", transliteration: "Al-Barr", meaning: "The Source of Goodness", description: "The One who is infinitely good and kind" },
      { number: 31, name: "السَّلَامُ", transliteration: "As-Salam", meaning: "The Source of Peace", description: "The One who gives peace and security" }
    ]
  },
  {
    id: 'greatness',
    title: '👑 Greatness (Awe & Glorification)',
    description: 'Names that inspire awe, glorification, and humility',
    icon: 'Crown',
    color: 'linear-gradient(135deg, #9C27B0, #6A1B9A)',
    names: [
      { number: 32, name: "الْمَلِكُ", transliteration: "Al-Malik", meaning: "The King", description: "The Sovereign Lord, the Absolute Ruler" },
      { number: 33, name: "الْقُدُّوسُ", transliteration: "Al-Quddus", meaning: "The Most Holy", description: "The One who is pure from any imperfection" },
      { number: 34, name: "الْعَزِيزُ", transliteration: "Al-Aziz", meaning: "The Almighty", description: "The One who is powerful and invincible" },
      { number: 35, name: "الْجَبَّارُ", transliteration: "Al-Jabbar", meaning: "The Compeller", description: "The One who compels and restores" },
      { number: 36, name: "الْمُتَكَبِّرُ", transliteration: "Al-Mutakabbir", meaning: "The Supreme", description: "The One who is majestic and superior" },
      { number: 37, name: "الْخَالِقُ", transliteration: "Al-Khaliq", meaning: "The Creator", description: "The One who creates everything from nothing" },
      { number: 38, name: "الْبَارِئُ", transliteration: "Al-Bari", meaning: "The Evolver", description: "The One who creates with perfect order" },
      { number: 39, name: "الْمُصَوِّرُ", transliteration: "Al-Musawwir", meaning: "The Fashioner", description: "The One who gives form and shape" },
      { number: 40, name: "الْعَلِيُّ", transliteration: "Al-Ali", meaning: "The Most High", description: "The One who is exalted above all" },
      { number: 41, name: "الْعَظِيمُ", transliteration: "Al-Azim", meaning: "The Magnificent", description: "The One who is supremely great" },
      { number: 42, name: "الْكَبِيرُ", transliteration: "Al-Kabir", meaning: "The Most Great", description: "The One who is the greatest" },
      { number: 43, name: "الْجَلِيلُ", transliteration: "Al-Jalil", meaning: "The Majestic", description: "The One who is majestic and glorious" },
      { number: 44, name: "الْمَجِيدُ", transliteration: "Al-Majid", meaning: "The Most Glorious", description: "The One who is infinitely glorious" },
      { number: 45, name: "الْحَمِيدُ", transliteration: "Al-Hamid", meaning: "The Praiseworthy", description: "The One who is worthy of all praise" },
      { number: 46, name: "ذُو الْجَلَالِ وَالْإِكْرَامِ", transliteration: "Dhul-Jalali wal-Ikram", meaning: "Lord of Majesty and Honor", description: "The One who possesses majesty and generosity" }
    ]
  },
  {
    id: 'patience',
    title: '🌿 Patience & Gratitude',
    description: 'Names that inspire patience, trust, contentment, and thankfulness',
    icon: 'Leaf',
    color: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
    names: [
      { number: 47, name: "الْحَكِيمُ", transliteration: "Al-Hakim", meaning: "The Most Wise", description: "The One who is perfectly wise in all His actions" },
      { number: 48, name: "الْعَلِيمُ", transliteration: "Al-Alim", meaning: "The All-Knowing", description: "The One who knows everything" },
      { number: 49, name: "الْخَبِيرُ", transliteration: "Al-Khabir", meaning: "The All-Aware", description: "The One who is aware of all secrets" },
      { number: 50, name: "الْحَلِيمُ", transliteration: "Al-Halim", meaning: "The Most Forbearing", description: "The One who is patient and clement" },
      { number: 51, name: "الصَّبُورُ", transliteration: "As-Sabur", meaning: "The Most Patient", description: "The One who is infinitely patient" },
      { number: 52, name: "الْحَسِيبُ", transliteration: "Al-Hasib", meaning: "The Reckoner", description: "The One who takes account of all" },
      { number: 53, name: "الْوَكِيلُ", transliteration: "Al-Wakil", meaning: "The Trustee", description: "The One who is relied upon for all affairs" },
      { number: 54, name: "الْمُؤْمِنُ", transliteration: "Al-Mu'min", meaning: "The Giver of Security", description: "The One who grants security and faith" },
      { number: 55, name: "الْحَفِيظُ", transliteration: "Al-Hafiz", meaning: "The Preserver", description: "The One who preserves and protects all" },
      { number: 56, name: "الْمُقِيتُ", transliteration: "Al-Muqit", meaning: "The Sustainer", description: "The One who provides sustenance" },
      { number: 57, name: "الْقَابِضُ", transliteration: "Al-Qabid", meaning: "The Withholder", description: "The One who constricts and withholds" },
      { number: 58, name: "الْبَاسِطُ", transliteration: "Al-Basit", meaning: "The Expander", description: "The One who expands and enlarges" },
      { number: 59, name: "الرَّافِعُ", transliteration: "Ar-Rafi", meaning: "The Exalter", description: "The One who raises and elevates" },
      { number: 60, name: "الْخَافِضُ", transliteration: "Al-Khafid", meaning: "The Abaser", description: "The One who lowers and humbles" }
    ]
  },
  {
    id: 'fear',
    title: '⚖️ Fear (Accountability & Justice)',
    description: 'Names that inspire accountability, caution, and righteous fear',
    icon: 'Scale',
    color: 'linear-gradient(135deg, #FF5722, #E64A19)',
    names: [
      { number: 61, name: "الْعَدْلُ", transliteration: "Al-Adl", meaning: "The Most Just", description: "The One who is perfectly just" },
      { number: 62, name: "الْحَكَمُ", transliteration: "Al-Hakam", meaning: "The Judge", description: "The One who judges with justice" },
      { number: 63, name: "الْمُنْتَقِمُ", transliteration: "Al-Muntaqim", meaning: "The Avenger", description: "The One who punishes wrongdoers" },
      { number: 64, name: "الْقَهَّارُ", transliteration: "Al-Qahhar", meaning: "The Subduer", description: "The One who dominates and subdues" },
      { number: 65, name: "الْجَامِعُ", transliteration: "Al-Jami", meaning: "The Gatherer", description: "The One who gathers all on Judgment Day" },
      { number: 66, name: "مَالِكُ الْمُلْكِ", transliteration: "Malik-ul-Mulk", meaning: "Owner of Dominion", description: "The One who owns all sovereignty" },
      { number: 67, name: "الْمُقْسِطُ", transliteration: "Al-Muqsit", meaning: "The Equitable", description: "The One who is just in all matters" },
      { number: 68, name: "الْوَالِي", transliteration: "Al-Wali", meaning: "The Governor", description: "The One who governs all affairs" },
      { number: 69, name: "الْمَتِينُ", transliteration: "Al-Matin", meaning: "The Firm", description: "The One who is firm and strong" },
      { number: 70, name: "الْقَوِيُّ", transliteration: "Al-Qawiyy", meaning: "The Most Strong", description: "The One who is all-powerful" },
      { number: 71, name: "الْمُعِزُّ", transliteration: "Al-Mu'izz", meaning: "The Giver of Honor", description: "The One who gives honor" },
      { number: 72, name: "الْمُذِلُّ", transliteration: "Al-Mudhill", meaning: "The Giver of Dishonor", description: "The One who humiliates" },
      { number: 73, name: "الْبَاقِي", transliteration: "Al-Baqi", meaning: "The Everlasting", description: "The One who remains forever" },
      { number: 74, name: "الْوَارِثُ", transliteration: "Al-Warith", meaning: "The Inheritor", description: "The One who inherits all" },
      { number: 75, name: "الرَّقِيبُ", transliteration: "Ar-Raqib", meaning: "The Watchful", description: "The One who watches over all" },
      { number: 76, name: "الشَّهِيدُ", transliteration: "Ash-Shahid", meaning: "The Witness", description: "The One who witnesses all" },
      { number: 77, name: "الْفَتَّاحُ", transliteration: "Al-Fattah", meaning: "The Opener", description: "The One who opens doors of mercy" },
      { number: 78, name: "النُّورُ", transliteration: "An-Nur", meaning: "The Light", description: "The One who is light" },
      { number: 79, name: "الْهَادِي", transliteration: "Al-Hadi", meaning: "The Guide", description: "The One who guides" },
      { number: 80, name: "الْبَدِيعُ", transliteration: "Al-Badi", meaning: "The Originator", description: "The One who creates without precedent" },
      { number: 81, name: "الْبَاعِثُ", transliteration: "Al-Ba'ith", meaning: "The Resurrector", description: "The One who raises the dead" },
      { number: 82, name: "الْمُحْيِي", transliteration: "Al-Muhyi", meaning: "The Giver of Life", description: "The One who gives life" },
      { number: 83, name: "الْمُمِيتُ", transliteration: "Al-Mumit", meaning: "The Giver of Death", description: "The One who causes death" },
      { number: 84, name: "الْوَاجِدُ", transliteration: "Al-Wajid", meaning: "The Perceiver", description: "The One who finds all" },
      { number: 85, name: "الْأَحَدُ", transliteration: "Al-Ahad", meaning: "The One", description: "The One who is unique" },
      { number: 86, name: "الصَّمَدُ", transliteration: "As-Samad", meaning: "The Eternal Refuge", description: "The One who is sought for all needs" },
      { number: 87, name: "الْمُؤَخِّرُ", transliteration: "Al-Mu'akhkhir", meaning: "The Delayer", description: "The One who puts back" },
      { number: 88, name: "الْمُقَدِّمُ", transliteration: "Al-Muqaddim", meaning: "The Expediter", description: "The One who brings forward" },
      { number: 89, name: "الْمُغْنِي", transliteration: "Al-Mughni", meaning: "The Enricher", description: "The One who enriches" },
      { number: 90, name: "الْمَانِعُ", transliteration: "Al-Mani", meaning: "The Preventer", description: "The One who withholds" },
      { number: 91, name: "الضَّارُّ", transliteration: "Ad-Darr", meaning: "The Distresser", description: "The One who causes harm" },
      { number: 92, name: "النَّافِعُ", transliteration: "An-Nafi", meaning: "The Benefactor", description: "The One who brings benefit" },
      { number: 93, name: "الْغَنِيُّ", transliteration: "Al-Ghani", meaning: "The Self-Sufficient", description: "The One who is free of all needs" },
      { number: 94, name: "الْحَقُّ", transliteration: "Al-Haqq", meaning: "The Truth", description: "The One who is the ultimate truth" },
      { number: 95, name: "الْوَلِيُّ", transliteration: "Al-Waliyy", meaning: "The Protecting Ally", description: "The One who is the protector" },
      { number: 96, name: "الرَّشِيدُ", transliteration: "Ar-Rashid", meaning: "The Guide to Right Path", description: "The One who guides rightly" },
      { number: 97, name: "الْجَامِعُ", transliteration: "Al-Jami", meaning: "The Gatherer", description: "The One who gathers all" }
    ]
  }
];

// All names flattened for search functionality
const allNames = namesCategories.flatMap(category =>
  category.names.map(name => ({ ...name, category: category.id }))
);

// Quran Surahs list from Fawazahmed0 API
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

// Comprehensive Emotions Data with Quranic Verses, Hadith, and Duas
const emotionsData = {
  happy: {
    id: 'happy',
    name: 'Happy',
    icon: '😊',
    color: '#FFD700',
    gradient: 'linear-gradient(135deg, #FFD700, #FFA500)',
    image: images.backgrounds.sunrise,
    description: 'When you feel joy and happiness, remember to thank Allah',
    verses: [
      {
        id: 'happy-v1',
        arabic: 'قُلْ بِفَضْلِ اللَّهِ وَبِرَحْمَتِهِ فَبِذَٰلِكَ فَلْيَفْرَحُوا هُوَ خَيْرٌ مِّمَّا يَجْمَعُونَ',
        translation: 'Say: "In the bounty of Allah and in His mercy - in that let them rejoice; it is better than what they accumulate"',
        surah: 'Yunus (10:58)'
      },
      {
        id: 'happy-v2',
        arabic: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
        translation: 'And of His signs is that He created for you from yourselves mates that you may find tranquility in them, and He placed between you affection and mercy',
        surah: 'Ar-Rum (30:21)'
      },
      {
        id: 'happy-v3',
        arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
        translation: 'Our Lord, give us in this world good and in the Hereafter good and protect us from the punishment of the Fire',
        surah: 'Al-Baqarah (2:201)'
      },
      {
        id: 'happy-v4',
        arabic: 'إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ كَانَتْ لَهُمْ جَنَّاتُ الْفِرْدَوْسِ نُزُلًا',
        translation: 'Indeed, those who have believed and done righteous deeds - they will have the Gardens of Paradise as a lodging',
        surah: 'Al-Kahf (18:107)'
      },
      {
        id: 'happy-v5',
        arabic: 'وَالَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ لَنُبَوِّئَنَّهُم مِّنَ الْجَنَّةِ غُرَفًا تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ خَالِدِينَ فِيهَا',
        translation: 'But those who have believed and done righteous deeds - We will surely assign to them of Paradise [elevated] chambers beneath which rivers flow, wherein they abide eternally',
        surah: 'Al-Ankabut (29:58)'
      }
    ],
    hadith: [
      {
        id: 'happy-h1',
        text: 'عجباً لأمر المؤمن إن أمره كله له خير، وليس ذلك لأحد إلا للمؤمن: إن أصابته سراء شكر فكان خيراً له، وإن أصابته ضراء صبر فكان خيراً له',
        translation: 'Amazing is the affair of the believer. Verily, all of his affairs are good for him. If something good happens to him, he is grateful and that is good for him. If something bad happens to him, he bears it with patience and that is good for him',
        narrator: 'Muslim'
      },
      {
        id: 'happy-h2',
        text: 'اللهم إني أسألك فعل الخيرات، وترك المنكرات، وحب المساكين، وأن تغفر لي وترحمني',
        translation: 'O Allah, I ask You to enable me to do good deeds, avoid evil deeds, and love the poor, and that You forgive me and have mercy on me',
        narrator: 'Tirmidhi'
      },
      {
        id: 'happy-h3',
        text: 'من قال حين يصبح وحين يمسي: سبحان الله وبحمده مائة مرة، لم يأت أحد يوم القيامة بأفضل مما جاء به إلا أحد قال مثل ما قال أو زاد عليه',
        translation: 'Whoever says, "Subhan Allah wa bihamdihi" one hundred times in the morning and evening, no one will bring anything better than him on the Day of Resurrection except someone who said the same or more',
        narrator: 'Muslim'
      },
      {
        id: 'happy-h4',
        text: 'تبسمك في وجه أخيك صدقة',
        translation: 'Your smiling in your brother\'s face is an act of charity',
        narrator: 'Tirmidhi'
      },
      {
        id: 'happy-h5',
        text: 'من سره أن يبسط له في رزقه، وأن ينسأ له في أثره، فليصل رحمه',
        translation: 'Whoever would like his provision to be increased and his lifespan extended, should maintain family ties',
        narrator: 'Bukhari'
      }
    ],
    duas: [
      {
        id: 'happy-d1',
        arabic: 'الْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ',
        translation: 'All praise is due to Allah by whose favor good deeds are completed',
        reference: 'Abu Dawud'
      },
      {
        id: 'happy-d2',
        arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ فِعْلَ الْخَيْرَاتِ وَتَرْكَ الْمُنْكَرَاتِ',
        translation: 'O Allah, I ask You to enable me to do good deeds and avoid evil deeds',
        reference: 'Tirmidhi'
      },
      {
        id: 'happy-d3',
        arabic: 'رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ',
        translation: 'My Lord, enable me to be grateful for Your favor which You have bestowed upon me',
        reference: 'Quran 46:15'
      }
    ]
  },

  sad: {
    id: 'sad',
    name: 'Sad',
    icon: '😢',
    color: '#87CEEB',
    gradient: 'linear-gradient(135deg, #87CEEB, #4682B4)',
    image: images.backgrounds.rain,
    description: 'When sadness touches your heart, turn to Allah for comfort',
    verses: [
      {
        id: 'sad-v1',
        arabic: 'وَلَنَبْلُوَنَّكُم بِشَيْءٍ مِّنَ الْخَوْفِ وَالْجُوعِ وَنَقْصٍ مِّنَ الْأَمْوَالِ وَالْأَنفُسِ وَالثَّمَرَاتِ ۗ وَبَشِّرِ الصَّابِرِينَ',
        translation: 'And We will surely test you with something of fear and hunger and a loss of wealth and lives and fruits, but give good tidings to the patient',
        surah: 'Al-Baqarah (2:155)'
      },
      {
        id: 'sad-v2',
        arabic: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
        translation: 'Indeed, with hardship comes ease',
        surah: 'Ash-Sharh (94:6)'
      },
      {
        id: 'sad-v3',
        arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا',
        translation: 'For indeed, with hardship comes ease',
        surah: 'Ash-Sharh (94:5)'
      },
      {
        id: 'sad-v4',
        arabic: 'وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ إِن كُنتُم مُّؤْمِنِينَ',
        translation: 'So do not weaken and do not grieve, and you will be superior if you are believers',
        surah: 'Aal-E-Imran (3:139)'
      },
      {
        id: 'sad-v5',
        arabic: 'قُل لَّن يُصِيبَنَا إِلَّا مَا كَتَبَ اللَّهُ لَنَا هُوَ مَوْلَانَا ۚ وَعَلَى اللَّهِ فَلْيَتَوَكَّلِ الْمُؤْمِنُونَ',
        translation: 'Say, "Never will we be struck except by what Allah has decreed for us; He is our protector." And upon Allah let the believers rely',
        surah: 'At-Tawbah (9:51)'
      }
    ],
    hadith: [
      {
        id: 'sad-h1',
        text: 'ما يصيب المسلم من نصب ولا وصب ولا هم ولا حزن ولا أذى ولا غم، حتى الشوكة يشاكها، إلا كفر الله بها من خطاياه',
        translation: 'No fatigue, nor disease, nor sorrow, nor sadness, nor hurt, nor distress befalls a Muslim, even if it were the prick he receives from a thorn, but that Allah expiates some of his sins for that',
        narrator: 'Bukhari'
      },
      {
        id: 'sad-h2',
        text: 'عجبا لأمر المؤمن إن أمره كله خير، وليس ذلك لأحد إلا للمؤمن: إن أصابته سراء شكر فكان خيراً له، وإن أصابته ضراء صبر فكان خيراً له',
        translation: 'Amazing is the affair of the believer. Verily, all of his affairs are good for him. If something good happens to him, he is grateful and that is good for him. If something bad happens to him, he bears it with patience and that is good for him',
        narrator: 'Muslim'
      },
      {
        id: 'sad-h3',
        text: 'اللهم إني أعوذ بك من الهم والحزن، والعجز والكسل، والبخل والجبن، وضلع الدين وغلبة الرجال',
        translation: 'O Allah, I seek refuge in You from anxiety and grief, from incapacity and laziness, from miserliness and cowardice, from the burden of debt and the overpowering of men',
        narrator: 'Bukhari'
      },
      {
        id: 'sad-h4',
        text: 'ما من عبد تصيبه مصيبة فيقول: إنا لله وإنا إليه راجعون، اللهم أجرني في مصيبتي وأخلف لي خيرا منها، إلا آجره الله في مصيبته وأخلف له خيرا منها',
        translation: 'There is no Muslim who is afflicted with a calamity and says what Allah has commanded: "We belong to Allah and to Him we shall return. O Allah, reward me for my affliction and compensate me with something better," but Allah will reward him for his affliction and compensate him with something better',
        narrator: 'Muslim'
      },
      {
        id: 'sad-h5',
        text: 'إن عظم الجزاء مع عظم البلاء، وإن الله إذا أحب قوما ابتلاهم، فمن رضي فله الرضا، ومن سخط فله السخط',
        translation: 'The greatest reward comes with the greatest trial. When Allah loves a people, He tests them. Whoever accepts that wins His pleasure, but whoever complains earns His wrath',
        narrator: 'Tirmidhi'
      }
    ],
    duas: [
      {
        id: 'sad-d1',
        arabic: 'اللَّهُمَّ إِنِّي عَبْدُكَ ابْنُ عَبْدِكَ ابْنُ أَمَتِكَ، نَاصِيَتِي بِيَدِكَ، مَاضٍ فِيَّ حُكْمُكَ، عَدْلٌ فِيَّ قَضَاؤُكَ، أَسْأَلُكَ بِكُلِّ اسْمٍ هُوَ لَكَ سَمَّيْتَ بِهِ نَفْسَكَ أَوْ أَنْزَلْتَهُ فِي كِتَابِكَ أَوْ عَلَّمْتَهُ أَحَدًا مِنْ خَلْقِكَ أَوِ اسْتَأْثَرْتَ بِهِ فِي عِلْمِ الْغَيْبِ عِنْدَكَ أَنْ تَجْعَلَ الْقُرْآنَ رَبِيعَ قَلْبِي وَنُورَ صَدْرِي وَجَلَاءَ حُزْنِي وَذَهَابَ هَمِّي',
        translation: 'O Allah, I am Your servant, son of Your servant, son of Your maidservant. My forelock is in Your hand, Your command over me is forever executed and Your decree over me is just. I ask You by every name belonging to You which You named Yourself with, or revealed in Your Book, or You taught to any of Your creation, or You have preserved in the knowledge of the unseen with You, that You make the Quran the spring of my heart, and the light of my chest, and the banisher of my sadness, and the reliever of my distress',
        reference: 'Ahmad'
      },
      {
        id: 'sad-d2',
        arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ',
        translation: 'O Allah, I seek refuge in You from anxiety and grief',
        reference: 'Bukhari'
      },
      {
        id: 'sad-d3',
        arabic: 'حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
        translation: 'Allah is sufficient for me, there is no god but Him, upon Him I rely, and He is the Lord of the Great Throne',
        reference: 'Quran 9:129'
      }
    ]
  },

  angry: {
    id: 'angry',
    name: 'Angry',
    icon: '😠',
    color: '#FF4444',
    gradient: 'linear-gradient(135deg, #FF4444, #CC0000)',
    image: images.backgrounds.desert,
    description: 'When anger rises, remember the reward of controlling it',
    verses: [
      {
        id: 'angry-v1',
        arabic: 'وَإِذَا مَا غَضِبُوا هُمْ يَغْفِرُونَ',
        translation: 'And when they are angry, they forgive',
        surah: 'Ash-Shura (42:37)'
      },
      {
        id: 'angry-v2',
        arabic: 'وَالْكَاظِمِينَ الْغَيْظَ وَالْعَافِينَ عَنِ النَّاسِ ۗ وَاللَّهُ يُحِبُّ الْمُحْسِنِينَ',
        translation: 'Who repress anger and pardon people - and Allah loves the doers of good',
        surah: 'Aal-E-Imran (3:134)'
      },
      {
        id: 'angry-v3',
        arabic: 'وَلَا تَسْتَوِي الْحَسَنَةُ وَلَا السَّيِّئَةُ ۚ ادْفَعْ بِالَّتِي هِيَ أَحْسَنُ فَإِذَا الَّذِي بَيْنَكَ وَبَيْنَهُ عَدَاوَةٌ كَأَنَّهُ وَلِيٌّ حَمِيمٌ',
        translation: 'And not equal are the good deed and the bad. Repel [evil] with that which is better; and thereupon the one whom between you and him is enmity [will become] as though he was a devoted friend',
        surah: 'Fussilat (41:34)'
      },
      {
        id: 'angry-v4',
        arabic: 'فَاصْفَحِ الصَّفْحَ الْجَمِيلَ',
        translation: 'So pardon with gracious pardon',
        surah: 'Al-Hijr (15:85)'
      },
      {
        id: 'angry-v5',
        arabic: 'وَلَمَن صَبَرَ وَغَفَرَ إِنَّ ذَٰلِكَ لَمِنْ عَزْمِ الْأُمُورِ',
        translation: 'And whoever is patient and forgives - indeed, that is of the matters [requiring] determination',
        surah: 'Ash-Shura (42:43)'
      }
    ],
    hadith: [
      {
        id: 'angry-h1',
        text: 'ليس الشديد بالصرعة، إنما الشديد الذي يملك نفسه عند الغضب',
        translation: 'The strong man is not the one who can overpower others, but the one who controls himself when angry',
        narrator: 'Bukhari & Muslim'
      },
      {
        id: 'angry-h2',
        text: 'إذا غضب أحدكم وهو قائم فليجلس، فإن ذهب عنه الغضب وإلا فليضطجع',
        translation: 'If one of you gets angry while standing, let him sit down. If the anger leaves him, well and good; otherwise, let him lie down',
        narrator: 'Abu Dawud'
      },
      {
        id: 'angry-h3',
        text: 'ما من جرعة أعظم أجرا عند الله من جرعة غيظ كظمها عبد ابتغاء وجه الله',
        translation: 'There is no sip more greatly rewarded by Allah than a sip of anger that a man swallows, seeking the pleasure of Allah',
        narrator: 'Ibn Majah'
      },
      {
        id: 'angry-h4',
        text: 'لا تغضب ولك الجنة',
        translation: 'Do not get angry, and Paradise will be yours',
        narrator: 'Tabarani'
      },
      {
        id: 'angry-h5',
        text: 'ألا أخبركم بأفضل أخلاق أهل الدنيا والآخرة؟ أن تصل من قطعك، وتعطي من حرمك، وتعفو عمن ظلمك',
        translation: 'Shall I not inform you of the best character of the people of this world and the Hereafter? It is to maintain ties with those who cut you off, to give to those who deprive you, and to forgive those who wrong you',
        narrator: 'Bazzar'
      }
    ],
    duas: [
      {
        id: 'angry-d1',
        arabic: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
        translation: 'I seek refuge with Allah from the accursed devil',
        reference: 'Bukhari & Muslim'
      },
      {
        id: 'angry-d2',
        arabic: 'اللَّهُمَّ اغْفِرْ لِي ذَنْبِي، وَأَذْهِبْ غَيْظَ قَلْبِي، وَأَجِرْنِي مِنَ الشَّيْطَانِ',
        translation: 'O Allah, forgive my sin, remove the anger from my heart, and protect me from the devil',
        reference: 'Abu Dawud'
      },
      {
        id: 'angry-d3',
        arabic: 'رَبِّ أَعُوذُ بِكَ مِنْ هَمَزَاتِ الشَّيَاطِينِ وَأَعُوذُ بِكَ رَبِّ أَن يَحْضُرُونِ',
        translation: 'My Lord, I seek refuge in You from the incitements of the devils, and I seek refuge in You, my Lord, lest they be present with me',
        reference: 'Quran 23:97-98'
      }
    ]
  },

  anxious: {
    id: 'anxious',
    name: 'Anxious',
    icon: '😰',
    color: '#FFA500',
    gradient: 'linear-gradient(135deg, #FFA500, #FF8C00)',
    image: images.backgrounds.stars,
    description: 'When anxiety overwhelms you, find peace in remembrance',
    verses: [
      {
        id: 'anxious-v1',
        arabic: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
        translation: 'Verily, in the remembrance of Allah do hearts find rest',
        surah: 'Ar-Rad (13:28)'
      },
      {
        id: 'anxious-v2',
        arabic: 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ',
        translation: 'And whoever relies upon Allah - then He is sufficient for him',
        surah: 'At-Talaq (65:3)'
      },
      {
        id: 'anxious-v3',
        arabic: 'لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا',
        translation: 'Do not grieve; indeed Allah is with us',
        surah: 'At-Tawbah (9:40)'
      },
      {
        id: 'anxious-v4',
        arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا إِنَّ مَعَ الْعُسْرِ يُسْرًا',
        translation: 'For indeed, with hardship comes ease. Indeed, with hardship comes ease',
        surah: 'Ash-Sharh (94:5-6)'
      },
      {
        id: 'anxious-v5',
        arabic: 'الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ',
        translation: 'Those who have believed and whose hearts are assured by the remembrance of Allah',
        surah: 'Ar-Rad (13:28)'
      }
    ],
    hadith: [
      {
        id: 'anxious-h1',
        text: 'ما قال عبد قط إذا أصابه هم أو حزن: اللهم إني عبدك ابن عبدك ابن أمتك، ناصيتي بيدك، ماض في حكمك، عدل في قضاؤك، أسألك بكل اسم هو لك سميت به نفسك، أو أنزلته في كتابك، أو علمته أحداً من خلقك، أو استأثرت به في علم الغيب عندك، أن تجعل القرآن العظيم ربيع قلبي، ونور صدري، وجلاء حزني، وذهاب همي، إلا أذهب الله همه وحزنه وأبدله مكانه فرحاً',
        translation: 'There is no one who says when anxiety or grief befalls him: "O Allah, I am Your servant, son of Your servant, son of Your maidservant. My forelock is in Your hand, Your command over me is forever executed and Your decree over me is just. I ask You by every name belonging to You which You named Yourself with, or revealed in Your Book, or You taught to any of Your creation, or You have preserved in the knowledge of the unseen with You, that You make the Quran the spring of my heart, and the light of my chest, and the banisher of my sadness, and the reliever of my distress," but Allah will remove his anxiety and grief and replace it with joy',
        narrator: 'Ahmad'
      },
      {
        id: 'anxious-h2',
        text: 'اللهم إني أعوذ بك من الهم والحزن',
        translation: 'O Allah, I seek refuge in You from anxiety and grief',
        narrator: 'Bukhari'
      },
      {
        id: 'anxious-h3',
        text: 'عجبا لأمر المؤمن إن أمره كله خير',
        translation: 'Amazing is the affair of the believer, all of it is good',
        narrator: 'Muslim'
      },
      {
        id: 'anxious-h4',
        text: 'لا يزال لسانك رطباً من ذكر الله',
        translation: 'Let your tongue be always moist with the remembrance of Allah',
        narrator: 'Tirmidhi'
      },
      {
        id: 'anxious-h5',
        text: 'من لزم الاستغفار جعل الله له من كل هم فرجا، ومن كل ضيق مخرجا، ورزقه من حيث لا يحتسب',
        translation: 'Whoever persists in seeking forgiveness, Allah will grant him relief from every worry, a way out from every hardship, and provide for him from where he does not expect',
        narrator: 'Abu Dawud'
      }
    ],
    duas: [
      {
        id: 'anxious-d1',
        arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ',
        translation: 'O Allah, I seek refuge in You from anxiety and grief, from incapacity and laziness, from miserliness and cowardice, from the burden of debt and the overpowering of men',
        reference: 'Bukhari'
      },
      {
        id: 'anxious-d2',
        arabic: 'حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
        translation: 'Allah is sufficient for me, there is no god but Him, upon Him I rely, and He is the Lord of the Great Throne',
        reference: 'Quran 9:129'
      },
      {
        id: 'anxious-d3',
        arabic: 'اللَّهُمَّ رَحْمَتَكَ أَرْجُو فَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ، وَأَصْلِحْ لِي شَأْنِي كُلَّهُ، لَا إِلَهَ إِلَّا أَنْتَ',
        translation: 'O Allah, I hope for Your mercy, so do not leave me to myself for the blink of an eye. Rectify all of my affairs. There is no god but You',
        reference: 'Abu Dawud'
      }
    ]
  },

  grateful: {
    id: 'grateful',
    name: 'Grateful',
    icon: '🤲',
    color: '#4CAF50',
    gradient: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
    image: images.backgrounds.olives,
    description: 'Gratitude increases blessings and brings you closer to Allah',
    verses: [
      {
        id: 'grateful-v1',
        arabic: 'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ',
        translation: 'If you are grateful, I will surely increase you [in favor]',
        surah: 'Ibrahim (14:7)'
      },
      {
        id: 'grateful-v2',
        arabic: 'وَإِذْ تَأَذَّنَ رَبُّكُمْ لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ وَلَئِن كَفَرْتُمْ إِنَّ عَذَابِي لَشَدِيدٌ',
        translation: 'And [remember] when your Lord proclaimed, "If you are grateful, I will surely increase you [in favor]; but if you deny, indeed, My punishment is severe"',
        surah: 'Ibrahim (14:7)'
      },
      {
        id: 'grateful-v3',
        arabic: 'وَقَلِيلٌ مِّنْ عِبَادِيَ الشَّكُورُ',
        translation: 'And few of My servants are grateful',
        surah: 'Saba (34:13)'
      },
      {
        id: 'grateful-v4',
        arabic: 'فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ',
        translation: 'So remember Me; I will remember you. And be grateful to Me and do not deny Me',
        surah: 'Al-Baqarah (2:152)'
      },
      {
        id: 'grateful-v5',
        arabic: 'وَاشْكُرُوا نِعْمَتَ اللَّهِ إِن كُنتُمْ إِيَّاهُ تَعْبُدُونَ',
        translation: 'And be grateful for the favor of Allah, if it is [indeed] Him that you worship',
        surah: 'An-Nahl (16:114)'
      }
    ],
    hadith: [
      {
        id: 'grateful-h1',
        text: 'من لم يشكر الناس لم يشكر الله',
        translation: 'He who does not thank people, does not thank Allah',
        narrator: 'Abu Dawud'
      },
      {
        id: 'grateful-h2',
        text: 'عجباً لأمر المؤمن إن أمره كله خير، وليس ذلك لأحد إلا للمؤمن: إن أصابته سراء شكر فكان خيراً له، وإن أصابته ضراء صبر فكان خيراً له',
        translation: 'Amazing is the affair of the believer. Verily, all of his affairs are good for him. If something good happens to him, he is grateful and that is good for him. If something bad happens to him, he bears it with patience and that is good for him',
        narrator: 'Muslim'
      },
      {
        id: 'grateful-h3',
        text: 'انظروا إلى من هو أسفل منكم، ولا تنظروا إلى من هو فوقكم، فهو أجدر أن لا تزدروا نعمة الله عليكم',
        translation: 'Look at those who are less fortunate than you, not at those who are more fortunate, lest you belittle the blessings Allah has bestowed upon you',
        narrator: 'Bukhari & Muslim'
      },
      {
        id: 'grateful-h4',
        text: 'من قال حين يصبح: اللهم ما أصبح بي من نعمة أو بأحد من خلقك فمنك وحدك لا شريك لك، فلك الحمد ولك الشكر، فقد أدى شكر يومه',
        translation: 'Whoever says in the morning: "O Allah, whatever blessing has come to me or to any of Your creation comes from You alone, You have no partner. To You be praise and gratitude," has offered his gratitude for that day',
        narrator: 'Abu Dawud'
      },
      {
        id: 'grateful-h5',
        text: 'الطاعم الشاكر بمنزلة الصائم الصابر',
        translation: 'The one who eats and is grateful is like the one who fasts and is patient',
        narrator: 'Bukhari'
      }
    ],
    duas: [
      {
        id: 'grateful-d1',
        arabic: 'الْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ',
        translation: 'All praise is due to Allah by whose favor good deeds are completed',
        reference: 'Ibn Majah'
      },
      {
        id: 'grateful-d2',
        arabic: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
        translation: 'O Allah, help me to remember You, to be grateful to You, and to worship You in an excellent manner',
        reference: 'Abu Dawud'
      },
      {
        id: 'grateful-d3',
        arabic: 'رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ',
        translation: 'My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents and to work righteousness of which You will approve',
        reference: 'Quran 46:15'
      }
    ]
  },

  lonely: {
    id: 'lonely',
    name: 'Lonely',
    icon: '🕊️',
    color: '#9C27B0',
    gradient: 'linear-gradient(135deg, #9C27B0, #6A1B9A)',
    image: images.backgrounds.stars,
    description: 'When you feel alone, remember that Allah is always with you',
    verses: [
      {
        id: 'lonely-v1',
        arabic: 'وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ',
        translation: 'And He is with you wherever you are',
        surah: 'Al-Hadid (57:4)'
      },
      {
        id: 'lonely-v2',
        arabic: 'إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',
        translation: 'Indeed, Allah is with the patient',
        surah: 'Al-Baqarah (2:153)'
      },
      {
        id: 'lonely-v3',
        arabic: 'أَلَا إِنَّ أَوْلِيَاءَ اللَّهِ لَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ',
        translation: 'Unquestionably, for the allies of Allah there will be no fear concerning them, nor will they grieve',
        surah: 'Yunus (10:62)'
      },
      {
        id: 'lonely-v4',
        arabic: 'وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنْ حَبْلِ الْوَرِيدِ',
        translation: 'And We are closer to him than his jugular vein',
        surah: 'Qaf (50:16)'
      },
      {
        id: 'lonely-v5',
        arabic: 'إِذْ يَقُولُ لِصَاحِبِهِ لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا',
        translation: 'When he said to his companion, "Do not grieve; indeed Allah is with us"',
        surah: 'At-Tawbah (9:40)'
      }
    ],
    hadith: [
      {
        id: 'lonely-h1',
        text: 'إن الله يقول: أنا عند ظن عبدي بي، وأنا معه إذا ذكرني',
        translation: 'Allah says: "I am as My servant thinks of Me, and I am with him when he remembers Me"',
        narrator: 'Bukhari & Muslim'
      },
      {
        id: 'lonely-h2',
        text: 'ما جلس قوم يذكرون الله إلا حفتهم الملائكة، وغشيتهم الرحمة، ونزلت عليهم السكينة، وذكرهم الله فيمن عنده',
        translation: 'No people sit remembering Allah, but the angels surround them, mercy covers them, tranquility descends upon them, and Allah mentions them to those who are with Him',
        narrator: 'Muslim'
      },
      {
        id: 'lonely-h3',
        text: 'أحب الناس إلى الله أنفعهم للناس',
        translation: 'The most beloved of people to Allah are those who are most beneficial to people',
        narrator: 'Tabarani'
      },
      {
        id: 'lonely-h4',
        text: 'المؤمن للمؤمن كالبنيان يشد بعضه بعضا',
        translation: 'The believer to the believer is like a solid building, one part supporting the other',
        narrator: 'Bukhari & Muslim'
      },
      {
        id: 'lonely-h5',
        text: 'مثل المؤمنين في توادهم وتراحمهم وتعاطفهم مثل الجسد، إذا اشتكى منه عضو تداعى له سائر الجسد بالسهر والحمى',
        translation: 'The believers in their mutual kindness, compassion, and sympathy are just like one body. When one part suffers, the whole body responds to it with wakefulness and fever',
        narrator: 'Bukhari & Muslim'
      }
    ],
    duas: [
      {
        id: 'lonely-d1',
        arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْأُنْسَ بِكَ',
        translation: 'O Allah, I ask You for comfort in You',
        reference: 'Ibn Hibban'
      },
      {
        id: 'lonely-d2',
        arabic: 'اللَّهُمَّ آنِسْ وَحْشَتِي فِي قَبْرِي',
        translation: 'O Allah, comfort my loneliness in my grave',
        reference: 'Ahmad'
      },
      {
        id: 'lonely-d3',
        arabic: 'رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ',
        translation: 'My Lord, indeed I am, for whatever good You would send down to me, in need',
        reference: 'Quran 28:24'
      }
    ]
  },

  hopeful: {
    id: 'hopeful',
    name: 'Hopeful',
    icon: '✨',
    color: '#FF69B4',
    gradient: 'linear-gradient(135deg, #FF69B4, #C2185B)',
    image: images.backgrounds.sunrise,
    description: 'Hope in Allah\'s mercy is half of faith',
    verses: [
      {
        id: 'hopeful-v1',
        arabic: 'وَرَحْمَتِي وَسِعَتْ كُلَّ شَيْءٍ',
        translation: 'And My mercy encompasses all things',
        surah: 'Al-Araf (7:156)'
      },
      {
        id: 'hopeful-v2',
        arabic: 'لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ',
        translation: 'Do not despair of the mercy of Allah',
        surah: 'Az-Zumar (39:53)'
      },
      {
        id: 'hopeful-v3',
        arabic: 'إِنَّ رَحْمَتَ اللَّهِ قَرِيبٌ مِّنَ الْمُحْسِنِينَ',
        translation: 'Indeed, the mercy of Allah is near to the doers of good',
        surah: 'Al-Araf (7:56)'
      },
      {
        id: 'hopeful-v4',
        arabic: 'وَالَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ سَنُدْخِلُهُمْ جَنَّاتٍ تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ خَالِدِينَ فِيهَا أَبَدًا',
        translation: 'But those who believe and do righteous deeds - We will admit them to gardens beneath which rivers flow, wherein they abide forever',
        surah: 'An-Nisa (4:122)'
      },
      {
        id: 'hopeful-v5',
        arabic: 'يَبْشُرُهُمْ رَبُّهُم بِرَحْمَةٍ مِّنْهُ وَرِضْوَانٍ وَجَنَّاتٍ لَّهُمْ فِيهَا نَعِيمٌ مُّقِيمٌ',
        translation: 'Their Lord gives them good tidings of mercy from Him and approval and of gardens for them wherein is enduring pleasure',
        surah: 'At-Tawbah (9:21)'
      }
    ],
    hadith: [
      {
        id: 'hopeful-h1',
        text: 'يقول الله تعالى: أنا عند ظن عبدي بي، وأنا معه إذا ذكرني',
        translation: 'Allah Almighty says: "I am as My servant thinks of Me, and I am with him when he remembers Me"',
        narrator: 'Bukhari & Muslim'
      },
      {
        id: 'hopeful-h2',
        text: 'لا يموتن أحدكم إلا وهو يحسن الظن بالله',
        translation: 'Let none of you die except while thinking good of Allah',
        narrator: 'Muslim'
      },
      {
        id: 'hopeful-h3',
        text: 'إن الله يقول: يا ابن آدم، إنك ما دعوتني ورجوتني غفرت لك على ما كان منك ولا أبالي',
        translation: 'Allah says: "O son of Adam, as long as you call upon Me and hope in Me, I will forgive you for what you have done, and I do not mind"',
        narrator: 'Tirmidhi'
      },
      {
        id: 'hopeful-h4',
        text: 'أنا عند ظن عبدي بي، فليظن بي ما شاء',
        translation: 'I am as My servant thinks of Me, so let him think of Me as he wishes',
        narrator: 'Ibn Hibban'
      },
      {
        id: 'hopeful-h5',
        text: 'لا يلج النار أحد كان في قلبه مثقال حبة من خردل من إيمان',
        translation: 'No one will enter Hell who has in his heart the weight of a mustard seed of faith',
        narrator: 'Bukhari'
      }
    ],
    duas: [
      {
        id: 'hopeful-d1',
        arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الرِّضَا بَعْدَ الْقَضَاءِ',
        translation: 'O Allah, I ask You for contentment after Your decree',
        reference: 'Ahmad'
      },
      {
        id: 'hopeful-d2',
        arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ وَرَحْمَتِكَ',
        translation: 'O Allah, I ask You of Your favor and mercy',
        reference: 'Muslim'
      },
      {
        id: 'hopeful-d3',
        arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
        translation: 'Our Lord, give us in this world good and in the Hereafter good and protect us from the punishment of the Fire',
        reference: 'Quran 2:201'
      }
    ]
  },

  fearful: {
    id: 'fearful',
    name: 'Fearful',
    icon: '😨',
    color: '#808080',
    gradient: 'linear-gradient(135deg, #808080, #404040)',
    image: images.backgrounds.water,
    description: 'When fear overtakes you, seek refuge in Allah',
    verses: [
      {
        id: 'fearful-v1',
        arabic: 'الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ',
        translation: 'Those who believe and whose hearts find rest in the remembrance of Allah',
        surah: 'Ar-Rad (13:28)'
      },
      {
        id: 'fearful-v2',
        arabic: 'فَإِذَا قَرَأْتَ الْقُرْآنَ فَاسْتَعِذْ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
        translation: 'So when you recite the Quran, seek refuge in Allah from Satan, the expelled',
        surah: 'An-Nahl (16:98)'
      },
      {
        id: 'fearful-v3',
        arabic: 'إِنَّهُ لَيْسَ لَهُ سُلْطَانٌ عَلَى الَّذِينَ آمَنُوا وَعَلَىٰ رَبِّهِمْ يَتَوَكَّلُونَ',
        translation: 'Indeed, Satan has no authority over those who believe and rely upon their Lord',
        surah: 'An-Nahl (16:99)'
      },
      {
        id: 'fearful-v4',
        arabic: 'الَّذِينَ قَالَ لَهُمُ النَّاسُ إِنَّ النَّاسَ قَدْ جَمَعُوا لَكُمْ فَاخْشَوْهُمْ فَزَادَهُمْ إِيمَانًا وَقَالُوا حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
        translation: 'Those to whom people said, "Indeed, the people have gathered against you, so fear them." But it increased them in faith, and they said, "Sufficient for us is Allah, and He is the best Disposer of affairs"',
        surah: 'Aal-E-Imran (3:173)'
      },
      {
        id: 'fearful-v5',
        arabic: 'إِنَّمَا ذَٰلِكُمُ الشَّيْطَانُ يُخَوِّفُ أَوْلِيَاءَهُ فَلَا تَخَافُوهُمْ وَخَافُونِ إِن كُنتُم مُّؤْمِنِينَ',
        translation: 'That is only Satan who frightens his supporters. So fear them not, but fear Me, if you are believers',
        surah: 'Aal-E-Imran (3:175)'
      }
    ],
    hadith: [
      {
        id: 'fearful-h1',
        text: 'من قال - يعني إذا خاف من سلطان -: لا إله إلا الله الحليم الكريم، سبحان الله رب العرش العظيم، الحمد لله رب العالمين، كفاه الله ما أهمه',
        translation: 'Whoever says when he fears a ruler: "There is no god but Allah, the Forbearing, the Generous. Glory be to Allah, Lord of the Great Throne. Praise be to Allah, Lord of the worlds" - Allah will suffice him against what concerns him',
        narrator: 'Ahmad'
      },
      {
        id: 'fearful-h2',
        text: 'اللهم إني أعوذ بك من الهم والحزن، وأعوذ بك من العجز والكسل',
        translation: 'O Allah, I seek refuge in You from anxiety and grief, and I seek refuge in You from incapacity and laziness',
        narrator: 'Bukhari'
      },
      {
        id: 'fearful-h3',
        text: 'ما أصاب عبدا هم ولا حزن فقال: اللهم إني عبدك... إلا أذهب الله همه',
        translation: 'There is no servant afflicted with anxiety or grief who says: "O Allah, I am Your servant..." but Allah will remove his anxiety and grief',
        narrator: 'Ahmad'
      },
      {
        id: 'fearful-h4',
        text: 'أعوذ بكلمات الله التامة من غضبه وعقابه وشر عباده ومن همزات الشياطين وأن يحضرون',
        translation: 'I seek refuge in the perfect words of Allah from His anger and punishment, from the evil of His servants, from the whisperings of devils, and from their presence',
        narrator: 'Abu Dawud'
      },
      {
        id: 'fearful-h5',
        text: 'إذا فزعتم فقولوا: حسبنا الله ونعم الوكيل',
        translation: 'When you are frightened, say: "Allah is sufficient for us, and He is the best Disposer of affairs"',
        narrator: 'Ahmad'
      }
    ],
    duas: [
      {
        id: 'fearful-d1',
        arabic: 'حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
        translation: 'Allah is sufficient for me, there is no god but Him, upon Him I rely, and He is the Lord of the Great Throne',
        reference: 'Quran 9:129'
      },
      {
        id: 'fearful-d2',
        arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ',
        translation: 'O Allah, I seek refuge in You from anxiety and grief',
        reference: 'Bukhari'
      },
      {
        id: 'fearful-d3',
        arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ',
        translation: 'I seek refuge in the perfect words of Allah from every devil, every harmful creature, and from every evil eye',
        reference: 'Bukhari'
      }
    ]
  },

  peaceful: {
    id: 'peaceful',
    name: 'Peaceful',
    icon: '☮️',
    color: '#00CED1',
    gradient: 'linear-gradient(135deg, #00CED1, #008B8B)',
    image: images.backgrounds.water,
    description: 'Tranquility comes from remembering Allah',
    verses: [
      {
        id: 'peaceful-v1',
        arabic: 'هُوَ الَّذِي أَنزَلَ السَّكِينَةَ فِي قُلُوبِ الْمُؤْمِنِينَ لِيَزْدَادُوا إِيمَانًا مَّعَ إِيمَانِهِمْ',
        translation: 'It is He who sent down tranquility into the hearts of the believers that they would increase in faith along with their faith',
        surah: 'Al-Fath (48:4)'
      },
      {
        id: 'peaceful-v2',
        arabic: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
        translation: 'Verily, in the remembrance of Allah do hearts find rest',
        surah: 'Ar-Rad (13:28)'
      },
      {
        id: 'peaceful-v3',
        arabic: 'وَجَعَلْنَا بَعْضَكُمْ لِبَعْضٍ فِتْنَةً أَتَصْبِرُونَ وَكَانَ رَبُّكَ بَصِيرًا',
        translation: 'And We have made some of you as a trial for others - will you have patience? And ever is your Lord Seeing',
        surah: 'Al-Furqan (25:20)'
      },
      {
        id: 'peaceful-v4',
        arabic: 'وَعِبَادُ الرَّحْمَٰنِ الَّذِينَ يَمْشُونَ عَلَى الْأَرْضِ هَوْنًا',
        translation: 'And the servants of the Most Merciful are those who walk upon the earth easily',
        surah: 'Al-Furqan (25:63)'
      },
      {
        id: 'peaceful-v5',
        arabic: 'الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ',
        translation: 'Those who have believed and whose hearts are assured by the remembrance of Allah',
        surah: 'Ar-Rad (13:28)'
      }
    ],
    hadith: [
      {
        id: 'peaceful-h1',
        text: 'ما جلس قوم يذكرون الله إلا حفتهم الملائكة، وغشيتهم الرحمة، ونزلت عليهم السكينة، وذكرهم الله فيمن عنده',
        translation: 'No people sit remembering Allah, but the angels surround them, mercy covers them, tranquility descends upon them, and Allah mentions them to those who are with Him',
        narrator: 'Muslim'
      },
      {
        id: 'peaceful-h2',
        text: 'السكينة تنزل عند قراءة القرآن',
        translation: 'Tranquility descends when the Quran is recited',
        narrator: 'Bukhari'
      },
      {
        id: 'peaceful-h3',
        text: 'إن لله ملائكة سياحين في الأرض يبلغوني من أمتي السلام',
        translation: 'Allah has angels who travel throughout the earth, conveying to me the greetings of peace from my ummah',
        narrator: 'Nasai'
      },
      {
        id: 'peaceful-h4',
        text: 'اللهم أنت السلام ومنك السلام تباركت يا ذا الجلال والإكرام',
        translation: 'O Allah, You are Peace and from You is peace. Blessed are You, O Possessor of Majesty and Honor',
        narrator: 'Muslim'
      },
      {
        id: 'peaceful-h5',
        text: 'من قال حين يمسي: رضيت بالله ربا وبالإسلام دينا وبمحمد نبيا، كان حقا على الله أن يرضيه',
        translation: 'Whoever says in the evening: "I am pleased with Allah as Lord, with Islam as religion, and with Muhammad as Prophet," it is Allah\'s right to be pleased with him',
        narrator: 'Tirmidhi'
      }
    ],
    duas: [
      {
        id: 'peaceful-d1',
        arabic: 'اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
        translation: 'O Allah, You are Peace and from You is peace. Blessed are You, O Possessor of Majesty and Honor',
        reference: 'Muslim'
      },
      {
        id: 'peaceful-d2',
        arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ نَفْسًا مُطْمَئِنَّةً تُؤْمِنُ بِلِقَائِكَ',
        translation: 'O Allah, I ask You for a peaceful soul that believes in meeting You',
        reference: 'Ahmad'
      },
      {
        id: 'peaceful-d3',
        arabic: 'رَبِّ أَعُوذُ بِكَ مِنْ هَمَزَاتِ الشَّيَاطِينِ',
        translation: 'My Lord, I seek refuge in You from the incitements of the devils',
        reference: 'Quran 23:97'
      }
    ]
  },

  weak: {
    id: 'weak',
    name: 'Weak',
    icon: '💪',
    color: '#CD5C5C',
    gradient: 'linear-gradient(135deg, #CD5C5C, #8B4513)',
    image: images.backgrounds.desert,
    description: 'In your weakness, find strength in Allah',
    verses: [
      {
        id: 'weak-v1',
        arabic: 'خُلِقَ الْإِنسَانُ ضَعِيفًا',
        translation: 'And mankind was created weak',
        surah: 'An-Nisa (4:28)'
      },
      {
        id: 'weak-v2',
        arabic: 'اللَّهُ الَّذِي خَلَقَكُم مِّن ضَعْفٍ ثُمَّ جَعَلَ مِن بَعْدِ ضَعْفٍ قُوَّةً ثُمَّ جَعَلَ مِن بَعْدِ قُوَّةٍ ضَعْفًا وَشَيْبَةً',
        translation: 'Allah is the one who created you from weakness, then made after weakness strength, then made after strength weakness and white hair',
        surah: 'Ar-Rum (30:54)'
      },
      {
        id: 'weak-v3',
        arabic: 'إِن تَنصُرُوا اللَّهَ يَنصُرْكُمْ وَيُثَبِّتْ أَقْدَامَكُمْ',
        translation: 'If you support Allah, He will support you and plant firmly your feet',
        surah: 'Muhammad (47:7)'
      },
      {
        id: 'weak-v4',
        arabic: 'وَلَيَنصُرَنَّ اللَّهُ مَن يَنصُرُهُ',
        translation: 'And Allah will surely support those who support Him',
        surah: 'Al-Hajj (22:40)'
      },
      {
        id: 'weak-v5',
        arabic: 'وَكَانَ حَقًّا عَلَيْنَا نَصْرُ الْمُؤْمِنِينَ',
        translation: 'And it is ever a duty upon Us to support the believers',
        surah: 'Ar-Rum (30:47)'
      }
    ],
    hadith: [
      {
        id: 'weak-h1',
        text: 'أحب الأعمال إلى الله أدومها وإن قل',
        translation: 'The most beloved of deeds to Allah are the most consistent, even if they are few',
        narrator: 'Bukhari & Muslim'
      },
      {
        id: 'weak-h2',
        text: 'إن الله يحب العبد التقي الغني الخفي',
        translation: 'Allah loves the pious, independent, and hidden servant',
        narrator: 'Muslim'
      },
      {
        id: 'weak-h3',
        text: 'المؤمن القوي خير وأحب إلى الله من المؤمن الضعيف، وفي كل خير',
        translation: 'The strong believer is better and more beloved to Allah than the weak believer, while there is good in both',
        narrator: 'Muslim'
      },
      {
        id: 'weak-h4',
        text: 'احرص على ما ينفعك، واستعن بالله ولا تعجز',
        translation: 'Be keen on what benefits you, seek help from Allah, and do not be helpless',
        narrator: 'Muslim'
      },
      {
        id: 'weak-h5',
        text: 'ما نزل داء إلا أنزل له شفاء',
        translation: 'There is no disease that Allah has sent down except that He has also sent down its cure',
        narrator: 'Bukhari'
      }
    ],
    duas: [
      {
        id: 'weak-d1',
        arabic: 'اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا',
        translation: 'O Allah, there is nothing easy except what You make easy, and You make the difficult easy if You wish',
        reference: 'Ibn Hibban'
      },
      {
        id: 'weak-d2',
        arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ',
        translation: 'O Allah, I seek refuge in You from incapacity and laziness',
        reference: 'Bukhari'
      },
      {
        id: 'weak-d3',
        arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي',
        translation: 'My Lord, expand for me my chest and ease for me my task',
        reference: 'Quran 20:25-26'
      }
    ]
  },

  regretful: {
    id: 'regretful',
    name: 'Regretful',
    icon: '😔',
    color: '#A9A9A9',
    gradient: 'linear-gradient(135deg, #A9A9A9, #696969)',
    image: images.backgrounds.water,
    description: 'Turn your regret into repentance',
    verses: [
      {
        id: 'regretful-v1',
        arabic: 'إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ وَيُحِبُّ الْمُتَطَهِّرِينَ',
        translation: 'Indeed, Allah loves those who are constantly repentant and loves those who purify themselves',
        surah: 'Al-Baqarah (2:222)'
      },
      {
        id: 'regretful-v2',
        arabic: 'وَمَن يَعْمَلْ سُوءًا أَوْ يَظْلِمْ نَفْسَهُ ثُمَّ يَسْتَغْفِرِ اللَّهَ يَجِدِ اللَّهَ غَفُورًا رَّحِيمًا',
        translation: 'And whoever does a wrong or wrongs himself but then seeks forgiveness of Allah will find Allah Forgiving and Merciful',
        surah: 'An-Nisa (4:110)'
      },
      {
        id: 'regretful-v3',
        arabic: 'إِنَّمَا التَّوْبَةُ عَلَى اللَّهِ لِلَّذِينَ يَعْمَلُونَ السُّوءَ بِجَهَالَةٍ ثُمَّ يَتُوبُونَ مِن قَرِيبٍ',
        translation: 'The repentance accepted by Allah is only for those who do wrong in ignorance then repent soon after',
        surah: 'An-Nisa (4:17)'
      },
      {
        id: 'regretful-v4',
        arabic: 'وَالَّذِينَ إِذَا فَعَلُوا فَاحِشَةً أَوْ ظَلَمُوا أَنفُسَهُمْ ذَكَرُوا اللَّهَ فَاسْتَغْفَرُوا لِذُنُوبِهِمْ',
        translation: 'And those who, when they commit an immorality or wrong themselves, remember Allah and seek forgiveness for their sins',
        surah: 'Aal-E-Imran (3:135)'
      },
      {
        id: 'regretful-v5',
        arabic: 'أَلَمْ يَعْلَمُوا أَنَّ اللَّهَ هُوَ يَقْبَلُ التَّوْبَةَ عَنْ عِبَادِهِ',
        translation: 'Do they not know that Allah accepts repentance from His servants?',
        surah: 'At-Tawbah (9:104)'
      }
    ],
    hadith: [
      {
        id: 'regretful-h1',
        text: 'التائب من الذنب كمن لا ذنب له',
        translation: 'The one who repents from sin is like one who has no sin',
        narrator: 'Ibn Majah'
      },
      {
        id: 'regretful-h2',
        text: 'والذي نفسي بيده لو لم تذنبوا لذهب الله بكم، ولجاء بقوم يذنبون ثم يستغفرون الله فيغفر لهم',
        translation: 'By Him in Whose hand is my soul, if you did not sin, Allah would replace you with people who would sin and then seek forgiveness from Allah, and He would forgive them',
        narrator: 'Muslim'
      },
      {
        id: 'regretful-h3',
        text: 'إن الله يبسط يده بالليل ليتوب مسيء النهار، ويبسط يده بالنهار ليتوب مسيء الليل حتى تطلع الشمس من مغربها',
        translation: 'Allah extends His hand at night to accept the repentance of the one who sinned during the day, and He extends His hand during the day to accept the repentance of the one who sinned during the night, until the sun rises from the west',
        narrator: 'Muslim'
      },
      {
        id: 'regretful-h4',
        text: 'ندم توبة',
        translation: 'Regret is repentance',
        narrator: 'Ahmad'
      },
      {
        id: 'regretful-h5',
        text: 'أفضل الاستغفار أن يقول العبد: اللهم أنت ربي لا إله إلا أنت...',
        translation: 'The best form of seeking forgiveness is for the servant to say: "O Allah, You are my Lord, there is no god but You..."',
        narrator: 'Bukhari'
      }
    ],
    duas: [
      {
        id: 'regretful-d1',
        arabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ',
        translation: 'I seek forgiveness from Allah, the Great, there is no god but Him, the Living, the Sustainer, and I repent to Him',
        reference: 'Abu Dawud'
      },
      {
        id: 'regretful-d2',
        arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ',
        translation: 'O Allah, You are my Lord, there is no god but You. You created me and I am Your servant',
        reference: 'Bukhari'
      },
      {
        id: 'regretful-d3',
        arabic: 'رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ',
        translation: 'My Lord, forgive me and accept my repentance. Indeed, You are the Acceptor of Repentance, the Merciful',
        reference: 'Abu Dawud'
      }
    ]
  },

  impatient: {
    id: 'impatient',
    name: 'Impatient',
    icon: '⏰',
    color: '#FFA07A',
    gradient: 'linear-gradient(135deg, #FFA07A, #FF4500)',
    image: images.backgrounds.desert,
    description: 'Patience is the key to paradise',
    verses: [
      {
        id: 'impatient-v1',
        arabic: 'إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',
        translation: 'Indeed, Allah is with the patient',
        surah: 'Al-Baqarah (2:153)'
      },
      {
        id: 'impatient-v2',
        arabic: 'وَاصْبِرْ وَمَا صَبْرُكَ إِلَّا بِاللَّهِ',
        translation: 'And be patient, and your patience is not but through Allah',
        surah: 'An-Nahl (16:127)'
      },
      {
        id: 'impatient-v3',
        arabic: 'إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍ',
        translation: 'Indeed, the patient will be given their reward without account',
        surah: 'Az-Zumar (39:10)'
      },
      {
        id: 'impatient-v4',
        arabic: 'وَاصْبِرْ عَلَىٰ مَا أَصَابَكَ',
        translation: 'And be patient over what befalls you',
        surah: 'Luqman (31:17)'
      },
      {
        id: 'impatient-v5',
        arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ',
        translation: 'O you who have believed, seek help through patience and prayer',
        surah: 'Al-Baqarah (2:153)'
      }
    ],
    hadith: [
      {
        id: 'impatient-h1',
        text: 'الصبر ضياء',
        translation: 'Patience is a light',
        narrator: 'Muslim'
      },
      {
        id: 'impatient-h2',
        text: 'ما أعطي أحد عطاء خيرا وأوسع من الصبر',
        translation: 'No one has been given a better and more generous gift than patience',
        narrator: 'Bukhari & Muslim'
      },
      {
        id: 'impatient-h3',
        text: 'إن الله مع الصابرين',
        translation: 'Indeed, Allah is with the patient',
        narrator: 'Quran'
      },
      {
        id: 'impatient-h4',
        text: 'والصبر نصف الإيمان',
        translation: 'Patience is half of faith',
        narrator: 'Abu Nuaim'
      },
      {
        id: 'impatient-h5',
        text: 'عجبا لأمر المؤمن إن أمره كله خير، وليس ذلك لأحد إلا للمؤمن: إن أصابته سراء شكر فكان خيراً له، وإن أصابته ضراء صبر فكان خيراً له',
        translation: 'Amazing is the affair of the believer. Verily, all of his affairs are good for him. If something good happens to him, he is grateful and that is good for him. If something bad happens to him, he bears it with patience and that is good for him',
        narrator: 'Muslim'
      }
    ],
    duas: [
      {
        id: 'impatient-d1',
        arabic: 'رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا',
        translation: 'Our Lord, pour upon us patience and plant firmly our feet',
        reference: 'Quran 2:250'
      },
      {
        id: 'impatient-d2',
        arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الصَّبْرَ عِنْدَ الْبَلَاءِ',
        translation: 'O Allah, I ask You for patience at times of trial',
        reference: 'Ahmad'
      },
      {
        id: 'impatient-d3',
        arabic: 'رَبِّ أَعِنِّي وَلَا تُعِنْ عَلَيَّ',
        translation: 'My Lord, help me and do not help against me',
        reference: 'Tirmidhi'
      }
    ]
  },

  doubtful: {
    id: 'doubtful',
    name: 'Doubtful',
    icon: '🤔',
    color: '#B8860B',
    gradient: 'linear-gradient(135deg, #B8860B, #8B4513)',
    image: images.backgrounds.stars,
    description: 'When doubts arise, seek knowledge and certainty',
    verses: [
      {
        id: 'doubtful-v1',
        arabic: 'إِنَّمَا الْمُؤْمِنُونَ الَّذِينَ آمَنُوا بِاللَّهِ وَرَسُولِهِ ثُمَّ لَمْ يَرْتَابُوا',
        translation: 'The believers are only those who believe in Allah and His Messenger and then doubt not',
        surah: 'Al-Hujurat (49:15)'
      },
      {
        id: 'doubtful-v2',
        arabic: 'اللَّهُ وَلِيُّ الَّذِينَ آمَنُوا يُخْرِجُهُم مِّنَ الظُّلُمَاتِ إِلَى النُّورِ',
        translation: 'Allah is the ally of those who believe. He brings them out from darkness into the light',
        surah: 'Al-Baqarah (2:257)'
      },
      {
        id: 'doubtful-v3',
        arabic: 'أَفَلَا يَتَدَبَّرُونَ الْقُرْآنَ ۚ وَلَوْ كَانَ مِنْ عِندِ غَيْرِ اللَّهِ لَوَجَدُوا فِيهِ اخْتِلَافًا كَثِيرًا',
        translation: 'Then do they not reflect upon the Quran? If it had been from other than Allah, they would have found within it much contradiction',
        surah: 'An-Nisa (4:82)'
      },
      {
        id: 'doubtful-v4',
        arabic: 'وَمَا كَانَ لِنَفْسٍ أَن تُؤْمِنَ إِلَّا بِإِذْنِ اللَّهِ',
        translation: 'And it is not for a soul to believe except by permission of Allah',
        surah: 'Yunus (10:100)'
      },
      {
        id: 'doubtful-v5',
        arabic: 'إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ لَآيَاتٍ لِّأُولِي الْأَلْبَابِ',
        translation: 'Indeed, in the creation of the heavens and the earth and the alternation of the night and day are signs for those of understanding',
        surah: 'Aal-E-Imran (3:190)'
      }
    ],
    hadith: [
      {
        id: 'doubtful-h1',
        text: 'إن الشيطان يأتي أحدكم فيقول: من خلق كذا؟ من خلق كذا؟ حتى يقول: من خلق ربك؟ فإذا بلغه فليستعذ بالله ولينته',
        translation: 'The Satan comes to one of you and says: Who created this? Who created that? until he says: Who created your Lord? If that happens, let him seek refuge in Allah and stop',
        narrator: 'Bukhari'
      },
      {
        id: 'doubtful-h2',
        text: 'لا يزال الناس يتساءلون حتى يقال: هذا خلق الله الخلق، فمن خلق الله؟ فمن وجد من ذلك شيئا فليقل: آمنت بالله',
        translation: 'People will keep asking questions until it is said: Allah created the creation, so who created Allah? Whoever finds anything like that, let him say: I believe in Allah',
        narrator: 'Muslim'
      },
      {
        id: 'doubtful-h3',
        text: 'الحياء لا يأتي إلا بخير',
        translation: 'Modesty does not bring anything but good',
        narrator: 'Bukhari & Muslim'
      },
      {
        id: 'doubtful-h4',
        text: 'إن الحلال بين وإن الحرام بين، وبينهما أمور مشتبهات لا يعلمهن كثير من الناس',
        translation: 'The lawful is clear and the unlawful is clear, and between them are doubtful matters which many people do not know',
        narrator: 'Bukhari & Muslim'
      },
      {
        id: 'doubtful-h5',
        text: 'من شك في صلاته فليسجد سجدتين',
        translation: 'Whoever doubts in his prayer should prostrate twice',
        narrator: 'Muslim'
      }
    ],
    duas: [
      {
        id: 'doubtful-d1',
        arabic: 'رَبِّ زِدْنِي عِلْمًا',
        translation: 'My Lord, increase me in knowledge',
        reference: 'Quran 20:114'
      },
      {
        id: 'doubtful-d2',
        arabic: 'اللَّهُمَّ أَرِنَا الْحَقَّ حَقًّا وَارْزُقْنَا اتِّبَاعَهُ، وَأَرِنَا الْبَاطِلَ بَاطِلًا وَارْزُقْنَا اجْتِنَابَهُ',
        translation: 'O Allah, show us the truth as truth and grant us the ability to follow it, and show us falsehood as falsehood and grant us the ability to avoid it',
        reference: 'Ahmad'
      },
      {
        id: 'doubtful-d3',
        arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْيَقِينَ وَالْعَافِيَةَ',
        translation: 'O Allah, I ask You for certainty and well-being',
        reference: 'Ahmad'
      }
    ]
  },

  ashamed: {
    id: 'ashamed',
    name: 'Ashamed',
    icon: '😳',
    color: '#FA8072',
    gradient: 'linear-gradient(135deg, #FA8072, #CD5C5C)',
    image: images.backgrounds.sunset,
    description: 'Healthy shame is part of faith',
    verses: [
      {
        id: 'ashamed-v1',
        arabic: 'إِنَّ اللَّهَ لَا يَسْتَحْيِي أَن يَضْرِبَ مَثَلًا مَّا بَعُوضَةً فَمَا فَوْقَهَا',
        translation: 'Indeed, Allah is not timid to present an example - that of a mosquito or what is smaller than it',
        surah: 'Al-Baqarah (2:26)'
      },
      {
        id: 'ashamed-v2',
        arabic: 'وَلَا تَقْرَبُوا الْفَوَاحِشَ مَا ظَهَرَ مِنْهَا وَمَا بَطَنَ',
        translation: 'And do not approach immoralities - what is apparent of them and what is concealed',
        surah: 'Al-Anam (6:151)'
      },
      {
        id: 'ashamed-v3',
        arabic: 'إِنَّ الَّذِينَ يُحِبُّونَ أَن تَشِيعَ الْفَاحِشَةُ فِي الَّذِينَ آمَنُوا لَهُمْ عَذَابٌ أَلِيمٌ',
        translation: 'Indeed, those who like that immorality should be spread among those who have believed will have a painful punishment',
        surah: 'An-Nur (24:19)'
      },
      {
        id: 'ashamed-v4',
        arabic: 'وَاللَّهُ يُحِبُّ الْمُطَّهِّرِينَ',
        translation: 'And Allah loves those who purify themselves',
        surah: 'At-Tawbah (9:108)'
      },
      {
        id: 'ashamed-v5',
        arabic: 'قَدْ أَفْلَحَ مَن زَكَّاهَا',
        translation: 'He has succeeded who purifies it',
        surah: 'Ash-Shams (91:9)'
      }
    ],
    hadith: [
      {
        id: 'ashamed-h1',
        text: 'الحياء شعبة من الإيمان',
        translation: 'Modesty is a branch of faith',
        narrator: 'Bukhari & Muslim'
      },
      {
        id: 'ashamed-h2',
        text: 'الحياء لا يأتي إلا بخير',
        translation: 'Modesty does not bring anything but good',
        narrator: 'Bukhari & Muslim'
      },
      {
        id: 'ashamed-h3',
        text: 'إن مما أدرك الناس من كلام النبوة الأولى: إذا لم تستح فاصنع ما شئت',
        translation: 'One of the things people have learned from the words of the earlier prophets is: If you feel no shame, do as you wish',
        narrator: 'Bukhari'
      },
      {
        id: 'ashamed-h4',
        text: 'استحيوا من الله حق الحياء',
        translation: 'Be truly modest before Allah',
        narrator: 'Tirmidhi'
      },
      {
        id: 'ashamed-h5',
        text: 'الله أحق أن يستحيى منه من الناس',
        translation: 'Allah is more deserving of modesty from Him than people',
        narrator: 'Abu Dawud'
      }
    ],
    duas: [
      {
        id: 'ashamed-d1',
        arabic: 'اللَّهُمَّ اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي',
        translation: 'O Allah, cover my faults and calm my fears',
        reference: 'Abu Dawud'
      },
      {
        id: 'ashamed-d2',
        arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى',
        translation: 'O Allah, I ask You for guidance, piety, chastity, and self-sufficiency',
        reference: 'Muslim'
      },
      {
        id: 'ashamed-d3',
        arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ مُنْكَرَاتِ الْأَخْلَاقِ وَالْأَعْمَالِ وَالْأَهْوَاءِ',
        translation: 'O Allah, I seek refuge in You from evil manners, deeds, and desires',
        reference: 'Tirmidhi'
      }
    ]
  },

  jealous: {
    id: 'jealous',
    name: 'Jealous',
    icon: '👀',
    color: '#DAA520',
    gradient: 'linear-gradient(135deg, #DAA520, #B8860B)',
    image: images.backgrounds.desert,
    description: 'Protect your heart from envy',
    verses: [
      {
        id: 'jealous-v1',
        arabic: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
        translation: 'And from the evil of an envier when he envies',
        surah: 'Al-Falaq (113:5)'
      },
      {
        id: 'jealous-v2',
        arabic: 'أَمْ يَحْسُدُونَ النَّاسَ عَلَىٰ مَا آتَاهُمُ اللَّهُ مِن فَضْلِهِ',
        translation: 'Or do they envy people for what Allah has given them of His bounty?',
        surah: 'An-Nisa (4:54)'
      },
      {
        id: 'jealous-v3',
        arabic: 'وَدَّ كَثِيرٌ مِّنْ أَهْلِ الْكِتَابِ لَوْ يَرُدُّونَكُم مِّن بَعْدِ إِيمَانِكُمْ كُفَّارًا حَسَدًا مِّنْ عِندِ أَنفُسِهِم',
        translation: 'Many of the People of the Scripture wish they could turn you back to disbelief after you have believed, out of envy from themselves',
        surah: 'Al-Baqarah (2:109)'
      },
      {
        id: 'jealous-v4',
        arabic: 'أَفَلَمْ يَنظُرُوا إِلَى السَّمَاءِ فَوْقَهُمْ كَيْفَ بَنَيْنَاهَا وَزَيَّنَّاهَا وَمَا لَهَا مِن فُرُوجٍ',
        translation: 'Then have they not looked at the heaven above them - how We structured it and adorned it and how it has no rifts?',
        surah: 'Qaf (50:6)'
      },
      {
        id: 'jealous-v5',
        arabic: 'وَلَا تَتَمَنَّوْا مَا فَضَّلَ اللَّهُ بِهِ بَعْضَكُمْ عَلَىٰ بَعْضٍ',
        translation: 'And do not wish for that by which Allah has made some of you exceed others',
        surah: 'An-Nisa (4:32)'
      }
    ],
    hadith: [
      {
        id: 'jealous-h1',
        text: 'إياكم والحسد، فإن الحسد يأكل الحسنات كما تأكل النار الحطب',
        translation: 'Beware of envy, for envy consumes good deeds just as fire consumes wood',
        narrator: 'Abu Dawud'
      },
      {
        id: 'jealous-h2',
        text: 'لا حسد إلا في اثنتين: رجل آتاه الله مالا فسلطه على هلكته في الحق، ورجل آتاه الله حكمة فهو يقضي بها ويعلمها',
        translation: 'There is no envy except in two cases: a man whom Allah has given wealth and enables him to spend it in truth, and a man whom Allah has given wisdom and he judges by it and teaches it',
        narrator: 'Bukhari & Muslim'
      },
      {
        id: 'jealous-h3',
        text: 'إذا نظر أحدكم إلى من فضل عليه في المال والخلق، فلينظر إلى من هو أسفل منه',
        translation: 'If one of you looks at someone who is superior to him in wealth and appearance, let him look at someone who is inferior to him',
        narrator: 'Bukhari & Muslim'
      },
      {
        id: 'jealous-h4',
        text: 'لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه',
        translation: 'None of you truly believes until he loves for his brother what he loves for himself',
        narrator: 'Bukhari & Muslim'
      },
      {
        id: 'jealous-h5',
        text: 'المؤمن للمؤمن كالبنيان يشد بعضه بعضا',
        translation: 'The believer to the believer is like a solid building, one part supporting the other',
        narrator: 'Bukhari & Muslim'
      }
    ],
    duas: [
      {
        id: 'jealous-d1',
        arabic: 'اللَّهُمَّ طَهِّرْ قَلْبِي مِنَ النِّفَاقِ، وَعَمَلِي مِنَ الرِّيَاءِ، وَلِسَانِي مِنَ الْكَذِبِ، وَعَيْنِي مِنَ الْخِيَانَةِ',
        translation: 'O Allah, purify my heart from hypocrisy, my deeds from showing off, my tongue from lies, and my eyes from betrayal',
        reference: 'Ahmad'
      },
      {
        id: 'jealous-d2',
        arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ جَارِ السُّوءِ، وَمِنْ زَوْجٍ تُشَيِّبُنِي قَبْلَ الْمَشِيبِ',
        translation: 'O Allah, I seek refuge in You from a bad neighbor, and from a spouse who makes me grow old before old age',
        reference: 'Ahmad'
      },
      {
        id: 'jealous-d3',
        arabic: 'رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ',
        translation: 'My Lord, make me an establisher of prayer, and my descendants. Our Lord, accept my supplication',
        reference: 'Quran 14:40'
      }
    ]
  }
};

// Comprehensive Duas Collection by Category
const duasByCategory = {
  morning: [
    {
      id: 'm1',
      title: 'Morning Remembrance',
      arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
      translation: 'We have reached the morning and the kingdom belongs to Allah, and praise is due to Allah. There is no god but Allah alone, with no partner. To Him belongs the kingdom and to Him is praise, and He is over all things competent. My Lord, I ask You for the good of this day and the good of what follows it, and I seek refuge in You from the evil of this day and the evil of what follows it. My Lord, I seek refuge in You from laziness and the misery of old age. My Lord, I seek refuge in You from punishment in the Fire and punishment in the grave',
      reference: 'Muslim',
      benefits: 'Protection throughout the day',
      image: images.backgrounds.sunrise
    },
    {
      id: 'm2',
      title: 'Morning Dua',
      arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
      translation: 'O Allah, by You we enter the morning, by You we enter the evening, by You we live, by You we die, and to You is the resurrection',
      reference: 'Tirmidhi',
      benefits: 'Remembrance of Allah throughout the day',
      image: images.backgrounds.sunrise
    },
    {
      id: 'm3',
      title: 'Sayyid al-Istighfar',
      arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي، فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
      translation: 'O Allah, You are my Lord, there is no god but You. You created me and I am Your servant, and I am committed to Your covenant and promise as much as I am able. I seek refuge in You from the evil of what I have done. I acknowledge Your favor upon me, and I acknowledge my sin, so forgive me, for indeed none forgives sins but You',
      reference: 'Bukhari',
      benefits: 'If recited with certainty in the evening and dies that night, enters Paradise',
      image: images.backgrounds.sunrise
    },
    {
      id: 'm4',
      title: 'Morning Dhikr',
      arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ',
      translation: 'Glory and praise be to Allah, as numerous as His creation, as much as pleases Him, as much as the weight of His Throne, and as much as the ink of His words',
      reference: 'Muslim',
      benefits: 'Three times in the morning brings reward like a year of dhikr',
      image: images.backgrounds.sunrise
    },
    {
      id: 'm5',
      title: 'Morning Request',
      arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلاً مُتَقَبَّلاً',
      translation: 'O Allah, I ask You for beneficial knowledge, good provision, and accepted deeds',
      reference: 'Ibn Majah',
      benefits: 'Comprehensive dua for morning',
      image: images.backgrounds.sunrise
    }
  ],

  evening: [
    {
      id: 'e1',
      title: 'Evening Remembrance',
      arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
      translation: 'We have reached the evening and the kingdom belongs to Allah, and praise is due to Allah. There is no god but Allah alone, with no partner. To Him belongs the kingdom and to Him is praise, and He is over all things competent. My Lord, I ask You for the good of this night and the good of what follows it, and I seek refuge in You from the evil of this night and the evil of what follows it. My Lord, I seek refuge in You from laziness and the misery of old age. My Lord, I seek refuge in You from punishment in the Fire and punishment in the grave',
      reference: 'Muslim',
      benefits: 'Protection throughout the night',
      image: images.backgrounds.sunset
    },
    {
      id: 'e2',
      title: 'Evening Dua',
      arabic: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ',
      translation: 'O Allah, by You we enter the evening, by You we live, by You we die, and to You is the return',
      reference: 'Tirmidhi',
      benefits: 'Remembrance of Allah throughout the night',
      image: images.backgrounds.sunset
    },
    {
      id: 'e3',
      title: 'Evening Protection',
      arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
      translation: 'I seek refuge in the perfect words of Allah from the evil of what He has created',
      reference: 'Muslim',
      benefits: 'Three times in the evening protects from harm',
      image: images.backgrounds.sunset
    },
    {
      id: 'e4',
      title: 'Evening Well-being',
      arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ',
      translation: 'O Allah, I ask You for pardon and well-being in this world and the Hereafter',
      reference: 'Abu Dawud',
      benefits: 'Comprehensive dua for evening',
      image: images.backgrounds.sunset
    },
    {
      id: 'e5',
      title: 'Evening Dhikr',
      arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ',
      translation: 'O Allah, You are my Lord, there is no god but You. You created me and I am Your servant, and I am committed to Your covenant and promise as much as I am able',
      reference: 'Bukhari',
      benefits: 'Comprehensive evening dua',
      image: images.backgrounds.sunset
    }
  ],

  sleep: [
    {
      id: 's1',
      title: 'Before Sleep',
      arabic: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ',
      translation: 'In Your name, my Lord, I lay my side, and by You I raise it. If You take my soul, have mercy on it, and if You release it, protect it with that which You protect Your righteous servants',
      reference: 'Bukhari & Muslim',
      benefits: 'Protection during sleep',
      image: images.backgrounds.moon
    },
    {
      id: 's2',
      title: 'Sleep Protection',
      arabic: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ',
      translation: 'O Allah, protect me from Your punishment on the day You resurrect Your servants',
      reference: 'Abu Dawud',
      benefits: 'Three times before sleep',
      image: images.backgrounds.moon
    },
    {
      id: 's3',
      title: 'Ayat-ul-Kursi',
      arabic: 'آيَةُ الْكُرْسِيِّ - اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ',
      translation: 'Ayat-ul-Kursi - Allah! There is no god but Him, the Ever-Living, the Self-Sustaining',
      reference: 'Surah Al-Baqarah 2:255',
      benefits: 'Protection throughout the night, no devil approaches until morning',
      image: images.backgrounds.moon
    },
    {
      id: 's4',
      title: 'Sleep Tasbih',
      arabic: 'سُبْحَانَ اللَّهِ (٣٣) وَالْحَمْدُ لِلَّهِ (٣٣) وَاللَّهُ أَكْبَرُ (٣٤)',
      translation: 'Glory be to Allah (33 times), Praise be to Allah (33 times), Allah is the Greatest (34 times)',
      reference: 'Bukhari & Muslim',
      benefits: 'Better than a servant',
      image: images.backgrounds.moon
    },
    {
      id: 's5',
      title: 'Sleep Surrender',
      arabic: 'اللَّهُمَّ أَسْلَمْتُ نَفْسِي إِلَيْكَ، وَوَجَّهْتُ وَجْهِي إِلَيْكَ، وَفَوَّضْتُ أَمْرِي إِلَيْكَ، وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ، رَغْبَةً وَرَهْبَةً إِلَيْكَ، لَا مَلْجَأَ وَلَا مَنْجَا مِنْكَ إِلَّا إِلَيْكَ، آمَنْتُ بِكِتَابِكَ الَّذِي أَنْزَلْتَ، وَبِنَبِيِّكَ الَّذِي أَرْسَلْتَ',
      translation: 'O Allah, I have submitted myself to You, I have turned my face to You, I have entrusted my affairs to You, and I have leaned my back upon You, out of desire for You and fear of You. There is no refuge or safe haven from You except with You. I believe in Your Book which You revealed and in Your Prophet whom You sent',
      reference: 'Bukhari & Muslim',
      benefits: 'If dies that night, dies upon fitrah',
      image: images.backgrounds.moon
    }
  ],

  tahajjud: [
    {
      id: 't1',
      title: 'Tahajjud Praise',
      arabic: 'اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ نُورُ السَّمَاوَاتِ وَالْأَرْضِ وَمَنْ فِيهِنَّ، وَلَكَ الْحَمْدُ أَنْتَ قَيِّمُ السَّمَاوَاتِ وَالْأَرْضِ وَمَنْ فِيهِنَّ',
      translation: 'O Allah, to You is praise, You are the light of the heavens and the earth and whoever is in them. To You is praise, You are the Sustainer of the heavens and the earth and whoever is in them',
      reference: 'Bukhari',
      benefits: 'Part of the Prophet\'s ﷺ night prayer',
      image: images.backgrounds.stars
    },
    {
      id: 't2',
      title: 'Tahajjud Request',
      arabic: 'اللَّهُمَّ اغْفِرْ لِي، وَاهْدِنِي، وَارْزُقْنِي، وَعَافِنِي، أَعُوذُ بِاللَّهِ مِنْ ضِيقِ الْمَقَامِ يَوْمَ الْقِيَامَةِ',
      translation: 'O Allah, forgive me, guide me, provide for me, and grant me well-being. I seek refuge in Allah from the distress of the standing on the Day of Resurrection',
      reference: 'Abu Dawud',
      benefits: 'Comprehensive dua for night prayer',
      image: images.backgrounds.stars
    },
    {
      id: 't3',
      title: 'Tahajjud Dua',
      arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
      translation: 'Our Lord, give us in this world good and in the Hereafter good and protect us from the punishment of the Fire',
      reference: 'Surah Al-Baqarah 2:201',
      benefits: 'Most frequent dua of the Prophet ﷺ',
      image: images.backgrounds.stars
    },
    {
      id: 't4',
      title: 'Tahajjud Guidance',
      arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى',
      translation: 'O Allah, I ask You for guidance, piety, chastity, and self-sufficiency',
      reference: 'Muslim',
      benefits: 'Comprehensive dua',
      image: images.backgrounds.stars
    },
    {
      id: 't5',
      title: 'Tahajjud Glory',
      arabic: 'سُبْحَانَ ذِي الْمُلْكِ وَالْمَلَكُوتِ، سُبْحَانَ ذِي الْعِزَّةِ وَالْعَظَمَةِ وَالْهَيْبَةِ وَالْقُدْرَةِ، سُبْحَانَ الْمَلِكِ الْحَيِّ الَّذِي لَا يَنَامُ وَلَا يَمُوتُ، سُبُّوحٌ قُدُّوسٌ رَبُّ الْمَلَائِكَةِ وَالرُّوحِ',
      translation: 'Glory be to the Possessor of dominion and sovereignty, Glory be to the Possessor of might and majesty and awe and power, Glory be to the King, the Ever-Living who neither sleeps nor dies, the Most Holy, the Lord of the angels and the Spirit',
      reference: 'Nasai',
      benefits: 'Powerful night prayer dhikr',
      image: images.backgrounds.stars
    }
  ],

  prayer: [
    {
      id: 'p1',
      title: 'Opening Dua',
      arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ',
      translation: 'Glory and praise be to You, O Allah. Blessed is Your name and exalted is Your majesty. There is no god but You',
      reference: 'Abu Dawud',
      benefits: 'Opening supplication in prayer',
      image: images.backgrounds.prayer
    },
    {
      id: 'p2',
      title: 'Ruku Dua',
      arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ (٣ مَرَّاتٍ)',
      translation: 'Glory be to my Lord, the Most Great (3 times)',
      reference: 'Abu Dawud',
      benefits: 'Sunnah in ruku',
      image: images.backgrounds.prayer
    },
    {
      id: 'p3',
      title: 'Sujood Dua',
      arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى (٣ مَرَّاتٍ)',
      translation: 'Glory be to my Lord, the Most High (3 times)',
      reference: 'Abu Dawud',
      benefits: 'Sunnah in sujood',
      image: images.backgrounds.prayer
    },
    {
      id: 'p4',
      title: 'Between Sujood',
      arabic: 'رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي',
      translation: 'My Lord, forgive me. My Lord, forgive me',
      reference: 'Abu Dawud',
      benefits: 'Dua between prostrations',
      image: images.backgrounds.prayer
    },
    {
      id: 'p5',
      title: 'Tashahhud',
      arabic: 'التَّحِيَّاتُ لِلَّهِ، وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
      translation: 'All greetings, prayers and good words are for Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I bear witness that there is no god but Allah, and I bear witness that Muhammad is His servant and Messenger',
      reference: 'Bukhari & Muslim',
      benefits: 'Essential part of prayer',
      image: images.backgrounds.prayer
    }
  ],

  afterSalah: [
    {
      id: 'as1',
      title: 'After Salah Istighfar',
      arabic: 'أَسْتَغْفِرُ اللَّهَ (٣ مَرَّاتٍ) اللَّهُمَّ أَنْتَ السَّلَامُ، وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
      translation: 'I seek forgiveness from Allah (3 times). O Allah, You are Peace and from You is peace. Blessed are You, O Possessor of Majesty and Honor',
      reference: 'Muslim',
      benefits: 'After every salah',
      image: images.backgrounds.hands
    },
    {
      id: 'as2',
      title: 'After Salah Dhikr',
      arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، اللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ، وَلَا مُعْطِيَ لِمَا مَنَعْتَ، وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ',
      translation: 'There is no god but Allah alone, with no partner. To Him belongs the kingdom and to Him is praise, and He is over all things competent. O Allah, there is no preventer of what You give and no giver of what You prevent, and no wealth can benefit the wealthy against You',
      reference: 'Bukhari & Muslim',
      benefits: 'After every salah',
      image: images.backgrounds.hands
    },
    {
      id: 'as3',
      title: 'After Salah Tasbih',
      arabic: 'سُبْحَانَ اللَّهِ (٣٣) وَالْحَمْدُ لِلَّهِ (٣٣) وَاللَّهُ أَكْبَرُ (٣٣) وَلَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
      translation: 'Glory be to Allah (33 times), Praise be to Allah (33 times), Allah is the Greatest (33 times), and complete with: There is no god but Allah alone, with no partner. To Him belongs the kingdom and to Him is praise, and He is over all things competent',
      reference: 'Muslim',
      benefits: 'Sins forgiven even if like foam of the sea',
      image: images.backgrounds.hands
    },
    {
      id: 'as4',
      title: 'After Salah Help',
      arabic: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
      translation: 'O Allah, help me to remember You, to be grateful to You, and to worship You in an excellent manner',
      reference: 'Abu Dawud',
      benefits: 'After salah',
      image: images.backgrounds.hands
    },
    {
      id: 'as5',
      title: 'After Salah Protection',
      arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْبُخْلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ، وَأَعُوذُ بِكَ مِنْ أَنْ أُرَدَّ إِلَى أَرْذَلِ الْعُمُرِ، وَأَعُوذُ بِكَ مِنْ فِتْنَةِ الدُّنْيَا، وَعَذَابِ الْقَبْرِ',
      translation: 'O Allah, I seek refuge in You from miserliness, I seek refuge in You from cowardice, I seek refuge in You from being returned to the worst of life, and I seek refuge in You from the trial of the world and the punishment of the grave',
      reference: 'Bukhari',
      benefits: 'After salah',
      image: images.backgrounds.hands
    }
  ],

  ruqyah: [
    {
      id: 'r1',
      title: 'Ruqyah Healing',
      category: 'General Healing',
      arabic: 'اللَّهُمَّ رَبَّ النَّاسِ، أَذْهِبِ الْبَاسَ، اشْفِهِ وَأَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا',
      translation: 'O Allah, Lord of mankind, remove the harm and heal him, for You are the Healer. There is no healing but Your healing, a healing that leaves no ailment',
      reference: 'Bukhari & Muslim',
      benefits: 'Recite 7 times while blowing on the sick',
      image: images.backgrounds.olives
    },
    {
      id: 'r2',
      title: 'Ruqyah Protection',
      category: 'Protection',
      arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
      translation: 'In the name of Allah, with whose name nothing can harm on earth or in heaven, and He is the All-Hearing, the All-Knowing',
      reference: 'Abu Dawud',
      benefits: 'Three times morning and evening protects from sudden calamity',
      image: images.backgrounds.water
    },
    {
      id: 'r3',
      title: 'Ruqyah Quranic',
      category: 'Quranic Healing',
      arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ * اللَّهُ الصَّمَدُ * لَمْ يَلِدْ وَلَمْ يُولَدْ * وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
      translation: 'Say, "He is Allah, [who is] One, Allah, the Eternal Refuge. He neither begets nor is born, Nor is there to Him any equivalent"',
      reference: 'Surah Al-Ikhlas',
      benefits: 'Recite 3 times for protection',
      image: images.backgrounds.quran
    },
    {
      id: 'r4',
      title: 'Ruqyah Evil Eye',
      category: 'Evil Eye',
      arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ، وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ',
      translation: 'I seek refuge in the perfect words of Allah from every devil, every poisonous creature, and from every evil eye',
      reference: 'Bukhari',
      benefits: 'Protection from evil eye',
      image: images.backgrounds.olives
    },
    {
      id: 'r5',
      title: 'Ruqyah Diseases',
      category: 'Comprehensive Protection',
      arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْبَرَصِ، وَالْجُنُونِ، وَالْجُذَامِ، وَمِنْ سَيِّئِ الْأَسْقَامِ',
      translation: 'O Allah, I seek refuge in You from leprosy, madness, elephantiasis, and from evil diseases',
      reference: 'Abu Dawud',
      benefits: 'Daily protection from diseases',
      image: images.backgrounds.water
    }
  ],

  salawat: [
    {
      id: 'sl1',
      title: 'Salat al-Ibrahimiyya',
      arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ',
      translation: 'O Allah, send blessings upon Muhammad and the family of Muhammad, as You sent blessings upon Ibrahim and the family of Ibrahim. Indeed, You are Praiseworthy and Glorious. O Allah, bless Muhammad and the family of Muhammad, as You blessed Ibrahim and the family of Ibrahim. Indeed, You are Praiseworthy and Glorious',
      reference: 'Bukhari',
      reward: '10 blessings from Allah',
      image: images.backgrounds.kaaba
    },
    {
      id: 'sl2',
      title: 'Salat al-Fatih',
      arabic: 'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ، الْفَاتِحِ لِمَا أُغْلِقَ، وَالْخَاتِمِ لِمَا سَبَقَ، نَاصِرِ الْحَقِّ بِالْحَقِّ، وَالْهَادِي إِلَى صِرَاطِكَ الْمُسْتَقِيمِ، وَعَلَى آلِهِ حَقَّ قَدْرِهِ وَمِقْدَارِهِ الْعَظِيمِ',
      translation: 'O Allah, send blessings upon our master Muhammad, who opened what was closed, and who is the seal of what came before, the helper of truth by truth, and the guide to Your straight path, and upon his family, according to his immense status and greatness',
      reference: 'Scholars',
      reward: 'Erases 1000 sins',
      image: images.backgrounds.blueMosque
    },
    {
      id: 'sl3',
      title: 'Salat al-Nariyya',
      arabic: 'اللَّهُمَّ صَلِّ صَلاَةً كَامِلَةً، وَسَلِّمْ سَلاَمًا تَامًّا، عَلَى سَيِّدِنَا مُحَمَّدٍ الَّذِي تَنْحَلُّ بِهِ الْعُقَدُ، وَتَنْفَرِجُ بِهِ الْكُرَبُ، وَتُقْضَى بِهِ الْحَوَائِجُ، وَتُنَالُ بِهِ الرَّغَائِبُ وَحُسْنُ الْخَوَاتِيمِ',
      translation: 'O Allah, send perfect blessings and complete peace upon our master Muhammad, by whom knots are untied, difficulties are resolved, needs are fulfilled, and desires are attained, and beautiful endings',
      reference: 'Scholars',
      reward: 'Relieves distress',
      image: images.backgrounds.greenMosque
    },
    {
      id: 'sl4',
      title: 'Salat al-Tunajjina',
      arabic: 'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ، صَلاَةً تُنْجِينَا بِهَا مِنْ جَمِيعِ الأَهْوَالِ وَالآفَاتِ، وَتَقْضِي لَنَا بِهَا جَمِيعَ الْحَاجَاتِ',
      translation: 'O Allah, send blessings upon our master Muhammad, a prayer by which You save us from all fears and calamities, and by which You fulfill all our needs',
      reference: 'Scholars',
      reward: 'Protection from calamities',
      image: images.backgrounds.madina
    },
    {
      id: 'sl5',
      title: 'Salat al-Dua',
      arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ',
      translation: 'O Allah, send blessings upon Muhammad and the family of Muhammad, as You sent blessings upon Ibrahim and the family of Ibrahim. Indeed, You are Praiseworthy and Glorious',
      reference: 'Bukhari',
      reward: 'Dua is accepted',
      image: images.backgrounds.kaaba
    }
  ],

  istighfar: [
    {
      id: 'i1',
      title: 'Sayyid al-Istighfar',
      arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي، فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
      translation: 'O Allah, You are my Lord, there is no god but You. You created me and I am Your servant, and I am committed to Your covenant and promise as much as I am able. I seek refuge in You from the evil of what I have done. I acknowledge Your favor upon me, and I acknowledge my sin, so forgive me, for indeed none forgives sins but You',
      reference: 'Bukhari',
      reward: 'Paradise if recited with certainty in the evening and dies that night',
      image: images.backgrounds.water
    },
    {
      id: 'i2',
      title: 'Istighfar',
      arabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ',
      translation: 'I seek forgiveness from Allah, the Great, there is no god but Him, the Living, the Self-Sustaining, and I repent to Him',
      reference: 'Abu Dawud',
      reward: 'Forgiven even if he fled from battle',
      image: images.backgrounds.water
    },
    {
      id: 'i3',
      title: 'Repentance',
      arabic: 'رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ',
      translation: 'My Lord, forgive me and accept my repentance. Indeed, You are the Acceptor of Repentance, the Merciful',
      reference: 'Abu Dawud',
      reward: '100 times daily brings forgiveness',
      image: images.backgrounds.water
    },
    {
      id: 'i4',
      title: 'Forgiveness',
      arabic: 'اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا، وَلَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ، فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدِكَ، وَارْحَمْنِي إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ',
      translation: 'O Allah, I have greatly wronged myself, and none forgives sins but You. So grant me forgiveness from You and have mercy on me. Indeed, You are the Forgiving, the Merciful',
      reference: 'Bukhari & Muslim',
      reward: 'Best dua for forgiveness',
      image: images.backgrounds.water
    },
    {
      id: 'i5',
      title: 'Comprehensive Forgiveness',
      arabic: 'اللَّهُمَّ اغْفِرْ لِي خَطِيئَتِي وَجَهْلِي، وَإِسْرَافِي فِي أَمْرِي، وَمَا أَنْتَ أَعْلَمُ بِهِ مِنِّي',
      translation: 'O Allah, forgive my sins, my ignorance, my excesses in my affairs, and what You know better than me',
      reference: 'Bukhari',
      reward: 'Comprehensive forgiveness',
      image: images.backgrounds.water
    }
  ],

  quranic: [
    {
      id: 'q1',
      title: 'Dua for Good',
      surah: 'Al-Baqarah 2:201',
      arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
      translation: 'Our Lord, give us in this world good and in the Hereafter good and protect us from the punishment of the Fire',
      context: 'Most frequent dua of the Prophet ﷺ',
      image: images.backgrounds.quran
    },
    {
      id: 'q2',
      title: 'Dua for Steadfastness',
      surah: 'Al-Imran 3:8',
      arabic: 'رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ',
      translation: 'Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy. Indeed, You are the Bestower',
      context: 'Dua for steadfastness',
      image: images.backgrounds.quran
    },
    {
      id: 'q3',
      title: 'Dua for Forgiveness',
      surah: 'Al-Imran 3:193',
      arabic: 'رَبَّنَا فَاغْفِرْ لَنَا ذُنُوبَنَا وَكَفِّرْ عَنَّا سَيِّئَاتِنَا وَتَوَفَّنَا مَعَ الْأَبْرَارِ',
      translation: 'Our Lord, forgive us our sins and remove from us our misdeeds and cause us to die with the righteous',
      context: 'Dua for forgiveness and good end',
      image: images.backgrounds.quran
    },
    {
      id: 'q4',
      title: 'Dua for Protection',
      surah: 'Al-Muminun 23:97-98',
      arabic: 'رَّبِّ أَعُوذُ بِكَ مِنْ هَمَزَاتِ الشَّيَاطِينِ وَأَعُوذُ بِكَ رَبِّ أَن يَحْضُرُونِ',
      translation: 'My Lord, I seek refuge in You from the incitements of the devils, and I seek refuge in You, my Lord, lest they be present with me',
      context: 'Protection from devils',
      image: images.backgrounds.quran
    },
    {
      id: 'q5',
      title: 'Dua for Family',
      surah: 'Al-Furqan 25:74',
      arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
      translation: 'Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous',
      context: 'Dua for righteous family',
      image: images.backgrounds.quran
    }
  ],

  dhikr: [
    {
      id: 'd1',
      title: 'Tahlil',
      arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
      translation: 'There is no god but Allah alone, with no partner. To Him belongs the kingdom and to Him is praise, and He is over all things competent',
      times: '100 times daily',
      reward: 'Like freeing 10 slaves, 100 good deeds, 100 sins erased, protection from devil that day',
      image: images.backgrounds.tasbih
    },
    {
      id: 'd2',
      title: 'Tasbih',
      arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
      translation: 'Glory and praise be to Allah',
      times: '100 times daily',
      reward: 'Sins forgiven even if like foam of the sea',
      image: images.backgrounds.tasbih
    },
    {
      id: 'd3',
      title: 'Tasbih',
      arabic: 'سُبْحَانَ اللَّهِ الْعَظِيمِ وَبِحَمْدِهِ',
      translation: 'Glory be to Allah, the Great, and praise be to Him',
      times: 'Light on tongue, heavy on scales',
      reward: 'A palm tree planted in Paradise',
      image: images.backgrounds.tasbih
    },
    {
      id: 'd4',
      title: 'Hawqalah',
      arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
      translation: 'There is no power nor strength except with Allah',
      times: 'A treasure of Paradise',
      reward: 'Removes poverty, relieves distress',
      image: images.backgrounds.tasbih
    },
    {
      id: 'd5',
      title: 'Hasbiyallah',
      arabic: 'حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
      translation: 'Allah is sufficient for me, there is no god but Him, upon Him I rely, and He is the Lord of the Great Throne',
      times: '7 times morning/evening',
      reward: 'Allah suffices him from what concerns him',
      image: images.backgrounds.tasbih
    }
  ],

  ummah: [
    {
      id: 'u1',
      title: 'For Unity of Ummah',
      arabic: 'اللَّهُمَّ أَلِّفْ بَيْنَ قُلُوبِنَا، وَأَصْلِحْ ذَاتَ بَيْنِنَا، وَاهْدِنَا سُبُلَ السَّلَامِ، وَنَجِّنَا مِنَ الظُّلُمَاتِ إِلَى النُّورِ',
      translation: 'O Allah, unite our hearts, reconcile our affairs, guide us to the paths of peace, and save us from darkness to light',
      reference: 'Muslim',
      image: images.backgrounds.kaaba
    },
    {
      id: 'u2',
      title: 'For Protection of Ummah',
      arabic: 'اللَّهُمَّ احْفَظْ إِخْوَانَنَا فِي كُلِّ مَكَان، اللَّهُمَّ انْصُرْهُمْ، اللَّهُمَّ كُنْ لَهُمْ وَلَا تَكُنْ عَلَيْهِمْ',
      translation: 'O Allah, protect our brothers and sisters everywhere. O Allah, grant them victory. O Allah, be for them and not against them',
      reference: 'Quran & Sunnah',
      image: images.backgrounds.blueMosque
    },
    {
      id: 'u3',
      title: 'For Guidance of Ummah',
      arabic: 'اللَّهُمَّ اهْدِ أُمَّةَ مُحَمَّدٍ، اللَّهُمَّ ارْحَمْ أُمَّةَ مُحَمَّدٍ',
      translation: 'O Allah, guide the Ummah of Muhammad ﷺ. O Allah, have mercy on the Ummah of Muhammad ﷺ',
      reference: 'Ahmad',
      image: images.backgrounds.greenMosque
    },
    {
      id: 'u4',
      title: 'For Relief of Ummah',
      arabic: 'اللَّهُمَّ فَرِّجْ عَنْ أُمَّةِ مُحَمَّدٍ، اللَّهُمَّ ارْفَعْ عَنْهُمُ الْبَلَاءَ وَالْغَلَاءَ وَالْوَبَاءَ',
      translation: 'O Allah, grant relief to the Ummah of Muhammad. O Allah, remove from them trials, high prices, and epidemics',
      reference: 'Scholars',
      image: images.backgrounds.kaaba
    },
    {
      id: 'u5',
      title: 'For Strength of Ummah',
      arabic: 'اللَّهُمَّ أَعِزَّ الْإِسْلَامَ وَالْمُسْلِمِينَ، وَأَذِلَّ الشِّرْكَ وَالْمُشْرِكِينَ',
      translation: 'O Allah, honor Islam and the Muslims, and humiliate shirk and the polytheists',
      reference: 'Scholars',
      image: images.backgrounds.blueMosque
    }
  ],

  travel: [
    {
      id: 'tr1',
      title: 'Before Journey',
      arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنقَلِبُونَ',
      translation: 'Glory be to Him who has subjected this to us, and we could never have it (by our efforts). Indeed, to our Lord we will return',
      reference: 'Quran 43:13-14',
      benefits: 'Recite when mounting any vehicle',
      image: images.backgrounds.desert
    },
    {
      id: 'tr2',
      title: 'During Travel',
      arabic: 'اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ',
      translation: 'O Allah, we ask You for righteousness and piety in this journey of ours, and for deeds that please You. O Allah, make this journey easy for us and shorten its distance',
      reference: 'Muslim',
      benefits: 'Protection and ease during travel',
      image: images.backgrounds.desert
    },
    {
      id: 'tr3',
      title: 'Returning from Travel',
      arabic: 'آيِبُونَ تَائِبُونَ عَابِدُونَ لِرَبِّنَا حَامِدُونَ',
      translation: 'We are returning, repenting, worshipping, and praising our Lord',
      reference: 'Muslim',
      benefits: 'Sunnah upon returning',
      image: images.backgrounds.kaaba
    },
    {
      id: 'tr4',
      title: 'Protection in Travel',
      arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
      translation: 'I seek refuge in the perfect words of Allah from the evil of what He has created',
      reference: 'Muslim',
      benefits: 'Protection throughout journey',
      image: images.backgrounds.desert
    },
    {
      id: 'tr5',
      title: 'For Safe Return',
      arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ وَعْثَاءِ السَّفَرِ، وَكَآبَةِ الْمَنْظَرِ، وَسُوءِ الْمُنْقَلَبِ فِي الْمَالِ وَالْأَهْلِ',
      translation: 'O Allah, I seek refuge in You from the hardships of travel, from a distressing scene, and from an unhappy return concerning wealth and family',
      reference: 'Muslim',
      benefits: 'Protection from travel hardships',
      image: images.backgrounds.desert
    }
  ],

  food: [
    {
      id: 'f1',
      title: 'Before Eating',
      arabic: 'بِسْمِ اللَّهِ',
      translation: 'In the name of Allah',
      reference: 'Bukhari & Muslim',
      benefits: 'Suffices for the meal, keeps devils away',
      image: images.backgrounds.olives
    },
    {
      id: 'f2',
      title: 'If Forget Before Eating',
      arabic: 'بِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ',
      translation: 'In the name of Allah at its beginning and its end',
      reference: 'Abu Dawud',
      benefits: 'Makes up for forgetting Bismillah',
      image: images.backgrounds.dates
    },
    {
      id: 'f3',
      title: 'After Eating',
      arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
      translation: 'Praise be to Allah who has fed me this and provided it for me without any power or strength from me',
      reference: 'Abu Dawud',
      benefits: 'Past and future sins forgiven',
      image: images.backgrounds.olives
    },
    {
      id: 'f4',
      title: 'When Drinking Milk',
      arabic: 'اللَّهُمَّ بَارِكْ لَنَا فِيهِ وَزِدْنَا مِنْهُ',
      translation: 'O Allah, bless us in it and give us more of it',
      reference: 'Abu Dawud',
      benefits: 'Blessing in provision',
      image: images.backgrounds.water
    },
    {
      id: 'f5',
      title: 'When Breaking Fast',
      arabic: 'ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ',
      translation: 'Thirst is gone, the veins are moistened, and the reward is certain, if Allah wills',
      reference: 'Abu Dawud',
      benefits: 'Dua for iftar',
      image: images.backgrounds.dates
    }
  ],

  enteringHome: [
    {
      id: 'h1',
      title: 'Entering Home',
      arabic: 'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا',
      translation: 'In the name of Allah we enter, in the name of Allah we leave, and upon our Lord we rely',
      reference: 'Abu Dawud',
      benefits: 'Protection and blessings in home',
      image: images.backgrounds.peace
    },
    {
      id: 'h2',
      title: 'Greeting Family',
      arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ',
      translation: 'Peace be upon you and the mercy of Allah and His blessings',
      reference: 'Quran',
      benefits: 'Blessings enter the home',
      image: images.backgrounds.peace
    },
    {
      id: 'h3',
      title: 'Seeking Protection',
      arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
      translation: 'I seek refuge in the perfect words of Allah from the evil of what He has created',
      reference: 'Muslim',
      benefits: 'Protects home from harm',
      image: images.backgrounds.peace
    },
    {
      id: 'h4',
      title: 'For Barakah in Home',
      arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلَجِ وَخَيْرَ الْمَخْرَجِ، بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا',
      translation: 'O Allah, I ask You for the best of entering and the best of leaving. In the name of Allah we enter, in the name of Allah we leave, and upon Allah our Lord we rely',
      reference: 'Abu Dawud',
      benefits: 'Blessings upon entering/leaving',
      image: images.backgrounds.peace
    },
    {
      id: 'h5',
      title: 'When Feeling Lonely in Home',
      arabic: 'سُبْحَانَ الْمَلِكِ الْقُدُّوسِ، رَبِّ الْمَلَائِكَةِ وَالرُّوحِ',
      translation: 'Glory be to the King, the Holy, Lord of the angels and the Spirit',
      reference: 'Nasai',
      benefits: 'Brings peace and comfort',
      image: images.backgrounds.stars
    }
  ],

  rain: [
    {
      id: 'rn1',
      title: 'When it Rains',
      arabic: 'اللَّهُمَّ صَيِّبًا نَافِعًا',
      translation: 'O Allah, beneficial rain',
      reference: 'Bukhari',
      benefits: 'Rain becomes beneficial',
      image: images.backgrounds.water
    },
    {
      id: 'rn2',
      title: 'After Rain',
      arabic: 'مُطِرْنَا بِفَضْلِ اللَّهِ وَرَحْمَتِهِ',
      translation: 'We have been given rain by the grace and mercy of Allah',
      reference: 'Bukhari',
      benefits: 'Gratitude for rain',
      image: images.backgrounds.water
    },
    {
      id: 'rn3',
      title: 'During Thunder',
      arabic: 'سُبْحَانَ الَّذِي يُسَبِّحُ الرَّعْدُ بِحَمْدِهِ وَالْمَلَائِكَةُ مِنْ خِيفَتِهِ',
      translation: 'Glory be to Him whom thunder glorifies with His praise, and the angels from fear of Him',
      reference: 'Scholars',
      benefits: 'Protection during thunder',
      image: images.backgrounds.stars
    },
    {
      id: 'rn4',
      title: 'When Wind Blows',
      arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا، وَخَيْرَ مَا فِيهَا، وَخَيْرَ مَا أُرْسِلَتْ بِهِ، وَأَعُوذُ بِكَ مِنْ شَرِّهَا، وَشَرِّ مَا فِيهَا، وَشَرِّ مَا أُرْسِلَتْ بِهِ',
      translation: 'O Allah, I ask You for the good of it, the good of what is in it, and the good of what it is sent with. And I seek refuge in You from the evil of it, the evil of what is in it, and the evil of what it is sent with',
      reference: 'Muslim',
      benefits: 'Protection from harmful wind',
      image: images.backgrounds.desert
    },
    {
      id: 'rn5',
      title: 'Prayer for Rain',
      arabic: 'اللَّهُمَّ اسْقِنَا غَيْثًا مُغِيثًا مَرِيئًا نَافِعًا غَيْرَ ضَارٍّ عَاجِلًا غَيْرَ آجِلٍ',
      translation: 'O Allah, give us beneficial, healthy, useful, non-harmful rain, soon, not delayed',
      reference: 'Abu Dawud',
      benefits: 'Dua for rain',
      image: images.backgrounds.water
    }
  ]
};

// Daily Hadith collection
const dailyHadith = [
  { id: 'h1', text: "The best among you are those who learn the Quran and teach it", narrator: "Bukhari" },
  { id: 'h2', text: "A believer is not stung twice from the same hole", narrator: "Bukhari & Muslim" },
  { id: 'h3', text: "Cleanliness is half of faith", narrator: "Muslim" },
  { id: 'h4', text: "The strong person is not the one who can overpower others, but the one who controls himself when angry", narrator: "Bukhari & Muslim" },
  { id: 'h5', text: "None of you truly believes until he loves for his brother what he loves for himself", narrator: "Bukhari & Muslim" },
  { id: 'h6', text: "Speak good or remain silent", narrator: "Bukhari & Muslim" },
  { id: 'h7', text: "The most complete of believers in faith are those with the best character", narrator: "Tirmidhi" },
  { id: 'h8', text: "Charity does not decrease wealth", narrator: "Muslim" },
  { id: 'h9', text: "Seek knowledge from the cradle to the grave", narrator: "Ibn Majah" },
  { id: 'h10', text: "The best of deeds is to bring happiness to a believer", narrator: "Tabarani" },
  { id: 'h11', text: "Beware of envy, for envy consumes good deeds just as fire consumes wood", narrator: "Abu Dawud" },
  { id: 'h12', text: "The believer is not a slanderer, nor does he curse, nor is he obscene or vulgar", narrator: "Tirmidhi" },
  { id: 'h13', text: "Make things easy and do not make them difficult, give glad tidings and do not make people flee", narrator: "Bukhari" },
  { id: 'h14', text: "Whoever believes in Allah and the Last Day should speak good or remain silent", narrator: "Bukhari & Muslim" },
  { id: 'h15', text: "The best of you are those who are best to their families, and I am the best to my family", narrator: "Tirmidhi" }
];

// Daily Quranic verses
const dailyVerses = [
  { id: 'v1', text: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", translation: "Indeed, with hardship comes ease", surah: "Ash-Sharh", verse: "94:6" },
  { id: 'v2', text: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", translation: "For indeed, with hardship comes ease", surah: "Ash-Sharh", verse: "94:5" },
  { id: 'v3', text: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا", translation: "And whoever fears Allah, He will make for him a way out", surah: "At-Talaq", verse: "65:2" },
  { id: 'v4', text: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ", translation: "And whoever relies upon Allah, then He is sufficient for him", surah: "At-Talaq", verse: "65:3" },
  { id: 'v5', text: "إِنَّ اللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا مَا بِأَنفُسِهِمْ", translation: "Indeed, Allah will not change the condition of a people until they change what is in themselves", surah: "Ar-Ra'd", verse: "13:11" },
  { id: 'v6', text: "وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ", translation: "And your Lord says, 'Call upon Me; I will respond to you'", surah: "Ghafir", verse: "40:60" },
  { id: 'v7', text: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ", translation: "Indeed, Allah is with the patient", surah: "Al-Baqarah", verse: "2:153" },
  { id: 'v8', text: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ", translation: "So do not weaken and do not grieve, and you will be superior", surah: "Aal-E-Imran", verse: "3:139" },
  { id: 'v9', text: "وَعَسَىٰ أَن تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَّكُمْ", translation: "But perhaps you hate a thing and it is good for you", surah: "Al-Baqarah", verse: "2:216" },
  { id: 'v10', text: "فَاذْكُرُونِي أَذْكُرْكُمْ", translation: "So remember Me; I will remember you", surah: "Al-Baqarah", verse: "2:152" }
];

// Daily reminders
const dailyReminders = [
  { id: 'r1', text: "Remember Allah in every moment - He is always with you" },
  { id: 'r2', text: "Pray the five daily prayers on time" },
  { id: 'r3', text: "Read at least one page of the Quran today" },
  { id: 'r4', text: "Make dua for your parents and loved ones" },
  { id: 'r5', text: "Seek forgiveness (Istighfar) throughout the day" },
  { id: 'r6', text: "Give charity, even if it's small" },
  { id: 'r7', text: "Smile - it's Sunnah and a form of charity" },
  { id: 'r8', text: "Lower your gaze and guard your modesty" },
  { id: 'r9', text: "Speak kindly and avoid backbiting" },
  { id: 'r10', text: "Help someone in need today" },
  { id: 'r11', text: "Make dhikr while driving or waiting" },
  { id: 'r12', text: "Pray your sunnah prayers for extra rewards" },
  { id: 'r13', text: "Visit a sick person or call someone who is ill" },
  { id: 'r14', text: "Read Surah Al-Kahf on Friday" },
  { id: 'r15', text: "Fast on Mondays and Thursdays if possible" },
  { id: 'r16', text: "Call your parents and tell them you love them" },
  { id: 'r17', text: "Forgive someone who has wronged you" },
  { id: 'r18', text: "Make sincere repentance (Tawbah) today" },
  { id: 'r19', text: "Learn a new dua and its meaning" },
  { id: 'r20', text: "Teach someone something about Islam" }
];

const IslamicApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [activeEmotion, setActiveEmotion] = useState(null);
  const [activeNamesCategory, setActiveNamesCategory] = useState(null);
  const [activeSurah, setActiveSurah] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [bookmarks, setBookmarks] = useState([]);
  const [zikrCounts, setZikrCounts] = useState({});
  const [dailyContent, setDailyContent] = useState({
    reminder: null,
    hadith: null,
    verse: null
  });
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [nextPrayer, setNextPrayer] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'detail'
  const [surahVerses, setSurahVerses] = useState([]);
  const [quranLoading, setQuranLoading] = useState(false);
  const [quranSearchQuery, setQuranSearchQuery] = useState('');

  // News/Reels related state
  const [newsArticles, setNewsArticles] = useState([]);
  const [newsLoading, setNewsLoading] = useState(false);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [newsError, setNewsError] = useState(null);
  const [newsCategories, setNewsCategories] = useState([
    { id: 'all', name: 'All News' },
    { id: 'world', name: 'World' },
    { id: 'community', name: 'Community' },
    { id: 'events', name: 'Events' },
    { id: 'education', name: 'Education' }
  ]);
  const [selectedNewsCategory, setSelectedNewsCategory] = useState('all');
  const [newsLikes, setNewsLikes] = useState({});
  const [newsComments, setNewsComments] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [currentComment, setCurrentComment] = useState('');
  const [newsShares, setNewsShares] = useState({});
  const [newsMuted, setNewsMuted] = useState(false);

  useEffect(() => {
    fetchDailyContent();
    getUserLocation();
    fetchNews();
  }, []);

  const fetchNews = async (category = 'all') => {
    setNewsLoading(true);
    setNewsError(null);
    try {
      // Using NewsAPI.org via our backend
      // Your backend server.js now uses NewsAPI.org
      const url = `${API_URL}/news?category=${category}&limit=50`;

      console.log('Fetching news from:', url);

      const response = await fetch(url);
      const data = await response.json();

      if (data && data.data && data.data.length > 0) {
        console.log('News fetched successfully:', data.data.length, 'articles');
        setNewsArticles(data.data);
      } else {
        console.log('No news articles found, using sample data');
        // Fallback to sample data if API returns no articles
        const sampleResponse = await fetch(`${API_URL}/news/sample`);
        const sampleData = await sampleResponse.json();
        setNewsArticles(sampleData.data || []);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      setNewsError('Failed to load news. Please try again.');

      // Set sample data as fallback
      try {
        const sampleResponse = await fetch(`${API_URL}/news/sample`);
        const sampleData = await sampleResponse.json();
        setNewsArticles(sampleData.data || []);
      } catch (sampleError) {
        console.error('Error fetching sample news:', sampleError);
        // Ultimate fallback - empty array
        setNewsArticles([]);
      }
    } finally {
      setNewsLoading(false);
    }
  };

  const handleNewsSwipe = (direction) => {
    if (direction === 'up' && currentNewsIndex < newsArticles.length - 1) {
      setCurrentNewsIndex(prev => prev + 1);
    } else if (direction === 'down' && currentNewsIndex > 0) {
      setCurrentNewsIndex(prev => prev - 1);
    }
  };

  const handleNewsLike = (newsId) => {
    setNewsLikes(prev => ({
      ...prev,
      [newsId]: (prev[newsId] || 0) + 1
    }));
  };

  const handleNewsShare = (newsId) => {
    setNewsShares(prev => ({
      ...prev,
      [newsId]: (prev[newsId] || 0) + 1
    }));

    // Open share dialog if available
    if (navigator.share) {
      const article = newsArticles.find(a => a.uuid === newsId);
      navigator.share({
        title: article.title,
        text: article.description,
        url: article.url
      }).catch(console.error);
    } else {
      // Fallback - copy to clipboard
      const article = newsArticles.find(a => a.uuid === newsId);
      navigator.clipboard.writeText(article.url);
      alert('Link copied to clipboard!');
    }
  };

  const handleNewsComment = (newsId) => {
    if (currentComment.trim()) {
      setNewsComments(prev => ({
        ...prev,
        [newsId]: [...(prev[newsId] || []), {
          id: Date.now(),
          text: currentComment,
          timestamp: new Date().toISOString()
        }]
      }));
      setCurrentComment('');
      setShowComments(false);
    }
  };

  const fetchDailyContent = () => {
    const randomReminder = dailyReminders[Math.floor(Math.random() * dailyReminders.length)];
    const randomHadith = dailyHadith[Math.floor(Math.random() * dailyHadith.length)];
    const randomVerse = dailyVerses[Math.floor(Math.random() * dailyVerses.length)];

    setDailyContent({
      reminder: randomReminder,
      hadith: randomHadith,
      verse: randomVerse
    });
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setUserLocation(location);
          calculatePrayerTimes(location);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to Mecca
          const defaultLocation = { latitude: 21.4225, longitude: 39.8262 };
          setUserLocation(defaultLocation);
          calculatePrayerTimes(defaultLocation);
        }
      );
    }
  };

  const calculatePrayerTimes = (location) => {
    // Simplified prayer times for demo
    const times = {
      Fajr: "05:30",
      Dhuhr: "12:30",
      Asr: "15:45",
      Maghrib: "18:15",
      Isha: "19:45"
    };
    setPrayerTimes(times);

    // Calculate next prayer
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const prayerOrder = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    let next = null;

    for (let prayer of prayerOrder) {
      const [hours, minutes] = times[prayer].split(':').map(Number);
      const prayerTime = hours * 60 + minutes;

      if (prayerTime > currentTime) {
        next = { name: prayer, time: times[prayer] };
        break;
      }
    }

    if (!next) {
      next = { name: 'Fajr (Tomorrow)', time: times.Fajr };
    }

    setNextPrayer(next);
  };

  const fetchSurahVerses = async (surahId) => {
    setQuranLoading(true);
    try {
      // Using Fawazahmed0 Quran API
      const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranuthmanihaf/${surahId}.json`);
      const data = await response.json();

      // Format verses with verse numbers
      const verses = data.chapter.map((verse, index) => ({
        id: index + 1,
        number: index + 1,
        arabic: verse.text,
        surahId: surahId
      }));

      setSurahVerses(verses);
    } catch (error) {
      console.error('Error fetching Quran:', error);
      // Fallback to local data if API fails
      const fallbackVerses = [];
      for (let i = 1; i <= 7; i++) {
        fallbackVerses.push({
          id: i,
          number: i,
          arabic: `آيَةُ ${i}`,
          surahId: surahId
        });
      }
      setSurahVerses(fallbackVerses);
    }
    setQuranLoading(false);
  };

  const incrementZikr = (id) => {
    setZikrCounts(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const resetZikr = (id) => {
    setZikrCounts(prev => ({
      ...prev,
      [id]: 0
    }));
  };

  const toggleBookmark = (item) => {
    if (bookmarks.some(b => b.id === item.id)) {
      setBookmarks(bookmarks.filter(b => b.id !== item.id));
    } else {
      setBookmarks([...bookmarks, { ...item, bookmarkedAt: new Date() }]);
    }
  };

  const handleBack = () => {
    if (activeSurah) {
      setActiveSurah(null);
      setSurahVerses([]);
    } else if (activeItem) {
      setActiveItem(null);
    } else if (activeEmotion) {
      setActiveEmotion(null);
    } else if (activeCategory) {
      setActiveCategory(null);
    } else if (activeNamesCategory) {
      setActiveNamesCategory(null);
    } else {
      setActiveTab('home');
    }
    setViewMode('grid');
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setActiveItem(null);
    setActiveEmotion(null);
    setActiveNamesCategory(null);
    setActiveSurah(null);
    setViewMode('grid');
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
    setViewMode('detail');
  };

  const handleEmotionClick = (emotionKey) => {
    setActiveEmotion(emotionKey);
    setActiveItem(null);
    setActiveCategory(null);
    setActiveNamesCategory(null);
    setActiveSurah(null);
    setViewMode('detail');
  };

  const handleNamesCategoryClick = (category) => {
    setActiveNamesCategory(category);
    setActiveItem(null);
    setActiveEmotion(null);
    setActiveCategory(null);
    setActiveSurah(null);
    setViewMode('grid');
  };

  const handleNameClick = (name) => {
    setActiveItem({
      ...name,
      title: name.name,
      category: name.category,
      image: images.backgrounds.geometricGold
    });
    setViewMode('detail');
  };

  const handleSurahClick = (surah) => {
    setActiveSurah(surah);
    setActiveItem(null);
    setActiveEmotion(null);
    setActiveCategory(null);
    setActiveNamesCategory(null);
    fetchSurahVerses(surah.id);
    setViewMode('detail');
  };

  const renderHeader = () => (
    <header className="header" style={{ backgroundImage: `url(${images.backgrounds.premiumGold})` }}>
      <div className="header-overlay"></div>
      <div className="header-content">
        <div className="header-top">
          <button className="menu-toggle" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>

          <div className="header-title">
            {(activeItem || activeEmotion || activeCategory || activeNamesCategory || activeSurah) && (
              <button className="back-button" onClick={handleBack}>
                <ArrowLeft size={20} />
                <span>Back</span>
              </button>
            )}
            <h1 className="app-title">
              {activeItem ? activeItem.title || 'Details' :
                activeSurah ? `Surah ${activeSurah.name}` :
                  activeEmotion ? emotionsData[activeEmotion]?.name :
                    activeCategory ? `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}` :
                      activeNamesCategory ? namesCategories.find(c => c.id === activeNamesCategory)?.title :
                        activeTab === 'news' ? 'Islamic News' :
                          'إسلامي'}
            </h1>
            <span className="app-subtitle">
              {activeItem ? 'Item Details' :
                activeSurah ? `Surah ${activeSurah.translation}` :
                  activeEmotion ? 'Emotional Healing' :
                    activeCategory ? 'Collection' :
                      activeNamesCategory ? 'Names of Allah' :
                        activeTab === 'news' ? 'Swipe for more news' :
                          'Your Spiritual Companion'}
            </span>
          </div>

          <div className="header-actions">
            <button className="search-toggle" onClick={() => setShowSearch(!showSearch)}>
              <Search size={20} />
            </button>
            <button className="notification-btn" onClick={() => setNotifications(!notifications)}>
              <Bell size={20} />
              {notifications && <span className="notification-dot" />}
            </button>
          </div>
        </div>

        {showSearch && (
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search duas, hadith, verses, names..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button className="close-search" onClick={() => setShowSearch(false)}>
              <X size={18} />
            </button>
          </div>
        )}
      </div>
    </header>
  );

  const renderSidebar = () => (
    <>
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">Menu</h2>
          <button className="close-sidebar" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <div className="sidebar-menu">
          <button className="menu-item" onClick={() => { setActiveTab('home'); setSidebarOpen(false); setActiveCategory(null); setActiveItem(null); setActiveEmotion(null); setActiveNamesCategory(null); setActiveSurah(null); }}>
            <Home size={20} /> Home
          </button>
          <button className="menu-item" onClick={() => { setActiveTab('quran'); setSidebarOpen(false); setActiveCategory(null); setActiveItem(null); setActiveEmotion(null); setActiveNamesCategory(null); setActiveSurah(null); }}>
            <Book size={20} /> Quran
          </button>
          <button className="menu-item" onClick={() => { setActiveTab('emotions'); setSidebarOpen(false); setActiveCategory(null); setActiveItem(null); setActiveEmotion(null); setActiveNamesCategory(null); setActiveSurah(null); }}>
            <Heart size={20} /> Emotions
          </button>
          <button className="menu-item" onClick={() => { setActiveTab('zikr'); setSidebarOpen(false); setActiveCategory(null); setActiveItem(null); setActiveEmotion(null); setActiveNamesCategory(null); setActiveSurah(null); }}>
            <Moon size={20} /> Zikr Counter
          </button>
          <button className="menu-item" onClick={() => { setActiveTab('names'); setSidebarOpen(false); setActiveCategory(null); setActiveItem(null); setActiveEmotion(null); setActiveNamesCategory(null); setActiveSurah(null); }}>
            <Star size={20} /> 99 Names
          </button>
          <button className="menu-item" onClick={() => { setActiveTab('news'); setSidebarOpen(false); setActiveCategory(null); setActiveItem(null); setActiveEmotion(null); setActiveNamesCategory(null); setActiveSurah(null); }}>
            <Newspaper size={20} /> Islamic News
          </button>
          <button className="menu-item" onClick={() => { setActiveTab('bookmarks'); setSidebarOpen(false); setActiveCategory(null); setActiveItem(null); setActiveEmotion(null); setActiveNamesCategory(null); setActiveSurah(null); }}>
            <Bookmark size={20} /> Bookmarks ({bookmarks.length})
          </button>
          <button className="menu-item" onClick={() => { setActiveTab('settings'); setSidebarOpen(false); setActiveCategory(null); setActiveItem(null); setActiveEmotion(null); setActiveNamesCategory(null); setActiveSurah(null); }}>
            <Settings size={20} /> Settings
          </button>
        </div>
      </div>
      {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)} />}
    </>
  );

  const renderNavigation = () => (
    <nav className="navigation">
      <button
        className={`nav-item ${activeTab === 'home' && !activeCategory && !activeItem && !activeEmotion && !activeNamesCategory && !activeSurah ? 'active' : ''}`}
        onClick={() => { setActiveTab('home'); setActiveCategory(null); setActiveItem(null); setActiveEmotion(null); setActiveNamesCategory(null); setActiveSurah(null); }}
      >
        <Home size={18} />
        <span>Home</span>
      </button>
      <button
        className={`nav-item ${activeTab === 'quran' && !activeSurah ? 'active' : ''}`}
        onClick={() => { setActiveTab('quran'); setActiveCategory(null); setActiveItem(null); setActiveEmotion(null); setActiveNamesCategory(null); setActiveSurah(null); }}
      >
        <Book size={18} />
        <span>Quran</span>
      </button>
      <button
        className={`nav-item ${activeTab === 'emotions' && !activeEmotion ? 'active' : ''}`}
        onClick={() => { setActiveTab('emotions'); setActiveCategory(null); setActiveItem(null); setActiveEmotion(null); setActiveNamesCategory(null); setActiveSurah(null); }}
      >
        <Heart size={18} />
        <span>Emotions</span>
      </button>
      <button
        className={`nav-item ${activeTab === 'zikr' ? 'active' : ''}`}
        onClick={() => { setActiveTab('zikr'); setActiveCategory(null); setActiveItem(null); setActiveEmotion(null); setActiveNamesCategory(null); setActiveSurah(null); }}
      >
        <Moon size={18} />
        <span>Zikr</span>
      </button>
      <button
        className={`nav-item ${activeTab === 'names' && !activeNamesCategory ? 'active' : ''}`}
        onClick={() => { setActiveTab('names'); setActiveCategory(null); setActiveItem(null); setActiveEmotion(null); setActiveNamesCategory(null); setActiveSurah(null); }}
      >
        <Star size={18} />
        <span>Names</span>
      </button>
      <button
        className={`nav-item ${activeTab === 'news' ? 'active' : ''}`}
        onClick={() => { setActiveTab('news'); setActiveCategory(null); setActiveItem(null); setActiveEmotion(null); setActiveNamesCategory(null); setActiveSurah(null); }}
      >
        <Newspaper size={18} />
        <span>News</span>
      </button>
    </nav>
  );

  const renderDailyInspiration = () => (
    <div className="daily-inspiration">
      {dailyContent.reminder && (
        <div
          className="daily-card reminder-card"
          style={{ backgroundImage: `url(${images.backgrounds.sunrise})` }}
          onClick={() => handleItemClick(dailyContent.reminder)}
        >
          <div className="card-overlay"></div>
          <div className="card-content">
            <Heart size={20} color="#d4af37" />
            <p className="daily-text">{dailyContent.reminder.text}</p>
          </div>
        </div>
      )}

      {dailyContent.hadith && (
        <div
          className="daily-card hadith-card"
          style={{ backgroundImage: `url(${images.backgrounds.blueMosque})` }}
          onClick={() => handleItemClick(dailyContent.hadith)}
        >
          <div className="card-overlay"></div>
          <div className="card-content">
            <Quote size={20} color="#4CAF50" />
            <p className="daily-text">{dailyContent.hadith.text}</p>
            <span className="daily-reference">- {dailyContent.hadith.narrator}</span>
          </div>
        </div>
      )}

      {dailyContent.verse && (
        <div
          className="daily-card verse-card"
          style={{ backgroundImage: `url(${images.backgrounds.quran})` }}
          onClick={() => handleItemClick(dailyContent.verse)}
        >
          <div className="card-overlay"></div>
          <div className="card-content">
            <Book size={20} color="#2196F3" />
            <p className="daily-text">{dailyContent.verse.translation}</p>
            <span className="daily-reference">{dailyContent.verse.surah} {dailyContent.verse.verse}</span>
          </div>
        </div>
      )}
    </div>
  );

  const renderNextPrayer = () => (
    nextPrayer && (
      <div className="next-prayer-widget" style={{ backgroundImage: `url(${images.backgrounds.kaaba})` }}>
        <div className="widget-overlay"></div>
        <div className="widget-content">
          <div className="prayer-icon">
            <Clock size={24} />
          </div>
          <div className="prayer-info">
            <span className="prayer-label">Next Prayer</span>
            <span className="prayer-name">{nextPrayer.name}</span>
            <span className="prayer-time">{nextPrayer.time}</span>
          </div>
        </div>
      </div>
    )
  );

  const renderItemDetail = (item) => (
    <div className="item-detail-page" style={{ backgroundImage: `url(${item.image || images.backgrounds.geometricGold})` }}>
      <div className="detail-overlay"></div>
      <div className="detail-content">
        <div className="detail-header">
          {item.title && <h2 className="detail-title">{item.title}</h2>}
          {item.category && <span className="detail-category">{item.category}</span>}
          <button className="bookmark-btn-large" onClick={() => toggleBookmark(item)}>
            <Bookmark size={24} color={bookmarks.some(b => b.id === item.id) ? '#d4af37' : 'currentColor'} />
          </button>
        </div>

        <div className="detail-body">
          {item.arabic && <div className="detail-arabic">{item.arabic}</div>}
          {item.translation && <p className="detail-translation">{item.translation}</p>}
          {item.text && <p className="detail-text">{item.text}</p>}
          {item.meaning && <p className="detail-meaning">{item.meaning}</p>}
          {item.transliteration && <p className="detail-transliteration">{item.transliteration}</p>}
          {item.name && <div className="detail-name-arabic">{item.name}</div>}

          <div className="detail-meta">
            {item.reference && <span className="meta-item">📚 {item.reference}</span>}
            {item.narrator && <span className="meta-item">📖 {item.narrator}</span>}
            {item.surah && <span className="meta-item">📜 {item.surah}</span>}
            {item.verse && <span className="meta-item">🔖 {item.verse}</span>}
            {item.benefits && <span className="meta-item">✨ {item.benefits}</span>}
            {item.reward && <span className="meta-item">🎁 {item.reward}</span>}
            {item.times && <span className="meta-item">📿 {item.times}</span>}
            {item.number && <span className="meta-item">🔢 #{item.number}</span>}
          </div>

          {item.context && <p className="detail-context">💭 {item.context}</p>}
          {item.description && <p className="detail-description">{item.description}</p>}
        </div>
      </div>
    </div>
  );

  const renderEmotionDetail = (emotionKey) => {
    const emotion = emotionsData[emotionKey];
    return (
      <div className="emotion-detail-page" style={{ backgroundImage: `url(${emotion.image})` }}>
        <div className="detail-overlay"></div>
        <div className="detail-content">
          <div className="emotion-detail-header" style={{ background: emotion.gradient }}>
            <div className="emotion-icon-large">{emotion.icon}</div>
            <h2 className="emotion-name-large">{emotion.name}</h2>
            <p className="emotion-description">{emotion.description}</p>
          </div>

          <div className="emotion-sections">
            <section className="emotion-section">
              <h3><Book size={20} /> Quranic Verses</h3>
              {emotion.verses.map((verse, index) => (
                <div key={index} className="emotion-item-card" onClick={() => handleItemClick({ ...verse, type: 'verse' })}>
                  <div className="item-card-content">
                    <div className="verse-arabic">{verse.arabic}</div>
                    <p className="verse-translation">{verse.translation}</p>
                    <span className="verse-reference">{verse.surah}</span>
                  </div>
                  <ChevronRight size={20} className="item-arrow" />
                </div>
              ))}
            </section>

            <section className="emotion-section">
              <h3><Quote size={20} /> Hadith</h3>
              {emotion.hadith.map((hadith, index) => (
                <div key={index} className="emotion-item-card" onClick={() => handleItemClick({ ...hadith, type: 'hadith' })}>
                  <div className="item-card-content">
                    <p className="hadith-text">{hadith.translation}</p>
                    <span className="hadith-narrator">- {hadith.narrator}</span>
                  </div>
                  <ChevronRight size={20} className="item-arrow" />
                </div>
              ))}
            </section>

            <section className="emotion-section">
              <h3><Heart size={20} /> Duas</h3>
              {emotion.duas.map((dua, index) => (
                <div key={index} className="emotion-item-card" onClick={() => handleItemClick({ ...dua, type: 'dua' })}>
                  <div className="item-card-content">
                    <div className="dua-arabic">{dua.arabic}</div>
                    <p className="dua-translation">{dua.translation}</p>
                    <span className="dua-reference">{dua.reference}</span>
                  </div>
                  <ChevronRight size={20} className="item-arrow" />
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    );
  };

  const renderHome = () => (
    <div className="home-tab">
      <h2 className="section-title">Islamic Reminders & Duas</h2>

      {renderNextPrayer()}

      <div className="home-grid">
        {Object.entries(duasByCategory).map(([key, duas]) => (
          <div
            key={key}
            className="home-card"
            onClick={() => handleCategoryClick(key)}
            style={{ backgroundImage: `url(${duas[0]?.image || images.backgrounds.geometricGold})` }}
          >
            <div className="card-overlay"></div>
            <div className="card-content">
              <div className="card-icon">
                {key === 'morning' && <Sun size={30} />}
                {key === 'evening' && <Sunset size={30} />}
                {key === 'sleep' && <Moon size={30} />}
                {key === 'tahajjud' && <Star size={30} />}
                {key === 'prayer' && <Activity size={30} />}
                {key === 'afterSalah' && <HeartIcon size={30} />}
                {key === 'ruqyah' && <Shield size={30} />}
                {key === 'salawat' && <Zap size={30} />}
                {key === 'istighfar' && <Gift size={30} />}
                {key === 'quranic' && <Book size={30} />}
                {key === 'dhikr' && <Music size={30} />}
                {key === 'ummah' && <Users size={30} />}
                {key === 'travel' && <Globe size={30} />}
                {key === 'food' && <Coffee size={30} />}
                {key === 'enteringHome' && <Home size={30} />}
                {key === 'rain' && <Cloud size={30} />}
              </div>
              <h3>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
              <p>{duas.length} items</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCategoryView = () => {
    if (!activeCategory) return null;

    return (
      <div className="category-view">
        <h2 className="section-title">{activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}</h2>
        <div className="items-list">
          {duasByCategory[activeCategory].map((item, index) => (
            <div
              key={index}
              className="list-item-card"
              onClick={() => handleItemClick(item)}
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className="card-overlay"></div>
              <div className="card-content">
                <div className="item-info">
                  {item.title && <h4>{item.title}</h4>}
                  <div className="item-arabic">{item.arabic.substring(0, 50)}...</div>
                </div>
                <ChevronRight size={20} className="item-arrow" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderEmotions = () => (
    <div className="emotions-tab">
      <h2 className="section-title">Emotional Healing</h2>
      <p className="section-subtitle">Find Quranic verses, Hadith, and Duas for your feelings</p>

      <div className="emotions-grid">
        {Object.entries(emotionsData).map(([key, emotion]) => (
          <div
            key={key}
            className="emotion-card"
            onClick={() => handleEmotionClick(key)}
            style={{ backgroundImage: `url(${emotion.image})` }}
          >
            <div className="card-overlay"></div>
            <div className="emotion-content">
              <div className="emotion-icon" style={{ background: `${emotion.color}20` }}>
                <span className="emotion-emoji">{emotion.icon}</span>
              </div>
              <h3 className="emotion-name">{emotion.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderZikr = () => (
    <div className="zikr-tab">
      <h2 className="section-title">Daily Zikr Counter</h2>
      <p className="section-subtitle">Remember Allah throughout your day</p>

      <div className="zikr-grid">
        {duasByCategory.dhikr.map((zikr) => (
          <div key={zikr.id} className="zikr-card" style={{ backgroundImage: `url(${zikr.image})` }}>
            <div className="card-overlay"></div>
            <div className="card-content">
              <div className="zikr-arabic">{zikr.arabic}</div>
              <div className="zikr-transliteration">{zikr.transliteration}</div>
              <div className="zikr-meaning">{zikr.translation}</div>

              <div className="zikr-counter-section">
                <div className="counter-display">{zikrCounts[zikr.id] || 0}</div>
                {zikr.times && <div className="target-count">Target: {zikr.times}</div>}

                <div className="counter-buttons">
                  <button className="counter-btn increment-btn" onClick={() => incrementZikr(zikr.id)}>
                    +
                  </button>
                  <button className="counter-btn reset-btn" onClick={() => resetZikr(zikr.id)}>
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNames = () => (
    <div className="names-tab">
      <h2 className="section-title">99 Names of Allah</h2>
      <p className="section-subtitle">"To Allah belong the most beautiful names, so call upon Him by them." (Quran 7:180)</p>

      <div className="names-categories-grid">
        {namesCategories.map((category) => {
          const IconComponent = {
            Crown: Crown,
            Gem: Gem,
            Heart: Heart,
            Crown: Crown,
            Leaf: Leaf,
            Scale: Scale
          }[category.icon] || Star;

          return (
            <div
              key={category.id}
              className="names-category-card"
              onClick={() => handleNamesCategoryClick(category.id)}
              style={{ background: category.color }}
            >
              <div className="category-icon">
                <IconComponent size={32} />
              </div>
              <div className="category-content">
                <h3>{category.title}</h3>
                <p className="category-description">{category.description}</p>
                <div className="category-count">{category.names.length} Names</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderNamesCategoryView = () => {
    if (!activeNamesCategory) return null;

    const category = namesCategories.find(c => c.id === activeNamesCategory);
    if (!category) return null;

    return (
      <div className="names-category-view">
        <div className="category-header" style={{ background: category.color }}>
          <h2>{category.title}</h2>
          <p>{category.description}</p>
        </div>

        <div className="names-list-grid">
          {category.names.map((name, index) => (
            <div
              key={index}
              className="name-card"
              onClick={() => handleNameClick(name)}
              style={{ backgroundImage: `url(${images.backgrounds.geometricGold})` }}
            >
              <div className="card-overlay"></div>
              <div className="card-content">
                <span className="name-number">#{name.number}</span>
                <div className="name-arabic">{name.name}</div>
                <div className="name-transliteration">{name.transliteration}</div>
                <div className="name-meaning">{name.meaning}</div>
                <div className="name-description">{name.description.substring(0, 60)}...</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderQuran = () => (
    <div className="quran-tab">
      <h2 className="section-title">The Noble Quran</h2>
      <p className="section-subtitle">Read, reflect, and recite</p>

      <div className="quran-search">
        <input
          type="text"
          placeholder="Search surahs..."
          value={quranSearchQuery}
          onChange={(e) => setQuranSearchQuery(e.target.value)}
        />
      </div>

      <div className="quran-grid">
        {QURAN_SURAHS.filter(surah =>
          surah.name.includes(quranSearchQuery) ||
          surah.transliteration.toLowerCase().includes(quranSearchQuery.toLowerCase()) ||
          surah.translation.toLowerCase().includes(quranSearchQuery.toLowerCase())
        ).map((surah) => (
          <div
            key={surah.id}
            className="surah-card"
            onClick={() => handleSurahClick(surah)}
            style={{ backgroundImage: `url(${images.backgrounds.quran})` }}
          >
            <div className="card-overlay"></div>
            <div className="card-content">
              <div className="surah-number">{surah.id}</div>
              <div className="surah-info">
                <div className="surah-name">{surah.name}</div>
                <div className="surah-translation">{surah.translation}</div>
                <div className="surah-details">
                  <span>{surah.verses} verses</span>
                  <span className={`surah-type ${surah.type.toLowerCase()}`}>{surah.type}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSurahView = () => {
    if (!activeSurah) return null;

    return (
      <div className="surah-view">
        <div className="surah-header" style={{ backgroundImage: `url(${images.backgrounds.quran})` }}>
          <div className="header-overlay"></div>
          <div className="header-content">
            <h2 className="surah-name-large">{activeSurah.name}</h2>
            <h3 className="surah-translation-large">{activeSurah.translation}</h3>
            <div className="surah-metadata">
              <span className="surah-metadata-item">{activeSurah.type}</span>
              <span className="surah-metadata-item">{activeSurah.verses} verses</span>
              <span className="surah-metadata-item">Surah {activeSurah.id}</span>
            </div>
          </div>
        </div>

        {quranLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading Surah...</p>
          </div>
        ) : (
          <div className="surah-verses">
            {surahVerses.map((verse) => (
              <div key={verse.id} className="verse-card" onClick={() => handleItemClick({
                id: `verse-${activeSurah.id}-${verse.id}`,
                title: `Surah ${activeSurah.name} - Verse ${verse.id}`,
                arabic: verse.arabic,
                surah: activeSurah.name,
                verse: verse.id,
                image: images.backgrounds.quran
              })}>
                <div className="verse-number">{verse.id}</div>
                <div className="verse-arabic">{verse.arabic}</div>
                <div className="verse-actions">
                  <button className="bookmark-btn-small" onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark({
                      id: `verse-${activeSurah.id}-${verse.id}`,
                      title: `Surah ${activeSurah.name} - Verse ${verse.id}`,
                      arabic: verse.arabic,
                      surah: activeSurah.name,
                      verse: verse.id
                    });
                  }}>
                    <Bookmark size={16} color={bookmarks.some(b => b.id === `verse-${activeSurah.id}-${verse.id}`) ? '#d4af37' : 'currentColor'} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // News/Reels Section (replaced Calendar)
  const renderNews = () => (
    <div className="news-tab">
      <div className="news-categories">
        {newsCategories.map(category => (
          <button
            key={category.id}
            className={`category-chip ${selectedNewsCategory === category.id ? 'active' : ''}`}
            onClick={() => {
              setSelectedNewsCategory(category.id);
              fetchNews(category.id);
              setCurrentNewsIndex(0);
            }}
          >
            {category.name}
          </button>
        ))}
      </div>

      {newsLoading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading news...</p>
        </div>
      ) : newsError ? (
        <div className="error-state">
          <AlertCircle size={48} />
          <p>{newsError}</p>
          <button className="retry-btn" onClick={() => fetchNews(selectedNewsCategory)}>
            Try Again
          </button>
        </div>
      ) : newsArticles.length === 0 ? (
        <div className="empty-state">
          <Newspaper size={48} />
          <p>No news articles found</p>
        </div>
      ) : (
        <div className="news-reels-container">
          <div className="reels-viewport">
            <div
              className="reels-track"
              style={{ transform: `translateY(-${currentNewsIndex * 100}vh)` }}
            >
              {newsArticles.map((article, index) => (
                <div key={article.uuid} className="reel-item">
                  <div
                    className="reel-background"
                    style={{ backgroundImage: `url(${article.image_url || images.backgrounds.newsDefault})` }}
                  >
                    <div className="reel-overlay"></div>
                  </div>

                  <div className="reel-content">
                    <div className="reel-header">
                      <div className="reel-source">{article.source || 'Islamic News'}</div>
                      <div className="reel-time">
                        {new Date(article.published_at).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="reel-body">
                      <h2 className="reel-title">{article.title}</h2>
                      <p className="reel-description">{article.description || article.snippet}</p>

                      <div className="reel-categories">
                        {article.categories?.map(cat => (
                          <span key={cat} className="reel-category">{cat}</span>
                        ))}
                      </div>
                    </div>

                    <div className="reel-actions">
                      <button
                        className="reel-action-btn like-btn"
                        onClick={() => handleNewsLike(article.uuid)}
                      >
                        <ThumbsUpIcon size={24} />
                        <span>{newsLikes[article.uuid] || 0}</span>
                      </button>

                      <button
                        className="reel-action-btn comment-btn"
                        onClick={() => setShowComments(!showComments)}
                      >
                        <MessageSquare size={24} />
                        <span>{(newsComments[article.uuid] || []).length}</span>
                      </button>

                      <button
                        className="reel-action-btn share-btn"
                        onClick={() => handleNewsShare(article.uuid)}
                      >
                        <ShareIcon2 size={24} />
                        <span>{newsShares[article.uuid] || 0}</span>
                      </button>

                      <button
                        className="reel-action-btn external-btn"
                        onClick={() => window.open(article.url, '_blank')}
                      >
                        <ExternalLink size={24} />
                      </button>
                    </div>

                    {showComments && (
                      <div className="reel-comments">
                        <div className="comments-list">
                          {(newsComments[article.uuid] || []).map(comment => (
                            <div key={comment.id} className="comment-item">
                              <p>{comment.text}</p>
                              <small>{new Date(comment.timestamp).toLocaleDateString()}</small>
                            </div>
                          ))}
                        </div>
                        <div className="comment-input">
                          <input
                            type="text"
                            placeholder="Add a comment..."
                            value={currentComment}
                            onChange={(e) => setCurrentComment(e.target.value)}
                          />
                          <button onClick={() => handleNewsComment(article.uuid)}>Post</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reels-nav">
            <button
              className="nav-up"
              onClick={() => handleNewsSwipe('down')}
              disabled={currentNewsIndex === 0}
            >
              <ChevronLeft size={24} />
            </button>
            <div className="reels-indicator">
              {currentNewsIndex + 1} / {newsArticles.length}
            </div>
            <button
              className="nav-down"
              onClick={() => handleNewsSwipe('up')}
              disabled={currentNewsIndex === newsArticles.length - 1}
            >
              <ChevronRightIcon size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderBookmarks = () => (
    <div className="bookmarks-tab">
      <h2 className="section-title">My Bookmarks</h2>

      {bookmarks.length === 0 ? (
        <div className="empty-state">
          <Bookmark size={48} />
          <p>No bookmarks yet</p>
          <p className="empty-subtitle">Save your favorite duas, hadith, and verses</p>
        </div>
      ) : (
        <div className="bookmarks-list">
          {bookmarks.map((item, index) => (
            <div key={index} className="bookmark-item" style={{ backgroundImage: `url(${item.image || images.backgrounds.geometricGold})` }}>
              <div className="card-overlay"></div>
              <div className="card-content" onClick={() => handleItemClick(item)}>
                <div className="bookmark-content">
                  {item.title && <div className="bookmark-title">{item.title}</div>}
                  <div className="bookmark-arabic">{item.arabic || item.text || item.name}</div>
                  <p className="bookmark-translation">{item.translation || item.meaning}</p>
                </div>
                <button className="remove-bookmark" onClick={(e) => { e.stopPropagation(); toggleBookmark(item); }}>
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderSettings = () => (
    <div className="settings-tab">
      <h2 className="section-title">Settings</h2>

      <div className="settings-group">
        <h3>Appearance</h3>
        <div className="setting-item">
          <span>Dark Theme</span>
          <label className="switch">
            <input type="checkbox" checked={theme === 'dark'} onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-group">
        <h3>Notifications</h3>
        <div className="setting-item">
          <span>Prayer Times</span>
          <label className="switch">
            <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} />
            <span className="slider"></span>
          </label>
        </div>
        <div className="setting-item">
          <span>Daily Reminders</span>
          <label className="switch">
            <input type="checkbox" checked={true} />
            <span className="slider"></span>
          </label>
        </div>
        <div className="setting-item">
          <span>News Notifications</span>
          <label className="switch">
            <input type="checkbox" checked={true} />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-group">
        <h3>Audio</h3>
        <div className="setting-item">
          <span>Quran Audio</span>
          <label className="switch">
            <input type="checkbox" checked={audioEnabled} onChange={() => setAudioEnabled(!audioEnabled)} />
            <span className="slider"></span>
          </label>
        </div>
        <div className="setting-item">
          <span>News Audio (Mute)</span>
          <label className="switch">
            <input type="checkbox" checked={newsMuted} onChange={() => setNewsMuted(!newsMuted)} />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-group">
        <h3>About</h3>
        <div className="setting-item">
          <span>Version 2.0.0</span>
        </div>
        <div className="setting-item">
          <span>Developer: Islamic App</span>
        </div>
        <div className="setting-item">
          <span>News Powered by NewsAPI.org</span>
        </div>
      </div>
    </div>
  );

  // Render based on view mode
  const renderContent = () => {
    if (activeItem) {
      return renderItemDetail(activeItem);
    }

    if (activeSurah) {
      return renderSurahView();
    }

    if (activeEmotion) {
      return renderEmotionDetail(activeEmotion);
    }

    if (activeCategory) {
      return renderCategoryView();
    }

    if (activeNamesCategory) {
      return renderNamesCategoryView();
    }

    switch (activeTab) {
      case 'home':
        return renderHome();
      case 'quran':
        return renderQuran();
      case 'emotions':
        return renderEmotions();
      case 'zikr':
        return renderZikr();
      case 'names':
        return renderNames();
      case 'news':
        return renderNews();
      case 'bookmarks':
        return renderBookmarks();
      case 'settings':
        return renderSettings();
      default:
        return renderHome();
    }
  };

  return (
    <div className={`app-container theme-${theme}`}>
      {renderSidebar()}

      <div className="main-content">
        {renderHeader()}
        {!activeItem && !activeEmotion && !activeCategory && !activeNamesCategory && !activeSurah && renderNavigation()}

        <main className="content-area">
          {!activeItem && !activeEmotion && !activeCategory && !activeNamesCategory && !activeSurah && activeTab === 'home' && renderDailyInspiration()}
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default IslamicApp;