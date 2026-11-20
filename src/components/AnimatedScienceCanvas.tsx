import React from "react";
import { motion } from "motion/react";

interface AnimatedScienceCanvasProps {
  reducedMotion: boolean;
  theme: "light" | "dark" | "high-contrast" | "sepia";
}

const PARTICLES = [
  { x: "8%", size: 10, dur: 14, delay: 0 },
  { x: "19%", size: 16, dur: 18, delay: 2 },
  { x: "31%", size: 8, dur: 12, delay: 4 },
  { x: "45%", size: 14, dur: 16, delay: 1 },
  { x: "58%", size: 18, dur: 20, delay: 3 },
  { x: "71%", size: 9, dur: 13, delay: 5 },
  { x: "84%", size: 15, dur: 17, delay: 2.5 },
  { x: "93%", size: 11, dur: 15, delay: 0.8 },
];

export const AnimatedScienceCanvas: React.FC<AnimatedScienceCanvasProps> = ({
  reducedMotion,
  theme,
}) => {
  // Keep High-Contrast and Sepia crystal-clean without visual clutter
  if (theme === "high-contrast") {
    return null;
  }

  const isDark = theme === "dark";
  const isSepia = theme === "sepia";

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      {/* 1. Light Mint-Green Flowing Gradient Background Layer */}
      {!isDark && !isSepia && (
        <div className="absolute inset-0 mint-animated-bg opacity-95" />
      )}
      {isDark && (
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 18% 20%, rgba(16, 185, 129, 0.16), transparent 45%), radial-gradient(circle at 82% 75%, rgba(14, 165, 233, 0.14), transparent 50%)",
          }}
        />
      )}

      {/* 2. Drifting Luminous Bubbles & Micro-Particles */}
      {PARTICLES.map((p, idx) => (
        <motion.div
          key={idx}
          className="absolute rounded-full"
          style={{
            left: p.x,
            bottom: "-30px",
            width: p.size,
            height: p.size,
            background: isDark
              ? "radial-gradient(circle, rgba(52,211,153,0.35), rgba(16,185,129,0.05))"
              : isSepia
              ? "radial-gradient(circle, rgba(15,118,110,0.16), transparent)"
              : "radial-gradient(circle, rgba(16,185,129,0.32), rgba(167,243,208,0.08))",
            boxShadow: isDark
              ? "0 0 12px rgba(52, 211, 153, 0.25)"
              : "0 0 14px rgba(16, 185, 129, 0.22)",
          }}
          animate={
            reducedMotion
              ? { y: -220, opacity: 0.35 }
              : {
                  y: [0, -950],
                  x: [0, idx % 2 === 0 ? 28 : -28, 0],
                  opacity: [0, 0.75, 0.65, 0],
                  scale: [0.8, 1.15, 0.9],
                }
          }
          transition={
            reducedMotion
              ? undefined
              : {
                  duration: p.dur,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        />
      ))}

      {/* 3. Ambient Floating & Rotating 3D-style Scientific Geometry */}
      {/* Top-right 3D Orbital Atom */}
      <motion.svg
        viewBox="0 0 140 140"
        className="hidden md:block absolute top-24 right-8 w-36 h-36 opacity-25"
        animate={
          reducedMotion
            ? undefined
            : {
                y: [0, -14, 0],
                rotate: [0, 360],
              }
        }
        transition={{
          y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 44, repeat: Infinity, ease: "linear" },
        }}
      >
        <ellipse cx="70" cy="70" rx="52" ry="20" fill="none" stroke="#059669" strokeWidth="2" />
        <ellipse cx="70" cy="70" rx="52" ry="20" transform="rotate(60 70 70)" fill="none" stroke="#0284C7" strokeWidth="2" />
        <ellipse cx="70" cy="70" rx="52" ry="20" transform="rotate(-60 70 70)" fill="none" stroke="#0D9488" strokeWidth="2" />
        <circle cx="70" cy="70" r="8" fill="#10B981" />
      </motion.svg>

      {/* Bottom-left Floating Isometric Polyhedron + DNA Ribbon */}
      <motion.svg
        viewBox="0 0 140 140"
        className="hidden md:block absolute bottom-14 left-10 w-32 h-32 opacity-22"
        animate={
          reducedMotion
            ? undefined
            : {
                y: [0, 16, 0],
                rotate: [-12, 12, -12],
                scale: [0.95, 1.05, 0.95],
              }
        }
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      >
        <polygon
          points="70,12 120,42 120,98 70,128 20,98 20,42"
          fill="rgba(16,185,129,0.12)"
          stroke="#0D9488"
          strokeWidth="2"
        />
        <line x1="70" y1="12" x2="70" y2="70" stroke="#0D9488" strokeWidth="1.6" />
        <line x1="120" y1="42" x2="70" y2="70" stroke="#0D9488" strokeWidth="1.6" />
        <line x1="20" y1="42" x2="70" y2="70" stroke="#0D9488" strokeWidth="1.6" />
        <line x1="70" y1="128" x2="70" y2="70" stroke="#0D9488" strokeWidth="1.6" />
      </motion.svg>

      {/* Mid-left Floating Hexagon Molecule */}
      <motion.svg
        viewBox="0 0 100 100"
        className="hidden lg:block absolute top-1/2 left-6 w-24 h-24 opacity-20"
        animate={
          reducedMotion
            ? undefined
            : {
                y: [-10, 12, -10],
                rotate: [0, -360],
              }
        }
        transition={{
          y: { duration: 8.5, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 38, repeat: Infinity, ease: "linear" },
        }}
      >
        <polygon
          points="50,10 85,30 85,70 50,90 15,70 15,30"
          fill="none"
          stroke="#059669"
          strokeWidth="2.2"
        />
        <circle cx="50" cy="10" r="4" fill="#10B981" />
        <circle cx="85" cy="70" r="4" fill="#0284C7" />
        <circle cx="15" cy="70" r="4" fill="#0D9488" />
      </motion.svg>
    </div>
  );
};
