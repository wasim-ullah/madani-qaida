import { useCallback, useRef, useState, useEffect } from 'react';

// Global unlock state — only needs one user gesture ever
let audioUnlocked = false;

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady]     = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      console.warn('[useAudio] Web Speech API not supported in this browser.');
      return;
    }

    const checkVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const arVoice = voices.find(v => v.lang.startsWith('ar'));
      if (!arVoice) {
        console.warn('[useAudio] No Arabic voice found. Available voices:', voices.map(v => v.lang + ' — ' + v.name));
      }
      setIsReady(true);
    };

    if (window.speechSynthesis.getVoices().length > 0) {
      checkVoices();
    } else {
      window.speechSynthesis.addEventListener('voiceschanged', checkVoices);
      setTimeout(() => { setIsReady(true); }, 1000);
    }

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', checkVoices);
    };
  }, []);

  const unlockAudio = useCallback(() => {
    if (audioUnlocked) return;
    if (!('speechSynthesis' in window)) return;
    const u = new SpeechSynthesisUtterance('');
    u.volume = 0;
    window.speechSynthesis.speak(u);
    audioUnlocked = true;
  }, []);

  const speak = useCallback((text, options = {}) => {
    if (!('speechSynthesis' in window)) {
      console.warn('[useAudio] speechSynthesis unavailable — cannot play:', text);
      return;
    }
    if (!text) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    window.speechSynthesis.cancel();
    setIsPlaying(true);

    timerRef.current = setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      const lang      = options.lang ?? 'ar-SA';
      utterance.lang   = lang;
      utterance.rate   = options.rate  ?? 0.65;
      utterance.pitch  = options.pitch ?? 1.05;
      utterance.volume = 1.0;

      const voices = window.speechSynthesis.getVoices();

      if (lang.startsWith('ar')) {
        const voice =
          voices.find(v => v.lang === 'ar-SA') ||
          voices.find(v => v.lang === 'ar')    ||
          voices.find(v => v.lang.startsWith('ar'));
        if (voice) utterance.voice = voice;
      }

      utterance.onend   = () => setIsPlaying(false);
      utterance.onerror = (e) => {
        console.warn('[useAudio] Speech error:', e.error, 'text:', text);
        setIsPlaying(false);
      };

      window.speechSynthesis.speak(utterance);
      audioUnlocked = true;

      // Watchdog — clears playing state if onend never fires
      setTimeout(() => setIsPlaying(false), 8000);
    }, 80);
  }, []);

  // speakLetter — speaks the raw Arabic character with ar-SA so the TTS
  // pronounces the letter name in Arabic (ب → "baa", ت → "taa", etc.)
  const speakLetter = useCallback((l) => speak(l, { lang: 'ar-SA', rate: 0.55 }), [speak]);
  const speakWord   = useCallback((w) => speak(w, { rate: 0.60 }), [speak]);
  const speakVerse  = useCallback((v) => speak(v, { rate: 0.55 }), [speak]);
  const speakSlow   = useCallback((t) => speak(t, { rate: 0.40 }), [speak]);

  const stop = useCallback(() => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsPlaying(false);
  }, []);

  return {
    speak, speakLetter, speakWord, speakVerse, speakSlow, stop,
    isPlaying, isReady, unlockAudio,
    isSupported: 'speechSynthesis' in window,
  };
}
