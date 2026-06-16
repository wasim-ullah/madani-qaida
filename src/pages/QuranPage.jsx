import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SURAHS } from '../data/quran';
import { useAudio } from '../hooks/useAudio';
import { useProgress } from '../hooks/useProgress';
import { PageHeader } from '../components/ui/PageHeader';

const TAJWEED_COLORS = {
  madd: '#3B82F6',
  qalqalah: '#D4A017',
  ghunnah: '#22C55E',
  shaddah: '#EC4899',
  tanwin: '#F97316',
};

function WordChip({ word, onClick, isActive }) {
  const hasTajweed = word.tajweed && word.tajweed.length > 0;
  const tajweedColor = hasTajweed ? TAJWEED_COLORS[word.tajweed[0]] : null;

  return (
    <motion.button
      onClick={() => onClick(word)}
      className="rounded-xl px-3 py-2 m-1 text-right"
      style={{
        fontFamily: 'Amiri, serif',
        fontSize: '26px',
        direction: 'rtl',
        backgroundColor: isActive ? '#1B4D6B' : hasTajweed ? `${tajweedColor}15` : 'white',
        color: isActive ? '#D4A017' : hasTajweed ? tajweedColor : '#1B4D6B',
        border: `2px solid ${isActive ? '#D4A017' : hasTajweed ? tajweedColor : '#E2E8F0'}`,
        boxShadow: isActive ? '0 4px 12px rgba(27,77,107,0.3)' : '0 2px 4px rgba(0,0,0,0.06)',
        transition: 'all 0.2s',
      }}
      whileTap={{ scale: 0.95 }}
    >
      {word.arabic}
    </motion.button>
  );
}

