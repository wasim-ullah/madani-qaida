/**
 * useTeacherMarks — LocalStorage-only teacher marking system.
 *
 * Single-device, single-user: marks are global and shared on the device.
 * TODO (future): extend to per-student profiles once multi-profile is added.
 *
 * Mark states:
 *   'unmarked'       — default, no indicator
 *   'needs-practice' — red flag, requires attention
 *   'review-later'   — yellow, check back
 *   'mastered'       — green, proficient
 */
import { useState, useEffect, useCallback } from 'react';

const MARKS_KEY    = 'arabic_qaida_teacher_marks_v1';
const MODE_KEY     = 'arabic_qaida_teacher_mode_v1';
const MARK_CYCLE   = ['unmarked', 'needs-practice', 'review-later', 'mastered'];

export const MARK_CONFIG = {
  'unmarked':       { color: 'transparent', label: 'Unmarked',       emoji: '' },
  'needs-practice': { color: '#EF4444',     label: 'Needs Practice', emoji: '🔴' },
  'review-later':   { color: '#F59E0B',     label: 'Review Later',   emoji: '🟡' },
  'mastered':       { color: '#22C55E',     label: 'Mastered',       emoji: '🟢' },
};

function loadMarks() {
  try {
    return JSON.parse(localStorage.getItem(MARKS_KEY) || '{}');
  } catch { return {}; }
}

function loadMode() {
  try {
    return JSON.parse(localStorage.getItem(MODE_KEY) || 'false');
  } catch { return false; }
}

export function useTeacherMarks() {
  const [marks, setMarks]           = useState(loadMarks);
  const [teacherMode, setTeacherMode] = useState(loadMode);

  useEffect(() => {
    localStorage.setItem(MARKS_KEY, JSON.stringify(marks));
  }, [marks]);

  useEffect(() => {
    localStorage.setItem(MODE_KEY, JSON.stringify(teacherMode));
  }, [teacherMode]);

  /** Cycle mark: unmarked → needs-practice → review-later → mastered → unmarked */
  const cycleMark = useCallback((itemId, itemType) => {
    setMarks(prev => {
      const current   = prev[itemId]?.markState || 'unmarked';
      const nextIndex = (MARK_CYCLE.indexOf(current) + 1) % MARK_CYCLE.length;
      const next      = MARK_CYCLE[nextIndex];
      if (next === 'unmarked') {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [itemId]: { itemId, itemType, markState: next, markedAt: new Date().toISOString() },
      };
    });
  }, []);

  /** Set a specific mark state directly */
  const setMark = useCallback((itemId, itemType, markState, note = '') => {
    setMarks(prev => {
      if (markState === 'unmarked') {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [itemId]: { itemId, itemType, markState, note, markedAt: new Date().toISOString() },
      };
    });
  }, []);

  const getMark = useCallback((itemId) => {
    return marks[itemId] || null;
  }, [marks]);

  const getMarkState = useCallback((itemId) => {
    return marks[itemId]?.markState || 'unmarked';
  }, [marks]);

  const clearAllMarks = useCallback(() => {
    setMarks({});
    localStorage.removeItem(MARKS_KEY);
  }, []);

  const toggleTeacherMode = useCallback(() => {
    setTeacherMode(m => !m);
  }, []);

  /** All marked items grouped by state, for the review panel */
  const markedByState = Object.values(marks).reduce((acc, mark) => {
    if (!acc[mark.markState]) acc[mark.markState] = [];
    acc[mark.markState].push(mark);
    return acc;
  }, {});

  return {
    marks,
    teacherMode,
    toggleTeacherMode,
    cycleMark,
    setMark,
    getMark,
    getMarkState,
    clearAllMarks,
    markedByState,
    totalMarked: Object.keys(marks).length,
  };
}
