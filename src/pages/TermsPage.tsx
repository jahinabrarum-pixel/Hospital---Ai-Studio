import React from 'react';
import { useHospital } from '../context/HospitalContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FileText, AlertTriangle, CheckCircle, Scale } from 'lucide-react';

export const TermsPage: React.FC = () => {
  const { language, t } = useHospital();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: t.navTerms }]} />

      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-[#1769D2] bg-blue-50 px-3 py-1 rounded-md">
          {language === 'bn' ? 'ব্যবহারের শর্তাবলী' : 'Terms & Conditions'}
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900">
          {language === 'bn' ? 'হাসপাতালের সেবাসমূহ ব্যবহারের নিয়ম ও শর্তাবলী' : 'Hospital Service Terms & Conditions'}
        </h1>
        <p className="text-xs text-slate-500">
          {language === 'bn' ? 'সর্বশেষ হালনাগাদ: অক্টোবর ২০২৬ | দেবীদ্বার মেডিলাব হাসপাতাল' : 'Last Updated: October 2026 | Debidwar Medilab Hospital, Cumilla'}
        </p>
      </div>

      {/* Terms Content */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        
        <div className="space-y-2">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#1769D2]" />
            <span>{language === 'bn' ? '১. অ্যাপয়েন্টমেন্ট ও সিরিয়াল নীতিমালা' : '1. Chamber Appointment Guidelines'}</span>
          </h3>
          <p>
            {language === 'bn'
              ? 'অনলাইন সিরিয়াল বা টেলিফোনে বুকিং করা সিরিয়ালের সময়সূচী সম্মানিত চিকিৎসকের জরুরি অস্ত্রোপচার বা বিশেষ পরিস্থিতির কারণে সাময়িক পরিবর্তিত হতে পারে। নির্ধারিত সময়ের ১৫ মিনিট পূর্বে চেম্বার কাউন্টারে উপস্থিত হয়ে টোকেন নিশ্চিত করার অনুরোধ করা হচ্ছে।'
              : 'Doctor chamber visiting hours may be subject to unexpected delays due to emergency surgical procedures. Patients are requested to report to the reception desk 15 minutes prior to their allocated token time.'}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>{language === 'bn' ? '২. জরুরি ট্রমা ও জীবন সংশয় সংক্রান্ত' : '2. Critical Emergency & Trauma Disclaimer'}</span>
          </h3>
          <p>
            {language === 'bn'
              ? 'তীব্র হার্ট অ্যাটাক, সড়ক দুর্ঘটনা বা বিষক্রিয়ার মতো সংকটাপন্ন ক্ষেত্রে ওয়েবসাইটে সিরিয়াল না নিয়ে সরাসরি গ্রাউন্ড ফ্লোর জরুরি বিভাগে রোগীকে নিয়ে আসুন বা হটলাইনে ফোন করুন।'
              : 'In life-threatening situations (acute myocardial infarction, severe road trauma, poison ingestion), bypass appointment booking and proceed directly to our 24/7 Emergency Triage center.'}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{language === 'bn' ? '৩. ডায়াগনস্টিক রিপোর্ট সংগ্রহ' : '3. Diagnostic Report Collection'}</span>
          </h3>
          <p>
            {language === 'bn'
              ? 'প্যাথলজি ও রেডিওলজি রিপোর্ট সংগ্রহের সময় অবশ্যই মূল কম্পিউটারাইজড মানি রিসিট সঙ্গে আনতে হবে। অন্যথায় কোনো অননুমোদিত ব্যক্তির নিকট রিপোর্ট হস্তান্তর করা হবে না।'
              : 'Presentation of the official printed cash receipt with unique barcode is mandatory to collect diagnostic pathology and radiology reports.'}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#0E9F92]" />
            <span>{language === 'bn' ? '৪. অর্থ পরিশোধ ও বাতিলকরণ' : '4. Payment Terms & Demonstrations'}</span>
          </h3>
          <p>
            {language === 'bn'
              ? 'সকল প্রকার ফি হাসপাতালের নির্ধারিত কাউন্টারে নগদ বা ব্যাংকিং চ্যানেলে পরিশোধযোগ্য। কোনো দালাল বা মধ্যস্থতাকারীর সাথে আর্থিক লেনদেন সম্পূর্ণ নিষিদ্ধ।'
              : 'All medical consultation, diagnostic, and admission charges must be settled exclusively at official hospital billing desks. Official receipts are issued for all transactions.'}
          </p>
        </div>

      </div>

    </div>
  );
};
