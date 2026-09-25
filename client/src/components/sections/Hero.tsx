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
            <Badge variant="primary" className="gap-1.5 px-3 py-1 text-[10px] tracking-wider font-semibold font-display">
              <Sparkles className="w-3.5 h-3.5" /> Direct Authorized Distributor
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl lg:text-[38px] font-semibold font-display tracking-tight text-text-heading leading-snug sm:leading-tight"
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
            className="text-sm sm:text-base text-text-body font-sans leading-relaxed max-w-lg"
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

        {/* Right Column: Floating Brand Logos & Main Company Logo Area */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] w-full select-none">
          {/* Central transparent animated Damali Logo container with smooth ambient aura */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center justify-center text-center p-2 sm:p-4"
          >
            {/* Soft ambient luminous halo behind the transparent logo */}
            <motion.div
              animate={{
                opacity: [0.35, 0.7, 0.35],
                scale: [0.95, 1.08, 0.95]
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut"
              }}
              className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-radial from-primary/25 via-primary/5 to-transparent pointer-events-none -z-10 blur-2xl"
            />

            {/* Official Authentic 2D Damali Logo with smooth breathing float */}
            <DamaliLogo size="hero" showText={true} animated={true} className="relative z-10" />
          </motion.div>

          {/* ================= SATELLITE ORBIT BRAND LOGOS (ZERO COVER / ZERO OVERLAP) ================= */}
          {/* Brand badges orbit strictly in their own designated radial perimeter outside the company logo, ensuring complete clearance */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 scale-75 sm:scale-85 md:scale-90 lg:scale-100">
            {/* Subtle orbital ring guide behind the badges */}
            <div className="absolute w-[450px] h-[410px] rounded-full border border-dashed border-slate-200/60 dark:border-slate-800/60 pointer-events-none -z-10" />

            {/* 1. Kent Badge - Top */}
            <motion.div
              animate={{ 
                x: [0, 4, -4, 2, 0],
                y: [-205, -210, -200, -207, -205],
                rotate: [0, 1, -1, 0.5, 0]
              }}
              transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut" }}
              whileHover={{ scale: 1.15, zIndex: 50 }}
              className="absolute pointer-events-auto z-30 glass-card px-3.5 py-1.5 rounded-full flex items-center shadow-lg hover:shadow-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 transition-all cursor-pointer select-none"
            >
              <img src="/logos/kent.svg" alt="Kent" className="h-4 sm:h-4.5 w-auto object-contain" />
            </motion.div>

            {/* 2. Coca-Cola Badge - Top-Right */}
            <motion.div
              animate={{ 
                x: [195, 200, 190, 197, 195],
                y: [-145, -140, -150, -143, -145],
                rotate: [0, 1.2, -1.2, 0.8, 0]
              }}
              transition={{ repeat: Infinity, duration: 7.2, ease: "easeInOut", delay: 0.8 }}
              whileHover={{ scale: 1.15, zIndex: 50 }}
              className="absolute pointer-events-auto z-30 glass-card px-4 py-1.5 rounded-full flex items-center shadow-lg hover:shadow-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 transition-all cursor-pointer select-none"
            >
              <img src="/logos/coca-cola.svg" alt="Coca-Cola" className="h-4.5 sm:h-5 w-auto object-contain" />
            </motion.div>

            {/* 3. Haier Badge - Right */}
            <motion.div
              animate={{ 
                x: [225, 230, 220, 227, 225],
                y: [0, -6, 6, -3, 0],
                rotate: [0, 1, -1, 0.5, 0]
              }}
              transition={{ repeat: Infinity, duration: 6.8, ease: "easeInOut", delay: 1.5 }}
              whileHover={{ scale: 1.15, zIndex: 50 }}
              className="absolute pointer-events-auto z-30 glass-card px-3.5 py-1.5 rounded-full flex items-center shadow-lg hover:shadow-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 transition-all cursor-pointer select-none"
            >
              <img src="/logos/haier.svg" alt="Haier" className="h-3.5 sm:h-4 w-auto object-contain" />
            </motion.div>

            {/* 4. Frooti Badge - Bottom-Right */}
            <motion.div
              animate={{ 
                x: [195, 190, 200, 193, 195],
                y: [155, 160, 150, 157, 155],
                rotate: [0, 1.2, -1.2, 0.8, 0]
              }}
              transition={{ repeat: Infinity, duration: 7.5, ease: "easeInOut", delay: 2.2 }}
              whileHover={{ scale: 1.15, zIndex: 50 }}
              className="absolute pointer-events-auto z-30 glass-card px-3.5 py-1.5 rounded-full flex items-center shadow-lg hover:shadow-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 transition-all cursor-pointer select-none"
            >
              <img src="/logos/frooti.svg" alt="Frooti" className="h-4 sm:h-4.5 w-auto object-contain" />
            </motion.div>

            {/* 5. Samsung Badge - Bottom */}
            <motion.div
              animate={{ 
                x: [0, -5, 5, -2, 0],
                y: [215, 220, 210, 217, 215],
                rotate: [0, -1, 1, -0.5, 0]
              }}
              transition={{ repeat: Infinity, duration: 6.2, ease: "easeInOut", delay: 1.2 }}
              whileHover={{ scale: 1.15, zIndex: 50 }}
              className="absolute pointer-events-auto z-30 glass-card px-4 py-1.5 rounded-full flex items-center shadow-lg hover:shadow-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 transition-all cursor-pointer select-none"
            >
              <img src="/logos/samsung.svg" alt="Samsung" className="h-4 sm:h-4.5 w-auto object-contain" />
            </motion.div>

            {/* 6. Red Bull Badge - Bottom-Left */}
            <motion.div
              animate={{ 
                x: [-195, -200, -190, -197, -195],
                y: [155, 150, 160, 153, 155],
                rotate: [0, -1.2, 1.2, -0.8, 0]
              }}
              transition={{ repeat: Infinity, duration: 7.0, ease: "easeInOut", delay: 2.8 }}
              whileHover={{ scale: 1.15, zIndex: 50 }}
              className="absolute pointer-events-auto z-30 glass-card px-3.5 py-1.5 rounded-full flex items-center shadow-lg hover:shadow-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 transition-all cursor-pointer select-none"
            >
              <img src="/logos/red-bull.svg" alt="Red Bull" className="h-4 sm:h-4.5 w-auto object-contain" />
            </motion.div>

            {/* 7. LG Badge - Left */}
            <motion.div
              animate={{ 
                x: [-225, -220, -230, -223, -225],
                y: [0, 6, -6, 3, 0],
                rotate: [0, -1, 1, -0.5, 0]
              }}
              transition={{ repeat: Infinity, duration: 6.6, ease: "easeInOut", delay: 1.8 }}
              whileHover={{ scale: 1.15, zIndex: 50 }}
              className="absolute pointer-events-auto z-30 glass-card px-3.5 py-1.5 rounded-full flex items-center shadow-lg hover:shadow-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 transition-all cursor-pointer select-none"
            >
              <img src="/logos/lg.svg" alt="LG" className="h-4 sm:h-4.5 w-auto object-contain" />
            </motion.div>

            {/* 8. Panasonic Badge - Top-Left */}
            <motion.div
              animate={{ 
                x: [-195, -190, -200, -193, -195],
                y: [-145, -150, -140, -147, -145],
                rotate: [0, -1.2, 1.2, -0.8, 0]
              }}
              transition={{ repeat: Infinity, duration: 7.4, ease: "easeInOut", delay: 0.4 }}
              whileHover={{ scale: 1.15, zIndex: 50 }}
              className="absolute pointer-events-auto z-30 glass-card px-3.5 py-1.5 rounded-full flex items-center shadow-lg hover:shadow-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 transition-all cursor-pointer select-none"
            >
              <img src="/logos/panasonic.svg" alt="Panasonic" className="h-3.5 sm:h-4 w-auto object-contain" />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};
