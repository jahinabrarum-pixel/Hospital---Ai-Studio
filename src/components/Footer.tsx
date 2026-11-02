import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import { PageRoute } from '../types';
import { hospitalInfo, departmentsData } from '../data/hospitalData';
import { 
  HeartPulse, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Send, 
  ChevronRight, 
  Ambulance, 
  ExternalLink
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, t, navigateTo, showToast } = useHospital();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast(
        language === 'bn' 
          ? 'অনুগ্রহ করে সঠিক ইমেইল ঠিকানা দিন।' 
          : 'Please enter a valid email address.',
        'warning'
      );
      return;
    }
    showToast(
      language === 'bn' 
        ? 'ধন্যবাদ! আমাদের স্বাস্থ্য বুলেটিনে সাবস্ক্রাইব করার জন্য।' 
        : 'Thank you! You are subscribed to our monthly health newsletter.',
      'success'
    );
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#142B45] text-slate-300 pt-16 pb-8 border-t-4 border-[#1769D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-700/60">
          
          {/* Col 1: About Hospital & Reg */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1769D2] to-[#0E9F92] flex items-center justify-center text-white shadow-md">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg tracking-tight">
                  {language === 'bn' ? hospitalInfo.nameBn : hospitalInfo.nameEn}
                </h3>
                <p className="text-xs text-[#0E9F92] font-semibold">
                  {language === 'bn' ? 'আধুনিক চিকিৎসা ও ডায়াগনস্টিক' : 'Excellence in Healthcare'}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'bn' 
                ? 'দেবীদ্বার মেডিলাব হাসপাতাল — উত্তর কুমিল্লার সাধারণ মানুষের কাছে বিশ্বমানের চিকিৎসাসেবা, নির্ভরযোগ্য ডায়াগনস্টিক ল্যাব এবং সার্বক্ষণিক জরুরি চিকিৎসা পৌঁছে দিতে প্রতিশ্রুতিবদ্ধ।' 
                : 'Debidwar Medilab Hospital provides state-of-the-art multi-disciplinary inpatient, outpatient, and diagnostic healthcare to Debidwar and the greater Cumilla region.'}
            </p>

            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 text-xs space-y-1.5">
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-[#0E9F92]" />
                <span className="font-medium">
                  {language === 'bn' ? 'স্বাস্থ্য অধিদপ্তর রেজিস্টার্ড' : 'DGHS Reg. Certified'}:
                </span>
                <span className="text-slate-400 font-mono text-[11px]">{hospitalInfo.regNumber}</span>
              </div>
              <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? '২৪ ঘণ্টা জরুরি সেবা চালু' : '24/7 Trauma Care Operational'}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links (All Pages) */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase border-b border-slate-700 pb-2">
              {t.quickLinks}
            </h4>
            <ul className="grid grid-cols-2 gap-x-2 gap-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-[#1769D2] flex items-center gap-1 transition-colors">
                  <ChevronRight className="w-3 h-3 text-slate-500" /> {t.navHome}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-[#1769D2] flex items-center gap-1 transition-colors">
                  <ChevronRight className="w-3 h-3 text-slate-500" /> {t.navAbout}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('doctors')} className="hover:text-[#1769D2] flex items-center gap-1 transition-colors">
                  <ChevronRight className="w-3 h-3 text-slate-500" /> {t.navDoctors}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('departments')} className="hover:text-[#1769D2] flex items-center gap-1 transition-colors">
                  <ChevronRight className="w-3 h-3 text-slate-500" /> {t.navDepartments}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('services')} className="hover:text-[#1769D2] flex items-center gap-1 transition-colors">
                  <ChevronRight className="w-3 h-3 text-slate-500" /> {t.navServices}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('appointment')} className="hover:text-[#1769D2] flex items-center gap-1 transition-colors">
                  <ChevronRight className="w-3 h-3 text-slate-500" /> {t.bookAppointment}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('packages')} className="hover:text-[#1769D2] flex items-center gap-1 transition-colors">
                  <ChevronRight className="w-3 h-3 text-slate-500" /> {t.navPackages}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('diagnostics')} className="hover:text-[#1769D2] flex items-center gap-1 transition-colors">
                  <ChevronRight className="w-3 h-3 text-slate-500" /> {t.navDiagnostics}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('patients')} className="hover:text-[#1769D2] flex items-center gap-1 transition-colors">
                  <ChevronRight className="w-3 h-3 text-slate-500" /> {t.navPatients}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('emergency')} className="text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 transition-colors">
                  <ChevronRight className="w-3 h-3 text-rose-500" /> {t.navEmergency}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('blog')} className="hover:text-[#1769D2] flex items-center gap-1 transition-colors">
                  <ChevronRight className="w-3 h-3 text-slate-500" /> {t.navBlog}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('careers')} className="hover:text-[#1769D2] flex items-center gap-1 transition-colors">
                  <ChevronRight className="w-3 h-3 text-slate-500" /> {t.navCareers}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-[#1769D2] flex items-center gap-1 transition-colors">
                  <ChevronRight className="w-3 h-3 text-slate-500" /> {t.navFaq}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('testimonials')} className="hover:text-[#1769D2] flex items-center gap-1 transition-colors">
                  <ChevronRight className="w-3 h-3 text-slate-500" /> {t.navTestimonials}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-[#1769D2] flex items-center gap-1 transition-colors">
                  <ChevronRight className="w-3 h-3 text-slate-500" /> {t.navContact}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('404')} className="hover:text-slate-400 flex items-center gap-1 transition-colors text-slate-500">
                  <ChevronRight className="w-3 h-3 text-slate-600" /> 404 Page
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Clinical Departments */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase border-b border-slate-700 pb-2">
              {t.hospitalDepartments}
            </h4>
            <ul className="space-y-2 text-xs">
              {departmentsData.slice(0, 6).map(dept => (
                <li key={dept.id}>
                  <button 
                    onClick={() => navigateTo('department-details', { id: dept.id })}
                    className="hover:text-[#1769D2] flex items-center gap-2 transition-colors text-left"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-500 shrink-0" />
                    <span>{language === 'bn' ? dept.nameBn : dept.nameEn}</span>
                  </button>
                </li>
              ))}
              <li className="pt-1">
                <button
                  onClick={() => navigateTo('departments')}
                  className="text-xs text-[#0E9F92] hover:underline font-semibold flex items-center gap-1"
                >
                  <span>{language === 'bn' ? 'সকল ১৬টি বিভাগ দেখুন' : 'Explore All 16 Specialties'}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hotlines */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase border-b border-slate-700 pb-2">
              {t.contactInfo}
            </h4>
            
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#1769D2] shrink-0 mt-0.5" />
                <span>{language === 'bn' ? hospitalInfo.locationBn : hospitalInfo.locationEn}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0E9F92] shrink-0" />
                <div>
                  <p className="text-[11px] text-slate-400">{language === 'bn' ? 'অনুসন্ধান ও সিরিয়াল:' : 'Inquiry & Serial:'}</p>
                  <a href={`tel:${hospitalInfo.phoneEn.replace(/\s+/g, '')}`} className="font-semibold text-white hover:text-[#1769D2]">
                    {language === 'bn' ? hospitalInfo.phoneBn : hospitalInfo.phoneEn}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 bg-rose-950/40 border border-rose-900/50 rounded-lg">
                <Ambulance className="w-4 h-4 text-rose-400 shrink-0 animate-pulse" />
                <div>
                  <p className="text-[10px] text-rose-300 font-bold uppercase">{language === 'bn' ? 'জরুরি ও অ্যাম্বুলেন্স (২৪/৭):' : 'Emergency & Ambulance (24/7):'}</p>
                  <a href={`tel:${hospitalInfo.emergencyPhoneEn.replace(/\s+/g, '')}`} className="font-bold text-rose-200 hover:text-white">
                    {hospitalInfo.emergencyPhoneEn}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-slate-300">{hospitalInfo.email}</span>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <form onSubmit={handleNewsletterSubmit} className="pt-2">
              <label htmlFor="footer-newsletter" className="block text-[11px] text-slate-400 mb-1.5 font-medium">
                {language === 'bn' ? 'স্বাস্থ্য টিপস ও নিউজলেটার:' : 'Get Monthly Health Tips:'}
              </label>
              <div className="flex gap-1.5">
                <input
                  id="footer-newsletter"
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={language === 'bn' ? 'আপনার ইমেইল...' : 'Your email address...'}
                  className="bg-slate-800/90 border border-slate-700 text-xs px-3 py-1.5 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#1769D2] flex-1"
                />
                <button
                  type="submit"
                  className="bg-[#1769D2] text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-600 transition-colors shrink-0"
                  title="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Bar: Legal, Copyright, Demo Note */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <p>{t.copyright}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {t.demoDisclaimer}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button 
              onClick={() => navigateTo('privacy')} 
              className="hover:text-white transition-colors"
            >
              {t.navPrivacy}
            </button>
            <span className="text-slate-600">•</span>
            <button 
              onClick={() => navigateTo('terms')} 
              className="hover:text-white transition-colors"
            >
              {t.navTerms}
            </button>
            <span className="text-slate-600">•</span>
            <button 
              onClick={() => navigateTo('faq')} 
              className="hover:text-white transition-colors"
            >
              {t.navFaq}
            </button>
            <span className="text-slate-600">•</span>
            <button 
              onClick={() => navigateTo('emergency')} 
              className="text-rose-400 hover:text-rose-300 font-semibold transition-colors"
            >
              {t.navEmergency}
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
