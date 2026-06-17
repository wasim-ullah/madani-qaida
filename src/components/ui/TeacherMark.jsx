import { motion, AnimatePresence } from 'framer-motion';
import { useTeacherMarks, MARK_CONFIG } from '../../hooks/useTeacherMarks';

/**
 * TeacherMarkBadge — small coloured dot in the top-right corner of a card.
 * Only visible when Teacher Mode is ON.
 * Tapping it cycles through mark states.
 */
export function TeacherMarkBadge({ itemId, itemType = 'letter' }) {
  const { teacherMode, getMarkState, cycleMark } = useTeacherMarks();
  if (!teacherMode) return null;

  const state  = getMarkState(itemId);
  const config = MARK_CONFIG[state];

  return (
    <motion.button
      onClick={(e) => { e.stopPropagation(); cycleMark(itemId, itemType); }}
      whileTap={{ scale: 0.85 }}
      style={{
        position: 'absolute', top: 6, right: 6, zIndex: 10,
        width: 18, height: 18, borderRadius: '50%',
        backgroundColor: state === 'unmarked' ? 'rgba(0,0,0,0.12)' : config.color,
        border: '2px solid white',
        boxShadow: state === 'unmarked' ? 'none' : `0 0 0 2px ${config.color}40`,
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '8px',
      }}
      title={config.label}
    >
      {state !== 'unmarked' && (
        <span style={{ lineHeight: 1, fontSize: '9px' }}>
          {config.emoji.replace('🔴','●').replace('🟡','●').replace('🟢','●')}
        </span>
      )}
    </motion.button>
  );
}

/**
 * TeacherMarkBorder — wraps a card with a coloured border when marked.
 * Pass `style` / `className` through so it acts as a transparent wrapper.
 */
export function TeacherMarkBorder({ itemId, children, style = {}, className = '' }) {
  const { teacherMode, getMarkState } = useTeacherMarks();
  const state  = getMarkState(itemId);
  const config = MARK_CONFIG[state];

  const borderStyle = teacherMode && state !== 'unmarked'
    ? { outline: `3px solid ${config.color}`, outlineOffset: '2px' }
    : {};

  return (
    <div className={className} style={{ ...style, ...borderStyle, position: 'relative' }}>
      {children}
    </div>
  );
}

/**
 * TeacherModeToggle — pill button for the header/sidebar.
 */
export function TeacherModeToggle() {
  const { teacherMode, toggleTeacherMode } = useTeacherMarks();

  return (
    <motion.button
      onClick={toggleTeacherMode}
      whileTap={{ scale: 0.95 }}
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '6px 12px', borderRadius: 20,
        background: teacherMode
          ? 'linear-gradient(135deg,#7C3AED,#8B5CF6)'
          : 'rgba(255,255,255,0.15)',
        border: '1.5px solid ' + (teacherMode ? '#A78BFA' : 'rgba(255,255,255,0.3)'),
        color: 'white', cursor: 'pointer',
        fontFamily: 'Fredoka One, cursive', fontSize: '12px',
        boxShadow: teacherMode ? '0 3px 0 #6D28D9' : 'none',
        transition: 'all 0.2s',
      }}
    >
      <span>{teacherMode ? '🎓' : '👩‍🏫'}</span>
      <span>{teacherMode ? 'Teacher ON' : 'Teacher'}</span>
    </motion.button>
  );
}

/**
 * TeacherReviewPanel — summary list of all marked items.
 * Shown in the Progress tab when Teacher Mode is ON.
 */
export function TeacherReviewPanel() {
  const { teacherMode, markedByState, clearAllMarks, totalMarked } = useTeacherMarks();
  if (!teacherMode) return null;

  const ORDER = ['needs-practice', 'review-later', 'mastered'];

  return (
    <div className="rounded-3xl overflow-hidden" style={{ boxShadow: '0 6px 20px rgba(0,0,0,0.1)' }}>
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between"
        style={{ background: 'linear-gradient(135deg,#7C3AED,#6D28D9)' }}>
        <div>
          <h3 className="font-extrabold text-white text-lg" style={{ fontFamily: 'Fredoka One, cursive' }}>
            🎓 Teacher Review
          </h3>
          <p className="text-xs text-white opacity-70" style={{ fontFamily: 'Nunito, sans-serif' }}>
            {totalMarked} item{totalMarked !== 1 ? 's' : ''} marked
          </p>
        </div>
        {totalMarked > 0 && (
          <button
            onClick={() => confirm('Clear all teacher marks?') && clearAllMarks()}
            style={{
              fontSize: '11px', color: 'white', opacity: 0.7,
              background: 'none', border: '1px solid rgba(255,255,255,0.4)',
              borderRadius: 12, padding: '4px 8px', cursor: 'pointer',
              fontFamily: 'Fredoka One, cursive',
            }}>
            Clear All
          </button>
        )}
      </div>

      <div className="bg-white p-4 space-y-4">
        {totalMarked === 0 ? (
          <div className="text-center py-6">
            <div className="text-4xl mb-2">📋</div>
            <p className="text-sm font-bold" style={{ color: '#94A3B8', fontFamily: 'Fredoka One, cursive' }}>
              No items marked yet
            </p>
            <p className="text-xs mt-1" style={{ color: '#CBD5E1', fontFamily: 'Nunito, sans-serif' }}>
              Tap the coloured dot on any letter or word card to mark it
            </p>
          </div>
        ) : (
          ORDER.map(state => {
            const items  = markedByState[state] || [];
            if (items.length === 0) return null;
            const config = MARK_CONFIG[state];
            return (
              <div key={state}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: config.color }} />
                  <span className="font-extrabold text-sm" style={{ color: config.color, fontFamily: 'Fredoka One, cursive' }}>
                    {config.label} ({items.length})
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map(item => (
                    <span key={item.itemId}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm font-bold"
                      style={{
                        backgroundColor: config.color + '15',
                        border: `1.5px solid ${config.color}40`,
                        color: config.color,
                        fontFamily: 'IndoPak Nastaleeq, serif',
                        fontSize: '18px', lineHeight: 2,
                      }}>
                      {item.itemId}
                      {item.note && (
                        <span title={item.note} style={{ fontSize: '10px', fontFamily: 'Nunito, sans-serif', color: '#64748B' }}>
                          📝
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
