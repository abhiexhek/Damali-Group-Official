/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BRANDS_DATA } from '../../data/brands';
import { Send, CheckCircle, AlertTriangle, Loader2, Download, ExternalLink } from 'lucide-react';
import { Button } from '../common/Button';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    location: '',
    interestedBrand: '',
    message: '',
    website_honey: '' // Honeypot field
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [responseMsg, setResponseMsg] = useState('');
  const [emailStatus, setEmailStatus] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = "Full name is required.";
    if (!formData.businessName.trim()) tempErrors.businessName = "Registered Business Name is required.";
    if (!formData.location.trim()) tempErrors.location = "City/District location is required.";
    if (!formData.interestedBrand) tempErrors.interestedBrand = "Please select a commercial brand.";
    
    // Email check
    if (!formData.email.trim()) {
      tempErrors.email = "Commercial email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = "Please enter a valid business email.";
    }

    // Phone check
    if (!formData.phone.trim()) {
      tempErrors.phone = "Active phone contact is required.";
    } else if (formData.phone.trim().length < 7) {
      tempErrors.phone = "Please enter a valid telephone or mobile number.";
    }

    if (!formData.message.trim()) tempErrors.message = "Please describe your commercial requirements.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSuccess(null);
    setResponseMsg('');
    setEmailStatus('');

    // Clean and trim all data before sending to ensure maximum robustness
    const cleanedData = {
      name: formData.name.trim(),
      businessName: formData.businessName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      location: formData.location.trim(),
      interestedBrand: formData.interestedBrand,
      message: formData.message.trim(),
      website_honey: formData.website_honey
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess(true);
        setResponseMsg(result.message);
        setEmailStatus(result.emailStatus || '');
        // Clear form
        setFormData({
          name: '',
          businessName: '',
          phone: '',
          email: '',
          location: '',
          interestedBrand: '',
          message: '',
          website_honey: ''
        });
      } else {
        setSuccess(false);
        setResponseMsg(result.error || "Form submission failed. Please verify your inputs.");
      }
    } catch (error) {
      console.error("[Submit Form Error]:", error);
      setSuccess(false);
      setResponseMsg("Could not connect to the B2B portal server. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-6 md:p-8 rounded-3xl relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

      <h3 className="text-lg md:text-xl font-semibold font-display tracking-tight text-slate-900 dark:text-white mb-1.5 flex items-center gap-2">
        B2B Business Inquiry Form
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 font-sans leading-relaxed">
        Submit this form to initiate dealership routing. Your inquiry will be sent directly to our corporate email and dispatched to our trade specialists.
      </p>

      {success === true ? (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center space-y-4 my-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="mx-auto w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
          
          <h4 className="text-base font-semibold font-display text-emerald-400">Inquiry Captured Successfully!</h4>
          
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
            {responseMsg}
          </p>
          
          {emailStatus && (
            <p className="text-xs text-slate-400 font-mono mt-1 italic">
              Status: {emailStatus}
            </p>
          )}

          <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800/50 flex justify-center">
            <button
              onClick={() => setSuccess(null)}
              className="inline-flex items-center justify-center px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-lg transition-colors duration-300 cursor-pointer shadow-sm"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 font-sans animate-in fade-in duration-300">
          {success === false && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl p-4 flex gap-3 text-sm animate-in slide-in-from-top-2 duration-200">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <div>
                <p className="font-bold">Submission Error</p>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{responseMsg}</p>
              </div>
            </div>
          )}

            {/* Spam Honeypot - hidden from normal users */}
            <div className="hidden">
              <label htmlFor="website_honey">Leave this field empty</label>
              <input
                id="website_honey"
                type="text"
                name="website_honey"
                value={formData.website_honey}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            {/* 2 Column fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  maxLength={150}
                  placeholder="e.g. Ramesh Shrestha"
                  className={`w-full px-4 py-3 text-sm bg-slate-100/50 dark:bg-slate-950/50 text-slate-800 dark:text-white rounded-lg border focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300 ${
                    errors.name ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-800'
                  }`}
                />
                {errors.name && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  Registered Business Name *
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  maxLength={200}
                  placeholder="e.g. Shrestha Electronic Dealers"
                  className={`w-full px-4 py-3 text-sm bg-slate-100/50 dark:bg-slate-950/50 text-slate-800 dark:text-white rounded-lg border focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300 ${
                    errors.businessName ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-800'
                  }`}
                />
                {errors.businessName && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.businessName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  Business Phone Contact *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={30}
                  placeholder="e.g. +977 98XXXXXXXX / 01-XXXXXXX"
                  className={`w-full px-4 py-3 text-sm bg-slate-100/50 dark:bg-slate-950/50 text-slate-800 dark:text-white rounded-lg border focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300 ${
                    errors.phone ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-800'
                  }`}
                />
                {errors.phone && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  Commercial Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  maxLength={150}
                  placeholder="e.g. sales@shresthadealers.com"
                  className={`w-full px-4 py-3 text-sm bg-slate-100/50 dark:bg-slate-950/50 text-slate-800 dark:text-white rounded-lg border focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300 ${
                    errors.email ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-800'
                  }`}
                />
                {errors.email && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  Business Location (City / District) *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  maxLength={150}
                  placeholder="e.g. Pokhara, Kaski"
                  className={`w-full px-4 py-3 text-sm bg-slate-100/50 dark:bg-slate-950/50 text-slate-800 dark:text-white rounded-lg border focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300 ${
                    errors.location ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-800'
                  }`}
                />
                {errors.location && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.location}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  Interested Brand Authorized Deal *
                </label>
                <select
                  name="interestedBrand"
                  value={formData.interestedBrand}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 text-sm bg-slate-100/50 dark:bg-slate-950/50 text-slate-800 dark:text-white rounded-lg border focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300 ${
                    errors.interestedBrand ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <option value="" disabled className="text-slate-500">-- Choose Brand for Dealership --</option>
                  <option value="General Distribution Partnership">General Corporate Partnership</option>
                  <optgroup label="FMCG Brands">
                    {BRANDS_DATA.filter(b => b.category === 'FMCG').map(b => (
                      <option key={`contact-brand-fmcg-${b.id}`} value={b.name}>{b.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Home Appliance Brands">
                    {BRANDS_DATA.filter(b => b.category === 'Home Appliances').map(b => (
                      <option key={`contact-brand-appliance-${b.id}`} value={b.name}>{b.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Water Purifiers & Power Backups">
                    {BRANDS_DATA.filter(b => b.category === 'Other').map(b => (
                      <option key={`contact-brand-other-${b.id}`} value={b.name}>{b.name}</option>
                    ))}
                  </optgroup>
                </select>
                {errors.interestedBrand && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.interestedBrand}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Deal Details & Requirements *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                maxLength={5000}
                rows={4}
                placeholder="Describe your outlet size, expected volume, existing dealerships, and exact appliances/beverage lines you wish to purchase wholesale..."
                className={`w-full px-4 py-3 text-sm bg-slate-100/50 dark:bg-slate-950/50 text-slate-800 dark:text-white rounded-lg border focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300 ${
                  errors.message ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-800'
                }`}
              />
              {errors.message && <p className="text-rose-500 text-[10px] font-bold mt-1">{errors.message}</p>}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-2"
              icon={loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              iconPosition="right"
            >
              {loading ? "Registering Commercial Request..." : "Submit Official Dealer Inquiry"}
            </Button>
        </form>
      )}

      {/* Footer Info */}
      <div className="mt-6 pt-4 border-t border-slate-200/50 dark:border-slate-800/50 text-center text-[11px] text-slate-400 font-sans">
        <span>🔒 Secure corporate transmission active</span>
      </div>
    </div>
  );
};
