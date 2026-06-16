// Illustrated SVG character cards for all 28 Arabic letters
// Each card is 200×200 with a fun, kid-friendly visual concept

export const LETTER_COLORS = {
  'ا': { bg: '#FFF3E0', body: '#FF8F00', accent: '#FFD54F', shadow: '#E65100' },
  'ب': { bg: '#E3F2FD', body: '#1E88E5', accent: '#90CAF9', shadow: '#1565C0' },
  'ت': { bg: '#F3E5F5', body: '#8E24AA', accent: '#CE93D8', shadow: '#6A1B9A' },
  'ث': { bg: '#E8F5E9', body: '#43A047', accent: '#A5D6A7', shadow: '#2E7D32' },
  'ج': { bg: '#FBE9E7', body: '#F4511E', accent: '#FFAB91', shadow: '#BF360C' },
  'ح': { bg: '#E0F2F1', body: '#00897B', accent: '#80CBC4', shadow: '#00695C' },
  'خ': { bg: '#FCE4EC', body: '#E91E63', accent: '#F48FB1', shadow: '#880E4F' },
  'د': { bg: '#FFF8E1', body: '#FFB300', accent: '#FFE082', shadow: '#FF6F00' },
  'ذ': { bg: '#E8EAF6', body: '#3949AB', accent: '#9FA8DA', shadow: '#1A237E' },
  'ر': { bg: '#F1F8E9', body: '#558B2F', accent: '#AED581', shadow: '#33691E' },
  'ز': { bg: '#FFF9C4', body: '#F9A825', accent: '#FFF176', shadow: '#F57F17' },
  'س': { bg: '#E8F5E9', body: '#00796B', accent: '#80CBC4', shadow: '#004D40' },
  'ش': { bg: '#F0F4FF', body: '#5C6BC0', accent: '#9FA8DA', shadow: '#283593' },
  'ص': { bg: '#FFF3E0', body: '#EF6C00', accent: '#FFCC80', shadow: '#BF360C' },
  'ض': { bg: '#FCE4EC', body: '#C62828', accent: '#EF9A9A', shadow: '#7F0000' },
  'ط': { bg: '#E8F5E9', body: '#2E7D32', accent: '#A5D6A7', shadow: '#1B5E20' },
  'ظ': { bg: '#EDE7F6', body: '#6A1B9A', accent: '#CE93D8', shadow: '#38006B' },
  'ع': { bg: '#E3F2FD', body: '#0277BD', accent: '#81D4FA', shadow: '#01579B' },
  'غ': { bg: '#F1F8E9', body: '#388E3C', accent: '#C5E1A5', shadow: '#1B5E20' },
  'ف': { bg: '#FCE4EC', body: '#AD1457', accent: '#F48FB1', shadow: '#880E4F' },
  'ق': { bg: '#EDE7F6', body: '#512DA8', accent: '#B39DDB', shadow: '#311B92' },
  'ك': { bg: '#FFF8E1', body: '#F57F17', accent: '#FFE082', shadow: '#E65100' },
  'ل': { bg: '#E0F7FA', body: '#00838F', accent: '#80DEEA', shadow: '#006064' },
  'م': { bg: '#FCE4EC', body: '#C2185B', accent: '#F48FB1', shadow: '#880E4F' },
  'ن': { bg: '#E8EAF6', body: '#3F51B5', accent: '#9FA8DA', shadow: '#1A237E' },
  'و': { bg: '#F1F8E9', body: '#33691E', accent: '#CCFF90', shadow: '#1B5E20' },
  'ه': { bg: '#FFF3E0', body: '#E65100', accent: '#FFCC80', shadow: '#BF360C' },
  'ي': { bg: '#E3F2FD', body: '#1565C0', accent: '#90CAF9', shadow: '#0D47A1' },
  'ء': { bg: '#F5F5F5', body: '#616161', accent: '#BDBDBD', shadow: '#212121' },
};

const DEFAULT_COLOR = { bg: '#F3F4F6', body: '#6B7280', accent: '#D1D5DB', shadow: '#374151' };

// ── Group 1 ──────────────────────────────────────────────────────────────────

function AlifSVG({ c }) {
  return (
    <g>
      <rect x="82" y="155" width="36" height="12" rx="4" fill={c.shadow} />
      <rect x="88" y="70" width="24" height="85" rx="8" fill={c.body} />
      <ellipse cx="100" cy="70" rx="14" ry="18" fill={c.accent} />
      <polygon points="100,45 103,55 114,55 105,61 108,72 100,65 92,72 95,61 86,55 97,55" fill={c.shadow} />
      <circle cx="95" cy="90" r="3" fill="white" /><circle cx="105" cy="90" r="3" fill="white" />
      <circle cx="95" cy="91" r="1.5" fill="#333" /><circle cx="105" cy="91" r="1.5" fill="#333" />
      <path d="M94 100 Q100 106 106 100" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  );
}

