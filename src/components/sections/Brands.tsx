/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BRANDS_DATA } from '../../data/brands';
import { BrandCategory } from '../../types';
import { SectionTitle } from '../common/SectionTitle';
import { Container } from '../common/Container';
import { BrandCard } from '../ui/BrandCard';
import { motion } from 'motion/react';

export const Brands: React.FC = () => {
  const [activeTab, setActiveTab] = useState<BrandCategory | 'All'>('All');

  // Filter brands list based on tab
  const filteredBrands = BRANDS_DATA.filter(brand => {
    if (activeTab === 'All') return true;
    return brand.category === activeTab;
  });

  return (
    <section id="brands" className="py-20 md:py-28 relative overflow-hidden bg-slate-100 dark:bg-slate-950/20">
      {/* Background orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <Container>
        {/* Title */}
        <SectionTitle
          title="Official Brands We Represent"
          subtitle="We are direct-from-manufacturer authorized dealers and supply channels for the world's leading consumer giants."
          badge="Authorized Representations"
        />

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-12">
          {['All', 'FMCG', 'Home Appliances', 'Other'].map((tab) => (
            <button
              key={`brand-category-tab-${tab}`}
              onClick={() => setActiveTab(tab as BrandCategory | 'All')}
              className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-full border transition-all duration-300 cursor-pointer ${
                activeTab === tab
                  ? 'bg-primary text-white border-primary shadow-md shadow-primary/15'
                  : 'bg-surface/50 hover:bg-hover-bg border-border-color text-text-body'
              }`}
            >
              {tab === 'Other' ? 'Purifiers & Power backups' : tab}
            </button>
          ))}
        </div>

        {/* Brands Grid Layout */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          {filteredBrands.map((brand, idx) => (
            <BrandCard
              key={`brand-card-${brand.id}`}
              brand={brand}
              index={idx}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  );
};
