import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QAIDA_LESSONS, WAQF_SIGNS, MADD_TYPES } from '../data/qaida';
import { LETTERS, LETTER_GROUPS, QALQALAH_LETTERS } from '../data/letters';
import { HARAKAT } from '../data/harakat';
import { WORDS } from '../data/words';
import { useProgress } from '../hooks/useProgress';
import { useAudio } from '../hooks/useAudio';
import { LetterCard, LetterCardWithHarakat } from '../components/letters/LetterCard';
import { CelebrationModal } from '../components/ui/CelebrationModal';
import { PageHeader } from '../components/ui/PageHeader';
import { ArabicSoundChip } from '../components/ui/SoundButton';

// ─── Visual helpers ────────────────────────────────────────────────────────────

function HarakatBadge({ harakat }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
      style={{ backgroundColor: harakat.bgColor, border: `2.5px solid ${harakat.color}` }}>
      <span style={{ fontFamily:'IndoPak Nastaleeq,serif', fontSize:'24px', color: harakat.color, direction:'rtl', lineHeight:1.5 }}>
        ◌{harakat.arabic}
      </span>
      <span className="font-extrabold text-sm" style={{ color: harakat.color, fontFamily:'Fredoka One,cursive' }}>
        {harakat.name}
      </span>
    </div>
  );
}

function TipBox({ color, emoji, children }) {
  return (
    <div className="rounded-2xl p-4 flex gap-3 items-start"
      style={{ backgroundColor: color + '18', border: `2px solid ${color}40` }}>
      <span className="text-2xl shrink-0">{emoji}</span>
      <div className="text-sm font-bold" style={{ color, fontFamily:'Nunito,sans-serif' }}>{children}</div>
    </div>
  );
}