function BaSVG({ c }) {
  return (
    <g>
      <ellipse cx="100" cy="155" rx="65" ry="10" fill="#90CAF9" opacity="0.4" />
      <path d="M35 130 Q100 160 165 130 L155 115 Q100 140 45 115 Z" fill={c.body} />
      <rect x="50" y="105" width="100" height="15" rx="6" fill={c.accent} />
      <polygon points="100,55 100,110 70,110" fill="white" stroke={c.shadow} strokeWidth="2" />
      <rect x="98" y="55" width="4" height="60" rx="2" fill={c.shadow} />
      <circle cx="100" cy="168" r="9" fill={c.shadow} />
      <circle cx="95" cy="118" r="3" fill={c.shadow} /><circle cx="105" cy="118" r="3" fill={c.shadow} />
      <path d="M94 123 Q100 127 106 123" stroke={c.shadow} strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  );
}

function TaSVG({ c }) {
  return (
    <g>
      <ellipse cx="100" cy="155" rx="65" ry="10" fill="#CE93D8" opacity="0.3" />
      <path d="M35 130 Q100 160 165 130 L155 115 Q100 140 45 115 Z" fill={c.body} />
      <rect x="50" y="105" width="100" height="15" rx="6" fill={c.accent} />
      <polygon points="100,55 100,110 70,110" fill="white" stroke={c.shadow} strokeWidth="2" />
      <rect x="98" y="55" width="4" height="60" rx="2" fill={c.shadow} />
      <circle cx="86" cy="72" r="7" fill={c.shadow} /><circle cx="114" cy="72" r="7" fill={c.shadow} />
      <circle cx="86" cy="70" r="3" fill="white" /><circle cx="114" cy="70" r="3" fill="white" />
      <circle cx="95" cy="118" r="3" fill={c.shadow} /><circle cx="105" cy="118" r="3" fill={c.shadow} />
      <path d="M93 124 Q100 129 107 124" stroke={c.shadow} strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  );
}

function ThaSVG({ c }) {
  return (
    <g>
      <ellipse cx="100" cy="155" rx="65" ry="10" fill="#A5D6A7" opacity="0.3" />
      <path d="M35 130 Q100 160 165 130 L155 115 Q100 140 45 115 Z" fill={c.body} />
      <rect x="50" y="105" width="100" height="15" rx="6" fill={c.accent} />
      <polygon points="100,55 100,110 70,110" fill="white" stroke={c.shadow} strokeWidth="2" />
      <rect x="98" y="55" width="4" height="60" rx="2" fill={c.shadow} />
      <circle cx="100" cy="60" r="7" fill={c.shadow} opacity="0.9" />
      <circle cx="83"  cy="73" r="6" fill={c.shadow} opacity="0.8" />
      <circle cx="117" cy="73" r="6" fill={c.shadow} opacity="0.8" />
      <circle cx="100" cy="59" r="3" fill="white" opacity="0.7" />
      <circle cx="83"  cy="72" r="2.5" fill="white" opacity="0.7" />
      <circle cx="117" cy="72" r="2.5" fill="white" opacity="0.7" />
      <circle cx="95" cy="118" r="3" fill={c.shadow} /><circle cx="105" cy="118" r="3" fill={c.shadow} />
      <path d="M93 124 Q100 129 107 124" stroke={c.shadow} strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  );
}

// ── Group 2 ──────────────────────────────────────────────────────────────────

function JimSVG({ c }) {
  return (
    <g>
      <path d="M60 80 L70 155 L130 155 L140 80 Z" fill={c.body} />
      <rect x="58" y="75" width="84" height="14" rx="7" fill={c.accent} />
      <path d="M140 95 Q165 95 165 125 Q165 145 140 145" stroke={c.accent} strokeWidth="12" fill="none" strokeLinecap="round" />
      <path d="M80 65 Q85 50 80 38" stroke={c.shadow} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M100 60 Q105 45 100 33" stroke={c.shadow} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.5" />
      <circle cx="100" cy="120" r="12" fill={c.shadow} />
      <circle cx="100" cy="118" r="5" fill="white" opacity="0.5" />
      <circle cx="88" cy="100" r="4" fill="white" /><circle cx="112" cy="100" r="4" fill="white" />
      <circle cx="89"  cy="101" r="2" fill="#333" /><circle cx="113" cy="101" r="2" fill="#333" />
      <path d="M88 110 Q100 118 112 110" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>
  );
}

