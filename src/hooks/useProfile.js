import { useState, useEffect } from 'react';

const STORAGE_KEY = 'arabic_qaida_profile_v1';

const defaultProfile = {
  name: '',
  photo: null, // base64 string
};

export function useProfile() {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultProfile, ...JSON.parse(saved) } : { ...defaultProfile };
    } catch {
      return { ...defaultProfile };
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  const updateName = (name) => setProfile(p => ({ ...p, name }));

  const updatePhoto = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setProfile(p => ({ ...p, photo: e.target.result }));
    reader.readAsDataURL(file);
  };

  const clearPhoto = () => setProfile(p => ({ ...p, photo: null }));

  return { profile, updateName, updatePhoto, clearPhoto };
}
