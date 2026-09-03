/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Statistic } from '../../types';

interface StatisticCardProps {
  stat: Statistic;
  index: number;
}

export const StatisticCard: React.FC<StatisticCardProps> = ({ stat, index }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [count, setCount] = useState<number>(0);

  // Extract numerical value for counter animation
  const numericValue = parseInt(stat.value.replace(/[^0-9]/g, ''), 10);
  const suffix = stat.value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (!isInView || isNaN(numericValue)) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad formula
      const easeProgress = progress * (2 - progress);
      const currentCount = Math.floor(easeProgress * numericValue);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(numericValue);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, numericValue]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card relative flex flex-col items-center justify-center p-8 rounded-2xl overflow-hidden text-center group hover:scale-[1.02]"
    >
      {/* Background glow orb */}
      <div className="absolute -right-10 -bottom-10 w-24 h-24 rounded-full bg-primary/5 blur-xl group-hover:bg-primary/10 transition-all duration-500" />
      
      <div className="text-2xl md:text-3xl font-semibold font-display tracking-tight text-primary flex items-baseline">
        <span>{isNaN(numericValue) ? stat.value : count}</span>
        {!isNaN(numericValue) && <span className="text-accent">{suffix}</span>}
      </div>
      
      <div className="mt-1.5 font-display text-sm font-medium text-text-heading">
        {stat.label}
      </div>
      
      <p className="mt-2 text-xs text-text-muted font-sans leading-relaxed">
        {stat.description}
      </p>
    </motion.div>
  );
};
