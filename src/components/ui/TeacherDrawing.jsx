import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
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
  { id: 'marker', icon: '✏️', label: 'Marker', width: 8  },
  { id: 'bold',   icon: '🖊️', label: 'Bold',   width: 22 },
  { id: 'circle', icon: '⭕', label: 'Circle',  width: 6  },
  { id: 'eraser', icon: '🧹', label: 'Eraser',  width: 32 },
];

export function TeacherDrawingOverlay() {
  const { teacherMode } = useTeacherMarks();
  const canvasRef  = useRef(null);
  const drawing    = useRef(false);   // use ref not state — avoids stale closure
  const startPos   = useRef(null);
  const history    = useRef([]);      // ImageData snapshots for undo

  const [color, setColor] = useState(COLORS[0].hex);
  const [tool,  setTool]  = useState('marker');
  const [histLen, setHistLen] = useState(0); // just for undo button re-render

  // ── Resize canvas to fill parent, preserve drawing ──────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();

      // Snapshot existing pixels
      const tmp = document.createElement('canvas');
      tmp.width  = canvas.width;
      tmp.height = canvas.height;
      tmp.getContext('2d').drawImage(canvas, 0, 0);

      const dpr = window.devicePixelRatio || 1;
      canvas.width  = width  * dpr;
      canvas.height = height * dpr;
      canvas.style.width  = width  + 'px';
      canvas.style.height = height + 'px';

      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);
      ctx.drawImage(tmp, 0, 0, width, height);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    return () => ro.disconnect();
  }, []);

  // ── Clear canvas when teacher mode turns OFF ────────────────────────────────
  useEffect(() => {
    if (!teacherMode) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      history.current = [];
      setHistLen(0);
    }
  }, [teacherMode]);

  // ── Helpers ──────────────────────────────────────────────────────────────────
  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect   = canvas.getBoundingClientRect();
    const src    = e.touches ? e.touches[0] : e;
    return { x: src.clientX - rect.left, y: src.clientY - rect.top };
  };

  const saveSnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const snap = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
    history.current = [...history.current.slice(-19), snap];
    setHistLen(history.current.length);
  };

  const applyStrokeStyle = (ctx, currentTool, currentColor) => {
    ctx.lineCap  = 'round';
    ctx.lineJoin = 'round';
    if (currentTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
      ctx.lineWidth   = TOOLS.find(t => t.id === 'eraser').width;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = currentColor;
      ctx.lineWidth   = TOOLS.find(t => t.id === currentTool)?.width ?? 8;
    }
  };

  // ── Pointer handlers (use refs for tool/color to avoid stale closures) ───────
  const toolRef  = useRef(tool);
  const colorRef = useRef(color);
  useEffect(() => { toolRef.current  = tool;  }, [tool]);
  useEffect(() => { colorRef.current = color; }, [color]);

  const onPointerDown = useCallback((e) => {
    if (!teacherMode) return;
    // Ignore right-click / middle-click
    if (e.button !== undefined && e.button !== 0) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId); // keep events even if pointer leaves canvas

    saveSnapshot();
    drawing.current = true;
    startPos.current = getPos(e);

    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');

    if (toolRef.current !== 'circle') {
      applyStrokeStyle(ctx, toolRef.current, colorRef.current);
      ctx.beginPath();
      ctx.moveTo(startPos.current.x, startPos.current.y);
    }
  }, [teacherMode]);

  const onPointerMove = useCallback((e) => {
    if (!drawing.current) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    const pos    = getPos(e);

    if (toolRef.current === 'circle') {
      // Restore last snapshot for live preview
      if (history.current.length > 0) {
        ctx.putImageData(history.current[history.current.length - 1], 0, 0);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      const sx = startPos.current.x, sy = startPos.current.y;
      const rx = Math.max(Math.abs(pos.x - sx) / 2, 2);
      const ry = Math.max(Math.abs(pos.y - sy) / 2, 2);
      const cx = (sx + pos.x) / 2;
      const cy = (sy + pos.y) / 2;
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = colorRef.current;
      ctx.lineWidth   = TOOLS.find(t => t.id === 'circle').width;
      ctx.lineCap     = 'round';
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, 2 * Math.PI);
      ctx.stroke();
    } else {
      applyStrokeStyle(ctx, toolRef.current, colorRef.current);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    }
  }, []);

  const onPointerUp = useCallback((e) => {
    if (!drawing.current) return;
    e.preventDefault();
    drawing.current = false;

    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');

    // For circle: commit the final ellipse
    if (toolRef.current === 'circle' && startPos.current) {
      const pos = getPos(e);
      if (history.current.length > 0) {
        ctx.putImageData(history.current[history.current.length - 1], 0, 0);
      }
      const sx = startPos.current.x, sy = startPos.current.y;
      const rx = Math.max(Math.abs(pos.x - sx) / 2, 2);
      const ry = Math.max(Math.abs(pos.y - sy) / 2, 2);
      const cx = (sx + pos.x) / 2;
      const cy = (sy + pos.y) / 2;
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = colorRef.current;
      ctx.lineWidth   = TOOLS.find(t => t.id === 'circle').width;
      ctx.lineCap     = 'round';
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, 2 * Math.PI);
      ctx.stroke();
    }

    ctx.globalCompositeOperation = 'source-over';
    ctx.beginPath();
  }, []);

  const undo = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || history.current.length === 0) return;
    const last = history.current[history.current.length - 1];
    canvas.getContext('2d').putImageData(last, 0, 0);
    history.current = history.current.slice(0, -1);
    setHistLen(history.current.length);
  }, []);

  const clearAll = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    history.current = [];
    setHistLen(0);
  }, []);

  if (!teacherMode) return null;

  return (
    <>
      {/* Drawing canvas — sits over page content */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 30,
          cursor: tool === 'eraser' ? 'cell' : 'crosshair',
          touchAction: 'none',
          pointerEvents: 'auto',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      />

      {/* ── Floating toolbar ── */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        style={{
          position: 'fixed',
          bottom: 'calc(56px + env(safe-area-inset-bottom, 0px) + 10px)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          pointerEvents: 'auto',
        }}
      >
        {/* Tools row */}
        <div style={{
          display: 'flex', gap: 5,
          background: 'rgba(10,20,40,0.95)',
          backdropFilter: 'blur(16px)',
          borderRadius: 24,
          padding: '6px 10px',
          border: '1.5px solid rgba(255,255,255,0.18)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }}>
          {TOOLS.map(t => (
            <motion.button key={t.id}
              onPointerDown={(e) => { e.stopPropagation(); setTool(t.id); }}
              whileTap={{ scale: 0.85 }}
              style={{
                width: 42, height: 42, borderRadius: 12,
                background: tool === t.id
                  ? `linear-gradient(135deg, ${color}, ${color}cc)`
                  : 'rgba(255,255,255,0.1)',
                border: tool === t.id ? `2px solid ${color}` : '2px solid rgba(255,255,255,0.15)',
                fontSize: '18px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: tool === t.id ? `0 3px 10px ${color}60` : 'none',
                transition: 'all 0.15s',
              }}
              title={t.label}
            >
              {t.icon}
            </motion.button>
          ))}

          <div style={{ width: 1, background: 'rgba(255,255,255,0.2)', margin: '6px 3px' }} />

          {/* Undo */}
          <motion.button
            onPointerDown={(e) => { e.stopPropagation(); undo(); }}
            whileTap={{ scale: 0.85 }}
            style={{
              width: 42, height: 42, borderRadius: 12,
              background: histLen > 0 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
              border: '2px solid transparent', fontSize: '18px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: histLen > 0 ? 1 : 0.3,
            }}
            title="Undo">
            ↩️
          </motion.button>

          {/* Clear */}
          <motion.button
            onPointerDown={(e) => { e.stopPropagation(); clearAll(); }}
            whileTap={{ scale: 0.85 }}
            style={{
              width: 42, height: 42, borderRadius: 12,
              background: 'rgba(239,68,68,0.2)',
              border: '2px solid rgba(239,68,68,0.5)',
              fontSize: '18px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            title="Clear all">
            🗑️
          </motion.button>
        </div>

        {/* Color swatches */}
        <div style={{
          display: 'flex', gap: 5,
          background: 'rgba(10,20,40,0.95)',
          backdropFilter: 'blur(16px)',
          borderRadius: 24,
          padding: '7px 12px',
          border: '1.5px solid rgba(255,255,255,0.18)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }}>
          {COLORS.map(c => (
            <motion.button key={c.hex}
              onPointerDown={(e) => { e.stopPropagation(); setColor(c.hex); }}
              whileTap={{ scale: 0.8 }}
              style={{
                width: 28, height: 28, borderRadius: '50%',
                background: c.hex,
                border: color === c.hex ? '3px solid white' : '2px solid rgba(255,255,255,0.25)',
                cursor: 'pointer',
                boxShadow: color === c.hex ? `0 0 0 2px ${c.hex}, 0 0 14px ${c.hex}90` : 'none',
                transition: 'all 0.12s',
              }}
              title={c.name}
            />
          ))}
        </div>

        {/* Label */}
        <div style={{
          fontSize: '10px', color: 'rgba(255,255,255,0.55)',
          fontFamily: 'Fredoka One, cursive', letterSpacing: 1,
          textTransform: 'uppercase',
        }}>
          🎓 Teacher Drawing Mode
        </div>
      </motion.div>
    </>
  );
}
