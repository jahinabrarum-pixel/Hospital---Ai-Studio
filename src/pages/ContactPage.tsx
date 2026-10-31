import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import { hospitalInfo } from '../data/hospitalData';
import { isValidBdPhone } from '../utils/hospitalLogic';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Ambulance, 
  CheckCircle2, 
  Navigation, 
  ExternalLink 
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { language, t, showToast } = useHospital();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'general',
    message: ''
  });

  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      showToast(
        language === 'bn' ? 'অনুগ্রহ করে সকল আবশ্যক ঘরগুলো পূরণ করুন।' : 'Please fill in all required fields.',
        'warning'
      );
      return;
    }

    if (!isValidBdPhone(form.phone)) {
      showToast(
        language === 'bn' ? 'সঠিক মোবাইল নম্বর দিন (যেমন: 01711234567)' : 'Please enter a valid Bangladesh phone number.',
        'warning'
      );
      return;
    }

    setIsSent(true);
    showToast(
      language === 'bn' ? 'আপনার বার্তাটি সফলভাবে গৃহীত হয়েছে!' : 'Your message has been received successfully!',
      'success'
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: t.navContact }]} />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#142B45] to-[#1769D2] text-white rounded-3xl p-8 sm:p-12 shadow-xl">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-md">
            {language === 'bn' ? 'যোগাযোগ ও অবস্থান' : 'Contact & Directions'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {language === 'bn' ? 'আমাদের সাথে যোগাযোগ করুন' : 'Get in Touch with Our Team'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {language === 'bn'
              ? 'দেবীদ্বার মেডিলাব হাসপাতালের অবস্থান, জরুরি হটলাইন নম্বর ও যেকোনো স্বাস্থ্য জিজ্ঞাসায় আমাদের সহায়তা কেন্দ্র সার্বক্ষণিক প্রস্তুত।'
              : 'Conveniently located at Debidwar Bazar on Hospital Road with 24/7 emergency access, patient reception, and ambulance coordination.'}
          </p>
        </div>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Address */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1769D2] flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">
            {language === 'bn' ? 'হাসপাতালের অবস্থান' : 'Hospital Address'}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {language === 'bn' ? hospitalInfo.locationBn : hospitalInfo.locationEn}
          </p>
          <p className="text-[11px] text-slate-400">
            {language === 'bn' ? 'ল্যান্ডমার্ক: দেবীদ্বার নিউ মার্কেট ও থানা সংলগ্ন' : 'Near Debidwar Central Bazar & Upazila Health Complex'}
          </p>
        </div>

        {/* Card 2: Hotlines */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#0E9F92] flex items-center justify-center">
            <Phone className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">
            {language === 'bn' ? 'টেলিফোন ও হটলাইন' : 'Phone Numbers & Helpline'}
          </h3>
          <div className="text-xs space-y-1 text-slate-600">
            <p><span className="text-slate-400">{language === 'bn' ? 'অনুসন্ধান ও সিরিয়াল:' : 'Inquiry & Serial:'}</span> <a href={`tel:${hospitalInfo.phoneEn}`} className="font-bold text-[#1769D2]">{hospitalInfo.phoneEn}</a></p>
            <p><span className="text-slate-400">{language === 'bn' ? 'জরুরি ট্রমা হটলাইন:' : 'Emergency Hotline:'}</span> <a href={`tel:${hospitalInfo.emergencyPhoneEn}`} className="font-bold text-rose-600">{hospitalInfo.emergencyPhoneEn}</a></p>
            <p><span className="text-slate-400">{language === 'bn' ? 'অ্যাম্বুলেন্স ২৪/৭:' : 'Ambulance 24/7:'}</span> <span className="font-bold text-slate-800">{hospitalInfo.ambulancePhoneEn}</span></p>
          </div>
        </div>

        {/* Card 3: Hours & Email */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">
            {language === 'bn' ? 'কর্মঘণ্টা ও ইমেইল' : 'Hours & Email'}
          </h3>
          <div className="text-xs space-y-1 text-slate-600">
            <p className="font-semibold text-emerald-600">
              {language === 'bn' ? 'জরুরি ও ইনডোর: ২৪ ঘণ্টা খোলা' : 'Emergency & Inpatient: Open 24/7'}
            </p>
            <p className="text-slate-500">
              {language === 'bn' ? 'আউটডোর ও চেম্বার: সকাল ৮:০০ - রাত ১০:০০' : 'OPD Chambers: 8:00 AM - 10:00 PM Daily'}
            </p>
            <p className="pt-2 text-slate-400">
              Email: <span className="font-medium text-slate-700">{hospitalInfo.email}</span>
            </p>
          </div>
        </div>

      </div>

      {/* Interactive Form & Map Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Message Form */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 mb-1">
            {language === 'bn' ? 'আমাদের বার্তা পাঠান' : 'Send an Inquiry or Message'}
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            {language === 'bn' ? 'যেকোনো জিজ্ঞাসা বা মতামতের জন্য ফর্মটি পূরণ করে পাঠান।' : 'Fill out the form below and our representative will respond promptly.'}
          </p>

          {isSent ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-800 text-base">
                {language === 'bn' ? 'ধন্যবাদ! আপনার বার্তাটি পাঠানো হয়েছে।' : 'Thank you! Your message has been sent.'}
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                {language === 'bn' ? 'আমাদের টিম শীঘ্রই আপনার নম্বরে যোগাযোগ করবে।' : 'Our team will contact you shortly regarding your inquiry.'}
              </p>
              <button
                onClick={() => {
                  setIsSent(false);
                  setForm({ name: '', phone: '', email: '', subject: 'general', message: '' });
                }}
                className="mt-2 px-4 py-2 text-xs font-semibold text-[#1769D2] hover:underline"
              >
                {language === 'bn' ? 'আরেকটি বার্তা পাঠান' : 'Send another message'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-form-name" className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'bn' ? 'আপনার নাম' : 'Your Name'} <span className="text-rose-500">*</span>
                </label>
                <input
                  id="contact-form-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder={language === 'bn' ? 'নাম লিখুন' : 'Enter your name'}
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1769D2]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-form-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'bn' ? 'মোবাইল নম্বর' : 'Phone Number'} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-form-phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="01711234567"
                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1769D2]"
                  />
                </div>

                <div>
                  <label htmlFor="contact-form-email" className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'bn' ? 'ইমেইল (ঐচ্ছিক)' : 'Email (Optional)'}
                  </label>
                  <input
                    id="contact-form-email"
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1769D2]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-form-subject" className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'bn' ? 'বিষয়' : 'Subject'}
                </label>
                <select
                  id="contact-form-subject"
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1769D2]"
                >
                  <option value="general">{language === 'bn' ? 'সাধারণ জিজ্ঞাসা' : 'General Inquiry'}</option>
                  <option value="doctor">{language === 'bn' ? 'ডাক্তারের চেম্বার সংক্রান্ত' : 'Doctor Chamber & Visiting'}</option>
                  <option value="diagnostic">{language === 'bn' ? 'ডায়াগনস্টিক টেস্ট তথ্য' : 'Diagnostic Tests & Reports'}</option>
                  <option value="feedback">{language === 'bn' ? 'মতামত বা অভিযোগ' : 'Feedback / Complaint'}</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-form-message" className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'bn' ? 'আপনার বার্তা' : 'Your Message'} <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="contact-form-message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder={language === 'bn' ? 'কীভাবে আপনাকে সহযোগিতা করতে পারি...' : 'How can we help you...'}
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1769D2]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1769D2] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{language === 'bn' ? 'বার্তা পাঠান' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Map & Directions */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#1769D2]" />
                <span>{language === 'bn' ? 'মানচিত্র ও যাতায়াত নির্দেশিকা' : 'Location Map & Getting Here'}</span>
              </h2>
              <span className="text-xs text-slate-400">Debidwar, Cumilla</span>
            </div>

            {/* Map Frame */}
            <div className="h-64 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative">
              <iframe
                title="Debidwar Medilab Hospital Location Map"
                src={hospitalInfo.googleMapsEmbed}
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>

            {/* Travel directions */}
            <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <h4 className="font-bold text-slate-800 text-xs">
                {language === 'bn' ? 'বিভিন্ন স্থান থেকে যাতায়াতের বিবরণ:' : 'How to Reach Us:'}
              </h4>
              <p>• <span className="font-semibold text-slate-700">{language === 'bn' ? 'কুমিল্লা শহর থেকে:' : 'From Cumilla City:'}</span> {language === 'bn' ? 'কুমিল্লা-সিলেট মহাসড়ক হয়ে সিএনজি বা বাসে ২৫-৩০ মিনিট (দেবীদ্বার বাসস্ট্যান্ড সংলগ্ন)।' : 'Via Cumilla-Sylhet Regional Highway by bus or CNG auto-rickshaw (approx. 25-30 mins).'}</p>
              <p>• <span className="font-semibold text-slate-700">{language === 'bn' ? 'মুরাদনগর বা ব্রাহ্মণপাড়া থেকে:' : 'From Muradnagar / Brahmanpara:'}</span> {language === 'bn' ? 'সরাসরি দেবীদ্বার বাজার সংযোগ সড়ক হয়ে সহজে হাসপাতালে পৌঁছানো যায়।' : 'Direct road access to Debidwar Bazar Hospital Road.'}</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
