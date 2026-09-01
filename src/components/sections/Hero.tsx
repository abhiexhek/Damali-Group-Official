/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { COMPANY_CONFIG } from '../../config/company';
import { Button } from '../common/Button';
import { Container } from '../common/Container';
import { Badge } from '../common/Badge';
import { ArrowRight, Sparkles, CheckCircle, ShieldCheck, Layers } from 'lucide-react';

import { DamaliLogo } from '../ui/DamaliLogo';

export const Hero: React.FC = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-28 pb-16"
    >
      {/* Background Gradients & Ambient Glow Orbs */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-slate-950/0 to-accent/5 dark:from-primary/10 dark:via-slate-950/0 dark:to-accent/5 -z-10" />
      
      {/* Dynamic blurred glow spots */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 bg-primary/15 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '3s' }} />

      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headline and CTAs */}
        <div className="lg:col-span-7 space-y-6 text-left relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="primary" className="gap-1.5 px-3.5 py-1.5 text-[10px] tracking-widest font-bold font-display">
              <Sparkles className="w-3.5 h-3.5" /> Direct Authorized Distributor
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-text-heading leading-tight"
          >
            Trusted Distributor of Leading{' '}
            <span 
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(to right, var(--primary), var(--accent))', WebkitBackgroundClip: 'text' }}
            >
              FMCG
            </span>{' '}
            &{' '}
            <span 
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(to right, var(--accent), var(--primary))', WebkitBackgroundClip: 'text' }}
            >
              Home Appliance
            </span>{' '}
            Brands in Morang, Nepal
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-text-body font-sans leading-relaxed max-w-xl"
          >
            Empowering Nepalese enterprise and retail merchants with 100% genuine inventory, cold-chain distribution, and direct manufacturer warranties. Officially representing global leaders in FMCG, electronics, and power backup systems.
          </motion.p>

          {/* Core Guarantees Icons List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-x-6 gap-y-2.5 pt-2"
          >
            <div className="flex items-center gap-1.5 text-xs font-semibold text-text-body">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Authorized Dealer Network
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-text-body">
              <CheckCircle className="w-4 h-4 text-primary" /> 100% Genuine Guarantee
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-text-body">
              <CheckCircle className="w-4 h-4 text-accent" /> Nationwide Cold-Chain Logistics
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <a href="#contact">
              <Button 
                variant="solid" 
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Inquire Dealership
              </Button>
            </a>
          </motion.div>
        </div>

        {/* Right Column: Floating Brand Logos Animation Area */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[400px] lg:min-h-[500px]">
          {/* Central ambient glowing shield with Dim to Bright animated Damali Logo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="w-72 h-72 sm:w-88 sm:h-88 rounded-full bg-gradient-to-b from-primary/10 via-surface/80 to-primary/5 border border-primary/20 flex flex-col items-center justify-center text-center relative shadow-2xl p-6 backdrop-blur-sm"
          >
            {/* Glowing animated pulsing aura from dim to bright */}
            <motion.div
              animate={{
                opacity: [0.35, 0.9, 0.35],
                scale: [0.94, 1.1, 0.94]
              }}
              transition={{
                repeat: Infinity,
                duration: 3.5,
                ease: "easeInOut"
              }}
              className="absolute inset-0 rounded-full bg-radial from-primary/25 via-transparent to-transparent pointer-events-none"
            />

            {/* D Logo with Dim-to-Bright breathing animation (pure transparent mark, perfectly centered) */}
            <DamaliLogo size="hero" showText={false} animated={true} className="relative z-10" />
          </motion.div>

          {/* Floating Brand Badges (Staggered Floating Paths using Framer Motion) */}
          
          {/* LG Badge */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute top-1/10 left-1/10 glass-card px-3.5 py-2 rounded-full flex items-center gap-2 shadow-lg bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800"
          >
            <img src="/logos/lg.svg" alt="LG" className="h-5 w-auto object-contain" />
          </motion.div>

          {/* Coca-Cola Badge */}
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/4 right-5 glass-card px-4 py-2 rounded-full flex items-center gap-2 shadow-lg bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800"
          >
            <img src="/logos/coca-cola.svg" alt="Coca-Cola" className="h-5 w-auto object-contain" />
          </motion.div>

          {/* Samsung Badge */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/5 left-5 glass-card px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-lg bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800"
          >
            <img src="/logos/samsung.svg" alt="Samsung" className="h-4.5 w-auto object-contain" />
          </motion.div>

          {/* Frooti / Parle Agro */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 1.5 }}
            className="absolute bottom-1/10 right-1/10 glass-card px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-lg bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800"
          >
            <img src="/logos/frooti.svg" alt="Frooti" className="h-5 w-auto object-contain" />
          </motion.div>

          {/* Panasonic Badge */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 3 }}
            className="absolute top-1/5 right-1/3 glass-card px-4 py-2 rounded-full flex items-center gap-2 shadow-lg bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800"
          >
            <img src="/logos/panasonic.svg" alt="Panasonic" className="h-4 w-auto object-contain" />
          </motion.div>

          {/* Red Bull */}
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-1/3 left-1/4 glass-card px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-lg bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800"
          >
            <img src="/logos/red-bull.svg" alt="Red Bull" className="h-5 w-auto object-contain" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
