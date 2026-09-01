/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

interface DamaliLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showText?: boolean;
  animated?: boolean;
}

export const DamaliLogo: React.FC<DamaliLogoProps> = ({
  className = '',
  size = 'md',
  showText = false,
  animated = false,
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-20 h-20 sm:w-24 sm:h-24',
    xl: 'w-28 h-28 sm:w-36 sm:h-36',
    hero: 'w-36 h-36 sm:w-44 sm:h-44'
  };

  const boxClass = sizeMap[size] || sizeMap.md;
  const viewBox = showText ? "40 25 320 310" : "55 25 270 248";

  const svgContent = (
    <svg
      viewBox={viewBox}
      className="w-full h-full object-contain overflow-visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Dynamic gradient for the primary D curve and leaves */}
        <linearGradient id="damaliDynamicGrad" x1="10%" y1="10%" x2="90%" y2="90%">
          <stop offset="0%" className="[stop-color:#2563eb] dark:[stop-color:#38bdf8]" stopColor="#1E40AF" />
          <stop offset="45%" className="[stop-color:#1e40af] dark:[stop-color:#2563eb]" stopColor="#1E3A8A" />
          <stop offset="100%" className="[stop-color:#0f172a] dark:[stop-color:#1e3a8a]" stopColor="#0F172A" />
        </linearGradient>

        {/* 3D bevel and face highlight */}
        <linearGradient id="damaliBevel" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" className="[stop-color:#3b82f6] dark:[stop-color:#60a5fa]" stopColor="#2563EB" />
          <stop offset="50%" className="[stop-color:#1d4ed8] dark:[stop-color:#3b82f6]" stopColor="#1D4ED8" />
          <stop offset="100%" className="[stop-color:#0f2854] dark:[stop-color:#1e40af]" stopColor="#0F2854" />
        </linearGradient>

        {/* Stem 3D pillar gradient */}
        <linearGradient id="damaliStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" className="[stop-color:#0f254c] dark:[stop-color:#1e3a8a]" stopColor="#0F254C" />
          <stop offset="100%" className="[stop-color:#1e40af] dark:[stop-color:#3b82f6]" stopColor="#1E40AF" />
        </linearGradient>
      </defs>

      <g id="damali-d-symbol" className="filter drop-shadow-sm">
        {/* Botanical top leaf */}
        <path
          d="M 152 92 C 140 62, 158 35, 185 52 C 190 75, 172 98, 152 92 Z"
          fill="url(#damaliDynamicGrad)"
        />
        
        {/* Leftward pointed main leaf */}
        <path
          d="M 175 104 C 130 96, 95 82, 70 106 C 110 126, 142 120, 175 104 Z"
          fill="url(#damaliDynamicGrad)"
        />
        {/* Left leaf spine highlight */}
        <path
          d="M 70 106 C 110 108, 140 106, 172 104"
          stroke="#60A5FA"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Lower small droplet leaf */}
        <path
          d="M 158 126 C 174 118, 198 124, 194 138 C 170 144, 150 134, 158 126 Z"
          fill="url(#damaliDynamicGrad)"
        />

        {/* Upper arc orbital dots */}
        <circle cx="196" cy="86" r="6.8" fill="url(#damaliDynamicGrad)" />
        <circle cx="222" cy="85" r="7.4" fill="url(#damaliDynamicGrad)" />
        <circle cx="248" cy="92" r="7.2" fill="url(#damaliDynamicGrad)" />
        <circle cx="274" cy="106" r="7.4" fill="url(#damaliDynamicGrad)" />

        {/* Inner arc cascade dots */}
        <circle cx="214" cy="128" r="6.6" fill="url(#damaliDynamicGrad)" />
        <circle cx="228" cy="148" r="6.6" fill="url(#damaliDynamicGrad)" />
        <circle cx="236" cy="172" r="6.6" fill="url(#damaliDynamicGrad)" />

        {/* Stylized 3D letter 'D' pillar */}
        <path
          d="M 120 132 L 168 138 L 168 250 L 120 250 Z"
          fill="url(#damaliStemGrad)"
        />
        {/* Pillar side 3D edge */}
        <path
          d="M 94 258 L 120 250 L 120 132 L 94 136 Z"
          className="fill-slate-950 dark:fill-blue-950"
          fill="#061224"
        />
        {/* Base bottom stand */}
        <path
          d="M 92 258 L 195 258 L 195 250 L 92 250 Z"
          className="fill-slate-950 dark:fill-blue-950"
          fill="#061224"
        />

        {/* Sweeping outer loop of the D */}
        <path
          d="M 150 106 C 220 95, 298 120, 304 182 C 310 242, 245 258, 170 258 C 235 258, 275 238, 268 185 C 260 136, 205 120, 150 124 Z"
          fill="url(#damaliDynamicGrad)"
        />
        {/* Outer loop 3D bevel / reflection */}
        <path
          d="M 165 106 C 235 96, 304 125, 304 185 C 304 242, 248 258, 175 258 C 232 258, 274 235, 270 188 C 265 142, 218 122, 165 122 Z"
          fill="url(#damaliBevel)"
        />
      </g>

      {/* Brand Text if requested */}
      {showText && (
        <g id="damali-wordmark">
          <text
            x="190"
            y="312"
            textAnchor="middle"
            className="fill-slate-900 dark:fill-white transition-colors duration-300 font-black tracking-widest text-[36px]"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
          >
            DAMALI
          </text>
        </g>
      )}
    </svg>
  );

  if (animated) {
    return (
      <motion.div
        animate={{
          filter: [
            'brightness(0.85) drop-shadow(0 0 6px rgba(37, 99, 235, 0.25))',
            'brightness(1.25) drop-shadow(0 0 24px rgba(56, 189, 248, 0.8))',
            'brightness(0.85) drop-shadow(0 0 6px rgba(37, 99, 235, 0.25))'
          ],
          scale: [0.97, 1.04, 0.97]
        }}
        transition={{
          repeat: Infinity,
          duration: 3.2,
          ease: 'easeInOut'
        }}
        className={`${boxClass} ${className} flex items-center justify-center`}
      >
        {svgContent}
      </motion.div>
    );
  }

  return (
    <div className={`${boxClass} ${className} flex items-center justify-center`}>
      {svgContent}
    </div>
  );
};
