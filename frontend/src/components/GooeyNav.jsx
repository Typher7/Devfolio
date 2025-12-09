import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * GooeyNav: a minimal gooey-style nav inspired by React Bits Gooey Nav.
 * Props:
 * - items: Array<{ label: string; to: string }>
 * - animationTime?: number (ms)
 */
export default function GooeyNav({
  items = [],
  animationTime = 600,
  className = "",
  containerClassName = "relative flex items-center gap-2 py-2 px-2 rounded-full bg-white/60 ring-1 ring-white/30 backdrop-blur",
  blobClassName = "pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-indigo-600/80",
  itemClassName = "relative z-10 px-4 py-2 text-sm font-medium transition-colors text-slate-700 hover:text-indigo-700",
  activeItemClassName = "text-white",
  // Particle props (inspired by React Bits Gooey Nav)
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0,
}) {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const blobRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const [hoverIndex, setHoverIndex] = useState(null);
  const location = useLocation();
  const particlesRef = useRef(null);

  useEffect(() => {
    const idx = items.findIndex((it) => location.pathname === it.to);
    // Only set active if we found a match, otherwise set to -1 (no active state)
    setActiveIndex(idx >= 0 ? idx : -1);
  }, [location.pathname, items]);

  const positionBlob = () => {
    const container = containerRef.current;
    const blob = blobRef.current;
    if (!container || !blob) return;
    const index = hoverIndex !== null ? hoverIndex : activeIndex;
    // Hide blob if no active index
    if (index < 0) {
      blob.style.opacity = "0";
      return;
    }
    blob.style.opacity = "1";
    const target = itemRefs.current[index];
    if (!target) return;
    const cRect = container.getBoundingClientRect();
    const tRect = target.getBoundingClientRect();
    const left = tRect.left - cRect.left + tRect.width / 2;
    blob.style.transform = `translateX(${left}px)`;
    blob.style.width = `${Math.max(80, tRect.width + 28)}px`;
    blob.style.height = `42px`;
  };

  useLayoutEffect(() => {
    positionBlob();
  }, [activeIndex, hoverIndex, items.length]);

  useEffect(() => {
    const onResize = () => positionBlob();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const colorMap = {
    1: "#60a5fa", // indigo-400-ish
    2: "#a78bfa", // violet-400-ish
    3: "#34d399", // emerald-400
    4: "#f59e0b", // amber-500
  };

  const spawnParticles = () => {
    const container = containerRef.current;
    const target = itemRefs.current[activeIndex];
    const host = particlesRef.current;
    if (!container || !target || !host) return;

    const cRect = container.getBoundingClientRect();
    const tRect = target.getBoundingClientRect();
    const cx = tRect.left - cRect.left + tRect.width / 2;
    const cy = cRect.height / 2; // vertically centered

    const [outer, inner] = particleDistances;
    const total = particleCount;

    for (let i = 0; i < total; i++) {
      const el = document.createElement("span");
      const colorIdx = colors[i % colors.length];
      el.style.position = "absolute";
      el.style.left = `${cx}px`;
      el.style.top = `${cy}px`;
      const size = Math.max(3, Math.round(Math.random() * 6));
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.borderRadius = "9999px";
      el.style.background = colorMap[colorIdx] || "#93c5fd";
      el.style.opacity = "0.85";
      el.style.pointerEvents = "none";
      el.style.transform = "translate(-50%, -50%) scale(1)";
      el.style.willChange = "transform, opacity";

      const angle = Math.random() * Math.PI * 2;
      const radius = inner + Math.random() * (outer - inner);
      const tx = Math.cos(angle) * radius;
      const ty = Math.sin(angle) * radius * (Math.random() * 0.6 + 0.7);

      const duration =
        animationTime + Math.round((Math.random() - 0.5) * timeVariance);
      el.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;

      host.appendChild(el);
      // Next frame move outwards
      requestAnimationFrame(() => {
        el.style.transform = `translate(${tx - 50}px, ${ty - 50}px) scale(${
          0.9 + Math.random() * 0.3
        })`;
        el.style.opacity = "0";
      });

      // Cleanup
      setTimeout(() => {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, duration + 50);
    }
  };

  useEffect(() => {
    spawnParticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  return (
    <div className={`relative ${className}`}>
      <svg
        className="absolute -z-10"
        style={{ width: 0, height: 0 }}
        aria-hidden="true"
      >
        <filter id="gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </svg>

      <div
        ref={containerRef}
        className={containerClassName}
        style={{ position: "relative" }}
      >
        {/* Gooey layer: blob + particles (filtered) */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ filter: "url(#gooey)" }}
        >
          <div
            ref={blobRef}
            className={blobClassName}
            style={{
              transition: `transform ${animationTime}ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms ease`,
              opacity: 1,
            }}
          />
          <div
            ref={particlesRef}
            className="pointer-events-none absolute inset-0"
          />
        </div>

        {/* Items */}
        {items.map((item, i) => (
          <Link
            key={item.to}
            ref={(el) => (itemRefs.current[i] = el)}
            to={item.to}
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
            className={`${itemClassName} ${
              i === activeIndex ? activeItemClassName : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
