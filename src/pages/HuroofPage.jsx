import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LETTERS } from '../data/letters';
import { useAudio } from '../hooks/useAudio';
import { LetterIllustration, LETTER_COLORS } from '../components/letters/LetterIllustrations';
import { PageHeader } from '../components/ui/PageHeader';

const MAKHRAJ_FILTERS = [
  { id:'all',    label:'All',    emoji:'📚', color:'#1B4D6B' },
  { id:'throat', label:'Throat', emoji:'🗣️', color:'#EF4444' },
  { id:'tongue', label:'Tongue', emoji:'👅', color:'#3B82F6' },
  { id:'lips',   label:'Lips',   emoji:'👄', color:'#EC4899' },
  { id:'teeth',  label:'Teeth',  emoji:'🦷', color:'#F97316' },
];

const MAKHRAJ_COLORS = { throat:'#EF4444', tongue:'#3B82F6', lips:'#EC4899', teeth:'#F97316' };

// Makhraj diagram SVG (schematic cross-section of mouth/throat)
function MakhrajDiagram({ makhraj }) {
  const highlights = {
    throat: [[80,130],[80,155]],
    tongue: [[90,100],[110,110]],
    lips:   [[60,60],[140,60]],
    teeth:  [[70,70],[130,70]],
  };
  const color = MAKHRAJ_COLORS[makhraj] || '#1B4D6B';
  const pts   = highlights[makhraj] || [];

  return (
    <svg viewBox="0 0 200 200" width="90" height="90">
      {/* Head outline */}
      <ellipse cx="100" cy="80" rx="55" ry="65" fill="#FFF3E0" stroke="#DDD" strokeWidth="2" />
      {/* Neck */}
      <rect x="75" y="140" width="50" height="50" rx="8" fill="#FFF3E0" stroke="#DDD" strokeWidth="2" />
      {/* Mouth cavity */}
      <ellipse cx="100" cy="95" rx="38" ry="22" fill="#FFCCBC" stroke="#FFAB91" strokeWidth="1.5" />
      {/* Tongue */}
      <ellipse cx="100" cy="105" rx="28" ry="14" fill="#EF9A9A" stroke="#E57373" strokeWidth="1.5" />
      {/* Throat */}
      <rect x="82" y="118" width="36" height="45" rx="8" fill="#FFF9C4" stroke="#FFD54F" strokeWidth="1.5" />
      {/* Lips */}
      <ellipse cx="100" cy="73" rx="30" ry="8" fill="#FFCCBC" stroke="#FFAB91" strokeWidth="1.5" />
      {/* Teeth top */}
      {[0,1,2,3,4].map(i => (
        <rect key={i} x={74+i*11} y="80" width="9" height="10" rx="2" fill="white" stroke="#DDD" strokeWidth="1" />
      ))}
      {/* Teeth bottom */}
      {[0,1,2,3,4].map(i => (
        <rect key={i} x={74+i*11} y="94" width="9" height="9" rx="2" fill="white" stroke="#DDD" strokeWidth="1" />
      ))}
      {/* Highlight active area */}
      {pts.map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r="8" fill={color} opacity="0.7">
          <animate attributeName="r" values="6;10;6" dur="1.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="1.2s" repeatCount="indefinite" />
        </circle>
      ))}
      {/* Label */}
      <text x="100" y="195" textAnchor="middle" fontSize="10" fontFamily="Nunito,sans-serif" fill={color} fontWeight="bold">
        {makhraj}
      </text>
    </svg>
  );
}

