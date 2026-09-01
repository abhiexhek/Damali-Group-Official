/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../hooks/useTheme';
import { NAV_LINKS } from '../../config/navigation';
import { COMPANY_CONFIG } from '../../config/company';
import { Menu, X, Palette, Check, Layers } from 'lucide-react';
import { Container } from '../common/Container';
import { DamaliLogo } from '../ui/DamaliLogo';

export const Navbar: React.FC = () => {
  const { currentTheme, setThemeById, presets } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/90 backdrop-blur-md shadow-md border-b border-border-color py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <Container className="flex items-center justify-between">
        {/* Company Identity */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
            <DamaliLogo size="sm" showText={false} className="w-full h-full" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-base tracking-tight text-text-heading group-hover:text-primary transition-colors duration-300 leading-tight">
              {COMPANY_CONFIG.shortName}
            </span>
            <span className="text-[10px] text-primary font-bold tracking-widest uppercase">
              Official Distributor
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link, idx) => (
            <a
              key={`desktop-nav-${link.href}-${idx}`}
              href={link.href}
              className="text-sm font-semibold text-text-body hover:text-primary transition-colors duration-300 relative py-2 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Actions: Theme Selector & CTA */}
        <div className="hidden md:flex items-center gap-4">
          {/* Dynamic Theme Presets Trigger Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg border border-border-color hover:border-primary/40 text-text-body transition-all duration-300 cursor-pointer"
              style={{ backgroundColor: currentTheme.surface }}
            >
              <Palette className="w-4 h-4 text-primary" />
              <span>Theme Preset:</span>
              <span className="text-primary font-black">{currentTheme.name}</span>
            </button>

            <AnimatePresence>
              {showThemeMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowThemeMenu(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 rounded-xl shadow-2xl border border-border-color p-2 z-20"
                    style={{ backgroundColor: currentTheme.surface, opacity: 1 }}
                  >
                    <div className="px-3 py-1.5 border-b border-border-color mb-1 text-[10px] font-bold text-text-muted uppercase tracking-widest">
                      Select Custom Preset
                    </div>
                    {presets.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => {
                          setThemeById(preset.id);
                          setShowThemeMenu(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                          currentTheme.id === preset.id
                            ? 'bg-primary/10 text-primary'
                            : 'text-text-muted hover:bg-hover-bg hover:text-text-heading'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full shrink-0 border border-black/10" 
                            style={{ backgroundColor: preset.primary }} 
                          />
                          <span>{preset.name}</span>
                        </div>
                        {currentTheme.id === preset.id && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <a
            href="#contact"
            className="px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase text-white bg-primary hover:bg-primary-dark shadow-md shadow-primary/10 hover:shadow-primary/20 transition-all duration-300"
          >
            Become Dealer
          </a>
        </div>

        {/* Mobile menu and Palette buttons */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => {
              const currentIndex = presets.findIndex(p => p.id === currentTheme.id);
              const nextIndex = (currentIndex + 1) % presets.length;
              setThemeById(presets[nextIndex].id);
            }}
            className="p-2.5 rounded-lg border border-border-color text-text-body cursor-pointer"
            style={{ backgroundColor: currentTheme.surface }}
            aria-label="Toggle Theme Preset"
          >
            <Palette className="w-5 h-5 text-primary" />
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-lg border border-border-color text-text-body cursor-pointer"
            style={{ backgroundColor: currentTheme.surface }}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-nav-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-b border-border-color"
            style={{ backgroundColor: currentTheme.surface }}
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {NAV_LINKS.map((link, idx) => (
                <a
                  key={`mobile-nav-${link.href}-${idx}`}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2.5 text-base font-semibold rounded-lg text-text-body hover:bg-hover-bg hover:text-text-heading transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
              
              <div className="pt-4 border-t border-border-color px-4 flex flex-col gap-3">
                <div className="text-xs text-text-muted font-bold uppercase tracking-wider">
                  Current Theme: <span className="text-primary font-black">{currentTheme.name}</span>
                </div>
                
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-3 rounded-lg text-sm font-bold tracking-wider uppercase text-white bg-primary hover:bg-primary-dark shadow-md"
                >
                  Become Dealer
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