function HaSVG({ c }) {
  return (
    <g>
      <path d="M45 160 L45 95 Q45 50 100 50 Q155 50 155 95 L155 160" stroke={c.body} strokeWidth="18" fill="none" strokeLinecap="round" />
      <path d="M55 160 L55 97 Q55 65 100 65 Q145 65 145 97 L145 160" stroke={c.accent} strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.6" />
      <ellipse cx="100" cy="55" rx="14" ry="10" fill={c.accent} />
      <polygon points="100,42 104,52 96,52" fill={c.shadow} />
      <text x="100" y="125" textAnchor="middle" fontSize="32">✨</text>
      <rect x="38" y="158" width="124" height="8" rx="4" fill={c.shadow} opacity="0.3" />
    </g>
  );
}

function KhaSVG({ c }) {
  return (
    <g>
      <path d="M45 160 L45 95 Q45 50 100 50 Q155 50 155 95 L155 160" stroke={c.body} strokeWidth="18" fill="none" strokeLinecap="round" />
      <path d="M55 160 L55 97 Q55 65 100 65 Q145 65 145 97 L145 160" stroke={c.accent} strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.6" />
      <line x1="100" y1="28" x2="100" y2="48" stroke={c.shadow} strokeWidth="3" />
      <circle cx="100" cy="22" r="14" fill={c.shadow} />
      <circle cx="100" cy="20" r="7" fill="#FFD54F" />
      <path d="M93 30 Q100 38 107 30" stroke="#FFD54F" strokeWidth="2" fill="none" opacity="0.8" />
      <text x="100" y="130" textAnchor="middle" fontSize="28">🔆</text>
      <rect x="38" y="158" width="124" height="8" rx="4" fill={c.shadow} opacity="0.3" />
    </g>
  );
}

// ── Group 3 ──────────────────────────────────────────────────────────────────

function DalSVG({ c }) {
  return (
    <g>
      <path d="M55 145 Q55 60 130 55" stroke={c.body} strokeWidth="22" fill="none" strokeLinecap="round" />
      <path d="M55 145 Q55 70 122 65" stroke={c.accent} strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.7" />
      <circle cx="130" cy="57" r="16" fill={c.body} /><circle cx="130" cy="57" r="8" fill={c.accent} />
      <text x="75" y="100" fontSize="18" opacity="0.8">⭐</text>
      <text x="100" y="80" fontSize="14" opacity="0.6">✨</text>
      <ellipse cx="72" cy="152" rx="30" ry="8" fill={c.shadow} opacity="0.2" />
    </g>
  );
}

function DhalSVG({ c }) {
  return (
    <g>
      <path d="M55 145 Q55 60 130 55" stroke={c.body} strokeWidth="22" fill="none" strokeLinecap="round" />
      <path d="M55 145 Q55 70 122 65" stroke={c.accent} strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.7" />
      <circle cx="130" cy="57" r="16" fill={c.body} /><circle cx="130" cy="57" r="8" fill={c.accent} />
      <circle cx="138" cy="40" r="11" fill={c.shadow} stroke={c.accent} strokeWidth="3" />
      <circle cx="138" cy="40" r="5" fill="#FFD54F" />
      <text x="75" y="100" fontSize="18" opacity="0.8">💎</text>
      <ellipse cx="72" cy="152" rx="30" ry="8" fill={c.shadow} opacity="0.2" />
    </g>
  );
}

// ── Group 4 ──────────────────────────────────────────────────────────────────

function RaSVG({ c }) {
  return (
    <g>
      <path d="M110 155 L110 75 Q110 50 85 50" stroke={c.body} strokeWidth="18" fill="none" strokeLinecap="round" />
      <path d="M110 155 L110 80 Q110 58 88 58" stroke={c.accent} strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.7" />
      <circle cx="82" cy="52" r="12" fill={c.body} /><circle cx="82" cy="52" r="6" fill={c.accent} />
      <ellipse cx="110" cy="158" rx="10" ry="6" fill={c.shadow} opacity="0.5" />
      <text x="78" y="110" fontSize="20" opacity="0.7">🌟</text>
    </g>
  );
}

// Zay — same cane but with a dot sparkle on it
function ZaySVG({ c }) {
  return (
    <g>
      <path d="M110 155 L110 75 Q110 50 85 50" stroke={c.body} strokeWidth="18" fill="none" strokeLinecap="round" />
      <path d="M110 155 L110 80 Q110 58 88 58" stroke={c.accent} strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.7" />
      <circle cx="82" cy="52" r="12" fill={c.body} /><circle cx="82" cy="52" r="6" fill={c.accent} />
      {/* Dot above the curve */}
      <circle cx="120" cy="68" r="10" fill={c.shadow} />
      <circle cx="120" cy="66" r="4" fill="white" opacity="0.6" />
      <ellipse cx="110" cy="158" rx="10" ry="6" fill={c.shadow} opacity="0.5" />
      <text x="65" y="130" fontSize="20" opacity="0.7">✨</text>
    </g>
  );
}

