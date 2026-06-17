// Colourful kids-friendly page header with cloud decoration
export function PageHeader({ title, titleArabic, subtitle, emoji, gradient }) {
  const grad = gradient || 'linear-gradient(135deg, #1B4D6B 0%, #2979A0 100%)';

  return (
    <div className="relative overflow-hidden" style={{ background: grad }}>
      {/* Cloud decorations */}
      <svg className="absolute top-0 right-0 opacity-10" width="160" height="80" viewBox="0 0 160 80">
        <ellipse cx="100" cy="55" rx="55" ry="38" fill="white" />
        <ellipse cx="70"  cy="48" rx="38" ry="28" fill="white" />
        <ellipse cx="130" cy="50" rx="32" ry="24" fill="white" />
      </svg>
      <svg className="absolute bottom-0 left-0 opacity-10" width="120" height="60" viewBox="0 0 120 60">
        <ellipse cx="40"  cy="45" rx="40" ry="28" fill="white" />
        <ellipse cx="70"  cy="38" rx="30" ry="22" fill="white" />
        <ellipse cx="10"  cy="48" rx="22" ry="16" fill="white" />
      </svg>

      <div className="relative z-10 px-5 py-5 text-center">
        {emoji && (
          <div className="text-5xl mb-2" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.3))' }}>
            {emoji}
          </div>
        )}
        <h1 className="text-2xl font-extrabold text-white leading-tight"
          style={{ fontFamily: 'Fredoka One, cursive', textShadow: '0 2px 8px rgba(0,0,0,0.25)' }}>
          {title}
        </h1>
        {titleArabic && (
          <p className="text-xl mt-1" style={{ fontFamily:'IndoPak Nastaleeq,serif', color: '#FFD54F', direction: 'rtl' }}>
            {titleArabic}
          </p>
        )}
        {subtitle && (
          <p className="text-sm mt-1 text-white opacity-85" style={{ fontFamily: 'Nunito, sans-serif' }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
