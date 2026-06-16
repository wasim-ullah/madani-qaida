import { motion } from 'framer-motion';
import { useAudio } from '../../hooks/useAudio';

// Big pulsing tap-to-hear button — primary CTA for each lesson item
export function SoundButton({ text, label, color = '#1B4D6B', size = 'md', children }) {
  const { speak, isPlaying } = useAudio();

  const sizes = {
    sm: { px: '14px', py: '8px',  fontSize: '13px', iconSize: '18px' },
    md: { px: '20px', py: '12px', fontSize: '15px', iconSize: '22px' },
    lg: { px: '28px', py: '16px', fontSize: '18px', iconSize: '28px' },
  };
  const s = sizes[size] || sizes.md;

  return (
    <motion.button
      onClick={() => speak(text)}
      className="bubble-btn inline-flex items-center gap-2 font-bold text-white"
      style={{
        backgroundColor: color,
        paddingInline: s.px,
        paddingBlock: s.py,
        fontSize: s.fontSize,
        fontFamily: 'Fredoka One, cursive',
      }}
      whileTap={{ scale: 0.93 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.span
        style={{ fontSize: s.iconSize }}
        animate={isPlaying ? { scale: [1, 1.5, 1] } : {}}
        transition={{ duration: 0.5, repeat: isPlaying ? Infinity : 0 }}
      >
        🔊
      </motion.span>
      {children || label || text}
    </motion.button>
  );
}

// Inline tap-to-hear Arabic text chip
export function ArabicSoundChip({ text, color = '#1B4D6B', fontSize = '32px', label }) {
  const { speak, isPlaying } = useAudio();

  return (
    <motion.button
      onClick={() => speak(text)}
      className="inline-flex flex-col items-center rounded-2xl px-4 py-3 cursor-pointer select-none"
      style={{
        backgroundColor: 'white',
        border: `3px solid ${color}30`,
        boxShadow: `0 5px 0 ${color}20`,
        fontFamily: 'Amiri, serif',
        direction: 'rtl',
        gap: '4px',
      }}
      whileTap={{ scale: 0.92, y: 3 }}
      whileHover={{ scale: 1.04, y: -2 }}
    >
      <span style={{ fontSize, color, lineHeight: 1.3 }}>{text}</span>
      {label && <span className="text-xs font-bold" style={{ color, fontFamily: 'Nunito, sans-serif', opacity: 0.7 }}>{label}</span>}
      <motion.span
        className="text-base"
        animate={isPlaying ? { opacity: [0.5, 1, 0.5] } : {}}
        transition={{ duration: 0.6, repeat: isPlaying ? Infinity : 0 }}
      >
        🔊
      </motion.span>
    </motion.button>
  );
}
