import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import { jobOpeningsData, hospitalInfo } from '../data/hospitalData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Send, 
  Award, 
  Users 
} from 'lucide-react';

export const CareersPage: React.FC = () => {
  const { language, t, showToast } = useHospital();
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [applyForm, setApplyForm] = useState({ name: '', phone: '', email: '', experience: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyForm.name || !applyForm.phone) {
      showToast(language === 'bn' ? 'অনুগ্রহ করে নাম ও মোবাইল নম্বর দিন' : 'Please provide name and phone', 'warning');
      return;
    }
    setIsSubmitted(true);
    showToast(
      language === 'bn' ? 'আবেদন সফলভাবে গৃহীত হয়েছে!' : 'Job application submitted successfully!',
      'success'
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: t.navCareers }]} />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#142B45] to-[#1769D2] text-white rounded-3xl p-8 sm:p-12 shadow-xl">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-md">
            {language === 'bn' ? 'কর্মসংস্থান ও সুযোগ' : 'Join Our Healthcare Team'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {language === 'bn' ? 'দেবীদ্বার মেডিলাব হাসপাতালে ক্যারিয়ার' : 'Careers at Debidwar Medilab Hospital'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {language === 'bn'
              ? 'আমরা নিবেদিতপ্রাণ চিকিৎসক, দক্ষ নার্স এবং স্বাস্থ্যসেবা পেশাজীবীদের একটি আন্তরিক ও প্রগতিশীল কর্মপরিবেশ প্রদান করি।'
              : 'Be a part of a compassionate healthcare institution committed to transforming patient care across Cumilla.'}
          </p>
        </div>
      </div>

      {/* Workplace Culture Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1769D2] flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">
            {language === 'bn' ? 'পেশাগত উন্নয়ন ও প্রশিক্ষণ' : 'Continuous Clinical Growth'}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {language === 'bn' ? 'নিয়মিত সিএমই সেমিনার, বিএলএস ও ট্রমা ম্যানেজমেন্ট প্রশিক্ষণ।' : 'Regular CME sessions, BLS certifications, and hands-on skill enhancements.'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0E9F92] flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">
            {language === 'bn' ? 'সহায়ক ও শ্রদ্ধাপূর্ণ পরিবেশ' : 'Supportive Culture'}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {language === 'bn' ? 'মানবিক মূল্যবোধ, চিকিৎসক-নার্সদের পারস্পরিক শ্রদ্ধা ও নিরাপত্তা।' : 'Safe, respectful working ecosystem with modern hospital amenities.'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Briefcase className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">
            {language === 'bn' ? 'প্রতিযোগিতামূলক বেতন ভাতা' : 'Competitive Compensation'}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {language === 'bn' ? 'যোগ্যতা অনুযায়ী আকর্ষণীয় বেতন স্কেল ও উৎসব ভাতা।' : 'Fair salary structures, festival bonuses, and provident benefits.'}
          </p>
        </div>
      </div>

      {/* Open Positions List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">
          {language === 'bn' ? 'বর্তমান চাকুরির সুযোগসমূহ' : 'Current Job Openings'} ({jobOpeningsData.length})
        </h2>

        <div className="space-y-6">
          {jobOpeningsData.map(job => (
            <div
              key={job.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    {language === 'bn' ? job.titleBn : job.titleEn}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                    <span className="text-[#1769D2] font-semibold">{language === 'bn' ? job.departmentBn : job.departmentEn}</span>
                    <span>•</span>
                    <span>{language === 'bn' ? job.typeBn : job.typeEn}</span>
                    <span>•</span>
                    <span>{language === 'bn' ? job.experienceBn : job.experienceEn}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block">{language === 'bn' ? 'আবেদনের শেষ তারিখ:' : 'Application Deadline:'}</span>
                  <span className="text-xs font-bold text-rose-600">{job.deadline}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {language === 'bn' ? job.descriptionBn : job.descriptionEn}
              </p>

              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 mb-2">
                  {language === 'bn' ? 'যোগ্যতা ও প্রয়োজনীয়তা:' : 'Key Qualifications:'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  {(language === 'bn' ? job.requirementsBn : job.requirementsEn).map((req, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Apply Action */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => {
                    setSelectedJob(job.id);
                    setIsSubmitted(false);
                  }}
                  className="px-6 py-2.5 bg-[#1769D2] hover:bg-blue-600 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'এই পদে আবেদন করুন' : 'Apply for this Role'}
                </button>
                <span className="text-[11px] text-slate-400">
                  {language === 'bn' ? 'অথবা সিভি ইমেইল করুন: careers@debidwarmedilab.com' : 'or email CV to: careers@debidwarmedilab.com'}
                </span>
              </div>

              {/* Inline Application Drawer for Selected Job */}
              {selectedJob === job.id && (
                <div className="mt-4 p-6 bg-slate-50 rounded-2xl border border-slate-200 animate-in fade-in duration-150">
                  {isSubmitted ? (
                    <div className="text-center py-4 space-y-2">
                      <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <h5 className="font-bold text-slate-800 text-sm">
                        {language === 'bn' ? 'আপনার আবেদন সফলভাবে জমা হয়েছে!' : 'Application Successfully Received!'}
                      </h5>
                      <p className="text-xs text-slate-500">
                        {language === 'bn' ? 'আমাদের এইচআর বিভাগ শীঘ্রই শর্টলিস্টেড প্রার্থীদের সাথে যোগাযোগ করবে।' : 'Our HR department will contact shortlisted candidates.'}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleApplySubmit} className="space-y-4">
                      <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                        {language === 'bn' ? 'দ্রুত আবেদন ফর্ম' : 'Quick Application Form'}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          required
                          value={applyForm.name}
                          onChange={e => setApplyForm({ ...applyForm, name: e.target.value })}
                          placeholder={language === 'bn' ? 'আপনার পূর্ণ নাম' : 'Full Name'}
                          className="text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none"
                        />
                        <input
                          type="tel"
                          required
                          value={applyForm.phone}
                          onChange={e => setApplyForm({ ...applyForm, phone: e.target.value })}
                          placeholder={language === 'bn' ? 'মোবাইল নম্বর' : 'Phone Number'}
                          className="text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none"
                        />
                        <input
                          type="email"
                          value={applyForm.email}
                          onChange={e => setApplyForm({ ...applyForm, email: e.target.value })}
                          placeholder={language === 'bn' ? 'ইমেইল এড্রেস' : 'Email Address'}
                          className="text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none"
                        />
                      </div>
                      <div className="flex items-center justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setSelectedJob(null)}
                          className="px-4 py-1.5 text-xs text-slate-500 hover:text-slate-700"
                        >
                          {t.close}
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-[#0E9F92] hover:bg-teal-700 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                        >
                          {t.submit}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
