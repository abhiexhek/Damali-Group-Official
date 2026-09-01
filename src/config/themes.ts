/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ThemePreset } from '../types';

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: "vibrant-palette",
    name: "Vibrant Palette",
    primary: "#D1001C", // Vibrant Red
    primaryDark: "#A30014", // Dark Red
    accent: "#0047AB", // Cobalt Blue
    background: "from-slate-50 via-white to-slate-100/60 dark:from-slate-50 dark:via-white dark:to-slate-100/60",
    cardBg: "bg-white border-slate-200 text-slate-800 shadow-xl shadow-slate-200/50",
    borderAccent: "border-red-100",
    textPrimary: "text-slate-900",
    textMuted: "text-slate-500",
    isLight: true,

    // Smart theme variables
    bgGradient: "linear-gradient(to bottom, #f8fafc, #ffffff, #f1f5f9)",
    surface: "#ffffff",
    textHeading: "#0f172a",
    textBody: "#1e293b",
    textMutedColor: "#64748b",
    buttonBg: "#D1001C",
    buttonText: "#ffffff",
    navText: "#1e293b",
    footerText: "#475569",
    footerBg: "#f8fafc",
    linkColor: "#D1001C",
    iconColor: "#D1001C",
    borderColor: "rgba(209, 0, 28, 0.15)",
    hoverBg: "rgba(209, 0, 28, 0.08)"
  },
  {
    id: "modern-dark",
    name: "Modern Dark",
    primary: "#14b8a6", // Teal
    primaryDark: "#0d9488",
    accent: "#f43f5e", // Rose
    background: "from-[#0f172a] via-[#1e293b] to-[#0f172a]",
    cardBg: "bg-slate-900/80 border-slate-800 text-white",
    borderAccent: "border-teal-500/30",
    textPrimary: "text-white",
    textMuted: "text-slate-400",
    isLight: false,

    // Smart theme variables
    bgGradient: "linear-gradient(to bottom, #0f172a, #1e293b, #0f172a)",
    surface: "#111827",
    textHeading: "#ffffff",
    textBody: "#cbd5e1",
    textMutedColor: "#94a3b8",
    buttonBg: "#14b8a6",
    buttonText: "#0f172a",
    navText: "#cbd5e1",
    footerText: "#94a3b8",
    footerBg: "#0f172a",
    linkColor: "#14b8a6",
    iconColor: "#14b8a6",
    borderColor: "rgba(20, 184, 166, 0.2)",
    hoverBg: "rgba(20, 184, 166, 0.1)"
  },
  {
    id: "modern-light",
    name: "Modern Light",
    primary: "#0f172a", // Dark Slate
    primaryDark: "#1e293b",
    accent: "#3b82f6", // Indigo Blue
    background: "from-[#f8fafc] via-[#f1f5f9] to-[#f8fafc]",
    cardBg: "bg-white/90 border-slate-200 text-slate-800",
    borderAccent: "border-slate-300/50",
    textPrimary: "text-slate-900",
    textMuted: "text-slate-600",
    isLight: true,

    // Smart theme variables
    bgGradient: "linear-gradient(to bottom, #f8fafc, #f1f5f9, #f8fafc)",
    surface: "#ffffff",
    textHeading: "#0f172a",
    textBody: "#334155",
    textMutedColor: "#64748b",
    buttonBg: "#0f172a",
    buttonText: "#ffffff",
    navText: "#334155",
    footerText: "#475569",
    footerBg: "#f1f5f9",
    linkColor: "#3b82f6",
    iconColor: "#0f172a",
    borderColor: "rgba(15, 23, 42, 0.1)",
    hoverBg: "rgba(15, 23, 42, 0.05)"
  },
  {
    id: "coca-cola",
    name: "Coca-Cola Red",
    primary: "#e60000", // Coca-Cola Red
    primaryDark: "#b30000",
    accent: "#ffffff", // Deep black
    background: "from-[#110000] via-[#2d0000] to-[#110000]",
    cardBg: "bg-[#1f0303]/90 border-[#470d0d] text-rose-50/95",
    borderAccent: "border-[#e60000]/30",
    textPrimary: "text-rose-50",
    textMuted: "text-rose-200/70",
    isLight: false,

    // Smart theme variables
    bgGradient: "linear-gradient(to bottom, #110000, #2d0000, #110000)",
    surface: "#1f0303",
    textHeading: "#ffffff",
    textBody: "#fecdd3",
    textMutedColor: "#fda4af",
    buttonBg: "#e60000",
    buttonText: "#ffffff",
    navText: "#fecdd3",
    footerText: "#fda4af",
    footerBg: "#110000",
    linkColor: "#e60000",
    iconColor: "#e60000",
    borderColor: "rgba(230, 0, 0, 0.25)",
    hoverBg: "rgba(230, 0, 0, 0.15)"
  },
  {
    id: "samsung",
    name: "Samsung Blue",
    primary: "#0a47a3", // Samsung blue
    primaryDark: "#062f6e",
    accent: "#4ade80", // Energetic green
    background: "from-[#020d1f] via-[#041a3c] to-[#020d1f]",
    cardBg: "bg-[#061836]/90 border-[#143263] text-blue-50/95",
    borderAccent: "border-blue-500/30",
    textPrimary: "text-blue-50",
    textMuted: "text-blue-200/70",
    isLight: false,

    // Smart theme variables
    bgGradient: "linear-gradient(to bottom, #020d1f, #041a3c, #020d1f)",
    surface: "#061836",
    textHeading: "#ffffff",
    textBody: "#dbeafe",
    textMutedColor: "#93c5fd",
    buttonBg: "#0a47a3",
    buttonText: "#ffffff",
    navText: "#dbeafe",
    footerText: "#93c5fd",
    footerBg: "#020d1f",
    linkColor: "#60a5fa",
    iconColor: "#3b82f6",
    borderColor: "rgba(10, 71, 163, 0.3)",
    hoverBg: "rgba(10, 71, 163, 0.15)"
  },
  {
    id: "lg",
    name: "LG Burgundy",
    primary: "#a50034", // LG Burgundy Red
    primaryDark: "#7c0026",
    accent: "#eab308", // Golden yellow
    background: "from-[#1a0007] via-[#330010] to-[#1a0007]",
    cardBg: "bg-[#24030d]/90 border-[#5c0b24] text-rose-50/95",
    borderAccent: "border-rose-500/20",
    textPrimary: "text-rose-50",
    textMuted: "text-rose-200/70",
    isLight: false,

    // Smart theme variables
    bgGradient: "linear-gradient(to bottom, #1a0007, #330010, #1a0007)",
    surface: "#24030d",
    textHeading: "#ffffff",
    textBody: "#ffe4e6",
    textMutedColor: "#fca5a5",
    buttonBg: "#a50034",
    buttonText: "#ffffff",
    navText: "#ffe4e6",
    footerText: "#fca5a5",
    footerBg: "#1a0007",
    linkColor: "#f43f5e",
    iconColor: "#a50034",
    borderColor: "rgba(165, 0, 52, 0.25)",
    hoverBg: "rgba(165, 0, 52, 0.15)"
  },
  {
    id: "panasonic",
    name: "Panasonic Dark Blue",
    primary: "#004098", // Panasonic Royal Blue
    primaryDark: "#002a66",
    accent: "#f97316", // Intense orange
    background: "from-[#000814] via-[#001738] to-[#000814]",
    cardBg: "bg-[#001026]/90 border-[#002e6e] text-blue-50/95",
    borderAccent: "border-blue-400/25",
    textPrimary: "text-blue-50",
    textMuted: "text-blue-200/70",
    isLight: false,

    // Smart theme variables
    bgGradient: "linear-gradient(to bottom, #000814, #001738, #000814)",
    surface: "#001026",
    textHeading: "#ffffff",
    textBody: "#dbeafe",
    textMutedColor: "#93c5fd",
    buttonBg: "#004098",
    buttonText: "#ffffff",
    navText: "#dbeafe",
    footerText: "#93c5fd",
    footerBg: "#000814",
    linkColor: "#3b82f6",
    iconColor: "#004098",
    borderColor: "rgba(0, 64, 152, 0.3)",
    hoverBg: "rgba(0, 64, 152, 0.15)"
  }
];
