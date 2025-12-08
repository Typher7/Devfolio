import React, { useEffect, useRef } from "react";

/**
 * FloatingLines background component inspired by React Bits "Floating Lines".
 * Props mirror the documented API for familiarity.
 */
export default function FloatingLines({
  linesGradient = ["#93c5fd", "#a5b4fc", "#67e8f9"],
  enabledWaves = ["top", "middle", "bottom"],
  lineCount = 6,
  lineDistance = 5,
  animationSpeed = 1,
  interactive = true,
  bendRadius = 10,
  bendStrength = -5,
  mouseDamping = 0.05,
  parallax = true,
  parallaxStrength = 0.2,
  mixBlendMode = "screen",
  className = "",
  style,
}) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const rafRef = useRef(null);
  const resizeRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const setSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setSize();
    resizeRef.current = () => {
      setSize();
    };
    window.addEventListener("resize", resizeRef.current);

    const waves = {
      top: { yFactor: 0.25, amp: 22, freq: 0.006 },
      middle: { yFactor: 0.5, amp: 32, freq: 0.005 },
      bottom: { yFactor: 0.75, amp: 26, freq: 0.0045 },
    };

    const draw = (timeMs) => {
      const time = (timeMs / 1000) * animationSpeed;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      ctx.clearRect(0, 0, w, h);

      // Mouse target smoothing
      mouseRef.current.tx += (mouseRef.current.x - mouseRef.current.tx) * mouseDamping;
      mouseRef.current.ty += (mouseRef.current.y - mouseRef.current.ty) * mouseDamping;

      enabledWaves.forEach((key, waveIndex) => {
        const conf = waves[key];
        const baseY = h * conf.yFactor;
        const amp = conf.amp;
        const freq = conf.freq;

        for (let i = 0; i < lineCount; i++) {
          const color = linesGradient[(waveIndex * lineCount + i) % linesGradient.length];
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.25;
          ctx.globalAlpha = 0.7;

          const offset = (i - Math.floor(lineCount / 2)) * lineDistance;
          const parallaxShift = parallax ? (mouseRef.current.tx - w / 2) * parallaxStrength * 0.5 : 0;

          ctx.beginPath();
          for (let x = 0; x <= w; x += 2) {
            const t = x * freq + time * 2 + i * 0.15;

            // Optional bending around mouse
            let bend = 0;
            if (interactive) {
              const dx = x - mouseRef.current.tx;
              const dy = baseY + offset - mouseRef.current.ty;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const falloff = Math.max(0, 1 - dist / (bendRadius * 20));
              bend = bendStrength * falloff;
            }

            const y = baseY + offset + Math.sin(t) * amp + bend + parallaxShift;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouseRef.current.x = canvas.clientWidth / 2;
      mouseRef.current.y = canvas.clientHeight / 2;
    };
    if (interactive || parallax) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseleave", onMouseLeave);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resizeRef.current);
      if (interactive || parallax) {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, [
    linesGradient,
    enabledWaves,
    lineCount,
    lineDistance,
    animationSpeed,
    interactive,
    bendRadius,
    bendStrength,
    mouseDamping,
    parallax,
    parallaxStrength,
    mixBlendMode,
  ]);

  return (
    <div className={className} style={{ position: "absolute", inset: 0, mixBlendMode, pointerEvents: "none", ...style }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

