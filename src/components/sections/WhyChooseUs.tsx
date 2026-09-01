/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { SERVICE_FEATURES } from '../../config/company';
import { SectionTitle } from '../common/SectionTitle';
import { Container } from '../common/Container';
import * as LucideIcons from 'lucide-react';

// Dynamic icon mapper to parse and render Lucide Icons by name string safely
const DynamicLucideIcon: React.FC<{ iconName: string; className?: string }> = ({ iconName, className }) => {
  // @ts-ignore
  const IconComponent = LucideIcons[iconName];
  if (!IconComponent) return <LucideIcons.HelpCircle className={className} />;
  return <IconComponent className={className} />;
};

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-choose-us" className="py-20 md:py-28 relative overflow-hidden bg-slate-100 dark:bg-slate-950/40">
      {/* Background visual styling */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <Container>
        {/* Title */}
        <SectionTitle
          title="Why Leading Brands & Retailers Trust Us"
          subtitle="Our nationwide operational network ensures efficient supply chains, authentic product guarantees, and comprehensive B2B merchant care."
          badge="Commercial Advantages"
        />

        {/* Feature Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICE_FEATURES.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card p-8 rounded-2xl flex flex-col justify-between group hover:scale-[1.02] border hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div>
                {/* Icon Container with brand accent color */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <DynamicLucideIcon iconName={feature.iconName} className="w-6 h-6" />
                </div>

                <h4 className="font-display font-bold text-lg text-text-heading group-hover:text-primary transition-colors duration-200">
                  {feature.title}
                </h4>
                
                <p className="mt-3.5 text-sm text-text-body font-sans leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Little corner indicator lines */}
              <div className="mt-6 pt-4 border-t border-border-color flex justify-between items-center text-[10px] text-text-muted group-hover:text-primary transition-colors duration-300 font-semibold tracking-wider uppercase">
                <span>Authorized standards</span>
                <span>Direct Hub</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Commercial trust statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border border-primary/10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1.5 text-center md:text-left">
            <h4 className="font-display font-bold text-lg text-text-heading">
              Ready to Register as an Official Retail Partner?
            </h4>
            <p className="text-xs text-text-muted font-sans max-w-xl">
              Get direct access to wholesale pricing lists, temperature-controlled beverage transport, rapid bulk appliances shipping, and dedicated POS support materials.
            </p>
          </div>
          <a
            href="#contact"
            className="px-6 py-3 bg-primary hover:bg-primary-dark text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-md hover:shadow-lg transition-all duration-300 whitespace-nowrap"
          >
            Submit Dealer Request
          </a>
        </motion.div>
      </Container>
    </section>
  );
};
