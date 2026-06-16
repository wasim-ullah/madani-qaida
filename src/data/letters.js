export const LETTERS = [
  { id: 1,  arabic: 'ا', name: 'Alif',  urdu: 'الف',  makhraj: 'throat', group: 1,
    forms: { isolated: 'ا', initial: 'ا',  medial: 'ـا',  final: 'ـا'  },
    example: 'أَسَد',   exampleMeaning: 'Lion',     dots: 0, shape: 'alif' },

  { id: 2,  arabic: 'ب', name: 'Baa',   urdu: 'بے',   makhraj: 'lips',   group: 1,
    forms: { isolated: 'ب', initial: 'بـ', medial: 'ـبـ', final: 'ـب'  },
    example: 'بَيْت',   exampleMeaning: 'House',    dots: 1, dotsPos: 'below', shape: 'ba' },

  { id: 3,  arabic: 'ت', name: 'Taa',   urdu: 'تے',   makhraj: 'teeth',  group: 1,
    forms: { isolated: 'ت', initial: 'تـ', medial: 'ـتـ', final: 'ـت'  },
    example: 'تِين',    exampleMeaning: 'Fig',       dots: 2, dotsPos: 'above', shape: 'ta' },

  { id: 4,  arabic: 'ث', name: 'Thaa',   urdu: 'ثے',   makhraj: 'teeth',  group: 1,
    forms: { isolated: 'ث', initial: 'ثـ', medial: 'ـثـ', final: 'ـث'  },
    example: 'ثَوْب',   exampleMeaning: 'Cloth',     dots: 3, dotsPos: 'above', shape: 'tha' },

  { id: 5,  arabic: 'ج', name: 'Jeem',  urdu: 'جيم',  makhraj: 'tongue', group: 2,
    forms: { isolated: 'ج', initial: 'جـ', medial: 'ـجـ', final: 'ـج'  },
    example: 'جَمَل',   exampleMeaning: 'Camel',     dots: 1, dotsPos: 'below', shape: 'jim' },

  { id: 6,  arabic: 'ح', name: 'Haa',   urdu: 'حے',   makhraj: 'throat', group: 2,
    forms: { isolated: 'ح', initial: 'حـ', medial: 'ـحـ', final: 'ـح'  },
    example: 'حَمَام',  exampleMeaning: 'Dove',      dots: 0, shape: 'ha' },

  { id: 7,  arabic: 'خ', name: 'Khaa',  urdu: 'خے',   makhraj: 'throat', group: 2,
    forms: { isolated: 'خ', initial: 'خـ', medial: 'ـخـ', final: 'ـخ'  },
    example: 'خَيْل',   exampleMeaning: 'Horse',     dots: 1, dotsPos: 'above', shape: 'kha' },

  { id: 8,  arabic: 'د', name: 'Daal',  urdu: 'دال',  makhraj: 'teeth',  group: 3,
    forms: { isolated: 'د', initial: 'د',  medial: 'ـد',  final: 'ـد'  },
    example: 'دَجَاجَة',exampleMeaning: 'Chicken',   dots: 0, shape: 'dal' },

  { id: 9,  arabic: 'ذ', name: 'Dhaal',  urdu: 'ذال',  makhraj: 'teeth',  group: 3,
    forms: { isolated: 'ذ', initial: 'ذ',  medial: 'ـذ',  final: 'ـذ'  },
    example: 'ذَهَب',   exampleMeaning: 'Gold',      dots: 1, dotsPos: 'above', shape: 'dhal' },

  { id: 10, arabic: 'ر', name: 'Raa',   urdu: 'رے',   makhraj: 'tongue', group: 4,
    forms: { isolated: 'ر', initial: 'ر',  medial: 'ـر',  final: 'ـر'  },
    example: 'رَأْس',   exampleMeaning: 'Head',      dots: 0, shape: 'ra' },

  { id: 11, arabic: 'ز', name: 'Zaa',   urdu: 'زے',   makhraj: 'tongue', group: 4,
    forms: { isolated: 'ز', initial: 'ز',  medial: 'ـز',  final: 'ـز'  },
    example: 'زَيْتُون',exampleMeaning: 'Olive',     dots: 1, dotsPos: 'above', shape: 'zay' },

  { id: 12, arabic: 'س', name: 'Seen',  urdu: 'سين',  makhraj: 'tongue', group: 5,
    forms: { isolated: 'س', initial: 'سـ', medial: 'ـسـ', final: 'ـس'  },
    example: 'سَمَاء',  exampleMeaning: 'Sky',       dots: 0, shape: 'sin' },

  { id: 13, arabic: 'ش', name: 'Sheen', urdu: 'شين',  makhraj: 'tongue', group: 5,
    forms: { isolated: 'ش', initial: 'شـ', medial: 'ـشـ', final: 'ـش'  },
    example: 'شَمْس',   exampleMeaning: 'Sun',       dots: 3, dotsPos: 'above', shape: 'shin' },

  { id: 14, arabic: 'ص', name: 'Saad', urdu: 'صاد',  makhraj: 'tongue', group: 6,
    forms: { isolated: 'ص', initial: 'صـ', medial: 'ـصـ', final: 'ـص'  },
    example: 'صَبَاح',  exampleMeaning: 'Morning',   dots: 0, shape: 'sad' },

  { id: 15, arabic: 'ض', name: 'Daad', urdu: 'ضاد',  makhraj: 'tongue', group: 6,
    forms: { isolated: 'ض', initial: 'ضـ', medial: 'ـضـ', final: 'ـض'  },
    example: 'ضَوْء',   exampleMeaning: 'Light',     dots: 1, dotsPos: 'above', shape: 'dad' },

  { id: 16, arabic: 'ط', name: 'Twaa',   urdu: 'طوأ',  makhraj: 'tongue', group: 7,
    forms: { isolated: 'ط', initial: 'طـ', medial: 'ـطـ', final: 'ـط'  },
    example: 'طَيْر',   exampleMeaning: 'Bird',      dots: 0, shape: 'taa', isQalqalah: true },

  { id: 17, arabic: 'ظ', name: 'Dhaa',   urdu: 'ظوأ',  makhraj: 'tongue', group: 7,
    forms: { isolated: 'ظ', initial: 'ظـ', medial: 'ـظـ', final: 'ـظ'  },
    example: 'ظِل',     exampleMeaning: 'Shadow',    dots: 1, dotsPos: 'above', shape: 'dhaa' },

  { id: 18, arabic: 'ع', name: 'Ain',   urdu: 'عين',  makhraj: 'throat', group: 8,
    forms: { isolated: 'ع', initial: 'عـ', medial: 'ـعـ', final: 'ـع'  },
    example: 'عَيْن',   exampleMeaning: 'Eye',       dots: 0, shape: 'ain' },

  { id: 19, arabic: 'غ', name: 'Ghain', urdu: 'غين',  makhraj: 'throat', group: 8,
    forms: { isolated: 'غ', initial: 'غـ', medial: 'ـغـ', final: 'ـغ'  },
    example: 'غَيْم',   exampleMeaning: 'Cloud',     dots: 1, dotsPos: 'above', shape: 'ghain' },

  { id: 20, arabic: 'ف', name: 'Faa',   urdu: 'فے',   makhraj: 'lips',   group: 9,
    forms: { isolated: 'ف', initial: 'فـ', medial: 'ـفـ', final: 'ـف'  },
    example: 'فِيل',    exampleMeaning: 'Elephant',  dots: 1, dotsPos: 'above', shape: 'fa' },

  { id: 21, arabic: 'ق', name: 'Qaaf',  urdu: 'قاف',  makhraj: 'throat', group: 9,
    forms: { isolated: 'ق', initial: 'قـ', medial: 'ـقـ', final: 'ـق'  },
    example: 'قَمَر',   exampleMeaning: 'Moon',      dots: 2, dotsPos: 'above', shape: 'qaf', isQalqalah: true },

  { id: 22, arabic: 'ك', name: 'Kaaf',  urdu: 'كاف',  makhraj: 'tongue', group: 10,
    forms: { isolated: 'ك', initial: 'كـ', medial: 'ـكـ', final: 'ـك'  },
    example: 'كِتَاب',  exampleMeaning: 'Book',      dots: 0, shape: 'kaf' },

  { id: 23, arabic: 'ل', name: 'Laam',  urdu: 'لام',  makhraj: 'tongue', group: 10,
    forms: { isolated: 'ل', initial: 'لـ', medial: 'ـلـ', final: 'ـل'  },
    example: 'لَيْل',   exampleMeaning: 'Night',     dots: 0, shape: 'lam' },

  { id: 24, arabic: 'م', name: 'Meem',  urdu: 'ميم',  makhraj: 'lips',   group: 10,
    forms: { isolated: 'م', initial: 'مـ', medial: 'ـمـ', final: 'ـم'  },
    example: 'مَاء',    exampleMeaning: 'Water',     dots: 0, shape: 'mim' },

  { id: 25, arabic: 'ن', name: 'Noon',  urdu: 'نون',  makhraj: 'tongue', group: 10,
    forms: { isolated: 'ن', initial: 'نـ', medial: 'ـنـ', final: 'ـن'  },
    example: 'نُور',    exampleMeaning: 'Light',     dots: 1, dotsPos: 'above', shape: 'nun' },

  { id: 26, arabic: 'و', name: 'Waaw',  urdu: 'واؤ',  makhraj: 'lips',   group: 11,
    forms: { isolated: 'و', initial: 'و',  medial: 'ـو',  final: 'ـو'  },
    example: 'وَرَد',   exampleMeaning: 'Rose',      dots: 0, shape: 'waw' },

  { id: 27, arabic: 'ه', name: 'Haa',   urdu: 'ہے',   makhraj: 'throat', group: 11,
    forms: { isolated: 'ه', initial: 'هـ', medial: 'ـهـ', final: 'ـه'  },
    example: 'هِلَال',  exampleMeaning: 'Crescent',  dots: 0, shape: 'heh' },

  { id: 28, arabic: 'ء', name: 'Hamza', urdu: 'ہمزہ', makhraj: 'throat', group: 11,
    forms: { isolated: 'ء', initial: 'أ',  medial: 'ئـ',  final: 'ئ'   },
    example: 'أَسَد',   exampleMeaning: 'Lion',      dots: 0, shape: 'hamza' },

  { id: 29, arabic: 'ي', name: 'Yaa',   urdu: 'يے',   makhraj: 'tongue', group: 11,
    forms: { isolated: 'ي', initial: 'يـ', medial: 'ـيـ', final: 'ـي'  },
    example: 'يَد',     exampleMeaning: 'Hand',      dots: 2, dotsPos: 'below', shape: 'ya' },
];

export const LETTER_GROUPS = [
  { id: 1,  letters: ['ا','ب','ت','ث'],     label: 'Group 1'  },
  { id: 2,  letters: ['ج','ح','خ'],         label: 'Group 2'  },
  { id: 3,  letters: ['د','ذ'],             label: 'Group 3'  },
  { id: 4,  letters: ['ر','ز'],             label: 'Group 4'  },
  { id: 5,  letters: ['س','ش'],             label: 'Group 5'  },
  { id: 6,  letters: ['ص','ض'],             label: 'Group 6'  },
  { id: 7,  letters: ['ط','ظ'],             label: 'Group 7'  },
  { id: 8,  letters: ['ع','غ'],             label: 'Group 8'  },
  { id: 9,  letters: ['ف','ق'],             label: 'Group 9'  },
  { id: 10, letters: ['ك','ل','م','ن'],     label: 'Group 10' },
  { id: 11, letters: ['و','ه','ء','ي'],     label: 'Group 11' },
];

export const QALQALAH_LETTERS = ['ق', 'ط', 'ب', 'ج', 'د'];
