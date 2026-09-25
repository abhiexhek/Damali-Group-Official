/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ThemePreset {
  id: string;
  name: string;
  primary: string; // Tailwind color class or hex values
  primaryDark: string;
  accent: string;
  background: string;
  cardBg: string;
  borderAccent: string;
  textPrimary: string;
  textMuted: string;
  isLight?: boolean;

  // Smart theme variables
  bgGradient: string;
  surface: string;
  textHeading: string;
  textBody: string;
  textMutedColor: string;
  buttonBg: string;
  buttonText: string;
  navText: string;
  footerText: string;
  footerBg: string;
  linkColor: string;
  iconColor: string;
  borderColor: string;
  hoverBg: string;
}

export type BrandCategory = 'FMCG' | 'Home Appliances' | 'Other';

export interface Brand {
  id: string;
  name: string;
  logo: string; // SVG identifier or fallback
  officialLogoUrl?: string;
  category: BrandCategory;
  description: string;
  originCountry: string;
}

export type ProductCategory = 
  | 'Beverages' 
  | 'Kitchen Appliances' 
  | 'Air Coolers' 
  | 'Water Purifiers' 
  | 'Inverters' 
  | 'Batteries' 
  | 'Fans' 
  | 'Electronics';

export interface Product {
  id: string;
  name: string;
  brandId: string;
  brandName: string;
  category: ProductCategory;
  description: string;
  image: string; // URL or premium SVG description
  featured: boolean;
  specs: { label: string; value: string }[];
}

export interface ContactInquiry {
  name: string;
  businessName: string;
  phone: string;
  email: string;
  location: string;
  interestedBrand: string;
  message: string;
  timestamp?: string;
}

export interface CompanyInfo {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  mission: string;
  vision: string;
  experienceYears: number;
  phoneNumbers: string[];
  whatsapp?: string;
  whatsappUrl?: string;
  emails: string[];
  addresses: {
    office: string;
    city: string;
    country: string;
    mapEmbedUrl: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
    googleMapsLink?: string;
  };
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    whatsapp?: string;
  };
}

export interface Statistic {
  id: string;
  value: string;
  label: string;
  description: string;
}

export interface ServiceFeature {
  id: string;
  title: string;
  description: string;
  iconName: string; // Lucide icon identifier
}

export interface TimelineAchievement {
  year: string;
  title: string;
  description: string;
  status: 'active' | 'left';
  category?: string;
  brands?: string[];
}
