import { motion } from 'framer-motion';
import { useProgress } from '../hooks/useProgress';
import { QAIDA_LESSONS } from '../data/qaida';
import { PageHeader } from '../components/ui/PageHeader';

const BADGES = [
  { id:'first_lesson',   name:'First Step',        arabicName:'الخطوة الأولى',  emoji:'🌱', color:'#22C55E', condition:p=>p.completedLessons.length>=1,           tip:'Complete your first lesson' },
  { id:'letter_explorer',name:'Letter Explorer',   arabicName:'مستكشف الحروف', emoji:'🔤', color:'#3B82F6', condition:p=>p.completedLessons.includes(1),           tip:'Complete the Letters lesson' },
  { id:'harakat_hero',   name:'Harakat Hero',      arabicName:'بطل الحركات',   emoji:'⚡', color:'#F97316', condition:p=>p.completedLessons.includes(2),           tip:'Complete Short Vowels' },
  { id:'qalqalah_king',  name:'Qalqalah King',     arabicName:'ملك القلقلة',   emoji:'🎯', color:'#D97706', condition:p=>p.completedLessons.includes(7),           tip:'Complete Qalqalah lesson' },
  { id:'star_collector', name:'Star Collector',    arabicName:'جامع النجوم',   emoji:'⭐', color:'#EAB308', condition:p=>p.totalStars>=15,                          tip:'Earn 15 total stars' },
  { id:'qaida_graduate', name:'Qaida Graduate',    arabicName:'خريج القاعدة',  emoji:'🎓', color:'#D4A017', condition:p=>p.completedLessons.filter(id=>id<=10).length>=10, tip:'Complete all 10 Qaida lessons' },
  { id:'quran_starter',  name:'Quran Starter',     arabicName:'مبتدئ القرآن',  emoji:'🌙', color:'#8B5CF6', condition:p=>p.completedLessons.filter(id=>id<=10).length>=8,  tip:'Unlock Quran reading' },
  { id:'super_learner',  name:'Super Learner',     arabicName:'المتعلم المتميز',emoji:'🚀', color:'#EC4899', condition:p=>p.totalStars>=25,                          tip:'Earn 25 total stars' },
];

function BadgeCard({ badge, earned }) {
  return (
    <motion.div
      className="rounded-3xl p-4 text-center relative overflow-hidden"
      style={{
        backgroundColor: earned ? 'white' : '#F8FAFC',
        border: `2.5px solid ${earned ? badge.color : '#E2E8F0'}`,
        boxShadow: earned ? `0 6px 0 ${badge.color}30` : 'none',
        opacity: earned ? 1 : 0.5,
      }}
      animate={earned ? { y:[0,-3,0] } : {}}
      transition={{ duration:2, repeat:Infinity, repeatDelay:2 }}
    >
      {earned && (
        <div className="absolute top-2 right-2 text-xs px-1.5 py-0.5 rounded-full font-bold text-white"
          style={{ backgroundColor: badge.color, fontFamily:'Fredoka One,cursive', fontSize:'9px' }}>
          ✓ EARNED
        </div>
      )}
      <div className="text-4xl mb-2">{earned ? badge.emoji : '🔒'}</div>
      <div className="font-extrabold text-sm leading-tight"
        style={{ color: earned ? badge.color : '#94A3B8', fontFamily:'Fredoka One,cursive' }}>
        {badge.name}
      </div>
      <div className="text-xs mt-0.5" style={{ fontFamily:'Amiri,serif', color: earned ? badge.color : '#CBD5E1', direction:'rtl', opacity:0.9 }}>
        {badge.arabicName}
      </div>
      <div className="text-xs mt-2 opacity-70" style={{ color:'#64748B', fontFamily:'Nunito,sans-serif' }}>
        {badge.tip}
      </div>
    </motion.div>
  );
}

const LESSON_GRADIENT = [
  '#1B4D6B','#E65100','#1565C0','#1565C0','#6D28D9',
  '#9D174D','#B45309','#166534','#7C3AED','#2E7D32',
];