// ── Group 5 ──────────────────────────────────────────────────────────────────

// Seen — three-humped snake shape
function SeenSVG({ c }) {
  return (
    <g>
      {/* Snake body — three humps like the letter س */}
      <path d="M30 140 Q45 100 60 140 Q75 100 90 140 Q105 100 120 140 Q140 120 155 90"
        stroke={c.body} strokeWidth="18" fill="none" strokeLinecap="round" />
      {/* Head */}
      <ellipse cx="160" cy="82" rx="18" ry="14" fill={c.body} />
      {/* Eyes */}
      <circle cx="155" cy="78" r="4" fill="white" /><circle cx="165" cy="78" r="4" fill="white" />
      <circle cx="155" cy="79" r="2" fill="#333" /><circle cx="165" cy="79" r="2" fill="#333" />
      {/* Tongue */}
      <path d="M168 86 L175 92 M168 86 L175 80" stroke="#EF5350" strokeWidth="2.5" strokeLinecap="round" />
      {/* Ground shadow */}
      <ellipse cx="85" cy="150" rx="70" ry="8" fill={c.shadow} opacity="0.15" />
    </g>
  );
}

// Sheen — same snake but with 3 sparkle dots above its humps
function SheenSVG({ c }) {
  return (
    <g>
      <path d="M30 140 Q45 100 60 140 Q75 100 90 140 Q105 100 120 140 Q140 120 155 90"
        stroke={c.body} strokeWidth="18" fill="none" strokeLinecap="round" />
      <ellipse cx="160" cy="82" rx="18" ry="14" fill={c.body} />
      <circle cx="155" cy="78" r="4" fill="white" /><circle cx="165" cy="78" r="4" fill="white" />
      <circle cx="155" cy="79" r="2" fill="#333" /><circle cx="165" cy="79" r="2" fill="#333" />
      <path d="M168 86 L175 92 M168 86 L175 80" stroke="#EF5350" strokeWidth="2.5" strokeLinecap="round" />
      {/* 3 sparkle dots above humps */}
      <circle cx="45"  cy="88" r="9" fill={c.shadow} />
      <circle cx="78"  cy="88" r="9" fill={c.shadow} />
      <circle cx="111" cy="88" r="9" fill={c.shadow} />
      <circle cx="45"  cy="86" r="4" fill="white" opacity="0.6" />
      <circle cx="78"  cy="86" r="4" fill="white" opacity="0.6" />
      <circle cx="111" cy="86" r="4" fill="white" opacity="0.6" />
      <ellipse cx="85" cy="150" rx="70" ry="8" fill={c.shadow} opacity="0.15" />
    </g>
  );
}

// ── Group 6 ──────────────────────────────────────────────────────────────────

// Suaad — a round barrel / pot shape (fat and proud)
function SuaadSVG({ c }) {
  return (
    <g>
      {/* Big round belly */}
      <ellipse cx="95" cy="115" rx="58" ry="52" fill={c.body} />
      <ellipse cx="95" cy="115" rx="44" ry="38" fill={c.accent} opacity="0.5" />
      {/* Spout / tail curving right */}
      <path d="M153 115 Q175 115 172 135 Q168 155 150 150" stroke={c.body} strokeWidth="14" fill="none" strokeLinecap="round" />
      {/* Lid */}
      <ellipse cx="95" cy="63" rx="35" ry="10" fill={c.shadow} />
      {/* Face */}
      <circle cx="85"  cy="108" r="5" fill="white" /><circle cx="105" cy="108" r="5" fill="white" />
      <circle cx="85"  cy="109" r="2.5" fill="#333" /><circle cx="105" cy="109" r="2.5" fill="#333" />
      <path d="M83 122 Q95 130 107 122" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>
  );
}

// Zuaad — same barrel but with a dot (gem on the lid)
function ZuaadSVG({ c }) {
  return (
    <g>
      <ellipse cx="95" cy="115" rx="58" ry="52" fill={c.body} />
      <ellipse cx="95" cy="115" rx="44" ry="38" fill={c.accent} opacity="0.5" />
      <path d="M153 115 Q175 115 172 135 Q168 155 150 150" stroke={c.body} strokeWidth="14" fill="none" strokeLinecap="round" />
      <ellipse cx="95" cy="63" rx="35" ry="10" fill={c.shadow} />
      {/* Gem dot on lid */}
      <circle cx="95" cy="52" r="13" fill={c.shadow} stroke={c.accent} strokeWidth="3" />
      <circle cx="95" cy="50" r="6" fill="#FFD54F" />
      <circle cx="85"  cy="108" r="5" fill="white" /><circle cx="105" cy="108" r="5" fill="white" />
      <circle cx="85"  cy="109" r="2.5" fill="#333" /><circle cx="105" cy="109" r="2.5" fill="#333" />
      <path d="M83 122 Q95 130 107 122" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>
  );
}

