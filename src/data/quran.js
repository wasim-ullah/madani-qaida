export const SURAHS = [
  {
    id: 1,
    name: 'Al-Fatiha',
    arabicName: 'الفاتحة',
    totalVerses: 7,
    description: 'The Opening — recited in every prayer',
    verses: [
      {
        id: 1,
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        transliteration: 'Bismillāhi r-raḥmāni r-raḥīm',
        translation: 'In the name of Allah, the Most Gracious, the Most Merciful',
        words: [
          { arabic: 'بِسْمِ', trans: 'Bismi', meaning: 'In the name', tajweed: [] },
          { arabic: 'اللَّهِ', trans: 'Allāhi', meaning: 'of Allah', tajweed: [] },
          { arabic: 'الرَّحْمَٰنِ', trans: 'r-Raḥmāni', meaning: 'the Most Gracious', tajweed: ['madd'] },
          { arabic: 'الرَّحِيمِ', trans: 'r-Raḥīm', meaning: 'the Most Merciful', tajweed: ['madd'] },
        ]
      },
      {
        id: 2,
        arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        transliteration: 'Alḥamdu lillāhi rabbi l-ʿālamīn',
        translation: 'All praise is for Allah, Lord of all worlds',
        words: [
          { arabic: 'الْحَمْدُ', trans: 'Al-ḥamdu', meaning: 'All praise', tajweed: [] },
          { arabic: 'لِلَّهِ', trans: 'lillāhi', meaning: 'is for Allah', tajweed: [] },
          { arabic: 'رَبِّ', trans: 'rabbi', meaning: 'Lord of', tajweed: ['shaddah'] },
          { arabic: 'الْعَالَمِينَ', trans: 'l-ʿālamīn', meaning: 'all worlds', tajweed: ['madd'] },
        ]
      },
      {
        id: 3,
        arabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
        transliteration: 'Ar-raḥmāni r-raḥīm',
        translation: 'The Most Gracious, the Most Merciful',
        words: [
          { arabic: 'الرَّحْمَٰنِ', trans: 'Ar-raḥmāni', meaning: 'The Most Gracious', tajweed: ['madd'] },
          { arabic: 'الرَّحِيمِ', trans: 'r-raḥīm', meaning: 'the Most Merciful', tajweed: ['madd'] },
        ]
      },
      {
        id: 4,
        arabic: 'مَالِكِ يَوْمِ الدِّينِ',
        transliteration: 'Māliki yawmi d-dīn',
        translation: 'Master of the Day of Judgment',
        words: [
          { arabic: 'مَالِكِ', trans: 'Māliki', meaning: 'Master of', tajweed: ['madd'] },
          { arabic: 'يَوْمِ', trans: 'yawmi', meaning: 'the Day', tajweed: [] },
          { arabic: 'الدِّينِ', trans: 'd-dīn', meaning: 'of Judgment', tajweed: ['madd'] },
        ]
      },
      {
        id: 5,
        arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        transliteration: "Iyyāka naʿbudu wa-iyyāka nastaʿīn",
        translation: 'You alone we worship, You alone we ask for help',
        words: [
          { arabic: 'إِيَّاكَ', trans: 'Iyyāka', meaning: 'You alone', tajweed: ['shaddah'] },
          { arabic: 'نَعْبُدُ', trans: "naʿbudu", meaning: 'we worship', tajweed: [] },
          { arabic: 'وَإِيَّاكَ', trans: 'wa-iyyāka', meaning: 'and You alone', tajweed: ['shaddah'] },
          { arabic: 'نَسْتَعِينُ', trans: "nastaʿīn", meaning: 'we ask for help', tajweed: ['madd'] },
        ]
      },
      {
        id: 6,
        arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        transliteration: 'Ihdinā ṣ-ṣirāṭa l-mustaqīm',
        translation: 'Guide us on the straight path',
        words: [
          { arabic: 'اهْدِنَا', trans: 'Ihdinā', meaning: 'Guide us', tajweed: [] },
          { arabic: 'الصِّرَاطَ', trans: 'ṣ-ṣirāṭa', meaning: 'on the path', tajweed: ['madd'] },
          { arabic: 'الْمُسْتَقِيمَ', trans: 'l-mustaqīm', meaning: 'the straight', tajweed: ['madd'] },
        ]
      },
      {
        id: 7,
        arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
        transliteration: "Ṣirāṭa l-ladhīna anʿamta ʿalayhim ghayri l-maghḍūbi ʿalayhim wa-lā ḍ-ḍāllīn",
        translation: 'The path of those You have blessed, not of those who are condemned, nor those who go astray',
        words: [
          { arabic: 'صِرَاطَ', trans: 'Ṣirāṭa', meaning: 'The path of', tajweed: ['madd'] },
          { arabic: 'الَّذِينَ', trans: 'l-ladhīna', meaning: 'those who', tajweed: ['madd'] },
          { arabic: 'أَنْعَمْتَ', trans: "anʿamta", meaning: 'You blessed', tajweed: [] },
          { arabic: 'عَلَيْهِمْ', trans: 'ʿalayhim', meaning: 'upon them', tajweed: [] },
          { arabic: 'غَيْرِ', trans: 'ghayri', meaning: 'not those', tajweed: [] },
          { arabic: 'الْمَغْضُوبِ', trans: 'l-maghḍūbi', meaning: 'who are condemned', tajweed: ['madd'] },
          { arabic: 'عَلَيْهِمْ', trans: 'ʿalayhim', meaning: 'upon them', tajweed: [] },
          { arabic: 'وَلَا', trans: 'wa-lā', meaning: 'and not', tajweed: ['madd'] },
          { arabic: 'الضَّالِّينَ', trans: 'ḍ-ḍāllīn', meaning: 'those who go astray', tajweed: ['madd', 'shaddah'] },
        ]
      },
    ]
  },
  {
    id: 112,
    name: 'Al-Ikhlas',
    arabicName: 'الإخلاص',
    totalVerses: 4,
    description: 'The Sincerity — equals one third of the Quran',
    locked: true,
    verses: [
      {
        id: 1,
        arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
        transliteration: 'Qul huwa llāhu aḥad',
        translation: 'Say, "He is Allah, [who is] One"',
        words: [
          { arabic: 'قُلْ', trans: 'Qul', meaning: 'Say', tajweed: ['qalqalah'] },
          { arabic: 'هُوَ', trans: 'huwa', meaning: 'He is', tajweed: [] },
          { arabic: 'اللَّهُ', trans: 'llāhu', meaning: 'Allah', tajweed: [] },
          { arabic: 'أَحَدٌ', trans: 'aḥad', meaning: 'One', tajweed: ['tanwin'] },
        ]
      },
    ]
  }
];
