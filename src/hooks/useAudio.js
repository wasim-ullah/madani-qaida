import { useCallback, useRef, useState, useEffect } from 'react';

// Global unlock state — only needs one user gesture ever
let audioUnlocked = false;

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const timerRef = useRef(null);

  // Check if speech synthesis is available and has Arabic voice
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;

    const checkVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      // Any voice available means we can at least try
      setIsReady(voices.length > 0 || true);
    };

    // Voices load asynchronously
    if (window.speechSynthesis.getVoices().length > 0) {
      setIsReady(true);
    } else {
      window.speechSynthesis.addEventListener('voiceschanged', checkVoices);
      // Fallback: mark ready after 1s regardless
      setTimeout(() => setIsReady(true), 1000);
    }

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', checkVoices);
    };
  }, []);

  const unlockAudio = useCallback(() => {
    if (audioUnlocked) return;
    if (!('speechSynthesis' in window)) return;
    // Speak empty string to unlock on user gesture
    const u = new SpeechSynthesisUtterance('');
    u.volume = 0;
    window.speechSynthesis.speak(u);
    audioUnlocked = true;
  }, []);

  const speak = useCallback((text, options = {}) => {
    if (!('speechSynthesis' in window) || !text) return;

    // Clear any pending timer
    if (timerRef.current) clearTimeout(timerRef.current);

    // Cancel current speech
    window.speechSynthesis.cancel();

    setIsPlaying(true);

    // Small delay helps cancel propagate on Safari/Chrome
    timerRef.current = setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      const lang = options.lang ?? 'ar-SA';
      utterance.lang    = lang;
      utterance.rate    = options.rate  ?? 0.65;
      utterance.pitch   = options.pitch ?? 1.05;
      utterance.volume  = 1.0;

      const voices = window.speechSynthesis.getVoices();
      if (lang.startsWith('ur')) {
        // Prefer Urdu voice for letter names (Indo-Pak style pronunciation)
        const urduVoice =
          voices.find(v => v.lang === 'ur-PK') ||
          voices.find(v => v.lang.startsWith('ur'));
        if (urduVoice) utterance.voice = urduVoice;
      } else {
        // Prefer Arabic voice for Quran/word reading
        const arabicVoice =
          voices.find(v => v.lang === 'ar-SA') ||
          voices.find(v => v.lang.startsWith('ar'));
        if (arabicVoice) utterance.voice = arabicVoice;
      }

      utterance.onend   = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
      audioUnlocked = true;

      // Watchdog: clear playing state after max 8s
      setTimeout(() => setIsPlaying(false), 8000);
    }, 80);
  }, []);

  // speakLetter: speaks the Urdu name (e.g. بے) so TTS says "Bay" not "Baa"
  const speakLetter  = useCallback((l) => speak(l,    { lang: 'ur-PK', rate: 0.55 }), [speak]);
  const speakWord    = useCallback((w) => speak(w,    { rate: 0.65 }), [speak]);
  const speakVerse   = useCallback((v) => speak(v,    { rate: 0.58 }), [speak]);
  const speakSlow    = useCallback((t) => speak(t,    { rate: 0.45 }), [speak]);

  const stop = useCallback(() => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsPlaying(false);
  }, []);

  return {
    speak,
    speakLetter,
    speakWord,
    speakVerse,
    speakSlow,
    stop,
    isPlaying,
    isReady,
    unlockAudio,
    isSupported: 'speechSynthesis' in window,
  };
}