// ── Group 7 ──────────────────────────────────────────────────────────────────

// Toey (ط) — a trophy with a round cup on a stem
function ToeySVG({ c }) {
  return (
    <g>
      {/* Cup */}
      <path d="M55 65 Q55 130 100 135 Q145 130 145 65 Z" fill={c.body} />
      <rect x="53" y="60" width="94" height="14" rx="7" fill={c.accent} />
      {/* Handles */}
      <path d="M55 80 Q30 80 30 105 Q30 125 55 125" stroke={c.accent} strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M145 80 Q170 80 170 105 Q170 125 145 125" stroke={c.accent} strokeWidth="10" fill="none" strokeLinecap="round" />
      {/* Stem */}
      <rect x="90" y="135" width="20" height="22" rx="4" fill={c.shadow} />
      {/* Base */}
      <rect x="65" y="155" width="70" height="12" rx="6" fill={c.shadow} />
      {/* Star inside */}
      <text x="100" y="108" textAnchor="middle" fontSize="36">⭐</text>
    </g>
  );
}

// Zoey (ظ) — same trophy but with a dot spark on top
function ZoeySVG({ c }) {
  return (
    <g>
      <path d="M55 75 Q55 135 100 140 Q145 135 145 75 Z" fill={c.body} />
      <rect x="53" y="70" width="94" height="14" rx="7" fill={c.accent} />
      <path d="M55 88 Q30 88 30 110 Q30 130 55 130" stroke={c.accent} strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M145 88 Q170 88 170 110 Q170 130 145 130" stroke={c.accent} strokeWidth="10" fill="none" strokeLinecap="round" />
      <rect x="90" y="140" width="20" height="18" rx="4" fill={c.shadow} />
      <rect x="65" y="156" width="70" height="12" rx="6" fill={c.shadow} />
      {/* Dot spark floating above */}
      <circle cx="100" cy="48" r="15" fill={c.shadow} />
      <circle cx="100" cy="46" r="7"  fill="#FFD54F" />
      <text x="100" y="118" textAnchor="middle" fontSize="28">🏆</text>
    </g>
  );
}

// ── Group 8 ──────────────────────────────────────────────────────────────────

// Ain (ع) — a friendly EYE (عين = eye in Arabic!)
function AinSVG({ c }) {
  return (
    <g>
      {/* Eyelid outline */}
      <path d="M25 105 Q100 45 175 105 Q100 165 25 105 Z" fill={c.body} />
      {/* White of eye */}
      <ellipse cx="100" cy="105" rx="55" ry="40" fill="white" />
      {/* Iris */}
      <circle cx="100" cy="105" r="28" fill={c.accent} />
      {/* Pupil */}
      <circle cx="100" cy="105" r="16" fill={c.shadow} />
      {/* Shine */}
      <circle cx="110" cy="96" r="6" fill="white" opacity="0.7" />
      <circle cx="92"  cy="100" r="3" fill="white" opacity="0.5" />
      {/* Eyelashes */}
      {[-40,-20,0,20,40].map((a,i) => {
        const rad = (a - 90) * Math.PI / 180;
        const x1 = 100 + Math.cos(rad) * 60;
        const y1 = 70  + Math.sin(rad) * 20;
        const x2 = 100 + Math.cos(rad) * 72;
        const y2 = 70  + Math.sin(rad) * 28;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c.shadow} strokeWidth="3" strokeLinecap="round" />;
      })}
      {/* Label */}
      <text x="100" y="178" textAnchor="middle" fontSize="11" fill={c.shadow} fontFamily="Nunito,sans-serif" fontWeight="bold">عين = Eye</text>
    </g>
  );
}

// Ghain (غ) — same eye with a dot/eyebrow above
function GhainSVG({ c }) {
  return (
    <g>
      <path d="M25 112 Q100 52 175 112 Q100 172 25 112 Z" fill={c.body} />
      <ellipse cx="100" cy="112" rx="55" ry="40" fill="white" />
      <circle cx="100" cy="112" r="28" fill={c.accent} />
      <circle cx="100" cy="112" r="16" fill={c.shadow} />
      <circle cx="110" cy="103" r="6" fill="white" opacity="0.7" />
      {/* Dot above as eyebrow/teardrop */}
      <circle cx="100" cy="50" r="14" fill={c.shadow} />
      <circle cx="100" cy="48" r="6"  fill={c.accent} opacity="0.8" />
      {/* Eyebrow arc */}
      <path d="M68 78 Q100 60 132 78" stroke={c.shadow} strokeWidth="5" fill="none" strokeLinecap="round" />
    </g>
  );
}

