export const QAIDA_LESSONS = [
  {
    id: 1, level: 1,
    title: 'Individual Letters',
    titleUrdu: 'حروف تہجی',
    description: 'Learn the Arabic alphabet in traditional Qaida order',
    icon: '✍️', type: 'letters', totalStars: 3,
  },
  {
    id: 2, level: 2,
    title: 'Short Vowels',
    titleUrdu: 'حركات',
    description: 'Learn Zabar, Zer, and Pesh — the three short vowels',
    icon: '🔤', type: 'harakat', totalStars: 3,
  },
  {
    id: 3, level: 3,
    title: 'Tanwin (Nunation)',
    titleUrdu: 'تنوين',
    description: 'Double vowel marks that add a "n" sound',
    icon: '🔡', type: 'tanwin', totalStars: 3,
  },
  {
    id: 4, level: 4,
    title: 'Madd (Long Vowels)',
    titleUrdu: 'مد',
    description: 'Elongated vowel sounds — stretch and hold',
    icon: '〰️', type: 'madd', totalStars: 3,
  },
  {
    id: 5, level: 5,
    title: 'Sukoon',
    titleUrdu: 'سكون',
    description: 'Letters with no vowel — pause and stop',
    icon: '✋', type: 'sukoon', totalStars: 3,
  },
  {
    id: 6, level: 6,
    title: 'Shaddah',
    titleUrdu: 'شدّه',
    description: 'The doubling mark — say the letter twice',
    icon: '2️⃣', type: 'shaddah', totalStars: 3,
  },
  {
    id: 7, level: 7,
    title: 'Qalqalah',
    titleUrdu: 'قلقلہ',
    description: 'The 5 bouncing letters: قُطْبُ جَدّ',
    icon: '🎯', type: 'qalqalah', totalStars: 3,
  },
  {
    id: 8, level: 8,
    title: 'Waqf (Stopping Signs)',
    titleUrdu: 'وقف',
    description: 'When to stop, when to continue in recitation',
    icon: '🛑', type: 'waqf', totalStars: 3,
  },
  {
    id: 9, level: 9,
    title: 'Letter Forms',
    titleUrdu: 'حروف كى شكليں',
    description: 'Isolated, initial, medial and final letter forms',
    icon: '🔗', type: 'forms', totalStars: 3,
  },
  {
    id: 10, level: 10,
    title: 'Simple Words',
    titleUrdu: 'آسان الفاظ',
    description: 'Practice reading simple Quranic words',
    icon: '📖', type: 'words', totalStars: 3,
  },
];

export const WAQF_SIGNS = [
  { sign: 'م', name: 'Waqf-e-Lazim', urdu: 'وقف لازم', rule: 'Must Stop', color: '#EF4444' },
  { sign: 'ط', name: 'Waqf-e-Mutlaq', urdu: 'وقف مطلق', rule: 'Full Stop', color: '#F97316' },
  { sign: 'ج', name: 'Waqf-e-Jaiz', urdu: 'وقف جائز', rule: 'May Stop', color: '#22C55E' },
  { sign: 'لا', name: 'Waqf-e-Mamnoo', urdu: 'وقف ممنوع', rule: 'Do NOT Stop', color: '#8B5CF6' },
  { sign: 'ز', name: 'Waqf-e-Mujawwaz', urdu: 'وقف مجوّز', rule: 'Better to Continue', color: '#3B82F6' },
  { sign: 'ص', name: 'Waqf-e-Murakhkhas', urdu: 'وقف مرخص', rule: 'Allowed to Stop', color: '#D4A017' },
];

export const MADD_TYPES = [
  { name: 'Madd-e-Tabii', arabic: 'مد طبیعی', example: 'قَالَ', description: 'Natural Madd — 2 beats', letters: ['آ', 'وْ', 'يْ'] },
  { name: 'Alif Madd', arabic: 'الف مد', example: 'مَال', description: 'Alif after Zabar', sound: 'aa' },
  { name: 'Waw Madd', arabic: 'واو مد', example: 'نُور', description: 'Waw after Pesh', sound: 'oo' },
  { name: 'Ya Madd', arabic: 'يا مد', example: 'رَحِيم', description: 'Ya after Zer', sound: 'ee' },
];
