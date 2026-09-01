/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { COMPANY_CONFIG } from '../../config/company';
import { FOOTER_LINKS, NAV_LINKS } from '../../config/navigation';
import { useTheme } from '../../hooks/useTheme';
import { Container } from '../common/Container';
import { DamaliLogo } from '../ui/DamaliLogo';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  ChevronRight
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { currentTheme } = useTheme();

  return (
    <footer className="relative bg-slate-950 text-slate-300 border-t border-slate-900 overflow-hidden pt-16 pb-12">
      {/* Background visual graphics */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Identity */}
          <div className="space-y-4">
            <a href="#home" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                <DamaliLogo size="sm" showText={false} className="w-full h-full" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-base text-white tracking-tight leading-tight">
                  {COMPANY_CONFIG.shortName}
                </span>
                <span className="text-[10px] text-primary font-bold tracking-widest uppercase">
                  Nepal B2B Portal
                </span>
              </div>
            </a>
            
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              We bridge premium international FMCG and electronics giants with over 1,200 commercial retailers across Nepal, offering direct supply chains, temperature-controlled logistics, and complete warranties.
            </p>

            {/* Social Media Links directly updated */}
            <div className="flex items-center gap-3 pt-2">
              {COMPANY_CONFIG.socialLinks.facebook && (
                <a 
                  href={COMPANY_CONFIG.socialLinks.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-blue-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors duration-300 border border-slate-800"
                  aria-label="Facebook Page"
                  title="Visit Facebook Page"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              
              {COMPANY_CONFIG.socialLinks.instagram && (
                <a 
                  href={COMPANY_CONFIG.socialLinks.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-pink-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors duration-300 border border-slate-800"
                  aria-label="Instagram Profile"
                  title="Visit Instagram Profile"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Corporate Sitemap Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold font-display uppercase tracking-widest text-white border-b border-slate-900 pb-2">
              Sitemap Navigation
            </h4>
            <ul className="space-y-2.5 font-sans text-xs">
              {NAV_LINKS.map((link, idx) => (
                <li key={`footer-nav-${link.href}-${idx}`}>
                  <a 
                    href={link.href} 
                    className="hover:text-primary transition-colors duration-200 flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-primary" /> {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: B2B Services / Administrative Tools */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold font-display uppercase tracking-widest text-white border-b border-slate-900 pb-2">
              B2B Services
            </h4>
            <ul className="space-y-2.5 font-sans text-xs">
              {FOOTER_LINKS.company.map((link, idx) => (
                <li key={`footer-company-${link.href}-${idx}`}>
                  <a 
                    href={link.href} 
                    className="hover:text-primary transition-colors duration-200 flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-primary" /> {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact details */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold font-display uppercase tracking-widest text-white border-b border-slate-900 pb-2">
              Morang Head Office
            </h4>
            <div className="space-y-3 font-sans text-xs text-slate-400">
              <div className="flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <a 
                  href={COMPANY_CONFIG.addresses.googleMapsLink || `https://www.google.com/maps?q=${COMPANY_CONFIG.addresses.coordinates?.lat},${COMPANY_CONFIG.addresses.coordinates?.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="leading-relaxed hover:text-primary transition-colors"
                >
                  {COMPANY_CONFIG.addresses.office},<br />
                  {COMPANY_CONFIG.addresses.city}, {COMPANY_CONFIG.addresses.country}
                </a>
              </div>

              <div className="flex gap-2.5 items-center">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <div>
                  {COMPANY_CONFIG.phoneNumbers.map((phone, pIdx) => (
                    <a 
                      key={`footer-phone-${pIdx}`} 
                      href={`tel:${phone.replace(/\s+/g, '')}`} 
                      className="block hover:text-primary transition-colors leading-relaxed"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex gap-2.5 items-center">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <div>
                  {COMPANY_CONFIG.emails.map((email, mIdx) => (
                    <a 
                      key={`footer-email-${mIdx}`} 
                      href={`mailto:${email}`} 
                      className="block hover:text-primary transition-colors leading-relaxed"
                    >
                      {email}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright area */}
        <div className="mt-12 pt-8 border-t border-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-sans">
          <p>© {new Date().getFullYear()} {COMPANY_CONFIG.name}. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-[10px] bg-slate-900 text-slate-400 px-2.5 py-0.5 rounded font-mono uppercase">
              Registered Corporate Distributor
            </span>
            <a 
              href="#home" 
              className="hover:text-primary transition-colors"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};
