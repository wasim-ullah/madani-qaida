import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTeacherMarks } from '../../hooks/useTeacherMarks';

const COLORS = [
  { name: 'Red',    hex: '#EF4444' },
  { name: 'Orange', hex: '#F97316' },
  { name: 'Yellow', hex: '#EAB308' },
  { name: 'Green',  hex: '#22C55E' },
  { name: 'Blue',   hex: '#3B82F6' },
  { name: 'Purple', hex: '#A855F7' },
  { name: 'White',  hex: '#FFFFFF' },
  { name: 'Black',  hex: '#1E293B' },
];

const TOOLS = [
  { id: 'marker', icon: '✏️', label: 'Marker', width: 10 },
  { id: 'bold',   icon: '🖊️', label: 'Bold',   width: 22 },
  { id: 'circle', icon: '⭕', label: 'Circle',  width: 10 },
  { id: 'eraser', icon: '🧹', label: 'Eraser',  width: 28 },
];

export function TeacherDrawingOverlay() {
  const { teacherMode } = useTeacherMarks();
  const canvasRef   = useRef(null);
  const [drawing, setDrawing]   = useState(false);
  const [color, setColor]       = useState(COLORS[0].hex);
  const [tool, setTool]         = useState('marker');
  const [history, setHistory]   = useState([]);  // array of ImageData snapshots
  const startPos = useRef(null);

  // Resize canvas to fill its parent on mount and resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      // Preserve existing drawing during resize
      const tmp = document.createElement('canvas');
      tmp.width  = canvas.width;
      tmp.height = canvas.height;
      tmp.getContext('2d').drawImage(canvas, 0, 0);

      canvas.width  = width  * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width  = width  + 'px';
      canvas.style.height = height + 'px';
      const ctx = canvas.getContext('2d');
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      ctx.drawImage(tmp, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    return () => ro.disconnect();
  }, []);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const src  = e.touches ? e.touches[0] : e;
    return {
      x: (src.clientX - rect.left),
      y: (src.clientY - rect.top),
    };
  };

  const saveSnapshot = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    setHistory(h => [...h.slice(-19), ctx.getImageData(0, 0, canvas.width, canvas.height)]);
  }, []);

  const startDraw = useCallback((e) => {
    if (!teacherMode) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    saveSnapshot();
    const pos = getPos(e, canvas);
    startPos.current = pos;
    setDrawing(true);

    const ctx = canvas.getContext('2d');
    ctx.lineCap    = 'round';
    ctx.lineJoin   = 'round';

    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
      ctx.lineWidth   = TOOLS.find(t => t.id === 'eraser').width;
    } else if (tool === 'circle') {
      // Circle is drawn on pointerup, not here
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = color;
      ctx.lineWidth   = TOOLS.find(t => t.id === tool)?.width ?? 10;
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    }
  }, [teacherMode, tool, color, saveSnapshot]);

  const draw = useCallback((e) => {
    if (!drawing || !teacherMode) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const pos = getPos(e, canvas);

    if (tool === 'circle') {
      // Show preview — restore last snapshot then draw preview circle
      if (history.length > 0) {
        ctx.putImageData(history[history.length - 1], 0, 0);
      }
      const sx = startPos.current.x, sy = startPos.current.y;
      const rx = Math.abs(pos.x - sx) / 2;
      const ry = Math.abs(pos.y - sy) / 2;
      const cx = (sx + pos.x) / 2;
      const cy = (sy + pos.y) / 2;
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = color;
      ctx.lineWidth   = 8;
      ctx.lineCap     = 'round';
      ctx.beginPath();
      ctx.ellipse(cx, cy, Math.max(rx, 4), Math.max(ry, 4), 0, 0, 2 * Math.PI);
      ctx.stroke();
      return;
    }

    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = TOOLS.find(t => t.id === 'eraser').width;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = color;
      ctx.lineWidth   = TOOLS.find(t => t.id === tool)?.width ?? 10;
    }

    ctx.lineCap  = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }, [drawing, teacherMode, tool, color, history]);

  const endDraw = useCallback((e) => {
    if (!drawing) return;
    e.preventDefault();
    setDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'source-over';
    ctx.beginPath();
  }, [drawing]);

  const undo = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || history.length === 0) return;
    const ctx = canvas.getContext('2d');
    const last = history[history.length - 1];
    ctx.putImageData(last, 0, 0);
    setHistory(h => h.slice(0, -1));
  }, [history]);

  const clearAll = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHistory([]);
  }, []);

  if (!teacherMode) return null;

  return (
    <>
      {/* Drawing canvas — sits over content, below toolbar */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 30,
          cursor: tool === 'eraser' ? 'cell' : 'crosshair',
          touchAction: 'none',
          pointerEvents: teacherMode ? 'auto' : 'none',
        }}
        onPointerDown={startDraw}
        onPointerMove={draw}
        onPointerUp={endDraw}
        onPointerLeave={endDraw}
      />

      {/* ── Floating toolbar ── */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        style={{
          position: 'fixed',
          bottom: 'calc(56px + env(safe-area-inset-bottom, 0px) + 8px)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          pointerEvents: 'auto',
        }}
      >
        {/* Tools row */}
        <div style={{
          display: 'flex',
          gap: 6,
          background: 'rgba(15,25,45,0.92)',
          backdropFilter: 'blur(12px)',
          borderRadius: 24,
          padding: '6px 10px',
          border: '1.5px solid rgba(255,255,255,0.15)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}>
          {TOOLS.map(t => (
            <motion.button key={t.id}
              onClick={() => setTool(t.id)}
              whileTap={{ scale: 0.88 }}
              style={{
                width: 40, height: 40, borderRadius: 12,
                background: tool === t.id ? color : 'rgba(255,255,255,0.1)',
                border: tool === t.id ? `2px solid ${color}` : '2px solid transparent',
                fontSize: '18px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s',
              }}
              title={t.label}
            >
              {t.icon}
            </motion.button>
          ))}

          {/* Divider */}
          <div style={{ width: 1, background: 'rgba(255,255,255,0.2)', margin: '4px 2px' }} />

          {/* Undo */}
          <motion.button onClick={undo} whileTap={{ scale: 0.88 }}
            style={{
              width: 40, height: 40, borderRadius: 12,
              background: history.length > 0 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
              border: '2px solid transparent', fontSize: '18px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: history.length > 0 ? 1 : 0.3,
            }}
            title="Undo">
            ↩️
          </motion.button>

          {/* Clear */}
          <motion.button onClick={clearAll} whileTap={{ scale: 0.88 }}
            style={{
              width: 40, height: 40, borderRadius: 12,
              background: 'rgba(239,68,68,0.2)',
              border: '2px solid rgba(239,68,68,0.4)',
              fontSize: '18px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            title="Clear all">
            🗑️
          </motion.button>
        </div>

        {/* Color swatches row */}
        <div style={{
          display: 'flex',
          gap: 6,
          background: 'rgba(15,25,45,0.92)',
          backdropFilter: 'blur(12px)',
          borderRadius: 24,
          padding: '6px 10px',
          border: '1.5px solid rgba(255,255,255,0.15)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}>
          {COLORS.map(c => (
            <motion.button key={c.hex}
              onClick={() => setColor(c.hex)}
              whileTap={{ scale: 0.85 }}
              style={{
                width: 28, height: 28, borderRadius: '50%',
                background: c.hex,
                border: color === c.hex ? '3px solid white' : '2px solid rgba(255,255,255,0.3)',
                cursor: 'pointer',
                boxShadow: color === c.hex ? `0 0 0 2px ${c.hex}, 0 0 12px ${c.hex}80` : 'none',
                transition: 'all 0.15s',
              }}
              title={c.name}
            />
          ))}
        </div>

        {/* Mode label */}
        <div style={{
          fontSize: '10px',
          color: 'rgba(255,255,255,0.5)',
          fontFamily: 'Fredoka One, cursive',
          letterSpacing: 1,
          textTransform: 'uppercase',
        }}>
          🎓 Teacher Drawing Mode
        </div>
      </motion.div>
    </>
  );
}
