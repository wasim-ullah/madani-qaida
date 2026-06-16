import { motion, AnimatePresence } from 'framer-motion';

export function StarBurst({ show, onComplete }) {
  const stars = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: (i / 12) * 360,
    distance: 60 + Math.random() * 40,
    delay: Math.random() * 0.3,
  }));

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
          {stars.map(star => (
            <motion.div
              key={star.id}
              className="absolute text-2xl"
              initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
              animate={{
                x: Math.cos((star.angle * Math.PI) / 180) * star.distance,
                y: Math.sin((star.angle * Math.PI) / 180) * star.distance,
                opacity: 0,
                scale: 1.5,
              }}
              transition={{ duration: 0.8, delay: star.delay, ease: 'easeOut' }}
              onAnimationComplete={star.id === 0 ? onComplete : undefined}
            >
              ⭐
            </motion.div>
          ))}
          <motion.div
            className="text-6xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: [0, 1.5, 1], rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            🌟
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