// ── Group 9 ──────────────────────────────────────────────────────────────────

// Fay (ف) — a flower with one petal dot (ف looks like a flower face)
function FaySVG({ c }) {
  return (
    <g>
      {/* Stem */}
      <path d="M100 160 Q100 130 100 115" stroke="#43A047" strokeWidth="8" strokeLinecap="round" />
      {/* Leaves */}
      <ellipse cx="75" cy="135" rx="22" ry="10" fill="#66BB6A" transform="rotate(-30 75 135)" />
      <ellipse cx="125" cy="135" rx="22" ry="10" fill="#66BB6A" transform="rotate(30 125 135)" />
      {/* Flower petals */}
      {[0,60,120,180,240,300].map((a,i) => {
        const rad = a * Math.PI / 180;
        return (
          <ellipse key={i} cx={100 + Math.cos(rad)*30} cy={90 + Math.sin(rad)*30}
            rx="16" ry="10" fill={c.accent} opacity="0.9"
            transform={`rotate(${a} ${100 + Math.cos(rad)*30} ${90 + Math.sin(rad)*30})`} />
        );
      })}
      {/* Flower centre — the ف dot */}
      <circle cx="100" cy="90" r="20" fill={c.body} />
      <circle cx="100" cy="88" r="9"  fill={c.accent} />
      {/* Smiley */}
      <circle cx="95" cy="86" r="2.5" fill={c.shadow} />
      <circle cx="105" cy="86" r="2.5" fill={c.shadow} />
      <path d="M93 93 Q100 99 107 93" stroke={c.shadow} strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  );
}

// Qaaf (ق) — a deep cauldron / bowl with 2 dots below like feet
function QaafSVG({ c }) {
  return (
    <g>
      {/* Cauldron body */}
      <path d="M40 80 Q40 160 100 165 Q160 160 160 80 Z" fill={c.body} />
      <ellipse cx="100" cy="80" rx="60" ry="18" fill={c.accent} />
      {/* Inner glow */}
      <ellipse cx="100" cy="130" rx="42" ry="30" fill={c.shadow} opacity="0.25" />
      {/* Bubble / magic */}
      <text x="100" y="135" textAnchor="middle" fontSize="36">🌟</text>
      {/* Two dots below = the 2 dots of ق */}
      <circle cx="78"  cy="172" r="11" fill={c.shadow} />
      <circle cx="122" cy="172" r="11" fill={c.shadow} />
      <circle cx="78"  cy="170" r="5"  fill="white" opacity="0.5" />
      <circle cx="122" cy="170" r="5"  fill="white" opacity="0.5" />
      {/* Handles */}
      <path d="M40 100 Q18 100 18 125 Q18 148 40 148" stroke={c.accent} strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M160 100 Q182 100 182 125 Q182 148 160 148" stroke={c.accent} strokeWidth="8" fill="none" strokeLinecap="round" />
    </g>
  );
}

// ── Group 10 ─────────────────────────────────────────────────────────────────

// Kaaf (ك) — a royal crown
function KaafSVG({ c }) {
  return (
    <g>
      {/* Crown band */}
      <rect x="35" y="120" width="130" height="35" rx="8" fill={c.body} />
      {/* Crown points */}
      <polygon points="35,120 35,60 65,90 100,45 135,90 165,60 165,120" fill={c.body} />
      <polygon points="42,120 42,70 68,95 100,53 132,95 158,70 158,120" fill={c.accent} opacity="0.6" />
      {/* Gems */}
      <circle cx="100" cy="65" r="12" fill="#FFD54F" stroke={c.shadow} strokeWidth="2" />
      <circle cx="60"  cy="95" r="9"  fill="#EF5350" stroke={c.shadow} strokeWidth="1.5" />
      <circle cx="140" cy="95" r="9"  fill="#42A5F5" stroke={c.shadow} strokeWidth="1.5" />
      {/* Base line */}
      <rect x="30" y="152" width="140" height="10" rx="5" fill={c.shadow} opacity="0.3" />
      <text x="100" y="143" textAnchor="middle" fontSize="14" fill="white" fontFamily="Fredoka One,cursive">KAAF</text>
    </g>
  );
}

