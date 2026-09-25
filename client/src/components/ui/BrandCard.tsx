/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Brand } from '../../types';
import { Badge } from '../common/Badge';
import { BrandLogo } from './BrandLogo';

interface BrandCardProps {
  brand: Brand;
  index: number;
}

export const BrandCard: React.FC<BrandCardProps> = ({ 
  brand, 
  index 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.4), ease: [0.16, 1, 0.3, 1] }}
      className="glass-card relative flex flex-col items-center justify-between p-6 rounded-2xl w-full text-center group transition-all duration-300 hover:border-primary/40 hover:bg-slate-500/5 hover:shadow-md"
    >
      {/* Category corner indicator */}
      <div className="absolute top-3 right-3">
        <Badge 
          variant={brand.category === 'FMCG' ? 'accent' : 'primary'} 
          className="text-[9px] px-2 py-0.5"
        >
          {brand.category}
        </Badge>
      </div>

      {/* Official Brand Logo Display */}
      <div className="flex items-center justify-center w-full mt-2 transition-transform duration-300 group-hover:scale-105">
        <BrandLogo brand={brand} />
      </div>

      {/* Brand Info */}
      <div className="mt-4 w-full">
        <h4 className="font-display font-semibold text-sm text-text-heading group-hover:text-primary transition-colors duration-300">
          {brand.name}
        </h4>
        <p className="mt-1.5 text-xs text-text-muted line-clamp-2 min-h-[2rem] leading-relaxed">
          {brand.description}
        </p>
      </div>

      {/* Country of Origin Tag */}
      <div className="mt-4 pt-3 w-full border-t border-border-color flex justify-between items-center text-[10px] text-text-muted">
        <span className="font-medium">Authorized Distributor</span>
        <span className="font-semibold text-text-muted">{brand.originCountry}</span>
      </div>
    </motion.div>
  );
};