function VerseView({ verse, activeWord, onWordClick }) {
  return (
    <div className="rounded-2xl p-4 mb-3" style={{ backgroundColor: 'white', border: '2px solid #E2E8F0', boxShadow: '0 4px 12px rgba(27,77,107,0.08)' }}>
      {/* Verse number */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
          style={{ backgroundColor: '#1B4D6B' }}>
          {verse.id}
        </div>
        <div className="text-xs" style={{ color: '#94A3B8', fontFamily: 'Nunito, sans-serif' }}>
          Tap any word to hear it
        </div>
      </div>

      {/* Arabic text — word by word, RTL */}
      <div className="flex flex-wrap justify-end gap-1 mb-3" dir="rtl">
        {verse.words.map((word, i) => (
          <WordChip
            key={i}
            word={word}
            onClick={onWordClick}
            isActive={activeWord?.arabic === word.arabic}
          />
        ))}
      </div>

      {/* Transliteration */}
      <p className="text-sm italic mb-1" style={{ color: '#64748B', fontFamily: 'Nunito, sans-serif' }}>
        {verse.transliteration}
      </p>

      {/* Translation */}
      <p className="text-sm font-bold" style={{ color: '#1B4D6B', fontFamily: 'Nunito, sans-serif' }}>
        {verse.translation}
      </p>

      {/* Active word info */}
      <AnimatePresence>
        {activeWord && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 rounded-xl p-3"
            style={{ backgroundColor: '#FDF6E3', border: '1px solid #D4A017' }}
          >
            <div className="flex items-center gap-3">
              <span style={{ fontFamily: 'Amiri, serif', fontSize: '28px', color: '#1B4D6B' }}>
                {activeWord.arabic}
              </span>
              <div>
                <div className="text-sm italic" style={{ color: '#64748B', fontFamily: 'Nunito, sans-serif' }}>
                  {activeWord.trans}
                </div>
                <div className="text-sm font-bold" style={{ color: '#1B4D6B', fontFamily: 'Nunito, sans-serif' }}>
                  {activeWord.meaning}
                </div>
              </div>
              {activeWord.tajweed && activeWord.tajweed.length > 0 && (
                <div className="ml-auto flex gap-1">
                  {activeWord.tajweed.map(t => (
                    <span
                      key={t}
                      className="text-xs px-2 py-0.5 rounded-full font-bold capitalize"
                      style={{ backgroundColor: TAJWEED_COLORS[t] + '20', color: TAJWEED_COLORS[t], fontFamily: 'Nunito, sans-serif' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function QuranPage() {
  const { progress } = useProgress();
  const { speakWord, speakVerse } = useAudio();
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [activeWord, setActiveWord] = useState(null);

  // Check if unlocked (80% of 10 Qaida lessons = 8 completed)
  const qaidaCompleted = progress.completedLessons.filter(id => id >= 1 && id <= 10).length;
  const isUnlocked = qaidaCompleted >= 8;

  const handleWordClick = (word) => {
    setActiveWord(word);
    speakWord(word.arabic);
  };

  if (!isUnlocked) {
    return (
      <div style={{ minHeight: '100vh' }}>
        <PageHeader title="Quran" titleArabic="قرآن" subtitle="Complete Qaida first to unlock" emoji="🌙" />
        <div className="p-8 text-center">
          <div className="text-8xl mb-6">🔒</div>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#1B4D6B', fontFamily: 'Nunito, sans-serif' }}>
            Complete the Qaida First
          </h2>
          <p className="text-sm mb-5" style={{ color: '#64748B', fontFamily: 'Nunito, sans-serif' }}>
            Finish at least 8 out of 10 Qaida lessons to unlock Quranic reading
          </p>

          {/* Progress bar */}
          <div className="rounded-2xl p-4 mb-4" style={{ backgroundColor: 'white', border: '2px solid #E2E8F0' }}>
            <div className="flex justify-between text-sm font-bold mb-2" style={{ color: '#1B4D6B', fontFamily: 'Nunito, sans-serif' }}>
              <span>Progress</span>
              <span>{qaidaCompleted}/8 lessons</span>
            </div>
            <div className="rounded-full overflow-hidden" style={{ backgroundColor: '#E2E8F0', height: '12px' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: '#D4A017' }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((qaidaCompleted / 8) * 100, 100)}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>

          <div className="rounded-2xl p-4" style={{ backgroundColor: '#FEF3C7', border: '2px solid #D4A017' }}>
            <p className="text-sm font-bold" style={{ color: '#92400E', fontFamily: 'Nunito, sans-serif' }}>
              💡 Go to the Qaida module and complete the lessons to unlock Quranic reading!
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (selectedSurah) {
    const surah = SURAHS.find(s => s.id === selectedSurah);
    return (
      <div style={{ minHeight: '100vh' }}>
        {/* Surah header */}
        <div className="px-4 py-4 flex items-center gap-3" style={{ backgroundColor: '#1B4D6B' }}>
          <button
            onClick={() => setSelectedSurah(null)}
            className="text-white text-xl w-10 h-10 flex items-center justify-center rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
          >
            ←
          </button>
          <div className="flex-1">
            <h2 className="font-bold text-white" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Surah {surah.name}
            </h2>
            <div style={{ fontFamily: 'Amiri, serif', color: '#D4A017', direction: 'rtl', fontSize: '20px' }}>
              سورة {surah.arabicName}
            </div>
          </div>
          <button
            onClick={() => speakVerse(surah.verses.map(v => v.arabic).join(' '))}
            className="text-white rounded-xl px-3 py-2 font-bold text-sm"
            style={{ backgroundColor: '#D4A017', color: '#1B4D6B' }}
          >
            🔊 Full
          </button>
        </div>

        {/* Tajweed color key */}
        <div className="px-4 py-2 flex gap-3 flex-wrap" style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
          <span className="text-xs font-bold" style={{ color: '#64748B', fontFamily: 'Nunito, sans-serif' }}>Tajweed:</span>
          {Object.entries(TAJWEED_COLORS).map(([rule, color]) => (
            <div key={rule} className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-xs capitalize" style={{ color, fontFamily: 'Nunito, sans-serif' }}>{rule}</span>
            </div>
          ))}
        </div>

        {/* Bismillah decoration */}
        <div className="text-center py-4 px-4" style={{ backgroundColor: '#FDF6E3' }}>
          <div style={{ fontFamily: 'Amiri, serif', fontSize: '28px', color: '#D4A017', direction: 'rtl' }}>
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
        </div>

        <div className="p-4">
          {surah.verses.map(verse => (
            <VerseView
              key={verse.id}
              verse={verse}
              activeWord={activeWord}
              onWordClick={handleWordClick}
            />
          ))}

          <div className="rounded-2xl p-4 mt-2" style={{ backgroundColor: '#F0FDF4', border: '2px solid #22C55E' }}>
            <p className="text-center text-sm font-bold" style={{ color: '#166534', fontFamily: 'Nunito, sans-serif' }}>
              🌟 Masha'Allah! Practice reading each verse slowly and carefully.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <PageHeader
        title="Quranic Reading"
        titleArabic="قرآن كريم"
        subtitle="Word-by-word Quranic practice"
        emoji="🌙"
      />

      <div className="p-4">
        {/* Unlock badge */}
        <div className="rounded-2xl p-4 mb-5 flex items-center gap-3"
          style={{ backgroundColor: '#F0FDF4', border: '2px solid #22C55E' }}>
          <span className="text-3xl">✅</span>
          <div>
            <div className="font-bold" style={{ color: '#166534', fontFamily: 'Nunito, sans-serif' }}>
              Quran Unlocked!
            </div>
            <div className="text-sm" style={{ color: '#166534', fontFamily: 'Nunito, sans-serif', opacity: 0.8 }}>
              You completed {qaidaCompleted} Qaida lessons. Excellent work!
            </div>
          </div>
        </div>

        {/* Surah list */}
        {SURAHS.map(surah => (
          <motion.div
            key={surah.id}
            className="rounded-2xl p-4 mb-3 cursor-pointer"
            style={{
              backgroundColor: surah.locked ? '#F8FAFC' : 'white',
              border: `2px solid ${surah.locked ? '#E2E8F0' : '#D4A017'}`,
              boxShadow: surah.locked ? 'none' : '0 4px 16px rgba(212,160,23,0.15)',
              opacity: surah.locked ? 0.6 : 1,
            }}
            onClick={() => !surah.locked && setSelectedSurah(surah.id)}
            whileHover={!surah.locked ? { scale: 1.01 } : {}}
            whileTap={!surah.locked ? { scale: 0.98 } : {}}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-xl shrink-0"
                style={{ backgroundColor: surah.locked ? '#E2E8F0' : '#1B4D6B', color: surah.locked ? '#94A3B8' : '#D4A017' }}
              >
                {surah.locked ? '🔒' : surah.id}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <h3 className="font-bold text-lg" style={{ color: '#1B4D6B', fontFamily: 'Nunito, sans-serif' }}>
                    Surah {surah.name}
                  </h3>
                  <span style={{ fontFamily: 'Amiri, serif', color: '#D4A017', fontSize: '18px' }}>
                    {surah.arabicName}
                  </span>
                </div>
                <p className="text-sm opacity-70" style={{ color: '#64748B', fontFamily: 'Nunito, sans-serif' }}>
                  {surah.description}
                </p>
                {!surah.locked && (
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs" style={{ color: '#94A3B8', fontFamily: 'Nunito, sans-serif' }}>
                      {surah.totalVerses} verses
                    </span>
                  </div>
                )}
                {surah.locked && (
                  <div className="text-xs mt-1" style={{ color: '#94A3B8', fontFamily: 'Nunito, sans-serif' }}>
                    Coming soon
                  </div>
                )}
              </div>
              {!surah.locked && (
                <div className="text-2xl">▶️</div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