// Laam (ل) — a tall curved candy cane / shepherd's hook
function LaamSVG({ c }) {
  return (
    <g>
      {/* Hook */}
      <path d="M110 25 L110 145 Q110 170 85 170 Q60 170 60 148 Q60 130 80 128"
        stroke={c.body} strokeWidth="20" fill="none" strokeLinecap="round" />
      <path d="M110 30 L110 145 Q110 165 88 165 Q68 165 68 148 Q68 133 84 132"
        stroke={c.accent} strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.7" />
      {/* Candy stripe */}
      {[0,1,2,3,4,5].map(i => (
        <line key={i}
          x1={i%2===0?100:120} y1={40+i*22}
          x2={i%2===0?120:100} y2={52+i*22}
          stroke={c.shadow} strokeWidth="6" strokeLinecap="round" opacity="0.35" />
      ))}
      {/* Star top */}
      <polygon points="110,20 113,28 122,28 115,33 118,42 110,36 102,42 105,33 98,28 107,28"
        fill="#FFD54F" />
    </g>
  );
}

// Meem (م) — a round knot / anchor circle
function MeemSVG({ c }) {
  return (
    <g>
      {/* Big circle */}
      <circle cx="100" cy="105" r="60" fill={c.body} />
      <circle cx="100" cy="105" r="46" fill={c.accent} opacity="0.5" />
      <circle cx="100" cy="105" r="30" fill={c.body} />
      {/* Tail going down-right */}
      <path d="M145 120 Q165 130 160 155 Q155 170 140 165"
        stroke={c.body} strokeWidth="14" fill="none" strokeLinecap="round" />
      {/* Face */}
      <circle cx="90"  cy="100" r="5" fill="white" /><circle cx="110" cy="100" r="5" fill="white" />
      <circle cx="90"  cy="101" r="2.5" fill="#333" /><circle cx="110" cy="101" r="2.5" fill="#333" />
      <path d="M88 115 Q100 124 112 115" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  );
}

// Noon (ن) — a smiling bowl / dish with a star dot above
function NoonSVG({ c }) {
  return (
    <g>
      {/* Bowl */}
      <path d="M30 100 Q30 175 100 175 Q170 175 170 100" stroke={c.body} strokeWidth="18" fill="none" strokeLinecap="round" />
      <path d="M40 100 Q40 162 100 162 Q160 162 160 100" stroke={c.accent} strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.6" />
      {/* The rim line */}
      <line x1="28" y1="100" x2="172" y2="100" stroke={c.body} strokeWidth="14" strokeLinecap="round" />
      {/* Star dot above */}
      <circle cx="100" cy="58" r="16" fill={c.shadow} />
      <circle cx="100" cy="56" r="7"  fill="#FFD54F" />
      {/* Stars inside bowl */}
      <text x="80"  y="148" fontSize="18">🌟</text>
      <text x="105" y="145" fontSize="14">⭐</text>
    </g>
  );
}

// ── Group 11 ─────────────────────────────────────────────────────────────────

// Waao (و) — a crescent-and-tail / umbrella handle
function WaaoSVG({ c }) {
  return (
    <g>
      {/* Circle head */}
      <circle cx="105" cy="75" r="48" fill={c.body} />
      <circle cx="105" cy="75" r="34" fill={c.accent} opacity="0.6" />
      {/* Curve opening — like a crescent */}
      <path d="M85 75 Q85 105 105 110" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.5" />
      {/* Tail */}
      <path d="M105 123 Q105 150 80 160 Q62 165 58 155"
        stroke={c.body} strokeWidth="16" fill="none" strokeLinecap="round" />
      {/* Crescent detail */}
      <circle cx="90" cy="65" r="22" fill={c.bg} opacity="0.6" />
      {/* Face */}
      <circle cx="108" cy="68" r="5" fill="white" opacity="0.9" />
      <circle cx="108" cy="69" r="2.5" fill="#333" />
      <path d="M98 84 Q110 92 122 84" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8" />
    </g>
  );
}

// Hay (ه) — a big smiley face circle (هه is a laughing emoji!)
function HaySVG({ c }) {
  return (
    <g>
      {/* Big face circle */}
      <circle cx="100" cy="100" r="72" fill={c.body} />
      <circle cx="100" cy="100" r="60" fill={c.accent} opacity="0.4" />
      {/* Eyes */}
      <circle cx="78"  cy="85" r="10" fill="white" /><circle cx="122" cy="85" r="10" fill="white" />
      <circle cx="78"  cy="87" r="5"  fill="#333"  /><circle cx="122" cy="87" r="5"  fill="#333"  />
      {/* Shine in eyes */}
      <circle cx="82"  cy="83" r="2.5" fill="white" /><circle cx="126" cy="83" r="2.5" fill="white" />
      {/* Big smile */}
      <path d="M65 112 Q100 145 135 112" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* Cheeks */}
      <ellipse cx="68"  cy="118" rx="14" ry="8" fill="#FFAB91" opacity="0.6" />
      <ellipse cx="132" cy="118" rx="14" ry="8" fill="#FFAB91" opacity="0.6" />
    </g>
  );
}

