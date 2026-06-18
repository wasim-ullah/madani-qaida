import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import QaidaPage    from './pages/QaidaPage'
import HuroofPage   from './pages/HuroofPage'
import HarakatPage  from './pages/HarakatPage'
import KalimaatPage from './pages/KalimaatPage'
import QuranPage    from './pages/QuranPage'
import ProgressPage from './pages/ProgressPage'
import { useProgress } from './hooks/useProgress'
import { useAudio }    from './hooks/useAudio'
import { useProfile }  from './hooks/useProfile'
import { ProfileAvatar, ProfilePanel } from './components/ui/ProfilePanel'
import { TeacherModeToggle } from './components/ui/TeacherMark'
import { TeacherDrawingOverlay } from './components/ui/TeacherDrawing'

const NAV = [
  { id: 'qaida',    label: 'Qaida',    arabic: 'قاعده',  emoji: '📖', gradient: ['#1B4D6B','#2979A0'] },
  { id: 'huroof',   label: 'Huroof',   arabic: 'حروف',   emoji: '✍️', gradient: ['#7B1FA2','#AB47BC'] },
  { id: 'harakat',  label: 'Harakat',  arabic: 'حركات',  emoji: '🎵', gradient: ['#E65100','#FF8F00'] },
  { id: 'kalimaat', label: 'Words',    arabic: 'كلمات',  emoji: '💬', gradient: ['#2E7D32','#43A047'] },
  { id: 'quran',    label: 'Quran',    arabic: 'قرآن',   emoji: '🌙', gradient: ['#1565C0','#1E88E5'] },
  { id: 'progress', label: 'Progress', arabic: 'ترقی',   emoji: '⭐', gradient: ['#BF360C','#F4511E'] },
]

// Floating cloud decoration
function Cloud({ style }) {
  return (
    <svg viewBox="0 0 120 60" style={style} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="42" rx="52" ry="28" fill="white" />
      <ellipse cx="38" cy="34" rx="34" ry="24" fill="white" />
      <ellipse cx="85" cy="36" rx="28" ry="20" fill="white" />
    </svg>
  )
}

