/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Damali3DLogo } from './Damali3DLogo';

interface DamaliLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showText?: boolean;
  animated?: boolean;
  use3D?: boolean;
}

export const DamaliLogo: React.FC<DamaliLogoProps> = ({
  className = '',
  size = 'md',
  showText = false,
  animated = false,
  use3D = false,
}) => {
  // If hero size or explicit 3D requested, render high-precision interactive 3D logo
  if (size === 'hero' || use3D) {
    return (
      <Damali3DLogo
        size={size === 'hero' ? 'hero' : size === 'lg' ? 'lg' : 'md'}
        showText={showText}
        className={className}
      />
    );
  }

  const sizeMap = {
    sm: 'w-8 h-8 sm:w-9 sm:h-9',
    md: 'w-10 h-10 sm:w-11 sm:h-11',
    lg: 'w-24 h-28 sm:w-28 sm:h-32',
    xl: 'w-36 h-44 sm:w-44 sm:h-52',
    hero: 'w-[290px] h-[310px] sm:w-[350px] sm:h-[370px]',
  };

  const boxClass = sizeMap[size] || sizeMap.md;
  const [hasError, setHasError] = React.useState(false);

  const resolvePath = (p: string) => {
    const base = ((import.meta as any).env?.BASE_URL || '/');
    const cleanBase = base.endsWith('/') ? base : `${base}/`;
    return `${cleanBase}${p.replace(/^\//, '')}`;
  };

  const webpSrc = resolvePath(showText ? '/logo/damali-logo.webp' : '/logo/damali-emblem.webp');
  const pngSrc = resolvePath(showText ? '/logo/damali-logo.png' : '/logo/damali-emblem.png');
  const svgSrc = resolvePath('/logos/damali.svg');

  const logoImage = !hasError ? (
    <picture className="w-full h-full flex items-center justify-center select-none">
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={pngSrc}
        alt="Damali Group"
        className="w-full h-full object-contain filter drop-shadow-[0_4px_14px_rgba(7,21,40,0.18)] dark:drop-shadow-[0_4px_24px_rgba(255,255,255,0.35)] dark:brightness-110 transition-all duration-300"
        referrerPolicy="no-referrer"
        draggable={false}
        onError={() => setHasError(true)}
      />
    </picture>
  ) : (
    <img
      src={svgSrc}
      alt="Damali Group"
      className="w-full h-full object-contain"
    />
  );

  if (animated) {
    return (
      <motion.div
        animate={{
          y: [-5, 5, -5],
          filter: [
            'drop-shadow(0 6px 14px rgba(7, 21, 40, 0.18))',
            'drop-shadow(0 14px 28px rgba(30, 64, 114, 0.35))',
            'drop-shadow(0 6px 14px rgba(7, 21, 40, 0.18))',
          ],
          scale: [0.99, 1.015, 0.99],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: 'easeInOut',
        }}
        className={`${boxClass} ${className} flex items-center justify-center relative`}
      >
        {logoImage}
      </motion.div>
    );
  }

  return (
    <div className={`${boxClass} ${className} flex items-center justify-center relative`}>
      {logoImage}
    </div>
  );
};
