import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HARAKAT, PRACTICE_LETTERS } from '../data/harakat';
import { LETTERS } from '../data/letters';
import { useAudio } from '../hooks/useAudio';
import { PageHeader } from '../components/ui/PageHeader';
import { StarBurst } from '../components/ui/StarBurst';

const MODES = [
  { id: 'learn', label: 'Learn', emoji: '📚' },
  { id: 'quiz', label: 'Quiz', emoji: '🎯' },
  { id: 'build', label: 'Build', emoji: '🔨' },
];

function LearnMode() {
  const { speak } = useAudio();
  const [activeLetter, setActiveLetter] = useState(LETTERS[1]);
  const mainHarakat = HARAKAT.filter(h => ['zabar', 'zer', 'pesh'].includes(h.id));

  return (
    <div className="p-4">
      {/* Harakat info cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {mainHarakat.map(h => (
          <motion.div
            key={h.id}
            className="rounded-2xl p-3 text-center cursor-pointer"
            style={{ backgroundColor: h.bgColor, border: `3px solid ${h.color}` }}
            onClick={() => speak(h.example)}
            whileTap={{ scale: 0.93 }}
          >
            <div style={{ fontFamily:'IndoPak Nastaleeq,serif', fontSize: '48px', color: h.color, direction: 'rtl', lineHeight: 1.4 }}>
              {h.example}
            </div>
            <div className="font-bold text-sm" style={{ color: h.color, fontFamily: 'Nunito, sans-serif' }}>
              {h.name}
            </div>
            <div className="text-xs mt-0.5" style={{ color: h.color, fontFamily: 'Nunito, sans-serif', opacity: 0.8 }}>
              "{h.sound}" sound
            </div>
          </motion.div>
        ))}
      </div>

      {/* Color key */}
      <div className="rounded-2xl p-3 mb-5 flex justify-around" style={{ backgroundColor: '#FEF3C7', border: '2px solid #D4A017' }}>
        {mainHarakat.map(h => (
          <div key={h.id} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: h.color }} />
            <span className="text-xs font-bold" style={{ color: h.color, fontFamily: 'Nunito, sans-serif' }}>{h.name}</span>
          </div>
        ))}
      </div>

      {/* Interactive practice */}
      <h3 className="font-bold mb-3 text-center" style={{ color: '#1B4D6B', fontFamily: 'Nunito, sans-serif' }}>
        🎵 Choose a letter:
      </h3>
      <div className="flex gap-2 flex-wrap justify-center mb-5">
        {LETTERS.slice(0, 10).map(l => (
          <button
            key={l.id}
            onClick={() => setActiveLetter(l)}
            className="px-3 py-2 rounded-xl transition-all"
            style={{
              fontFamily:'IndoPak Nastaleeq,serif', fontSize: '24px',
              backgroundColor: activeLetter.id === l.id ? '#1B4D6B' : '#F1F5F9',
              color: activeLetter.id === l.id ? '#D4A017' : '#1B4D6B',
              minWidth: '50px', textAlign: 'center',
            }}
          >
            {l.arabic}
          </button>
        ))}
      </div>

      {/* All harakat combos for selected letter */}
      <div className="grid grid-cols-3 gap-3">
        {HARAKAT.map(h => {
          const combined = `${activeLetter.arabic}${h.arabic}`;
          return (
            <motion.div
              key={h.id}
              className="rounded-2xl p-3 text-center cursor-pointer"
              style={{ backgroundColor: h.bgColor || 'white', border: `2px solid ${h.color}` }}
              onClick={() => speak(combined)}
              whileTap={{ scale: 0.9 }}
            >
              <div style={{ fontFamily:'IndoPak Nastaleeq,serif', fontSize: '40px', color: '#1B4D6B', direction: 'rtl', lineHeight: 1.4 }}>
                {combined}
              </div>
              <div className="text-xs font-bold" style={{ color: h.color, fontFamily: 'Nunito, sans-serif' }}>
                {h.name}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function QuizMode() {
  const { speak } = useAudio();
  const mainHarakat = HARAKAT.filter(h => ['zabar', 'zer', 'pesh'].includes(h.id));
  const [current, setCurrent] = useState(null);
  const [options, setOptions] = useState([]);
  const [answered, setAnswered] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [showBurst, setShowBurst] = useState(false);

  const generateQuestion = () => {
    const letter = LETTERS[Math.floor(Math.random() * 10)];
    const correctH = mainHarakat[Math.floor(Math.random() * 3)];
    const combined = `${letter.arabic}${correctH.arabic}`;

    const wrongOptions = mainHarakat.filter(h => h.id !== correctH.id);
    const allOptions = [
      { ...correctH, isCorrect: true },
      ...wrongOptions.slice(0, 2).map(h => ({ ...h, isCorrect: false })),
    ].sort(() => Math.random() - 0.5);

    setCurrent({ letter, harakat: correctH, combined });
    setOptions(allOptions);
    setAnswered(null);

    // Speak the combination
    setTimeout(() => speak(combined), 300);
  };

  useEffect(() => { generateQuestion(); }, []);

  const handleAnswer = (option) => {
    if (answered) return;
    setAnswered(option.id);
    setTotal(t => t + 1);
    if (option.isCorrect) {
      setScore(s => s + 1);
      setShowBurst(true);
    }
    setTimeout(generateQuestion, 1500);
  };

  if (!current) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="p-4">
      {/* Score */}
      <div className="flex justify-between items-center mb-5">
        <div className="rounded-xl px-4 py-2" style={{ backgroundColor: '#F0FDF4', border: '2px solid #22C55E' }}>
          <span className="font-bold" style={{ color: '#166534', fontFamily: 'Nunito, sans-serif' }}>
            ✅ {score}/{total}
          </span>
        </div>
        <div className="text-sm" style={{ color: '#64748B', fontFamily: 'Nunito, sans-serif' }}>
          What vowel sound?
        </div>
        <button
          onClick={() => speak(current.combined)}
          className="rounded-xl px-4 py-2 font-bold text-white"
          style={{ backgroundColor: '#1B4D6B' }}
        >
          🔊 Hear
        </button>
      </div>

      {/* Question: show the combination */}
      <motion.div
        key={current.combined}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="rounded-3xl p-8 text-center mb-6"
        style={{ backgroundColor: 'white', boxShadow: '0 8px 32px rgba(27,77,107,0.15)' }}
      >
        <div style={{ fontFamily:'IndoPak Nastaleeq,serif', fontSize: '100px', color: '#1B4D6B', direction: 'rtl', lineHeight: 1.2 }}>
          {current.combined}
        </div>
        <div className="text-sm mt-2 font-bold" style={{ color: '#64748B', fontFamily: 'Nunito, sans-serif' }}>
          What is the vowel sound?
        </div>
      </motion.div>

      {/* Options */}
      <div className="grid grid-cols-3 gap-3">
        {options.map(option => {
          let bgColor = option.bgColor;
          let borderColor = option.color;
          if (answered) {
            if (option.isCorrect) { bgColor = '#F0FDF4'; borderColor = '#22C55E'; }
            else if (option.id === answered) { bgColor = '#FEF2F2'; borderColor = '#EF4444'; }
          }
          return (
            <motion.button
              key={option.id}
              onClick={() => handleAnswer(option)}
              className="rounded-2xl p-4 text-center font-bold"
              style={{
                backgroundColor: bgColor,
                border: `3px solid ${borderColor}`,
                fontFamily: 'Nunito, sans-serif',
                color: option.color,
              }}
              whileTap={{ scale: answered ? 1 : 0.93 }}
              animate={answered && option.id === answered && !option.isCorrect
                ? { x: [-4, 4, -4, 4, 0] }
                : {}
              }
              transition={{ duration: 0.3 }}
            >
              <div className="text-2xl mb-1">{option.id === 'zabar' ? '☀️' : option.id === 'zer' ? '💧' : '🌿'}</div>
              <div>{option.name}</div>
              <div className="text-lg font-bold">"{option.sound}"</div>
            </motion.button>
          );
        })}
      </div>

      <StarBurst show={showBurst} onComplete={() => setShowBurst(false)} />
    </div>
  );
}

function BuildMode() {
  const { speak } = useAudio();
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [selectedHarakat, setSelectedHarakat] = useState(null);
  const mainHarakat = HARAKAT.filter(h => ['zabar', 'zer', 'pesh', 'sukoon'].includes(h.id));

  const combined = selectedLetter && selectedHarakat
    ? `${selectedLetter.arabic}${selectedHarakat.arabic}`
    : null;

  const handleSpeak = () => {
    if (combined) speak(combined);
  };

  return (
    <div className="p-4">
      <p className="text-center text-sm mb-5" style={{ color: '#64748B', fontFamily: 'Nunito, sans-serif' }}>
        Pick a letter + vowel mark to build a syllable!
      </p>

      {/* Build area */}
      <motion.div
        className="rounded-3xl p-6 text-center mb-6 cursor-pointer"
        style={{
          backgroundColor: combined ? '#1B4D6B' : '#F1F5F9',
          border: `3px dashed ${combined ? '#D4A017' : '#CBD5E1'}`,
          minHeight: '130px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        onClick={handleSpeak}
        whileTap={combined ? { scale: 0.97 } : {}}
      >
        {combined ? (
          <div>
            <div style={{ fontFamily:'IndoPak Nastaleeq,serif', fontSize: '80px', color: '#D4A017', direction: 'rtl', lineHeight: 1.3 }}>
              {combined}
            </div>
            <div className="text-white text-sm mt-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
              🔊 Tap to hear!
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-4xl mb-2">
              {selectedLetter
                ? <span style={{ fontFamily:'IndoPak Nastaleeq,serif', color: '#1B4D6B' }}>{selectedLetter.arabic}</span>
                : '?'} + {selectedHarakat ? <span style={{ color: selectedHarakat.color }}>◌{selectedHarakat.arabic}</span> : '?'}
            </div>
            <div className="text-sm" style={{ color: '#94A3B8', fontFamily: 'Nunito, sans-serif' }}>
              Choose letter & vowel below
            </div>
          </div>
        )}
      </motion.div>

      {/* Letter picker */}
      <h4 className="font-bold mb-2" style={{ color: '#1B4D6B', fontFamily: 'Nunito, sans-serif' }}>1. Choose a letter:</h4>
      <div className="flex gap-2 flex-wrap mb-4">
        {LETTERS.slice(0, 12).map(l => (
          <button
            key={l.id}
            onClick={() => setSelectedLetter(l)}
            className="rounded-xl px-3 py-2 transition-all"
            style={{
              fontFamily:'IndoPak Nastaleeq,serif', fontSize: '26px',
              backgroundColor: selectedLetter?.id === l.id ? '#1B4D6B' : 'white',
              color: selectedLetter?.id === l.id ? '#D4A017' : '#1B4D6B',
              border: '2px solid',
              borderColor: selectedLetter?.id === l.id ? '#D4A017' : '#E2E8F0',
              minWidth: '50px', textAlign: 'center',
            }}
          >
            {l.arabic}
          </button>
        ))}
      </div>

      {/* Harakat picker */}
      <h4 className="font-bold mb-2" style={{ color: '#1B4D6B', fontFamily: 'Nunito, sans-serif' }}>2. Choose a vowel:</h4>
      <div className="grid grid-cols-4 gap-2">
        {mainHarakat.map(h => (
          <button
            key={h.id}
            onClick={() => setSelectedHarakat(h)}
            className="rounded-xl py-3 text-center transition-all"
            style={{
              backgroundColor: selectedHarakat?.id === h.id ? h.color : h.bgColor,
              border: `2px solid ${h.color}`,
              color: selectedHarakat?.id === h.id ? 'white' : h.color,
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 'bold',
              fontSize: '13px',
            }}
          >
            <div style={{ fontFamily:'IndoPak Nastaleeq,serif', fontSize: '24px', direction: 'rtl' }}>◌{h.arabic}</div>
            <div>{h.name}</div>
          </button>
        ))}
      </div>

      {combined && (
        <motion.button
          onClick={() => { setSelectedLetter(null); setSelectedHarakat(null); }}
          className="mt-4 w-full py-3 rounded-xl font-bold"
          style={{ backgroundColor: '#E2E8F0', color: '#64748B', fontFamily: 'Nunito, sans-serif' }}
          whileTap={{ scale: 0.97 }}
        >
          🔄 Reset & Try Again
        </motion.button>
      )}
    </div>
  );
}

export default function HarakatPage() {
  const [mode, setMode] = useState('learn');

  return (
    <div style={{ minHeight: '100vh' }}>
      <PageHeader
        title="Harakat — Vowels"
        titleArabic="حركات"
        subtitle="Learn the three short vowel marks"
        emoji="🔤"
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

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {mode === 'learn' && <LearnMode />}
          {mode === 'quiz' && <QuizMode />}
          {mode === 'build' && <BuildMode />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
