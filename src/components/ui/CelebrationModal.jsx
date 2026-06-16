import { motion, AnimatePresence } from 'framer-motion';

// Confetti pieces
function Confetti() {
  const pieces = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 300,
    y: -(80 + Math.random() * 180),
    color: ['#FF6B6B','#FFD93D','#6BCB77','#4D96FF','#FF922B','#CC5DE8'][i % 6],
    rotate: Math.random() * 360,
    delay: Math.random() * 0.4,
    size: 8 + Math.random() * 10,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
      {pieces.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-sm"
          style={{ width: p.size, height: p.size * 0.6, backgroundColor: p.color }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0 }}
          animate={{ x: p.x, y: p.y, opacity: 0, rotate: p.rotate, scale: 1.2 }}
          transition={{ duration: 1.2, delay: p.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

export function CelebrationModal({ show, stars = 3, lessonTitle, onContinue }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
        >
          <Confetti />

          <motion.div
            className="relative rounded-4xl p-8 text-center w-full max-w-sm overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #1B4D6B, #0d3349)', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}
            initial={{ scale: 0.4, rotate: -8 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 18 }}
          >
            {/* Background stars */}
            <div className="absolute inset-0 opacity-10 text-6xl flex items-center justify-center overflow-hidden select-none">
              ⭐⭐⭐⭐⭐⭐⭐⭐
            </div>

            {/* Moon + sparkle */}
            <div className="flex justify-center gap-3 mb-3">
              <motion.span className="text-6xl"
                animate={{ rotate: [0, 12, -12, 0] }}
                transition={{ duration: 1.2, repeat: 2 }}>
                🌙
              </motion.span>
              <motion.span className="text-5xl self-end"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 0.6, repeat: 4 }}>
                ✨
              </motion.span>
            </div>

            <h2 className="text-4xl font-extrabold mb-1"
              style={{ color: '#FFD54F', fontFamily: 'Fredoka One, cursive', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
              Masha'Allah!
            </h2>
            <p className="text-white text-lg mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>You completed</p>
            <p className="font-extrabold text-xl mb-6" style={{ color: '#FFD54F', fontFamily: 'Fredoka One, cursive' }}>
              {lessonTitle} 🎉
            </p>

            {/* Stars */}
            <div className="flex justify-center gap-3 mb-7">
              {[1, 2, 3].map(i => (
                <motion.span key={i} className="text-5xl"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: i <= stars ? 1 : 0.3, rotate: 0, opacity: i <= stars ? 1 : 0.3 }}
                  transition={{ delay: 0.3 + i * 0.2, type: 'spring', stiffness: 300 }}>
                  ⭐
                </motion.span>
              ))}
            </div>

            <motion.button
              onClick={onContinue}
              className="bubble-btn w-full py-4 text-xl font-extrabold"
              style={{ backgroundColor: '#FFD54F', color: '#1B4D6B', fontFamily: 'Fredoka One, cursive', fontSize: '20px' }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Keep Going! ➜
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
