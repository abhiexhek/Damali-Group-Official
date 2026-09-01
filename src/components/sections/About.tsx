/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { COMPANY_CONFIG, STATISTICS_DATA, TIMELINE_ACHIEVEMENTS } from '../../config/company';
import { SectionTitle } from '../common/SectionTitle';
import { Container } from '../common/Container';
import { StatisticCard } from '../ui/StatisticCard';
import { Target, Compass, Award, Building, Sparkles, CheckCircle2, Layers } from 'lucide-react';
import { Badge } from '../common/Badge';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 relative overflow-hidden bg-slate-50 dark:bg-slate-900/30">
      {/* Visual separators and background blobs */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 pointer-events-none" />

      <Container>
        {/* Title */}
        <SectionTitle
          title="B2B Commercial Distribution Powerhouse"
          subtitle="Empowering Nepalese enterprise merchants with genuine brand inventories and nationwide temperature-controlled logistics."
          badge="Who We Are"
        />

        {/* Company Core Description & Mission / Vision Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Big Brand Experience statement */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 rounded-3xl border hover:border-primary/20 transition-all duration-300 relative"
            >
              <h3 className="text-2xl font-bold font-display text-text-heading leading-tight">
                {COMPANY_CONFIG.experienceYears}+ Years of Supply Logistics Excellence
              </h3>
              
              <p className="mt-4 text-sm text-text-body font-sans leading-relaxed">
                {COMPANY_CONFIG.description}
              </p>

              <div className="mt-6 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-heading">Official Direct Distributor</h4>
                  <p className="text-xs text-text-muted">Nepal Ministry of Industry Registered</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Mission & Vision */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Mission Card */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass-card p-6 rounded-2xl space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-lg text-text-heading">Our Mission</h4>
                <p className="text-xs text-text-body font-sans leading-relaxed">
                  {COMPANY_CONFIG.mission}
                </p>
              </motion.div>

              {/* Vision Card */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="glass-card p-6 rounded-2xl space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-lg text-text-heading">Our Vision</h4>
                <p className="text-xs text-text-body font-sans leading-relaxed">
                  {COMPANY_CONFIG.vision}
                </p>
              </motion.div>

            </div>

            {/* General Description Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 bg-primary/5 rounded-2xl border border-primary/10 flex items-start gap-4"
            >
              <Building className="w-6 h-6 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-text-body font-sans leading-relaxed">
                We operate across all major regional hubs including Kathmandu, Pokhara, Biratnagar, Lalitpur, and Nepalgunj, maintaining dedicated B2B logistics channels and customer service offices in every province.
              </p>
            </motion.div>
          </div>

        </div>

        {/* Statistics Grid */}
        <div className="mt-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATISTICS_DATA.map((stat, idx) => (
              <StatisticCard key={`about-stat-${stat.id}`} stat={stat} index={idx} />
            ))}
          </div>
        </div>

        {/* Timeline of Company Achievements / Brand Journey */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <Badge variant="accent" className="font-bold tracking-widest text-[9px] mb-2 uppercase">
              Business Timeline &amp; Brand Journey
            </Badge>
            <h3 className="text-2xl md:text-3xl font-display font-black text-text-heading tracking-tight">
              Our Journey with Leading Brands
            </h3>
            <p className="text-xs text-text-muted font-sans mt-2 max-w-xl mx-auto">
              Our chronological journey representing global leaders in FMCG and Home Appliances across Nepal.
            </p>
          </div>

          <div className="max-w-3xl mx-auto relative border-l-2 border-primary/30 space-y-8 pl-6 md:pl-10">
            {TIMELINE_ACHIEVEMENTS.map((achievement, idx) => {
              return (
                <motion.div
                  key={`about-achievement-${achievement.year}-${achievement.title}-${idx}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="relative group"
                >
                  {/* Timeline node circle */}
                  <div className="absolute -left-[31px] md:-left-[47px] top-4 w-5 h-5 rounded-full border-2 bg-emerald-50 dark:bg-slate-900 border-emerald-500 text-emerald-500 shadow-md shadow-emerald-500/20 shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>

                  {/* Card Container */}
                  <div className="glass-card p-5 md:p-6 rounded-2xl border border-emerald-500/25 dark:border-emerald-500/20 hover:border-emerald-500/50 bg-gradient-to-r from-emerald-500/[0.02] to-transparent transition-all duration-300 hover:shadow-lg">
                    {/* Header Row: Year Badge + Status Pill + Category Tag */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        {/* Year Badge */}
                        <span className="inline-flex px-3 py-1 rounded-lg text-xs font-black font-display tracking-wide bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                          {achievement.year}
                        </span>

                        {/* Category Badge if applicable */}
                        {achievement.category && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/25">
                            <Layers className="w-3 h-3" /> {achievement.category} Category
                          </span>
                        )}
                      </div>

                      {/* Association Status Pill */}
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        Available Partner Brand
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-lg font-bold font-display tracking-tight text-text-heading">
                      {achievement.title}
                    </h4>

                    {/* Description */}
                    <p className="mt-2 text-xs text-text-body font-sans leading-relaxed">
                      {achievement.description}
                    </p>

                    {/* Sub-brand / Associated tags */}
                    {achievement.brands && achievement.brands.length > 0 && (
                      <div className="mt-3.5 pt-3 border-t border-border-color/60 flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider mr-1">
                          {achievement.category ? 'Category Brands:' : 'Brands / Products:'}
                        </span>
                        {achievement.brands.map((bName, bIdx) => (
                          <span
                            key={`achievement-brand-${bIdx}`}
                            className="inline-flex px-2 py-0.5 rounded text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20"
                          >
                            {bName}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </Container>
    </section>
  );
};
