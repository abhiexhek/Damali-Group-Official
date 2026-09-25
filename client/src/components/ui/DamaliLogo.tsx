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
    sm: 'w-8 h-8 sm:w-9 sm:h-9',
    md: 'w-10 h-10 sm:w-11 sm:h-11',
    lg: 'w-24 h-28 sm:w-28 sm:h-32',
    xl: 'w-36 h-44 sm:w-44 sm:h-52',
    hero: 'w-52 sm:w-56 lg:w-60 h-auto max-h-[290px] sm:max-h-[320px] lg:max-h-[330px]',
  };

  const boxClass = sizeMap[size] || sizeMap.md;
  const webpSrc = showText ? '/logo/damali-logo.webp' : '/logo/damali-emblem.webp';
  const pngSrc = showText ? '/logo/damali-logo.png' : '/logo/damali-emblem.png';

  const logoImage = (
    <picture className="w-full h-full flex items-center justify-center pointer-events-none select-none">
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={pngSrc}
        alt="Damali Group"
        className="w-full h-full object-contain filter drop-shadow-[0_4px_14px_rgba(7,21,40,0.16)] dark:drop-shadow-[0_4px_24px_rgba(255,255,255,0.38)] dark:brightness-110 transition-all duration-300"
        referrerPolicy="no-referrer"
        draggable={false}
      />
    </picture>
  );

  if (animated) {
    return (
      <motion.div
        animate={{
          y: [-6, 6, -6],
          filter: [
            'drop-shadow(0 6px 14px rgba(7, 21, 40, 0.18))',
            'drop-shadow(0 14px 28px rgba(30, 64, 114, 0.35))',
            'drop-shadow(0 6px 14px rgba(7, 21, 40, 0.18))',
          ],
          scale: [0.99, 1.02, 0.99],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
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




