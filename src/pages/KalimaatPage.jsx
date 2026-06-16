import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WORDS, THEMES } from '../data/words';
import { useAudio } from '../hooks/useAudio';
import { PageHeader } from '../components/ui/PageHeader';
import { StarBurst } from '../components/ui/StarBurst';

const MODES = [
  { id: 'browse', label: 'Browse', emoji: '📖' },
  { id: 'match', label: 'Match', emoji: '🎮' },
];

function BrowseMode({ filter }) {
  const { speak, speakLetter } = useAudio();
  const [expanded, setExpanded] = useState(null);

  const filtered = filter === 'all' ? WORDS : WORDS.filter(w => w.theme === filter);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-3">
        {filtered.map(word => (
          <motion.div
            key={word.id}
            className="rounded-2xl overflow-hidden cursor-pointer"
            style={{
              backgroundColor: 'white',
              border: `2px solid ${expanded === word.id ? '#D4A017' : '#E2E8F0'}`,
              boxShadow: '0 4px 12px rgba(27,77,107,0.08)',
            }}
            onClick={() => {
              setExpanded(expanded === word.id ? null : word.id);
              speak(word.arabic);
            }}
          >
            {/* Main row */}
            <div className="flex items-center gap-3 p-4">
              <div className="text-3xl shrink-0">{word.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div style={{ fontFamily: 'Amiri, serif', fontSize: '32px', color: '#1B4D6B', direction: 'rtl' }}>
                    {word.arabic}
                  </div>
                  <span className="text-xl">{expanded === word.id ? '▲' : '▼'}</span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-bold text-sm" style={{ color: '#64748B', fontFamily: 'Nunito, sans-serif' }}>
                    {word.transliteration}
                  </span>
                  <span className="text-sm" style={{ color: '#94A3B8', fontFamily: 'Nunito, sans-serif' }}>
                    — {word.meaning}
                  </span>
                </div>
              </div>
            </div>

            {/* Expanded: letter breakdown */}
            <AnimatePresence>
              {expanded === word.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ overflow: 'hidden', backgroundColor: '#FDF6E3', borderTop: '2px solid #D4A017' }}
                >
                  <div className="p-4">
                    <p className="text-xs font-bold mb-3" style={{ color: '#1B4D6B', fontFamily: 'Nunito, sans-serif' }}>
                      Tap each letter to hear it:
                    </p>
                    <div className="flex gap-3 flex-wrap justify-end mb-3" dir="rtl">
                      {word.letters.map((l, i) => (
                        <motion.button
                          key={i}
                          className="rounded-xl px-4 py-3"
                          style={{
                            fontFamily: 'Amiri, serif', fontSize: '28px',
                            backgroundColor: 'white', border: '2px solid #1B4D6B', color: '#1B4D6B',
                          }}
                          onClick={(e) => { e.stopPropagation(); speakLetter(l); }}
                          whileTap={{ scale: 0.9, backgroundColor: '#1B4D6B', color: 'white' }}
                        >
                          {l}
                        </motion.button>
                      ))}
                    </div>
                    {/* Theme badge */}
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full capitalize"
                        style={{ backgroundColor: '#1B4D6B20', color: '#1B4D6B', fontFamily: 'Nunito, sans-serif' }}
                      >
                        {word.theme}
                      </span>
                      <button
                        className="text-sm px-3 py-1 rounded-full font-bold text-white"
                        style={{ backgroundColor: '#1B4D6B' }}
                        onClick={(e) => { e.stopPropagation(); speak(word.arabic); }}
                      >
                        🔊 Full Word
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function MatchGame() {
  const { speak } = useAudio();
  const gameWords = WORDS.slice(0, 6);
  const [matched, setMatched] = useState([]);
  const [selectedArabic, setSelectedArabic] = useState(null);
  const [selectedMeaning, setSelectedMeaning] = useState(null);
  const [wrongPair, setWrongPair] = useState(null);
  const [showBurst, setShowBurst] = useState(false);

  const arabicItems = useMemo(() => [...gameWords].sort(() => Math.random() - 0.5), []);
  const meaningItems = useMemo(() => [...gameWords].sort(() => Math.random() - 0.5), []);

  const handleArabicSelect = (word) => {
    if (matched.includes(word.id)) return;
    speak(word.arabic);
    setSelectedArabic(word);
    if (selectedMeaning) {
      checkMatch(word, selectedMeaning);
    }
  };

  const handleMeaningSelect = (word) => {
    if (matched.includes(word.id)) return;
    setSelectedMeaning(word);
    if (selectedArabic) {
      checkMatch(selectedArabic, word);
    }
  };

  const checkMatch = (arab, mean) => {
    if (arab.id === mean.id) {
      setMatched(m => [...m, arab.id]);
      setShowBurst(true);
      setSelectedArabic(null);
      setSelectedMeaning(null);
    } else {
      setWrongPair([arab.id, mean.id]);
      setTimeout(() => {
        setWrongPair(null);
        setSelectedArabic(null);
        setSelectedMeaning(null);
      }, 800);
    }
  };

  const allMatched = matched.length === gameWords.length;

  return (
    <div className="p-4">
      {/* Score */}
      <div className="flex items-center justify-between mb-4">
        <div className="font-bold" style={{ color: '#1B4D6B', fontFamily: 'Nunito, sans-serif' }}>
          {matched.length}/{gameWords.length} matched ✅
        </div>
        {allMatched && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="font-bold px-3 py-1 rounded-full"
            style={{ backgroundColor: '#22C55E', color: 'white', fontFamily: 'Nunito, sans-serif' }}
          >
            🎉 All Done!
          </motion.div>
        )}
      </div>

      <div className="flex gap-3">
        {/* Arabic column */}
        <div className="flex-1 flex flex-col gap-2">
          <p className="text-xs text-center font-bold mb-1" style={{ color: '#64748B', fontFamily: 'Nunito, sans-serif' }}>Arabic</p>
          {arabicItems.map(word => {
            const isMatched = matched.includes(word.id);
            const isSelected = selectedArabic?.id === word.id;
            const isWrong = wrongPair?.includes(word.id);
            return (
              <motion.button
                key={word.id}
                onClick={() => handleArabicSelect(word)}
                className="rounded-xl py-4 px-3 text-center"
                style={{
                  fontFamily: 'Amiri, serif', fontSize: '28px', direction: 'rtl',
                  backgroundColor: isMatched ? '#F0FDF4' : isWrong ? '#FEF2F2' : isSelected ? '#1B4D6B' : 'white',
                  color: isMatched ? '#22C55E' : isWrong ? '#EF4444' : isSelected ? '#D4A017' : '#1B4D6B',
                  border: `2px solid ${isMatched ? '#22C55E' : isWrong ? '#EF4444' : isSelected ? '#D4A017' : '#E2E8F0'}`,
                  opacity: isMatched ? 0.7 : 1,
                }}
                animate={isWrong ? { x: [-4, 4, -4, 4, 0] } : {}}
                transition={{ duration: 0.3 }}
              >
                {word.arabic}
              </motion.button>
            );
          })}
        </div>

        {/* Meanings column */}
        <div className="flex-1 flex flex-col gap-2">
          <p className="text-xs text-center font-bold mb-1" style={{ color: '#64748B', fontFamily: 'Nunito, sans-serif' }}>Meaning</p>
          {meaningItems.map(word => {
            const isMatched = matched.includes(word.id);
            const isSelected = selectedMeaning?.id === word.id;
            const isWrong = wrongPair?.includes(word.id);
            return (
              <motion.button
                key={word.id}
                onClick={() => handleMeaningSelect(word)}
                className="rounded-xl py-4 px-3 text-center"
                style={{
                  fontFamily: 'Nunito, sans-serif', fontSize: '14px', fontWeight: 'bold',
                  backgroundColor: isMatched ? '#F0FDF4' : isWrong ? '#FEF2F2' : isSelected ? '#1B4D6B' : 'white',
                  color: isMatched ? '#22C55E' : isWrong ? '#EF4444' : isSelected ? 'white' : '#1B4D6B',
                  border: `2px solid ${isMatched ? '#22C55E' : isWrong ? '#EF4444' : isSelected ? '#D4A017' : '#E2E8F0'}`,
                  opacity: isMatched ? 0.7 : 1,
                }}
                animate={isWrong ? { x: [-4, 4, -4, 4, 0] } : {}}
                transition={{ duration: 0.3 }}
              >
                <span className="text-lg block">{word.icon}</span>
                {word.meaning}
              </motion.button>
            );
          })}
        </div>
      </div>

      <StarBurst show={showBurst} onComplete={() => setShowBurst(false)} />
    </div>
  );
}

export default function KalimaatPage() {
  const [mode, setMode] = useState('browse');
  const [filter, setFilter] = useState('all');

  return (
    <div style={{ minHeight: '100vh' }}>
      <PageHeader
        title="Kalimaat — Words"
        titleArabic="كلمات"
        subtitle="Quranic vocabulary with letter breakdown"
        emoji="💬"
      />

      {/* Mode tabs */}
      <div className="flex p-3 gap-2" style={{ backgroundColor: '#F8FAFC' }}>
        {MODES.map(m => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className="flex-1 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5 transition-all"
            style={{
              backgroundColor: mode === m.id ? '#1B4D6B' : 'white',
              color: mode === m.id ? 'white' : '#64748B',
              fontFamily: 'Nunito, sans-serif',
              border: '2px solid',
              borderColor: mode === m.id ? '#1B4D6B' : '#E2E8F0',
            }}
          >
            <span>{m.emoji}</span>
            <span>{m.label}</span>
          </button>
        ))}
      </div>

      {/* Filter (browse mode only) */}
      {mode === 'browse' && (
        <div className="flex gap-2 px-4 py-2 overflow-x-auto" style={{ backgroundColor: '#F8FAFC' }}>
          {THEMES.map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className="shrink-0 px-3 py-1 rounded-full text-sm font-bold capitalize transition-all"
              style={{
                backgroundColor: filter === t ? '#D4A017' : '#E2E8F0',
                color: filter === t ? '#1B4D6B' : '#64748B',
                fontFamily: 'Nunito, sans-serif',
              }}
            >
              {t === 'all' ? '📚 All' : t === 'worship' ? '🕌 Worship' : t === 'nature' ? '🌿 Nature' : '👨‍👩‍👧 Family'}
            </button>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {mode === 'browse' ? <BrowseMode filter={filter} /> : <MatchGame />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