// Yay (ي) — a flying bird with two dots below (ي in its isolated form has a swooping tail)
function YaySVG({ c }) {
  return (
    <g>
      {/* Wings */}
      <path d="M20 95 Q50 70 80 90 Q100 80 120 90 Q150 70 180 95"
        stroke={c.body} strokeWidth="14" fill="none" strokeLinecap="round" />
      {/* Body */}
      <ellipse cx="100" cy="95" rx="28" ry="18" fill={c.body} />
      {/* Tail swooping down-left */}
      <path d="M75 108 Q55 130 40 155 Q35 165 50 165 Q70 165 80 148"
        stroke={c.body} strokeWidth="12" fill="none" strokeLinecap="round" />
      {/* Head */}
      <circle cx="125" cy="82" r="16" fill={c.body} />
      {/* Eye */}
      <circle cx="130" cy="79" r="5" fill="white" /><circle cx="131" cy="80" r="2.5" fill="#333" />
      {/* Beak */}
      <polygon points="140,82 152,80 140,88" fill="#FFB300" />
      {/* Two dots below — like the dots of ي */}
      <circle cx="78"  cy="175" r="10" fill={c.shadow} />
      <circle cx="108" cy="175" r="10" fill={c.shadow} />
      <circle cx="78"  cy="173" r="4"  fill="white" opacity="0.5" />
      <circle cx="108" cy="173" r="4"  fill="white" opacity="0.5" />
    </g>
  );
}

// Hamza (ء) — a small cloud / wisp
function HamzaSVG({ c }) {
  return (
    <g>
      <ellipse cx="100" cy="100" rx="60" ry="45" fill={c.body} opacity="0.8" />
      <ellipse cx="75"  cy="90"  rx="40" ry="32" fill={c.body} />
      <ellipse cx="125" cy="90"  rx="38" ry="28" fill={c.body} />
      <ellipse cx="100" cy="80"  rx="30" ry="25" fill={c.accent} opacity="0.7" />
      <text x="100" y="108" textAnchor="middle" fontSize="40" fontFamily="Amiri,serif" fill="white" direction="rtl">ء</text>
    </g>
  );
}

// ── SVG map ───────────────────────────────────────────────────────────────────
const SVG_MAP = {
  'ا': AlifSVG,  'ب': BaSVG,   'ت': TaSVG,   'ث': ThaSVG,
  'ج': JimSVG,   'ح': HaSVG,   'خ': KhaSVG,
  'د': DalSVG,   'ذ': DhalSVG,
  'ر': RaSVG,    'ز': ZaySVG,
  'س': SeenSVG,  'ش': SheenSVG,
  'ص': SuaadSVG, 'ض': ZuaadSVG,
  'ط': ToeySVG,  'ظ': ZoeySVG,
  'ع': AinSVG,   'غ': GhainSVG,
  'ف': FaySVG,   'ق': QaafSVG,
  'ك': KaafSVG,  'ل': LaamSVG,  'م': MeemSVG, 'ن': NoonSVG,
  'و': WaaoSVG,  'ه': HaySVG,   'ء': HamzaSVG,'ي': YaySVG,
};

export function LetterIllustration({ letter, size = 160 }) {
  const c = LETTER_COLORS[letter.arabic] || { bg:'#F3F4F6', body:'#6B7280', accent:'#D1D5DB', shadow:'#374151' };
  const IllSVG = SVG_MAP[letter.arabic];

  return (
    <svg viewBox="0 0 200 200" width={size} height={size} xmlns="http://www.w3.org/2000/svg" style={{ display:'block' }}>
      {/* Card bg */}
      <rect x="4" y="4" width="192" height="192" rx="28" fill={c.bg} />
      <rect x="4" y="4" width="192" height="192" rx="28" fill="none" stroke={c.body} strokeWidth="3" opacity="0.3" />
      {IllSVG
        ? <IllSVG c={c} />
        : (
          <g>
            <text x="100" y="128" textAnchor="middle" fontSize="90" fontFamily="Amiri,serif" fill={c.body} direction="rtl">
              {letter.arabic}
            </text>
            <text x="30" y="55" fontSize="18" opacity="0.3">✨</text>
            <text x="155" y="165" fontSize="14" opacity="0.2">⭐</text>
          </g>
        )
      }
    </svg>
  );
}
