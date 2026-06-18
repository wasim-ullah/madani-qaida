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
  { id: 'bold',   icon: '🖊️', label: 'Bold',   width: 24 },
  { id: 'circle', icon: '⭕', label: 'Circle',  width: 6  },
  { id: 'eraser', icon: '🧹', label: 'Eraser',  width: 36 },
];

export function TeacherDrawingOverlay() {
  const { teacherMode } = useTeacherMarks();

  const canvasRef  = useRef(null);
  const isDrawing  = useRef(false);
  const startPos   = useRef({ x: 0, y: 0 });
  const snapshots  = useRef([]);   // undo history

  const [color,   setColor]   = useState('#EF4444');
  const [tool,    setTool]    = useState('marker');
  const [canUndo, setCanUndo] = useState(false);

  // Mirror tool/color into refs so event handlers always see the latest value
  const toolRef  = useRef(tool);
  const colorRef = useRef(color);
  useEffect(() => { toolRef.current  = tool;  }, [tool]);
  useEffect(() => { colorRef.current = color; }, [color]);

  // ── Size the canvas to match the viewport ──────────────────────────────────
  useEffect(() => {
    if (!teacherMode) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const fit = () => {
      const dpr = window.devicePixelRatio || 1;
      const w   = window.innerWidth;
      const h   = window.innerHeight;

      // Preserve existing drawing across resize
      const tmp = document.createElement('canvas');
      tmp.width  = canvas.width;
      tmp.height = canvas.height;
      tmp.getContext('2d').drawImage(canvas, 0, 0);

      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width  = w + 'px';
      canvas.style.height = h + 'px';

      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);
      ctx.drawImage(tmp, 0, 0, w, h);
    };

    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, [teacherMode]);

  // ── Clear canvas when teacher mode turns OFF ───────────────────────────────
  useEffect(() => {
    if (!teacherMode) {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      }
      snapshots.current = [];
      setCanUndo(false);
    }
  }, [teacherMode]);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const getXY = (e) => {
    if (e.touches && e.touches.length > 0) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };

  const snapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const data = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
    snapshots.current = [...snapshots.current.slice(-19), data];
    setCanUndo(true);
  };

  const strokeStyle = (ctx) => {
    ctx.lineCap  = 'round';
    ctx.lineJoin = 'round';
    if (toolRef.current === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
      ctx.lineWidth   = TOOLS.find(t => t.id === 'eraser').width;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = colorRef.current;
      ctx.lineWidth   = TOOLS.find(t => t.id === toolRef.current)?.width ?? 8;
    }
  };

  // ── Pointer / touch handlers attached directly to canvas via useEffect ──────
  // (Using addEventListener directly avoids React synthetic event pooling issues
  //  and ensures we always get the freshest handler without stale closures)
  useEffect(() => {
    if (!teacherMode) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onDown = (e) => {
      // Ignore toolbar touches (they stopPropagation, but just in case)
      if (e.target !== canvas) return;
      e.preventDefault();

      snapshot();
      isDrawing.current = true;
      const pos = getXY(e);
      startPos.current = pos;

      if (toolRef.current !== 'circle') {
        const ctx = canvas.getContext('2d');
        strokeStyle(ctx);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
      }
    };

    const onMove = (e) => {
      if (!isDrawing.current) return;
      e.preventDefault();
      const canvas = canvasRef.current;
      const ctx    = canvas.getContext('2d');
      const pos    = getXY(e);

      if (toolRef.current === 'circle') {
        // Restore last snapshot to show live ellipse preview
        const snaps = snapshots.current;
        if (snaps.length > 0) {
          ctx.putImageData(snaps[snaps.length - 1], 0, 0);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        const sx = startPos.current.x, sy = startPos.current.y;
        const rx = Math.max(Math.abs(pos.x - sx) / 2, 2);
        const ry = Math.max(Math.abs(pos.y - sy) / 2, 2);
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = colorRef.current;
        ctx.lineWidth   = 6;
        ctx.lineCap     = 'round';
        ctx.beginPath();
        ctx.ellipse((sx + pos.x) / 2, (sy + pos.y) / 2, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        strokeStyle(ctx);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
      }
    };

    const onUp = (e) => {
      if (!isDrawing.current) return;
      isDrawing.current = false;

      if (toolRef.current === 'circle') {
        // Commit final ellipse
        const canvas = canvasRef.current;
        const ctx    = canvas.getContext('2d');
        const pos    = getXY(e.changedTouches ? { clientX: e.changedTouches[0].clientX, clientY: e.changedTouches[0].clientY } : e);
        const snaps  = snapshots.current;
        if (snaps.length > 0) ctx.putImageData(snaps[snaps.length - 1], 0, 0);
        const sx = startPos.current.x, sy = startPos.current.y;
        const rx = Math.max(Math.abs(pos.x - sx) / 2, 2);
        const ry = Math.max(Math.abs(pos.y - sy) / 2, 2);
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = colorRef.current;
        ctx.lineWidth   = 6;
        ctx.lineCap     = 'round';
        ctx.beginPath();
        ctx.ellipse((sx + pos.x) / 2, (sy + pos.y) / 2, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      const ctx = canvasRef.current.getContext('2d');
      ctx.globalCompositeOperation = 'source-over';
      ctx.beginPath();
    };

    // Use both pointer and touch events for maximum compatibility
    canvas.addEventListener('pointerdown',  onDown,  { passive: false });
    canvas.addEventListener('pointermove',  onMove,  { passive: false });
    canvas.addEventListener('pointerup',    onUp,    { passive: false });
    canvas.addEventListener('pointercancel',onUp,    { passive: false });

    return () => {
      canvas.removeEventListener('pointerdown',   onDown);
      canvas.removeEventListener('pointermove',   onMove);
      canvas.removeEventListener('pointerup',     onUp);
      canvas.removeEventListener('pointercancel', onUp);
    };
  }, [teacherMode]); // re-attach only when mode changes

  const undo = () => {
    const canvas = canvasRef.current;
    if (!canvas || snapshots.current.length === 0) return;
    const last = snapshots.current[snapshots.current.length - 1];
    canvas.getContext('2d').putImageData(last, 0, 0);
    snapshots.current = snapshots.current.slice(0, -1);
    setCanUndo(snapshots.current.length > 0);
  };

  const clearAll = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    snapshots.current = [];
    setCanUndo(false);
  };

  if (!teacherMode) return null;

  return (
    <>
      {/* Full-viewport transparent canvas — sits above everything except toolbar */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          zIndex: 100,
          cursor: tool === 'eraser' ? 'cell' : 'crosshair',
          touchAction: 'none',
          // Toolbar needs pointer events — let them through via zIndex (toolbar is 9999)
          pointerEvents: 'auto',
        }}
      />

      {/* ── Floating toolbar — always above canvas ── */}
      <div
        style={{
          position: 'fixed',
          bottom: 'calc(env(safe-area-inset-bottom, 0px) + 70px)',
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
        <div
          onPointerDown={(e) => e.stopPropagation()}
          style={{
            display: 'flex', gap: 5,
            background: 'rgba(8,18,36,0.96)',
            backdropFilter: 'blur(20px)',
            borderRadius: 24,
            padding: '6px 10px',
            border: '1.5px solid rgba(255,255,255,0.2)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
          }}>
          {TOOLS.map(t => (
            <button
              key={t.id}
              onPointerDown={(e) => { e.stopPropagation(); setTool(t.id); }}
              style={{
                width: 44, height: 44, borderRadius: 12,
                background: tool === t.id ? color : 'rgba(255,255,255,0.1)',
                border: `2px solid ${tool === t.id ? color : 'rgba(255,255,255,0.15)'}`,
                fontSize: '20px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: tool === t.id ? `0 3px 12px ${color}70` : 'none',
                transition: 'all 0.15s',
                outline: 'none',
              }}
              title={t.label}
            >
              {t.icon}
            </button>
          ))}

          <div style={{ width: 1, background: 'rgba(255,255,255,0.2)', margin: '6px 3px' }} />

          <button
            onPointerDown={(e) => { e.stopPropagation(); undo(); }}
            style={{
              width: 44, height: 44, borderRadius: 12,
              background: canUndo ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
              border: '2px solid transparent',
              fontSize: '20px', cursor: canUndo ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: canUndo ? 1 : 0.3,
              outline: 'none',
            }}
            title="Undo"
          >↩️</button>

          <button
            onPointerDown={(e) => { e.stopPropagation(); clearAll(); }}
            style={{
              width: 44, height: 44, borderRadius: 12,
              background: 'rgba(239,68,68,0.2)',
              border: '2px solid rgba(239,68,68,0.5)',
              fontSize: '20px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              outline: 'none',
            }}
            title="Clear all"
          >🗑️</button>
        </div>

        {/* Color swatches */}
        <div
          onPointerDown={(e) => e.stopPropagation()}
          style={{
            display: 'flex', gap: 6,
            background: 'rgba(8,18,36,0.96)',
            backdropFilter: 'blur(20px)',
            borderRadius: 24,
            padding: '8px 12px',
            border: '1.5px solid rgba(255,255,255,0.2)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
          }}>
          {COLORS.map(c => (
            <button
              key={c.hex}
              onPointerDown={(e) => { e.stopPropagation(); setColor(c.hex); }}
              style={{
                width: 30, height: 30, borderRadius: '50%',
                background: c.hex,
                border: color === c.hex ? '3px solid white' : '2px solid rgba(255,255,255,0.25)',
                cursor: 'pointer',
                boxShadow: color === c.hex ? `0 0 0 2px ${c.hex}, 0 0 14px ${c.hex}90` : 'none',
                transition: 'all 0.12s',
                outline: 'none',
              }}
              title={c.name}
            />
          ))}
        </div>

        <div style={{
          fontSize: '10px', color: 'rgba(255,255,255,0.6)',
          fontFamily: 'Fredoka One, cursive', letterSpacing: 1,
          textTransform: 'uppercase',
          textShadow: '0 1px 4px rgba(0,0,0,0.8)',
        }}>
          🎓 Teacher Drawing Mode
        </div>
      </div>
    </>
  );
}
