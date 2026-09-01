/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Brand } from '../../types';

interface BrandLogoProps {
  brand: Brand;
  className?: string;
}

/**
 * High-precision vector fallback in case of rendering needs
 */
export const BrandVectorFallback: React.FC<{ brandId: string; name: string }> = ({ brandId, name }) => {
  switch (brandId) {
    case 'coca-cola':
      return (
        <svg className="w-full h-8 max-h-8" viewBox="0 0 160 44" fill="none">
          <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fill="#E61A27" fontFamily="'Playfair Display', Georgia, cursive, serif" fontStyle="italic" fontWeight="900" fontSize="26" letterSpacing="-0.8">
            Coca-Cola
          </text>
        </svg>
      );
    case 'sprite':
      return (
        <svg className="w-full h-8 max-h-8" viewBox="0 0 150 44" fill="none">
          <rect x="8" y="4" width="134" height="36" rx="18" fill="#008B45" />
          <text x="46%" y="62%" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontStyle="italic" fontWeight="900" fontSize="20">
            Sprite
          </text>
          <polygon points="114,8 118,17 128,18 120,24 123,34 114,28 105,34 108,24 100,18 110,17" fill="#FFDE00" />
        </svg>
      );
    case 'fanta':
      return (
        <svg className="w-full h-8 max-h-8" viewBox="0 0 150 44" fill="none">
          <circle cx="75" cy="22" r="18" fill="#FF8300" />
          <path d="M 75 4 C 82 4, 88 8, 86 14 C 80 14, 76 12, 75 4 Z" fill="#2BA756" />
          <text x="50%" y="64%" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="15" letterSpacing="-0.5">
            FANTA
          </text>
        </svg>
      );
    case 'frooti':
      return (
        <svg className="w-full h-8 max-h-8" viewBox="0 0 150 44" fill="none">
          <rect x="10" y="4" width="130" height="36" rx="8" fill="#FFC700" stroke="#F5B300" strokeWidth="1.5" />
          <text x="48%" y="64%" dominantBaseline="middle" textAnchor="middle" fill="#1C1814" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="19" letterSpacing="1.8">
            FROOTI
          </text>
          <circle cx="122" cy="12" r="3.5" fill="#008836" />
        </svg>
      );
    case 'appy':
      return (
        <svg className="w-full h-8 max-h-8" viewBox="0 0 150 44" fill="none">
          <circle cx="28" cy="22" r="12" fill="#D32F2F" />
          <path d="M 28 10 C 31 8, 36 7, 36 12 C 32 13, 29 13, 28 10 Z" fill="#2E7D32" />
          <text x="82" y="27" dominantBaseline="middle" textAnchor="middle" fill="#D32F2F" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="24" letterSpacing="-0.5">
            appy
          </text>
        </svg>
      );
    case 'fizz':
      return (
        <svg className="w-full h-8 max-h-8" viewBox="0 0 150 44" fill="none">
          <rect x="6" y="3" width="138" height="38" rx="8" fill="#0D0D0D" />
          <circle cx="26" cy="22" r="11" fill="#E50914" />
          <circle cx="23" cy="19" r="2" fill="#FFE082" />
          <circle cx="29" cy="24" r="2.5" fill="#FFE082" />
          <text x="58" y="22" dominantBaseline="middle" fill="#FF3B30" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="12">appy</text>
          <text x="96" y="23" dominantBaseline="middle" fill="#FFFFFF" fontFamily="Impact, Arial Black, sans-serif" fontWeight="900" fontSize="18" letterSpacing="1">FIZZ</text>
        </svg>
      );
    case 'blue-star':
      return (
        <svg className="w-full h-8 max-h-8" viewBox="0 0 150 44" fill="none">
          <polygon points="22,6 26,17 38,17 28,24 32,35 22,28 12,35 16,24 6,17 18,17" fill="#004F9F" />
          <text x="88" y="25" dominantBaseline="middle" textAnchor="middle" fill="#004F9F" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="16" letterSpacing="1.5">
            BLUE STAR
          </text>
        </svg>
      );
    case 'lg':
      return (
        <svg className="w-full h-8 max-h-8" viewBox="0 0 150 44" fill="none">
          <g transform="translate(30, 4)">
            <circle cx="18" cy="18" r="17" stroke="#A50034" strokeWidth="2.8" fill="none" />
            <circle cx="11" cy="13" r="2.2" fill="#A50034" />
            <path d="M 18 8 L 18 21 L 27 21" stroke="#A50034" strokeWidth="2.8" strokeLinecap="round" fill="none" />
          </g>
          <text x="95" y="29" dominantBaseline="middle" textAnchor="middle" fill="#231F20" fontFamily="sans-serif" fontWeight="900" fontSize="26">
            LG
          </text>
        </svg>
      );
    case 'samsung':
      return (
        <svg className="w-full h-8 max-h-8" viewBox="0 0 155 44" fill="none">
          <ellipse cx="77.5" cy="22" rx="72" ry="18" fill="#034EA2" transform="rotate(-4 77.5 22)" />
          <text x="50%" y="61%" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="15" letterSpacing="3.5">
            SAMSUNG
          </text>
        </svg>
      );
    case 'panasonic':
      return (
        <svg className="w-full h-8 max-h-8" viewBox="0 0 150 44" fill="none">
          <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fill="#004098" fontFamily="sans-serif" fontWeight="900" fontSize="20" letterSpacing="1.2">
            Panasonic
          </text>
        </svg>
      );
    case 'red-bull':
      return (
        <svg className="w-full h-8 max-h-8" viewBox="0 0 150 44" fill="none">
          <circle cx="75" cy="18" r="14" fill="#FFCC00" />
          <text x="50%" y="37" dominantBaseline="middle" textAnchor="middle" fill="#00205B" fontFamily="sans-serif" fontWeight="900" fontSize="10" letterSpacing="1.8">
            RED BULL
          </text>
        </svg>
      );
    default:
      return (
        <div className="flex items-center justify-center h-8">
          <span className="font-display text-sm font-black tracking-wide text-slate-800">
            {name}
          </span>
        </div>
      );
  }
};

export const BrandLogo: React.FC<BrandLogoProps> = ({ brand, className = "" }) => {
  const [hasError, setHasError] = useState(false);
  const logoUrl = brand.officialLogoUrl || `/logos/${brand.id}.svg`;

  return (
    <div className={`relative flex items-center justify-center p-2 rounded-xl bg-white dark:bg-white shadow-sm border border-slate-200/80 w-full h-14 transition-all duration-300 group-hover:shadow-md ${className}`}>
      {!hasError ? (
        <img
          src={logoUrl}
          alt={`${brand.name} official logo`}
          className="h-8 max-h-8 w-auto max-w-[85%] object-contain select-none transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={() => setHasError(true)}
        />
      ) : (
        <BrandVectorFallback brandId={brand.id} name={brand.name} />
      )}
    </div>
  );
};