function LetterFlipCard({ letter }) {
  const [flipped, setFlipped] = useState(false);
  const { speakLetter, speak } = useAudio();
  const c = LETTER_COLORS[letter.arabic] || { bg:'#F3F4F6', body:'#1B4D6B', accent:'#E2E8F0' };
  const mColor = MAKHRAJ_COLORS[letter.makhraj] || '#1B4D6B';

  return (
    <div style={{ perspective:'700px', height:'200px' }} onClick={() => {
      setFlipped(f => !f);
      flipped ? speak(letter.example) : speakLetter(letter.urdu || letter.arabic);
    }}>
      <motion.div style={{ width:'100%', height:'100%', transformStyle:'preserve-3d', position:'relative', cursor:'pointer' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.45, ease:'easeInOut' }}>

        {/* FRONT */}
        <div className="absolute inset-0 rounded-3xl flex flex-col items-center justify-between p-3"
          style={{ backfaceVisibility:'hidden', WebkitBackfaceVisibility:'hidden',
            backgroundColor: c.bg, border:`3px solid ${c.body}25`, boxShadow:`0 6px 0 ${c.body}15` }}>
          <div style={{ fontSize:'11px', color: c.body, fontFamily:'Fredoka One,cursive', opacity:0.6 }}>
            tap to flip ↻
          </div>
          <LetterIllustration letter={letter} size={100} />
          <div className="text-center">
            <div className="font-extrabold text-sm" style={{ color: c.body, fontFamily:'Fredoka One,cursive' }}>
              {letter.name}
            </div>
            <motion.div className="text-lg"
              animate={{ scale:[1,1.3,1] }} transition={{ duration:1.5, repeat:Infinity, repeatDelay:2 }}>
              🔊
            </motion.div>
          </div>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 rounded-3xl flex flex-col items-center justify-between p-4"
          style={{ backfaceVisibility:'hidden', WebkitBackfaceVisibility:'hidden',
            transform:'rotateY(180deg)', background:`linear-gradient(135deg,#1B4D6B,#0d3349)` }}>
          <div>
            <div className="text-center font-extrabold text-white text-base leading-tight"
              style={{ fontFamily:'Fredoka One,cursive' }}>
              {letter.name}
            </div>
            <div className="text-center text-sm" style={{ fontFamily:'Noto Nastaliq Urdu,serif', color:'#FFD54F', direction:'rtl' }}>
              {letter.urdu}
            </div>
          </div>

          <MakhrajDiagram makhraj={letter.makhraj} />

          <div className="text-center">
            <div style={{ fontFamily:'Amiri,serif', fontSize:'22px', color:'#FFD54F', direction:'rtl' }}>
              {letter.example}
            </div>
            <div className="text-xs text-white opacity-70" style={{ fontFamily:'Nunito,sans-serif' }}>
              {letter.exampleMeaning}
            </div>
            <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: mColor, fontFamily:'Fredoka One,cursive' }}>
              {letter.makhraj}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function HuroofPage() {
  const [filter, setFilter] = useState('all');
  const filtered = filter==='all' ? LETTERS : LETTERS.filter(l=>l.makhraj===filter);

  return (
    <div className="sky-bg" style={{ minHeight:'100%' }}>
      <PageHeader title="Arabic Alphabet" titleArabic="حروف هجاء"
        subtitle="28 letters — tap any card to flip and learn!"
        emoji="✍️" gradient="linear-gradient(135deg,#7B1FA2,#AB47BC)" />

      <div className="p-4">
        {/* Filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5 -mx-1 px-1">
          {MAKHRAJ_FILTERS.map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)}
              className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full font-extrabold text-sm bubble-btn"
              style={{
                backgroundColor: filter===f.id ? f.color : 'white',
                color: filter===f.id ? 'white' : '#64748B',
                fontFamily:'Fredoka One,cursive',
                boxShadow: filter===f.id ? `0 4px 0 ${f.color}80` : '0 3px 0 #CBD5E1',
              }}>
              {f.emoji} {f.label}
            </button>
          ))}
        </div>

        {/* Count */}
        <div className="flex items-center gap-2 mb-4">
          <div className="h-px flex-1" style={{ backgroundColor:'#E2E8F0' }} />
          <span className="text-sm font-bold px-3" style={{ color:'#64748B', fontFamily:'Fredoka One,cursive' }}>
            {filtered.length} letters
          </span>
          <div className="h-px flex-1" style={{ backgroundColor:'#E2E8F0' }} />
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div key={filter} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="grid grid-cols-2 gap-4">
            {filtered.map(letter => (
              <LetterFlipCard key={letter.id} letter={letter} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Makhraj legend */}
        <div className="mt-6 rounded-3xl p-4 bg-white" style={{ boxShadow:'0 4px 16px rgba(0,0,0,0.08)' }}>
          <h3 className="font-extrabold mb-3 text-center" style={{ color:'#1B4D6B', fontFamily:'Fredoka One,cursive' }}>
            🗺️ Makhraj Map
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(MAKHRAJ_COLORS).map(([key,color]) => (
              <div key={key} className="flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{ backgroundColor: color+'15', border:`1.5px solid ${color}30` }}>
                <div className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor:color }} />
                <span className="text-sm font-bold capitalize" style={{ color, fontFamily:'Fredoka One,cursive' }}>
                  {key}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
