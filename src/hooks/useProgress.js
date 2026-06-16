import { useState, useEffect } from 'react';

const STORAGE_KEY = 'arabic_qaida_progress_v1';

const defaultProgress = {
  completedLessons: [],
  stars: {},
  badges: [],
  totalStars: 0,
  lastLesson: null,
  startDate: new Date().toISOString(),
};

export function useProgress() {
  const [progress, setProgress] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...defaultProgress, ...JSON.parse(stored) } : defaultProgress;
    } catch {
      return defaultProgress;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      // localStorage might be unavailable
    }
  }, [progress]);

  const completeLesson = (lessonId, stars = 3) => {
    setProgress(prev => {
      const newStars = { ...prev.stars, [lessonId]: Math.max(prev.stars[lessonId] || 0, stars) };
      const totalStars = Object.values(newStars).reduce((a, b) => a + b, 0);
      const completedLessons = prev.completedLessons.includes(lessonId)
        ? prev.completedLessons
        : [...prev.completedLessons, lessonId];
      return { ...prev, completedLessons, stars: newStars, totalStars, lastLesson: lessonId };
    });
  };

  const addBadge = (badgeId) => {
    setProgress(prev => ({
      ...prev,
      badges: prev.badges.includes(badgeId) ? prev.badges : [...prev.badges, badgeId],
    }));
  };

  const resetProgress = () => {
    setProgress(defaultProgress);
    localStorage.removeItem(STORAGE_KEY);
  };

  const isLessonCompleted = (lessonId) => progress.completedLessons.includes(lessonId);
  const getLessonStars = (lessonId) => progress.stars[lessonId] || 0;
  const getCompletionPercent = (totalLessons) =>
    totalLessons > 0 ? Math.round((progress.completedLessons.length / totalLessons) * 100) : 0;

  return {
    progress,
    completeLesson,
    addBadge,
    resetProgress,
    isLessonCompleted,
    getLessonStars,
    getCompletionPercent,
  };
}