export default function ProgressPage() {
  const { progress, resetProgress, isLessonCompleted, getLessonStars } = useProgress();
  const qaidaDone    = progress.completedLessons.filter(id=>id>=1&&id<=10).length;
  const totalBadges  = BADGES.filter(b=>b.condition(progress)).length;
  const completePct  = Math.round((qaidaDone/10)*100);

  return (
    <div className="sky-bg" style={{ minHeight:'100%' }}>
      <PageHeader title="My Progress" titleArabic="ترقی"
        subtitle="Your Arabic learning journey" emoji="⭐"
        gradient="linear-gradient(135deg,#BF360C,#F4511E)" />

      <div className="p-4 space-y-5">

        {/* ── Stat pills ─────────────────── */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { val: progress.totalStars, label:'Stars',   emoji:'⭐', bg:'#FEF3C7', color:'#D97706', shadow:'#B45309' },
            { val: qaidaDone,           label:'Lessons',  emoji:'📖', bg:'#DBEAFE', color:'#1D4ED8', shadow:'#1E3A8A' },
            { val: totalBadges,         label:'Badges',   emoji:'🏅', bg:'#DCFCE7', color:'#16A34A', shadow:'#14532D' },
          ].map(s => (
            <div key={s.label} className="rounded-3xl p-4 text-center"
              style={{ backgroundColor: s.bg, border:`2.5px solid ${s.color}30`, boxShadow:`0 5px 0 ${s.shadow}20` }}>
              <div className="text-3xl">{s.emoji}</div>
              <div className="text-3xl font-extrabold" style={{ color:s.color, fontFamily:'Fredoka One,cursive' }}>{s.val}</div>
              <div className="text-xs font-bold" style={{ color:s.color, fontFamily:'Nunito,sans-serif' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Qaida progress bar ─────────── */}
        <div className="rounded-3xl p-5 bg-white" style={{ boxShadow:'0 6px 20px rgba(27,77,107,0.12)' }}>
          <div className="flex justify-between mb-2">
            <span className="font-extrabold" style={{ color:'#1B4D6B', fontFamily:'Fredoka One,cursive' }}>
              Qaida Progress
            </span>
            <span className="font-extrabold text-lg" style={{ color:'#D97706', fontFamily:'Fredoka One,cursive' }}>
              {completePct}%
            </span>
          </div>
          <div className="rounded-full overflow-hidden relative" style={{ height:'18px', backgroundColor:'#E2E8F0' }}>
            <motion.div className="h-full rounded-full relative overflow-hidden"
              style={{ background:'linear-gradient(90deg,#1B4D6B,#D97706)' }}
              initial={{ width:0 }}
              animate={{ width:`${completePct}%` }}
              transition={{ duration:1, ease:'easeOut' }}>
              {/* Shimmer */}
              <motion.div className="absolute inset-0"
                style={{ background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)' }}
                animate={{ x:['-100%','200%'] }}
                transition={{ duration:2, repeat:Infinity, repeatDelay:1 }} />
            </motion.div>
          </div>
          <div className="text-xs mt-2 opacity-60" style={{ fontFamily:'Nunito,sans-serif', color:'#1B4D6B' }}>
            {qaidaDone}/10 lessons • Need 8 to unlock Quran 🌙
          </div>
        </div>

        {/* ── Lesson map ────────────────── */}
        <div className="rounded-3xl p-5 bg-white" style={{ boxShadow:'0 6px 20px rgba(0,0,0,0.08)' }}>
          <h3 className="font-extrabold mb-4 text-center text-lg"
            style={{ color:'#1B4D6B', fontFamily:'Fredoka One,cursive' }}>
            📍 Lesson Map
          </h3>
          <div className="grid grid-cols-5 gap-3 justify-items-center">
            {QAIDA_LESSONS.map((lesson,i) => {
              const done   = isLessonCompleted(lesson.id);
              const stars  = getLessonStars(lesson.id);
              const locked = i>0 && !isLessonCompleted(QAIDA_LESSONS[i-1].id) && !done;
              const color  = LESSON_GRADIENT[i] || '#1B4D6B';

              return (
                <div key={lesson.id} className="flex flex-col items-center gap-1">
                  <motion.div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-md"
                    style={{
                      background: done ? 'linear-gradient(135deg,#22C55E,#16A34A)' : locked ? '#E2E8F0' : `linear-gradient(135deg,${color},${color}cc)`,
                      boxShadow: !locked && !done ? `0 4px 0 ${color}60` : 'none',
                    }}
                    animate={!locked && !done ? { y:[0,-3,0] } : {}}
                    transition={{ duration:1.5, repeat:Infinity, repeatDelay:i*0.3 }}
                  >
                    {locked ? '🔒' : done ? '✅' : lesson.icon}
                  </motion.div>
                  <span className="text-xs font-bold" style={{ color: done?'#22C55E':locked?'#CBD5E1':'#1B4D6B', fontFamily:'Fredoka One,cursive' }}>
                    Lv.{lesson.level}
                  </span>
                  <div className="flex gap-0">
                    {[1,2,3].map(s=>(
                      <span key={s} style={{ fontSize:'10px', opacity:s<=stars?1:0.2 }}>⭐</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Badge collection ──────────── */}
        <div>
          <h3 className="font-extrabold mb-3 text-lg" style={{ color:'#1B4D6B', fontFamily:'Fredoka One,cursive' }}>
            🏅 Badge Collection
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {BADGES.map(badge => (
              <BadgeCard key={badge.id} badge={badge} earned={badge.condition(progress)} />
            ))}
          </div>
        </div>

        {/* ── Start date ────────────────── */}
        {progress.startDate && (
          <div className="rounded-2xl px-4 py-3 text-center bg-white"
            style={{ border:'1.5px solid #E2E8F0' }}>
            <p className="text-xs" style={{ color:'#94A3B8', fontFamily:'Nunito,sans-serif' }}>
              🗓️ Learning since {new Date(progress.startDate).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}
            </p>
          </div>
        )}

        {/* ── Reset ─────────────────────── */}
        <button
          onClick={() => confirm('Reset all progress? This cannot be undone.') && resetProgress()}
          className="w-full py-3 rounded-2xl font-extrabold text-sm bubble-btn"
          style={{ backgroundColor:'#FEF2F2', color:'#EF4444', border:'2.5px solid #FECACA', fontFamily:'Fredoka One,cursive',
            boxShadow:'0 4px 0 #FECACA' }}>
          🔄 Reset All Progress
        </button>
      </div>
    </div>
  );
}