// Animated star particle
function StarParticle({ x, y, delay }) {
  return (
    <motion.div
      className="absolute text-yellow-300 pointer-events-none select-none"
      style={{ left: x, top: y, fontSize: '14px' }}
      animate={{ y: [-10, -30, -10], opacity: [0, 1, 0] }}
      transition={{ duration: 3, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      ⭐
    </motion.div>
  )
}

// Sound unlock banner (shown once if browser needs gesture)
function SoundBanner({ onDismiss }) {
  return (
    <motion.div
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      exit={{ y: -60 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3"
      style={{ background: 'linear-gradient(90deg,#FF8F00,#FF6F00)', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
    >
      <span className="font-bold text-white text-sm" style={{ fontFamily: 'Fredoka One, cursive' }}>
        🔊 Tap anywhere to enable sounds!
      </span>
      <button onClick={onDismiss}
        className="text-white text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full"
        style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}>
        ✕
      </button>
    </motion.div>
  )
}

export default function App() {
  const [activePage, setActivePage]         = useState('qaida')
  const [showSoundBanner, setShowSoundBanner] = useState(false)
  const [showProfile, setShowProfile]       = useState(false)
  const { progress }   = useProgress()
  const { unlockAudio, isSupported } = useAudio()
  const { profile }    = useProfile()

  // Show sound banner after 2s if supported (browser needs gesture first)
  useEffect(() => {
    if (!isSupported) return
    const t = setTimeout(() => setShowSoundBanner(true), 2000)
    return () => clearTimeout(t)
  }, [isSupported])

  const handleFirstTap = () => {
    unlockAudio()
    setShowSoundBanner(false)
  }

  const pages = {
    qaida:    <QaidaPage />,
    huroof:   <HuroofPage />,
    harakat:  <HarakatPage />,
    kalimaat: <KalimaatPage />,
    quran:    <QuranPage />,
    progress: <ProgressPage />,
  }

  const activeNav = NAV.find(n => n.id === activePage)

  return (
    <div className="app-shell sky-bg" style={{ minHeight: '100svh' }} onClick={handleFirstTap}>
      {/* ── Sound unlock banner ───────── */}
      <AnimatePresence>
        {showSoundBanner && <SoundBanner onDismiss={() => { unlockAudio(); setShowSoundBanner(false) }} />}
      </AnimatePresence>

      {/* ── Profile panel ──────────────── */}
      <AnimatePresence>
        {showProfile && <ProfilePanel onClose={() => setShowProfile(false)} />}
      </AnimatePresence>

      {/* ═══════════════════════════════
          DESKTOP SIDEBAR
      ═══════════════════════════════ */}
      <aside className="sidebar flex-col w-64 shrink-0 shadow-2xl"
        style={{ background: 'linear-gradient(180deg,#0d2d40 0%,#1B4D6B 60%,#0d3349 100%)', position: 'relative', overflow: 'hidden', zIndex: 200 }}
      >
        {/* Decorative clouds */}
        <Cloud style={{ position:'absolute', top:'-10px', right:'-20px', width:'140px', opacity:0.06 }} />
        <Cloud style={{ position:'absolute', bottom:'80px', left:'-30px', width:'120px', opacity:0.05 }} />

        {/* Logo */}
        <div className="px-5 py-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
              style={{ background: 'linear-gradient(135deg,#FFD54F,#FF8F00)', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
              ☪️
            </div>
            <div>
              <h1 className="font-extrabold text-white leading-tight"
                style={{ fontFamily: 'Fredoka One, cursive', fontSize: '20px' }}>
                Madani Qaida
              </h1>
              <p style={{ fontFamily:'IndoPak Nastaleeq,serif', color: '#FFD54F', fontSize: '15px', direction: 'rtl' }}>
                مدنى قاعده
              </p>
            </div>
          </div>

          {/* Star counter */}
          <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-2xl"
            style={{ backgroundColor: 'rgba(255,213,79,0.15)', border: '1.5px solid rgba(255,213,79,0.4)' }}>
            <motion.span className="text-2xl"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>⭐</motion.span>
            <div>
              <div className="font-extrabold text-xl leading-none" style={{ color: '#FFD54F', fontFamily: 'Fredoka One, cursive' }}>
                {progress.totalStars}
              </div>
              <div className="text-xs opacity-60 text-white" style={{ fontFamily: 'Nunito, sans-serif' }}>stars earned</div>
            </div>
          </div>

          {/* Student profile pill */}
          <motion.button
            onClick={() => setShowProfile(true)}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            className="mt-3 w-full flex items-center gap-3 px-3 py-2 rounded-2xl"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.2)', cursor: 'pointer' }}
          >
            <ProfileAvatar size={36} />
            <div className="flex-1 min-w-0 text-left">
              <div className="font-extrabold text-sm leading-tight text-white truncate"
                style={{ fontFamily: 'Fredoka One, cursive' }}>
                {profile.name || 'My Profile'}
              </div>
              <div className="text-xs opacity-50 text-white" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {profile.name ? '✏️ Edit profile' : '👆 Tap to set up'}
              </div>
            </div>
          </motion.button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 py-4 px-3 flex flex-col gap-1 overflow-y-auto">
          {NAV.map(item => {
            const isActive = activePage === item.id
            return (
              <motion.button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all"
                style={{
                  background: isActive
                    ? `linear-gradient(90deg,${item.gradient[0]},${item.gradient[1]})`
                    : 'transparent',
                  boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.25)' : 'none',
                }}
                whileHover={!isActive ? { backgroundColor: 'rgba(255,255,255,0.08)' } : {}}
                whileTap={{ scale: 0.97 }}
              >
                <span className="text-2xl">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-extrabold text-white text-sm leading-tight truncate"
                    style={{ fontFamily: 'Fredoka One, cursive' }}>
                    {item.label}
                  </div>
                  <div className="text-xs opacity-60 text-white" style={{ fontFamily:'IndoPak Nastaleeq,serif', direction: 'rtl', fontSize: '13px' }}>
                    {item.arabic}
                  </div>
                </div>
                {isActive && (
                  <motion.div className="w-2 h-2 rounded-full bg-yellow-300"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }} />
                )}
              </motion.button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t text-center" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <div className="mb-2 flex justify-center"><TeacherModeToggle /></div>
          <p className="text-xs opacity-40 text-white" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Traditional Indo-Pak Madani Qaida Method
          </p>
        </div>
      </aside>

      {/* ═══════════════════════════════
          MAIN CONTENT AREA
      ═══════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0" style={{ position: 'relative' }}>
        <TeacherDrawingOverlay />

        {/* ── Mobile top bar ────────── */}
        <header className="flex md:hidden items-center justify-between px-4 py-3 shadow-lg shrink-0 relative overflow-hidden"
          style={{ background: `linear-gradient(135deg,${activeNav.gradient[0]},${activeNav.gradient[1]})`, zIndex: 200 }}>
          <Cloud style={{ position:'absolute', top:'-5px', right:'-10px', width:'100px', opacity:0.12 }} />
          <div className="flex items-center gap-2 relative z-10">
            <span className="text-3xl" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
              {activeNav.emoji}
            </span>
            <div>
              <h1 className="font-extrabold text-white text-base leading-tight"
                style={{ fontFamily: 'Fredoka One, cursive' }}>
                {activeNav.label}
              </h1>
              <p style={{ fontFamily:'IndoPak Nastaleeq,serif', color: '#FFD54F', fontSize: '14px', direction: 'rtl', lineHeight: 1 }}>
                {activeNav.arabic}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 relative z-10">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)', border: '1.5px solid rgba(255,255,255,0.4)' }}>
              <span className="text-lg">⭐</span>
              <span className="font-extrabold text-lg" style={{ color: '#FFD54F', fontFamily: 'Fredoka One, cursive' }}>
                {progress.totalStars}
              </span>
            </div>
            <ProfileAvatar size={38} onClick={() => setShowProfile(true)} />
          </div>
        </header>

        {/* ── Page Content ─────────── */}
        <main className="page-scroll flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              style={{ minHeight: '100%' }}
            >
              {pages[activePage]}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* ═══════════════════════════════
          MOBILE BOTTOM NAV
      ═══════════════════════════════ */}
      <nav className="bottom-nav fixed bottom-0 left-0 right-0 border-t"
        style={{ background: 'linear-gradient(0deg,#0d2d40,#1B4D6B)', borderColor: 'rgba(255,213,79,0.3)', zIndex: 200 }}>
        <div className="flex">
          {NAV.map(item => {
            const isActive = activePage === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 relative transition-all"
                style={{ minHeight: '56px' }}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveTab"
                    className="absolute inset-x-1 inset-y-1 rounded-2xl"
                    style={{ background: `linear-gradient(135deg,${item.gradient[0]},${item.gradient[1]})` }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="text-xl relative z-10">{item.emoji}</span>
                <span className="relative z-10 font-bold"
                  style={{
                    fontSize: '8px', fontFamily: 'Fredoka One, cursive',
                    color: isActive ? '#FFD54F' : '#94A3B8',
                    letterSpacing: '0.3px',
                  }}>
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
