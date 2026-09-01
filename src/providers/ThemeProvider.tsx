/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemePreset } from '../types';
import { THEME_PRESETS } from '../config/themes';

interface ThemeContextType {
  currentTheme: ThemePreset;
  setThemeById: (id: string) => void;
  presets: ThemePreset[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemePreset>(THEME_PRESETS[0]); // Default to Modern Dark

  // Initialize theme from localStorage on client side
  useEffect(() => {
    try {
      const savedThemeId = localStorage.getItem('distributor_landing_theme');
      if (savedThemeId) {
        const foundTheme = THEME_PRESETS.find(t => t.id === savedThemeId);
        if (foundTheme) {
          setCurrentTheme(foundTheme);
        }
      }
    } catch (e) {
      console.warn("localStorage is not available inside this sandbox or iframe, defaulting to memory state:", e);
    }
  }, []);

  // Set CSS variables whenever the theme changes
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply core brand colors as standard CSS properties
    root.style.setProperty('--primary', currentTheme.primary);
    root.style.setProperty('--primary-dark', currentTheme.primaryDark);
    root.style.setProperty('--accent', currentTheme.accent);
    root.style.setProperty('--bg-gradient', currentTheme.bgGradient);
    root.style.setProperty('--surface', currentTheme.surface);
    root.style.setProperty('--text-heading', currentTheme.textHeading);
    root.style.setProperty('--text-body', currentTheme.textBody);
    root.style.setProperty('--text-muted', currentTheme.textMutedColor);
    root.style.setProperty('--button-bg', currentTheme.buttonBg);
    root.style.setProperty('--button-text', currentTheme.buttonText);
    root.style.setProperty('--nav-text', currentTheme.navText);
    root.style.setProperty('--footer-text', currentTheme.footerText);
    root.style.setProperty('--footer-bg', currentTheme.footerBg);
    root.style.setProperty('--link-color', currentTheme.linkColor);
    root.style.setProperty('--icon-color', currentTheme.iconColor);
    root.style.setProperty('--border-color', currentTheme.borderColor);
    root.style.setProperty('--hover-bg', currentTheme.hoverBg);
    
    // Set text contrast and shadow characteristics
    if (currentTheme.id === 'modern-light' || currentTheme.isLight) {
      root.classList.add('light-mode');
      root.classList.remove('dark-mode');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark-mode');
      root.classList.remove('light-mode');
      root.classList.add('dark');
    }

    // Set dataset attribute for high specificity CSS overrides
    root.setAttribute('data-theme', currentTheme.id);
  }, [currentTheme]);

  const setThemeById = (id: string) => {
    const foundTheme = THEME_PRESETS.find(t => t.id === id);
    if (foundTheme) {
      setCurrentTheme(foundTheme);
      try {
        localStorage.setItem('distributor_landing_theme', id);
      } catch (e) {
        console.warn("localStorage is not writeable inside this sandbox or iframe:", e);
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setThemeById, presets: THEME_PRESETS }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
