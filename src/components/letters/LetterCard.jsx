import { motion } from 'framer-motion';
import { useAudio } from '../../hooks/useAudio';
import { LetterIllustration, LETTER_COLORS } from './LetterIllustrations';

const FALLBACK_COLORS = [
  { bg: '#FFF3E0', body: '#FF8F00', accent: '#FFD54F' },
  { bg: '#E3F2FD', body: '#1E88E5', accent: '#90CAF9' },
  { bg: '#F3E5F5', body: '#8E24AA', accent: '#CE93D8' },
  { bg: '#E8F5E9', body: '#43A047', accent: '#A5D6A7' },
  { bg: '#FBE9E7', body: '#F4511E', accent: '#FFAB91' },
];

export function LetterCard({ letter, size = 'md', onClick, showName = true, animate = true }) {
  const { speakLetter, isPlaying } = useAudio();
  const c = LETTER_COLORS[letter.arabic] || FALLBACK_COLORS[(letter.id - 1) % FALLBACK_COLORS.length];

  const imgSize = size === 'sm' ? 90 : size === 'lg' ? 160 : 120;
  const padding = size === 'sm' ? 8 : 12;

  const handleTap = () => {
    // Speak the Urdu name (e.g. 'بے') with ur-PK TTS → says "Bay" not "Baa"
    speakLetter(letter.urdu || letter.arabic);
    if (onClick) onClick(letter);
  };

  return (
    <motion.div
      className="letter-card rounded-3xl flex flex-col items-center select-none"
      style={{ backgroundColor: 'white', padding, cursor: 'pointer' }}
      onClick={handleTap}
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.06, y: -4 }}
    >
      <LetterIllustration letter={letter} size={imgSize} />

      {showName && (
        <div className="text-center mt-2">
          <p className="font-extrabold text-sm leading-tight" style={{ color: c.body, fontFamily: 'Fredoka One, cursive' }}>
            {letter.name}
          </p>
          <p className="text-xs mt-0.5" style={{ color: c.body, fontFamily: 'Noto Nastaliq Urdu, serif', opacity: 0.8, direction: 'rtl' }}>
            {letter.urdu}
          </p>
        </div>
      )}

      {/* Sound indicator */}
      <motion.div
        className="mt-1 text-lg"
        animate={isPlaying ? { scale: [1, 1.4, 1] } : {}}
        transition={{ duration: 0.4, repeat: isPlaying ? Infinity : 0 }}
      >
        🔊
      </motion.div>
    </motion.div>
  );
}

export function LetterCardWithHarakat({ letter, harakat }) {
  const { speak } = useAudio();
  const combined = `${letter.arabic}${harakat.arabic}`;

  return (
    <motion.div
      className="rounded-3xl cursor-pointer flex flex-col items-center p-4 select-none"
      style={{
        backgroundColor: harakat.bgColor || '#F9FAFB',
        border: `3px solid ${harakat.color}`,
        boxShadow: `0 6px 0 ${harakat.color}40`,
      }}
      onClick={() => speak(combined)}
      whileTap={{ scale: 0.92, y: 4 }}
      whileHover={{ scale: 1.05, y: -3 }}
    >
      <span style={{
        fontFamily: 'Amiri, serif',
        fontSize: '52px',
        color: harakat.color,
        direction: 'rtl',
        lineHeight: 1.4,
      }}>
        {combined}
      </span>
      <span className="text-xs font-extrabold mt-1" style={{ color: harakat.color, fontFamily: 'Fredoka One, cursive' }}>
        {letter.name} + {harakat.name}
      </span>
      <span className="text-base mt-0.5">🔊</span>
    </motion.div>
  );
}