function CompleteButton({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className="bubble-btn w-full py-4 text-xl font-extrabold text-white mt-4"
      style={{ background: 'linear-gradient(135deg,#2E7D32,#43A047)', fontFamily:'Fredoka One,cursive' }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      ✅ Complete Lesson!
    </motion.button>
  );
}

// ─── Lesson 1 — Letters ────────────────────────────────────────────────────────
function LessonLetters({ onComplete }) {
  const [activeGroup, setActiveGroup] = useState(0);
  const group = LETTER_GROUPS[activeGroup];
  const groupLetters = LETTERS.filter(l => group.letters.includes(l.arabic));

  return (
    <div className="p-4">
      <TipBox color="#1B4D6B" emoji="👆">
        Tap any letter card to hear how it sounds! Learn each group before moving on.
      </TipBox>

      {/* Group tabs */}
      <div className="flex gap-2 overflow-x-auto py-3 -mx-1 px-1">
        {LETTER_GROUPS.map((g, i) => (
          <button key={g.id} onClick={() => setActiveGroup(i)}
            className="shrink-0 px-4 py-2 rounded-full font-extrabold text-sm bubble-btn transition-all"
            style={{
              backgroundColor: activeGroup===i ? '#1B4D6B' : '#E2E8F0',
              color: activeGroup===i ? '#FFD54F' : '#64748B',
              fontFamily: 'Fredoka One,cursive',
              boxShadow: activeGroup===i ? '0 4px 0 #0d2d40' : '0 3px 0 #CBD5E1',
            }}>
            {g.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activeGroup}
          initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-40 }}
          className="grid grid-cols-2 gap-4 mb-4">
          {groupLetters.map(letter => (
            <LetterCard key={letter.id} letter={letter} size="md" />
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-3">
        {activeGroup > 0 && (
          <button onClick={() => setActiveGroup(a=>a-1)}
            className="flex-1 py-3 rounded-2xl font-extrabold bubble-btn"
            style={{ backgroundColor:'#E2E8F0', color:'#1B4D6B', fontFamily:'Fredoka One,cursive', boxShadow:'0 4px 0 #CBD5E1' }}>
            ← Prev
          </button>
        )}
        {activeGroup < LETTER_GROUPS.length-1 ? (
          <button onClick={() => setActiveGroup(a=>a+1)}
            className="flex-1 py-3 rounded-2xl font-extrabold text-white bubble-btn"
            style={{ backgroundColor:'#1B4D6B', fontFamily:'Fredoka One,cursive', boxShadow:'0 4px 0 #0d2d40' }}>
            Next Group →
          </button>
        ) : (
          <CompleteButton onClick={() => onComplete(3)} />
        )}
      </div>
    </div>
  );
}

// ─── Lesson 2/3 — Harakat / Tanwin ────────────────────────────────────────────
function LessonHarakat({ onComplete, isTanwin }) {
  const { speak } = useAudio();
  const harakatList = isTanwin
    ? HARAKAT.filter(h => h.id.startsWith('tanwin'))
    : HARAKAT.filter(h => ['zabar','zer','pesh'].includes(h.id));
  const practiceLetters = LETTERS.slice(0,8);
  const [activeLetter, setActiveLetter] = useState(practiceLetters[0]);

  const colorGuide = [
    { label:'Zabar', sound:'a', color:'#E65100', bg:'#FFF3E0', emoji:'☀️', tip:'' },
    { label:'Zer',   sound:'i', color:'#1565C0', bg:'#E3F2FD', emoji:'💧', tip:'' },
    { label:'Pesh',  sound:'u', color:'#2E7D32', bg:'#E8F5E9', emoji:'🌿', tip:'' },
  ];

  return (
    <div className="p-4 space-y-4">
      {!isTanwin && (
        <div className="grid grid-cols-3 gap-3">
          {colorGuide.map(g => (
            <div key={g.label} className="rounded-2xl p-3 text-center"
              style={{ backgroundColor: g.bg, border: `3px solid ${g.color}40` }}>
              <div className="text-3xl mb-1">{g.emoji}</div>
              <div className="font-extrabold" style={{ color: g.color, fontFamily:'Fredoka One,cursive' }}>{g.label}</div>
              <div className="text-2xl font-extrabold" style={{ color: g.color }}>"{g.sound}"</div>
              <div className="text-xs mt-1 opacity-80" style={{ color: g.color, fontFamily:'Nunito,sans-serif' }}>{g.tip}</div>
            </div>
          ))}
        </div>
      )}

      {isTanwin && (
        <TipBox color="#1565C0" emoji="💡">
          Tanwin adds a "N" sound at the end of the word. Two marks = double sound with Nun (ن).
        </TipBox>
      )}

      {/* Visual harakat cards */}
      <div>
        <h3 className="font-extrabold mb-3" style={{ color:'#1B4D6B', fontFamily:'Fredoka One,cursive' }}>
          🎵 Tap to hear each vowel:
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {harakatList.map(h => (
            <motion.div key={h.id}
              className="rounded-2xl p-4 text-center cursor-pointer"
              style={{ backgroundColor: h.bgColor, border: `3px solid ${h.color}`, boxShadow: `0 5px 0 ${h.color}50` }}
              onClick={() => speak(h.example)}
              whileTap={{ scale:0.92, y:4 }}
              whileHover={{ scale:1.04, y:-3 }}>
              <div style={{ fontFamily:'IndoPak Nastaleeq,serif', fontSize:'52px', color:h.color, direction:'rtl', lineHeight:1.4 }}>
                {h.example}
              </div>
              <div className="font-extrabold text-sm mt-1" style={{ color:h.color, fontFamily:'Fredoka One,cursive' }}>
                {h.name}
              </div>
              <div className="text-2xl mt-1">🔊</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Letter selector */}
      <div>
        <h3 className="font-extrabold mb-2" style={{ color:'#1B4D6B', fontFamily:'Fredoka One,cursive' }}>
          👉 Pick a letter to practice:
        </h3>
        <div className="flex gap-2 flex-wrap">
          {practiceLetters.map(l => (
            <button key={l.id} onClick={() => setActiveLetter(l)}
              className="px-3 py-2 rounded-xl text-2xl transition-all bubble-btn"
              style={{
                fontFamily:'IndoPak Nastaleeq,serif',
                backgroundColor: activeLetter.id===l.id ? '#1B4D6B' : 'white',
                color: activeLetter.id===l.id ? '#FFD54F' : '#1B4D6B',
                border: `2px solid ${activeLetter.id===l.id ? '#FFD54F' : '#E2E8F0'}`,
                boxShadow: activeLetter.id===l.id ? '0 4px 0 #0d2d40' : '0 3px 0 #CBD5E1',
                minWidth:'52px', textAlign:'center',
              }}>
              {l.arabic}
            </button>
          ))}
        </div>
        <div className="flex gap-3 flex-wrap justify-center mt-4">
          {harakatList.map(h => (
            <LetterCardWithHarakat key={h.id} letter={activeLetter} harakat={h} />
          ))}
        </div>
      </div>

      <CompleteButton onClick={() => onComplete(3)} />
    </div>
  );
}

// ─── Lesson 4 — Madd ──────────────────────────────────────────────────────────
function LessonMadd({ onComplete }) {
  const { speak } = useAudio();

  return (
    <div className="p-4 space-y-4">
      {/* Visual explainer */}
      <div className="rounded-3xl p-5 text-center"
        style={{ background:'linear-gradient(135deg,#E3F2FD,#BBDEFB)', border:'3px solid #1E88E5' }}>
        <div className="text-4xl mb-2">〰️</div>
        <h3 className="text-xl font-extrabold" style={{ color:'#1565C0', fontFamily:'Fredoka One,cursive' }}>
          Madd = Stretch & Hold!
        </h3>
        <p className="text-sm mt-1" style={{ color:'#1565C0', fontFamily:'Nunito,sans-serif' }}>
          When you see ا و ي after their matching vowel — hold the sound for 2–4 beats
        </p>
        {/* Animated stretch */}
        <motion.div className="mt-3 text-4xl" style={{ fontFamily:'IndoPak Nastaleeq,serif', color:'#1565C0' }}
          animate={{ scaleX:[1,1.6,1] }}
          transition={{ duration:2, repeat:Infinity, repeatDelay:0.5 }}
          style={{ transformOrigin:'right', fontFamily:'IndoPak Nastaleeq,serif', color:'#1565C0', fontSize:'40px' }}>
          مَـــــال
        </motion.div>
        <p className="text-xs mt-2 opacity-70" style={{ color:'#1565C0', fontFamily:'Nunito,sans-serif' }}>
          🎵 Think of Madd like singing a note — hold it out!
        </p>
      </div>

      {/* Three Madd types */}
      <div className="space-y-3">
        {[
          { arabic:'آ / ـا', after:'Zabar (َ)', sound:'aaa', color:'#E65100', bg:'#FFF3E0', example:'مَال', label:'Alif Madd' },
          { arabic:'و',      after:'Pesh (ُ)',  sound:'ooo', color:'#2E7D32', bg:'#E8F5E9', example:'نُور', label:'Waw Madd' },
          { arabic:'ي',      after:'Zer (ِ)',   sound:'eee', color:'#1565C0', bg:'#E3F2FD', example:'رَحِيم', label:'Ya Madd' },
        ].map((m,i) => (
          <motion.div key={i}
            className="rounded-2xl p-4 flex items-center gap-4 cursor-pointer"
            style={{ backgroundColor: m.bg, border:`2.5px solid ${m.color}40`, boxShadow:`0 4px 0 ${m.color}20` }}
            onClick={() => speak(m.example)}
            whileTap={{ scale:0.97, y:3 }}>
            {/* Animated example */}
            <motion.div style={{ fontFamily:'IndoPak Nastaleeq,serif', fontSize:'44px', color:m.color, direction:'rtl', minWidth:'80px', textAlign:'center' }}
              animate={{ scaleX:[1,1.3,1] }}
              transition={{ duration:2, repeat:Infinity, repeatDelay:i }}>
              {m.example}
            </motion.div>
            <div className="flex-1">
              <div className="font-extrabold" style={{ color:m.color, fontFamily:'Fredoka One,cursive' }}>{m.label}</div>
              <div className="text-sm" style={{ fontFamily:'Nunito,sans-serif', color:m.color }}>
                Letter <strong style={{ fontFamily:'IndoPak Nastaleeq,serif', fontSize:'18px' }}>{m.arabic}</strong> after {m.after}
              </div>
              <div className="text-lg font-extrabold mt-1" style={{ color:m.color }}>"{m.sound}"</div>
            </div>
            <span className="text-2xl">🔊</span>
          </motion.div>
        ))}
      </div>

      <CompleteButton onClick={() => onComplete(3)} />
    </div>
  );
}

// ─── Lesson 5 — Sukoon ────────────────────────────────────────────────────────
function LessonSukoon({ onComplete }) {
  const { speak } = useAudio();
  return (
    <div className="p-4 space-y-4">
      {/* Hero card */}
      <div className="rounded-3xl p-5 text-center"
        style={{ background:'linear-gradient(135deg,#EDE9FE,#DDD6FE)', border:'3px solid #7C3AED' }}>
        {/* Stop sign SVG */}
        <svg viewBox="0 0 100 100" width="80" height="80" className="mx-auto mb-2">
          <polygon points="30,10 70,10 95,35 95,65 70,90 30,90 5,65 5,35"
            fill="#EF4444" stroke="#B91C1C" strokeWidth="3" />
          <text x="50" y="58" textAnchor="middle" fontSize="28" fontFamily="Fredoka One,cursive" fill="white">
            STOP
          </text>
        </svg>
        <motion.div style={{ fontFamily:'IndoPak Nastaleeq,serif', fontSize:'80px', color:'#7C3AED', direction:'rtl', lineHeight:1 }}
          animate={{ scale:[1,1.05,1] }} transition={{ duration:1.5, repeat:Infinity }}>
          بْ
        </motion.div>
        <h3 className="text-xl font-extrabold mt-2" style={{ color:'#6D28D9', fontFamily:'Fredoka One,cursive' }}>
          Sukoon ( ْ )
        </h3>
        <p className="text-sm" style={{ color:'#6D28D9', fontFamily:'Nunito,sans-serif' }}>
          The small circle = <strong>NO VOWEL</strong> — just the consonant sound, then stop!
        </p>
      </div>

      <TipBox color="#7C3AED" emoji="✋">
        When you see ◌ْ — say the consonant cleanly with no "a/i/u" after it.
      </TipBox>

      <div className="space-y-2">
        {[
          { word:'بَيْت', meaning:'House 🏠', highlight:'يْ' },
          { word:'مِصْر', meaning:'Egypt 🇪🇬', highlight:'صْ' },
          { word:'كِتْب', meaning:'Books 📚', highlight:'تْ' },
        ].map((ex,i) => (
          <motion.div key={i}
            className="rounded-2xl p-4 flex items-center gap-4 cursor-pointer bg-white"
            style={{ border:'2.5px solid #EDE9FE', boxShadow:'0 4px 0 #DDD6FE' }}
            onClick={() => speak(ex.word)}
            whileTap={{ scale:0.97 }}>
            <span style={{ fontFamily:'IndoPak Nastaleeq,serif', fontSize:'48px', color:'#6D28D9', direction:'rtl' }}>
              {ex.word}
            </span>
            <div>
              <div className="font-extrabold" style={{ color:'#1B4D6B', fontFamily:'Fredoka One,cursive' }}>{ex.meaning}</div>
              <div className="text-sm" style={{ fontFamily:'Nunito,sans-serif', color:'#64748B' }}>
                <span style={{ fontFamily:'IndoPak Nastaleeq,serif', color:'#7C3AED', fontSize:'18px' }}>{ex.highlight}</span>
                {' '}has Sukoon
              </div>
            </div>
            <span className="ml-auto text-2xl">🔊</span>
          </motion.div>
        ))}
      </div>

      <CompleteButton onClick={() => onComplete(3)} />
    </div>
  );
}

// ─── Lesson 6 — Shaddah ───────────────────────────────────────────────────────
function LessonShaddah({ onComplete }) {
  const { speak } = useAudio();
  return (
    <div className="p-4 space-y-4">
      <div className="rounded-3xl p-5 text-center"
        style={{ background:'linear-gradient(135deg,#FCE7F3,#FBCFE8)', border:'3px solid #DB2777' }}>
        {/* Merge animation */}
        <div className="flex items-center justify-center gap-3 text-5xl mb-3">
          <span style={{ fontFamily:'IndoPak Nastaleeq,serif', color:'#DB2777' }}>ب</span>
          <span className="text-2xl">+</span>
          <span style={{ fontFamily:'IndoPak Nastaleeq,serif', color:'#DB2777' }}>ب</span>
          <span className="text-2xl">=</span>
          <motion.span style={{ fontFamily:'IndoPak Nastaleeq,serif', color:'#BE185D', fontSize:'56px' }}
            animate={{ scale:[1,1.2,1] }} transition={{ duration:0.8, repeat:Infinity }}>
            بّ
          </motion.span>
        </div>
        <h3 className="text-xl font-extrabold" style={{ color:'#9D174D', fontFamily:'Fredoka One,cursive' }}>
          Shaddah ( ّ )
        </h3>
        <p className="text-sm mt-1" style={{ color:'#9D174D', fontFamily:'Nunito,sans-serif' }}>
          Say the letter <strong>TWICE</strong> — it's like two letters merged into one!
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {['رَبّ','شَدّ','حَجّ','مَدّ','سَبّ','جَنّة'].map((w,i) => (
          <motion.button key={i}
            className="rounded-2xl p-4 text-center bubble-btn"
            style={{ fontFamily:'IndoPak Nastaleeq,serif', fontSize:'36px', backgroundColor:'#FCE7F3',
              border:'2.5px solid #DB2777', color:'#BE185D', boxShadow:'0 4px 0 #9D174D' }}
            onClick={() => speak(w)}
            whileTap={{ scale:0.9, y:3 }}>
            {w}
          </motion.button>
        ))}
      </div>

      <TipBox color="#DB2777" emoji="2️⃣">
        Shaddah = double power! The letter is said with extra emphasis, like pressing a key twice.
      </TipBox>

      <CompleteButton onClick={() => onComplete(3)} />
    </div>
  );
}

// ─── Lesson 7 — Qalqalah ──────────────────────────────────────────────────────
function LessonQalqalah({ onComplete }) {
  const { speak } = useAudio();
  const qLetters = LETTERS.filter(l => QALQALAH_LETTERS.includes(l.arabic));

  return (
    <div className="p-4 space-y-4">
      <div className="rounded-3xl p-4 text-center"
        style={{ background:'linear-gradient(135deg,#FEF3C7,#FDE68A)', border:'3px solid #D97706' }}>
        <div className="text-4xl mb-2">🎯</div>
        <h3 className="text-xl font-extrabold" style={{ color:'#92400E', fontFamily:'Fredoka One,cursive' }}>
          Qalqalah = Echo Bounce!
        </h3>
        <div style={{ fontFamily:'IndoPak Nastaleeq,serif', fontSize:'32px', color:'#1B4D6B', direction:'rtl' }}>
          قُطْبُ جَدّ
        </div>
        <p className="text-xs mt-1" style={{ color:'#92400E', fontFamily:'Nunito,sans-serif' }}>
          Mnemonic: "Qutb Jad" — these 5 letters bounce when they have Sukoon
        </p>
      </div>

      {/* 5 letters with bounce animation */}
      <div className="space-y-3">
        {qLetters.map((letter, i) => (
          <motion.div key={letter.id}
            className="rounded-2xl p-4 flex items-center gap-4 cursor-pointer"
            style={{ backgroundColor:'white', border:'2.5px solid #D97706', boxShadow:'0 4px 0 #B45309' }}
            onClick={() => speak(letter.arabic)}
            animate={{ y:[0,-5,0] }}
            transition={{ duration:0.7, repeat:Infinity, repeatDelay:1+i*0.4 }}
            whileTap={{ scale:0.95 }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background:'linear-gradient(135deg,#FEF3C7,#FDE68A)', border:'2px solid #D97706' }}>
              <span style={{ fontFamily:'IndoPak Nastaleeq,serif', fontSize:'40px', color:'#D97706', direction:'rtl' }}>
                {letter.arabic}ْ
              </span>
            </div>
            <div className="flex-1">
              <div className="font-extrabold text-lg" style={{ color:'#1B4D6B', fontFamily:'Fredoka One,cursive' }}>
                {letter.name}
              </div>
              <div className="text-sm" style={{ fontFamily:'Nunito,sans-serif', color:'#64748B' }}>
                Bounces like a ball when it has Sukoon 🎾
              </div>
            </div>
            <span className="text-2xl">🔊</span>
          </motion.div>
        ))}
      </div>

      <CompleteButton onClick={() => onComplete(3)} />
    </div>
  );
}

// ─── Lesson 8 — Waqf ──────────────────────────────────────────────────────────
function LessonWaqf({ onComplete }) {
  return (
    <div className="p-4 space-y-3">
      <TipBox color="#1B4D6B" emoji="🛑">
        Waqf signs in the Quran tell the reader when to stop, when to pause, and when to keep going.
      </TipBox>

      {WAQF_SIGNS.map((w,i) => (
        <div key={i} className="rounded-2xl p-4 flex items-center gap-4 bg-white"
          style={{ border:`2.5px solid ${w.color}30`, boxShadow:`0 4px 0 ${w.color}20` }}>
          {/* Sign badge */}
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 text-3xl font-extrabold"
            style={{ backgroundColor: w.color+'20', color: w.color, fontFamily:'IndoPak Nastaleeq,serif', direction:'rtl' }}>
            {w.sign}
          </div>
          <div className="flex-1">
            <div className="font-extrabold" style={{ color:'#1B4D6B', fontFamily:'Fredoka One,cursive' }}>
              {w.name}
            </div>
            <div className="text-xs mb-2" style={{ fontFamily:'Noto Nastaliq Urdu,serif', color:'#64748B', direction:'rtl' }}>
              {w.urdu}
            </div>
            {/* Rule pill */}
            <span className="inline-block px-3 py-1 rounded-full text-sm font-extrabold text-white"
              style={{ backgroundColor: w.color, fontFamily:'Fredoka One,cursive' }}>
              {w.rule}
            </span>
          </div>
        </div>
      ))}

      <CompleteButton onClick={() => onComplete(3)} />
    </div>
  );
}

// ─── Lesson 9 — Letter Forms ───────────────────────────────────────────────────
function LessonForms({ onComplete }) {
  const { speak } = useAudio();
  const [sel, setSel] = useState(LETTERS[1]);
  const fColors = { isolated:'#1B4D6B', initial:'#2E7D32', medial:'#E65100', final:'#7C3AED' };
  const fEmoji  = { isolated:'🔵', initial:'🟢', medial:'🟠', final:'🟣' };
  const fTip    = { isolated:'alone', initial:'start of word', medial:'middle of word', final:'end of word' };

  return (
    <div className="p-4 space-y-4">
      <TipBox color="#1B4D6B" emoji="🔗">
        Arabic letters change shape depending on where they appear in a word. Tap to hear each form!
      </TipBox>

      <div className="flex gap-2 flex-wrap justify-center">
        {LETTERS.slice(0,12).map(l => (
          <button key={l.id} onClick={() => setSel(l)}
            className="rounded-xl px-3 py-2 transition-all bubble-btn"
            style={{
              fontFamily:'IndoPak Nastaleeq,serif', fontSize:'26px',
              backgroundColor: sel.id===l.id ? '#1B4D6B' : 'white',
              color: sel.id===l.id ? '#FFD54F' : '#1B4D6B',
              boxShadow: sel.id===l.id ? '0 4px 0 #0d2d40' : '0 3px 0 #CBD5E1',
            }}>
            {l.arabic}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {Object.entries(sel.forms).map(([form, char]) => (
          <motion.div key={form}
            className="rounded-2xl p-4 text-center cursor-pointer bg-white"
            style={{ border:`2.5px solid ${fColors[form]}30`, boxShadow:`0 4px 0 ${fColors[form]}20` }}
            onClick={() => speak(char)}
            whileTap={{ scale:0.95, y:3 }}>
            <div className="text-xl mb-1">{fEmoji[form]}</div>
            <div style={{ fontFamily:'IndoPak Nastaleeq,serif', fontSize:'48px', color:fColors[form], direction:'rtl' }}>
              {char}
            </div>
            <div className="font-extrabold text-sm capitalize mt-1" style={{ color:fColors[form], fontFamily:'Fredoka One,cursive' }}>
              {form}
            </div>
            <div className="text-xs opacity-70" style={{ fontFamily:'Nunito,sans-serif', color:fColors[form] }}>
              {fTip[form]}
            </div>
            <div className="text-base mt-1">🔊</div>
          </motion.div>
        ))}
      </div>

      <CompleteButton onClick={() => onComplete(3)} />
    </div>
  );
}

// ─── Lesson 10 — Simple Words ──────────────────────────────────────────────────
function LessonWords({ onComplete }) {
  const { speak, speakLetter } = useAudio();
  const [sel, setSel] = useState(null);

  return (
    <div className="p-4 space-y-4">
      <TipBox color="#2E7D32" emoji="📖">
        Tap a word to see its letters. Tap each letter to hear it, then tap the full word!
      </TipBox>

      <div className="grid grid-cols-2 gap-3">
        {WORDS.slice(0,8).map(word => (
          <motion.div key={word.id}
            className="rounded-2xl p-3 text-center cursor-pointer"
            style={{
              backgroundColor: sel?.id===word.id ? '#1B4D6B' : 'white',
              border:`2.5px solid ${sel?.id===word.id ? '#FFD54F' : '#E2E8F0'}`,
              boxShadow: sel?.id===word.id ? '0 5px 0 #0d2d40' : '0 4px 0 #E2E8F0',
            }}
            onClick={() => { setSel(word); speak(word.arabic); }}
            whileTap={{ scale:0.95, y:3 }}>
            <div className="text-3xl mb-1">{word.icon}</div>
            <div style={{ fontFamily:'IndoPak Nastaleeq,serif', fontSize:'32px', color: sel?.id===word.id ? '#FFD54F' : '#1B4D6B', direction:'rtl' }}>
              {word.arabic}
            </div>
            <div className="text-xs font-extrabold mt-1"
              style={{ color: sel?.id===word.id ? 'white' : '#64748B', fontFamily:'Fredoka One,cursive' }}>
              {word.meaning}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {sel && (
          <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
            className="rounded-2xl p-4"
            style={{ background:'linear-gradient(135deg,#FEF3C7,#FDE68A)', border:'2px solid #D97706' }}>
            <p className="font-extrabold text-center mb-3" style={{ color:'#92400E', fontFamily:'Fredoka One,cursive' }}>
              {sel.icon} {sel.meaning} — tap each part:
            </p>
            <div className="flex gap-3 justify-center flex-wrap" dir="rtl">
              {sel.letters.map((l,i) => (
                <motion.button key={i}
                  className="rounded-xl px-4 py-3 bg-white bubble-btn"
                  style={{ fontFamily:'IndoPak Nastaleeq,serif', fontSize:'32px', color:'#1B4D6B', boxShadow:'0 4px 0 #B45309' }}
                  onClick={() => speakLetter(l)}
                  whileTap={{ scale:0.9 }}>
                  {l}
                </motion.button>
              ))}
              <motion.button
                className="rounded-xl px-4 py-3 bubble-btn font-extrabold"
                style={{ fontFamily:'IndoPak Nastaleeq,serif', fontSize:'28px', backgroundColor:'#D97706', color:'white', boxShadow:'0 4px 0 #92400E' }}
                onClick={() => speak(sel.arabic)}
                whileTap={{ scale:0.9 }}>
                {sel.arabic} 🔊
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CompleteButton onClick={() => onComplete(3)} />
    </div>
  );
}

// ─── Lesson router ────────────────────────────────────────────────────────────
const LESSON_COMPS = {
  letters:   LessonLetters,
  harakat:   (p) => <LessonHarakat {...p} />,
  tanwin:    (p) => <LessonHarakat {...p} isTanwin />,
  madd:      LessonMadd,
  sukoon:    LessonSukoon,
  shaddah:   LessonShaddah,
  qalqalah:  LessonQalqalah,
  waqf:      LessonWaqf,
  forms:     LessonForms,
  words:     LessonWords,
};

const LESSON_GRADIENTS = {
  letters:  ['#1B4D6B','#2979A0'],
  harakat:  ['#E65100','#FF8F00'],
  tanwin:   ['#1565C0','#1E88E5'],
  madd:     ['#1565C0','#42A5F5'],
  sukoon:   ['#6D28D9','#8B5CF6'],
  shaddah:  ['#9D174D','#DB2777'],
  qalqalah: ['#B45309','#D97706'],
  waqf:     ['#166534','#22C55E'],
  forms:    ['#7C3AED','#A78BFA'],
  words:    ['#2E7D32','#43A047'],
};

// ─── Main QaidaPage ───────────────────────────────────────────────────────────
export default function QaidaPage() {
  const { isLessonCompleted, getLessonStars, completeLesson } = useProgress();
  const [activeLesson, setActiveLesson] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [earnedStars, setEarnedStars] = useState(3);

  const handleComplete = (stars) => {
    setEarnedStars(stars);
    setShowCelebration(true);
    completeLesson(activeLesson.id, stars);
  };

  if (activeLesson) {
    const Comp = LESSON_COMPS[activeLesson.type];
    const grad = LESSON_GRADIENTS[activeLesson.type] || ['#1B4D6B','#2979A0'];
    return (
      <div className="sky-bg" style={{ minHeight:'100%' }}>
        {/* Lesson header */}
        <div className="px-4 py-4 flex items-center gap-3"
          style={{ background:`linear-gradient(135deg,${grad[0]},${grad[1]})` }}>
          <motion.button onClick={() => setActiveLesson(null)}
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-extrabold text-xl shrink-0"
            style={{ backgroundColor:'rgba(255,255,255,0.2)' }}
            whileTap={{ scale:0.9 }}>
            ←
          </motion.button>
          <div>
            <p className="text-xs font-bold text-white opacity-70" style={{ fontFamily:'Nunito,sans-serif' }}>
              Level {activeLesson.level}
            </p>
            <h2 className="font-extrabold text-white leading-tight"
              style={{ fontFamily:'Fredoka One,cursive', fontSize:'18px' }}>
              {activeLesson.title}
            </h2>
          </div>
          <span className="text-3xl ml-auto">{activeLesson.icon}</span>
        </div>
        {Comp && <Comp onComplete={handleComplete} />}
        <CelebrationModal show={showCelebration} stars={earnedStars}
          lessonTitle={activeLesson.title} onContinue={() => {
            setShowCelebration(false);
            const currentIndex = QAIDA_LESSONS.findIndex(l => l.id === activeLesson.id);
            const nextLesson = QAIDA_LESSONS[currentIndex + 1];
            setActiveLesson(nextLesson || null);
          }} />
      </div>
    );
  }

  const completedCount = QAIDA_LESSONS.filter(l => isLessonCompleted(l.id)).length;

  return (
    <div className="sky-bg" style={{ minHeight:'100%' }}>
      <PageHeader title="Madani Qaida" titleArabic="مدنى قاعده"
        subtitle="Traditional Indo-Pak Method • 10 Levels" emoji="📖"
        gradient="linear-gradient(135deg,#1B4D6B 0%,#2979A0 100%)" />

      <div className="p-4">
        {/* Progress banner */}
        <div className="rounded-3xl p-4 mb-5 flex items-center gap-4 bg-white"
          style={{ boxShadow:'0 6px 20px rgba(27,77,107,0.15)' }}>
          <motion.div className="text-5xl"
            animate={{ rotate:[0,10,-10,0] }} transition={{ duration:2, repeat:Infinity, repeatDelay:3 }}>
            🌟
          </motion.div>
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="font-extrabold text-sm" style={{ color:'#1B4D6B', fontFamily:'Fredoka One,cursive' }}>
                Your Journey
              </span>
              <span className="font-extrabold text-sm" style={{ color:'#D97706', fontFamily:'Fredoka One,cursive' }}>
                {completedCount}/{QAIDA_LESSONS.length}
              </span>
            </div>
            <div className="rounded-full overflow-hidden" style={{ height:'12px', backgroundColor:'#E2E8F0' }}>
              <motion.div className="h-full rounded-full"
                style={{ background:'linear-gradient(90deg,#1B4D6B,#D97706)' }}
                initial={{ width:0 }}
                animate={{ width:`${(completedCount/QAIDA_LESSONS.length)*100}%` }}
                transition={{ duration:0.8, ease:'easeOut' }} />
            </div>
            <p className="text-xs mt-1 opacity-60" style={{ fontFamily:'Nunito,sans-serif', color:'#1B4D6B' }}>
              Complete 8 lessons to unlock Quran reading 📖
            </p>
          </div>
        </div>

        {/* Lesson cards */}
        <div className="space-y-3">
          {QAIDA_LESSONS.map((lesson, index) => {
            const completed = isLessonCompleted(lesson.id);
            const stars     = getLessonStars(lesson.id);
            const locked    = index > 0 && !isLessonCompleted(QAIDA_LESSONS[index-1].id) && !completed;
            const grad      = LESSON_GRADIENTS[lesson.type] || ['#1B4D6B','#2979A0'];

            return (
              <motion.div key={lesson.id}
                className="rounded-3xl p-4 cursor-pointer bg-white overflow-hidden relative"
                style={{
                  border:`2.5px solid ${completed ? '#22C55E' : locked ? '#E2E8F0' : grad[0]+'40'}`,
                  boxShadow: locked ? 'none' : `0 6px 0 ${completed ? '#16A34A' : grad[0]}30`,
                  opacity: locked ? 0.55 : 1,
                }}
                onClick={() => !locked && setActiveLesson(lesson)}
                whileHover={!locked ? { scale:1.01, y:-2 } : {}}
                whileTap={!locked ? { scale:0.98, y:2 } : {}}>

                {/* Gradient accent strip */}
                {!locked && (
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-3xl"
                    style={{ background:`linear-gradient(180deg,${grad[0]},${grad[1]})` }} />
                )}

                <div className="flex items-center gap-3 pl-2">
                  {/* Icon badge */}
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                    style={{
                      background: locked ? '#E2E8F0' : completed ? 'linear-gradient(135deg,#22C55E,#16A34A)' : `linear-gradient(135deg,${grad[0]},${grad[1]})`,
                      boxShadow: locked ? 'none' : '0 4px 8px rgba(0,0,0,0.2)',
                    }}>
                    {locked ? '🔒' : completed ? '✅' : lesson.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-xs font-extrabold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: locked ? '#E2E8F0' : grad[0]+'20', color: locked ? '#94A3B8' : grad[0], fontFamily:'Fredoka One,cursive' }}>
                        Lv.{lesson.level}
                      </span>
                    </div>
                    <h3 className="font-extrabold truncate" style={{ color:'#1B4D6B', fontFamily:'Fredoka One,cursive', fontSize:'16px' }}>
                      {lesson.title}
                    </h3>
                    <p className="text-xs opacity-60 truncate" style={{ fontFamily:'Nunito,sans-serif', color:'#1B4D6B' }}>
                      {lesson.description}
                    </p>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-0.5 shrink-0">
                    {[1,2,3].map(s => (
                      <span key={s} className="text-xl" style={{ opacity: s<=stars ? 1 : 0.18 }}>⭐</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
