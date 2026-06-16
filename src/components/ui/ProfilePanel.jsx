import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from '../../hooks/useProfile';

export function ProfileAvatar({ size = 40, onClick }) {
  const { profile } = useProfile();
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      style={{
        width: size, height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        border: '2.5px solid #D97706',
        boxShadow: '0 3px 0 #B4530960',
        background: 'linear-gradient(135deg,#FEF3C7,#FDE68A)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', flexShrink: 0,
      }}
    >
      {profile.photo
        ? <img src={profile.photo} alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        : <span style={{ fontSize: size * 0.45 }}>👧</span>
      }
    </motion.button>
  );
}

export function ProfilePanel({ onClose }) {
  const { profile, updateName, updatePhoto, clearPhoto } = useProfile();
  const [nameInput, setNameInput] = useState(profile.name);
  const fileRef = useRef(null);

  const handleSave = () => {
    updateName(nameInput.trim());
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        className="rounded-3xl p-6 w-80 max-w-[90vw]"
        style={{ backgroundColor: 'white', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}
        initial={{ scale: 0.8, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.8, y: 40, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 style={{ fontFamily: 'Fredoka One, cursive', color: '#1B4D6B', fontSize: '22px' }}>
            👤 My Profile
          </h2>
          <motion.button onClick={onClose} whileTap={{ scale: 0.9 }}
            style={{ fontSize: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>
            ✕
          </motion.button>
        </div>

        {/* Photo picker */}
        <div className="flex flex-col items-center mb-5">
          <motion.div
            onClick={() => fileRef.current?.click()}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            style={{
              width: 100, height: 100, borderRadius: '50%', overflow: 'hidden',
              border: '3px dashed #D97706', cursor: 'pointer',
              background: 'linear-gradient(135deg,#FEF3C7,#FDE68A)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {profile.photo
              ? <img src={profile.photo} alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <div className="text-center">
                  <div style={{ fontSize: '36px' }}>👧</div>
                  <div style={{ fontSize: '10px', color: '#D97706', fontFamily: 'Fredoka One, cursive', marginTop: 2 }}>Tap to change</div>
                </div>
            }
          </motion.div>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }}
            onChange={e => e.target.files[0] && updatePhoto(e.target.files[0])} />
          <div className="flex gap-2 mt-2">
            <motion.button onClick={() => fileRef.current?.click()} whileTap={{ scale: 0.9 }}
              style={{ fontSize: '11px', color: '#1B4D6B', fontFamily: 'Fredoka One, cursive',
                background: '#EFF6FF', border: '1.5px solid #BFDBFE', borderRadius: '20px',
                padding: '4px 10px', cursor: 'pointer' }}>
              📷 Choose Photo
            </motion.button>
            {profile.photo && (
              <motion.button onClick={clearPhoto} whileTap={{ scale: 0.9 }}
                style={{ fontSize: '11px', color: '#EF4444', fontFamily: 'Fredoka One, cursive',
                  background: '#FEF2F2', border: '1.5px solid #FECACA', borderRadius: '20px',
                  padding: '4px 10px', cursor: 'pointer' }}>
                🗑️ Remove
              </motion.button>
            )}
          </div>
        </div>

        {/* Name input */}
        <div className="mb-5">
          <label style={{ fontFamily: 'Fredoka One, cursive', color: '#1B4D6B', fontSize: '14px', display: 'block', marginBottom: 6 }}>
            ✏️ Student Name
          </label>
          <input
            type="text"
            value={nameInput}
            onChange={e => setNameInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSave()}
            placeholder="Enter your name..."
            maxLength={30}
            style={{
              width: '100%', padding: '10px 14px', borderRadius: '16px',
              border: '2.5px solid #BFDBFE', outline: 'none',
              fontFamily: 'Nunito, sans-serif', fontSize: '16px', color: '#1E3A8A',
              background: '#F8FAFF', boxSizing: 'border-box',
            }}
            onFocus={e => e.target.style.borderColor = '#3B82F6'}
            onBlur={e => e.target.style.borderColor = '#BFDBFE'}
          />
        </div>

        {/* Save button */}
        <motion.button
          onClick={handleSave}
          whileTap={{ scale: 0.95, y: 3 }}
          className="w-full py-3 rounded-2xl font-extrabold bubble-btn"
          style={{
            background: 'linear-gradient(135deg,#1B4D6B,#2979A0)',
            color: 'white', border: 'none', cursor: 'pointer',
            fontFamily: 'Fredoka One, cursive', fontSize: '16px',
            boxShadow: '0 5px 0 #0F2D42',
          }}
        >
          💾 Save Profile
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
