/**
 * useTeacherMarks — shared React Context so ALL components see the same
 * teacherMode and marks state in real-time. No page reload needed.
 *
 * Mark states:
 *   'unmarked'       — default, no indicator
 *   'needs-practice' — red flag, requires attention
 *   'review-later'   — yellow, check back
 *   'mastered'       — green, proficient
 */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const MARKS_KEY  = 'arabic_qaida_teacher_marks_v1';
const MODE_KEY   = 'arabic_qaida_teacher_mode_v1';
const MARK_CYCLE = ['unmarked', 'needs-practice', 'review-later', 'mastered'];

export const MARK_CONFIG = {
  'unmarked':       { color: 'transparent', label: 'Unmarked',       emoji: '' },
  'needs-practice': { color: '#EF4444',     label: 'Needs Practice', emoji: '🔴' },
  'review-later':   { color: '#F59E0B',     label: 'Review Later',   emoji: '🟡' },
  'mastered':       { color: '#22C55E',     label: 'Mastered',       emoji: '🟢' },
};

function loadMarks() {
  try { return JSON.parse(localStorage.getItem(MARKS_KEY) || '{}'); }
  catch { return {}; }
}
function loadMode() {
  try { return JSON.parse(localStorage.getItem(MODE_KEY) || 'false'); }
  catch { return false; }
}

// ── Context ──────────────────────────────────────────────────────────────────
const TeacherContext = createContext(null);

export function TeacherProvider({ children }) {
  const [marks, setMarks]             = useState(loadMarks);
  const [teacherMode, setTeacherMode] = useState(loadMode);

  // Persist to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(MARKS_KEY, JSON.stringify(marks));
  }, [marks]);

  useEffect(() => {
    localStorage.setItem(MODE_KEY, JSON.stringify(teacherMode));
  }, [teacherMode]);

  const toggleTeacherMode = useCallback(() => setTeacherMode(m => !m), []);

  const cycleMark = useCallback((itemId, itemType) => {
    setMarks(prev => {
      const current   = prev[itemId]?.markState || 'unmarked';
      const nextIndex = (MARK_CYCLE.indexOf(current) + 1) % MARK_CYCLE.length;
      const next      = MARK_CYCLE[nextIndex];
      if (next === 'unmarked') {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: { itemId, itemType, markState: next, markedAt: new Date().toISOString() } };
    });
  }, []);

  const setMark = useCallback((itemId, itemType, markState, note = '') => {
    setMarks(prev => {
      if (markState === 'unmarked') {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: { itemId, itemType, markState, note, markedAt: new Date().toISOString() } };
    });
  }, []);

  const getMark      = useCallback((itemId) => marks[itemId] || null,                    [marks]);
  const getMarkState = useCallback((itemId) => marks[itemId]?.markState || 'unmarked',   [marks]);
  const clearAllMarks = useCallback(() => { setMarks({}); localStorage.removeItem(MARKS_KEY); }, []);

  const markedByState = Object.values(marks).reduce((acc, mark) => {
    if (!acc[mark.markState]) acc[mark.markState] = [];
    acc[mark.markState].push(mark);
    return acc;
  }, {});

  return (
    <TeacherContext.Provider value={{
      marks, teacherMode, toggleTeacherMode,
      cycleMark, setMark, getMark, getMarkState,
      clearAllMarks, markedByState,
      totalMarked: Object.keys(marks).length,
    }}>
      {children}
    </TeacherContext.Provider>
  );
}

// ── Hook — all components call this; they all share the same state ────────────
export function useTeacherMarks() {
  const ctx = useContext(TeacherContext);
  if (!ctx) throw new Error('useTeacherMarks must be used inside <TeacherProvider>');
  return ctx;
}
