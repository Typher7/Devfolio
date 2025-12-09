import React, { useRef, useEffect } from "react";

export default function Prism({
  animationType = "rotate",
  timeScale = 1,
  height = 3,
  baseWidth = 6,
  scale = 4,
  hueShift = 0,
  colorFrequency = 1,
  noise = 0.5,
  glow = 1,
  className = "",
}) {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let time = 0;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const drawPrism = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);

      // Clear canvas
      ctx.clearRect(0, 0, w, h);

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, "rgba(0, 0, 0, 0.05)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      const centerX = w / 2;
      const centerY = h / 2;

      // Draw animated prism effect
      const numShapes = 12;
      for (let i = 0; i < numShapes; i++) {
        const angle = (i / numShapes) * Math.PI * 2;
        const radius = scale * 20;

        let x, y, rotation;
        if (animationType === "rotate") {
          rotation = time * timeScale + angle;
          x = centerX + Math.cos(rotation) * radius;
          y = centerY + Math.sin(rotation) * radius;
        } else if (animationType === "wave") {
          x = centerX + Math.cos(angle) * radius;
          y =
            centerY +
            Math.sin(angle) * radius +
            Math.sin(time * timeScale + i) * 30;
          rotation = angle;
        } else {
          x =
            centerX +
            Math.cos(angle) * (radius + Math.sin(time * timeScale + i) * 20);
          y =
            centerY +
            Math.sin(angle) * (radius + Math.cos(time * timeScale + i) * 20);
          rotation = angle;
        }

        // Calculate color
        const hue =
          ((i / numShapes) * 360 * colorFrequency + hueShift + time * 20) % 360;
        const saturation = 70 + Math.sin(time + i) * 10;
        const lightness = 50 + Math.cos(time * 0.5 + i) * 10;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);

        // Draw shape with glow
        if (glow > 0) {
          ctx.shadowBlur = 20 * glow;
          ctx.shadowColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.8)`;
        }

        // Add noise
        const noiseOffset = noise > 0 ? (Math.random() - 0.5) * noise * 5 : 0;

        // Draw polygon
        ctx.beginPath();
        const sides = 6;
        for (let j = 0; j < sides; j++) {
          const a = (j / sides) * Math.PI * 2;
          const r = baseWidth * 3 + noiseOffset;
          const px = Math.cos(a) * r;
          const py = (Math.sin(a) * r * height) / 3;
          if (j === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();

        const shapeGradient = ctx.createRadialGradient(
          0,
          0,
          0,
          0,
          0,
          baseWidth * 3
        );
        shapeGradient.addColorStop(
          0,
          `hsla(${hue}, ${saturation}%, ${lightness + 20}%, 0.8)`
        );
        shapeGradient.addColorStop(
          1,
          `hsla(${hue}, ${saturation}%, ${lightness}%, 0.3)`
        );
        ctx.fillStyle = shapeGradient;
        ctx.fill();

        ctx.restore();
      }

      time += 0.01;
      animationFrameRef.current = requestAnimationFrame(drawPrism);
    };

    drawPrism();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    animationType,
    timeScale,
    height,
    baseWidth,
    scale,
    hueShift,
    colorFrequency,
    noise,
    glow,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
