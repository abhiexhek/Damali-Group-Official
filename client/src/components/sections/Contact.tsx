/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { COMPANY_CONFIG } from '../../config/company';
import { SectionTitle } from '../common/SectionTitle';
import { Container } from '../common/Container';
import { ContactForm } from '../ui/ContactForm';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden bg-slate-50 dark:bg-slate-900/10">
      {/* Background spotlights */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <Container>
        {/* Title */}
        <SectionTitle
          title="Establish Distribution Partnership"
          subtitle="Are you a retail outlet, corporate client, or merchant in Nepal? Connect with our trade specialists to unlock premium inventories."
          badge="Dealer Onboarding"
        />

        {/* 1. Inquiry Form (On top, centered and prominent) */}
        <div className="max-w-4xl mx-auto mt-8 mb-16">
          <ContactForm />
        </div>

        {/* 2. Company Details & Map (Below the form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch pt-12 border-t border-slate-200/50 dark:border-slate-800/20">
          
          {/* Left Column: Contact Details (Column span 6) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white tracking-tight">
                Head Office & Logistics Hub
              </h3>
              
              <div className="space-y-4 font-sans text-sm text-slate-600 dark:text-slate-400">
                {/* Address */}
                <div className="flex gap-3 items-start">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Corporate Headquarters:</strong><br />
                    {COMPANY_CONFIG.addresses.office},<br />
                    {COMPANY_CONFIG.addresses.city}, {COMPANY_CONFIG.addresses.country}
                  </p>
                </div>

                {/* Telephone & WhatsApp */}
                <div className="flex gap-3 items-center">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <strong>Wholesale Trade Desk:</strong>
                    <div className="space-y-0.5 mt-0.5">
                      {COMPANY_CONFIG.phoneNumbers.map((phone, idx) => (
                        <a 
                          key={`contact-phone-${idx}`} 
                          href={`tel:${phone.replace(/\s+/g, '')}`} 
                          className="block hover:text-primary transition-colors font-medium"
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mail */}
                <div className="flex gap-3 items-center">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <strong>Commercial Inquiries:</strong>
                    <div className="space-y-0.5 mt-0.5">
                      {COMPANY_CONFIG.emails.map((email, idx) => (
                        <a key={`contact-email-${idx}`} href={`mailto:${email}`} className="block hover:text-primary transition-colors">
                          {email}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Operating hours */}
                <div className="flex gap-3 items-start">
                  <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="leading-relaxed text-xs">
                    <strong>Logistics Processing Hours:</strong><br />
                    Sunday - Friday: 9:00 AM - 6:00 PM (NPT)<br />
                    Saturday: Closed (Support Ticket Dispatch Active)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Google Map Embedded Block (Column span 6) */}
          <div className="lg:col-span-6 flex items-stretch">
            <div className="w-full min-h-[450px] bg-slate-950 rounded-2xl overflow-hidden shadow-lg border border-slate-200/10 dark:border-slate-800/40 relative group flex flex-col">
              <iframe
                title={`${COMPANY_CONFIG.name} Google Map Location`}
                src={COMPANY_CONFIG.addresses.mapEmbedUrl}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="w-full h-full min-h-[450px] rounded-2xl"
              />
              
              {/* Direct Open in Google Maps overlay button */}
              {COMPANY_CONFIG.addresses.googleMapsLink && (
                <div className="absolute bottom-4 right-4 z-10">
                  <a
                    href={COMPANY_CONFIG.addresses.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-white text-xs font-semibold shadow-lg hover:shadow-xl hover:bg-white transition-all border border-slate-200/80 dark:border-slate-700/80 backdrop-blur-sm group/btn"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 text-primary group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              )}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};
