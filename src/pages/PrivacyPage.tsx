import React from 'react';
import { useHospital } from '../context/HospitalContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  const { language, t } = useHospital();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: t.navPrivacy }]} />

      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-[#1769D2] bg-blue-50 px-3 py-1 rounded-md">
          {language === 'bn' ? 'আইনি ও নীতিমালা' : 'Legal & Compliance'}
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900">
          {language === 'bn' ? 'গোপনীয়তা ও তথ্য সুরক্ষা নীতি' : 'Privacy & Medical Data Protection Policy'}
        </h1>
        <p className="text-xs text-slate-500">
          {language === 'bn' ? 'সর্বশেষ হালনাগাদ: অক্টোবর ২০২৬ | দেবীদ্বার মেডিলাব হাসপাতাল' : 'Last Updated: October 2026 | Debidwar Medilab Hospital'}
        </p>
      </div>

      {/* Content Sections */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        
        <div className="space-y-2">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#1769D2]" />
            <span>{language === 'bn' ? '১. তথ্যের গোপনীয়তা রক্ষা' : '1. Confidentiality of Patient Health Data'}</span>
          </h3>
          <p>
            {language === 'bn'
              ? 'দেবীদ্বার মেডিলাব হাসপাতালে সংরক্ষিত সকল রোগীর স্বাস্থ্য সংক্রান্ত তথ্য, প্যাথলজিক্যাল রিপোর্ট এবং চিকিৎসা সংক্রান্ত নথি সর্বোচ্চ সতর্কতার সাথে সুরক্ষিত রাখা হয়। রোগীর লিখিত অনুমতি ব্যতীত কোনো তৃতীয় পক্ষের কাছে তথ্য প্রদান করা হয় না।'
              : 'Debidwar Medilab Hospital maintains the highest degree of confidentiality regarding all patient medical records, diagnostic lab reports, and consultation histories in accordance with Bangladesh healthcare ethics and data privacy norms.'}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#0E9F92]" />
            <span>{language === 'bn' ? '২. সংগৃহীত তথ্যের ধরণ' : '2. Categories of Information Collected'}</span>
          </h3>
          <p>
            {language === 'bn'
              ? 'অ্যাপয়েন্টমেন্ট গ্রহণ ও হাসপাতালে ভর্তির সময় রোগীর নাম, বয়স, লিঙ্গ, যোগাযোগের মোবাইল নম্বর এবং পূর্ববর্তী চিকিৎসা ইতিহাস সংগ্রহ করা হয়। এই তথ্য শুধুমাত্র নির্ভুল চিকিৎসাসেবা ও যোগাযোগের উদ্দেশ্যে ব্যবহৃত হয়।'
              : 'When booking appointments or during inpatient admission, we collect essential demographic data (name, age, gender, contact number) and clinical history exclusively to facilitate proper medical care and follow-up.'}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{language === 'bn' ? '৩. ওয়েবসাইটের ডেমো ডেটা সুরক্ষা' : '3. Website Demonstration Security'}</span>
          </h3>
          <p>
            {language === 'bn'
              ? 'এই ওয়েবসাইটে প্রদত্ত অনলাইন অ্যাপয়েন্টমেন্ট ফর্মটি একটি প্রদর্শনী (Demo) ইন্টারফেস। এতে কোনো সংবেদনশীল ক্রেডিট কার্ড পিন বা আর্থিক পাসওয়ার্ড গ্রহণ করা হয় না।'
              : 'The online appointment booking interface functions as a demonstration mechanism. It does not store or process sensitive credit card pins or financial security credentials.'}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Eye className="w-4 h-4 text-amber-600" />
            <span>{language === 'bn' ? '৪. যোগাযোগ ও জিজ্ঞাসা' : '4. Inquiries & Data Rights'}</span>
          </h3>
          <p>
            {language === 'bn'
              ? 'আপনার চিকিৎসা রেকর্ড বা গোপনীয়তা সংক্রান্ত যেকোনো বিষয়ে হাসপাতালের প্রশাসনিক কর্মকর্তা বা info@debidwarmedilab.com এ সরাসরি যোগাযোগ করতে পারেন।'
              : 'For inquiries regarding medical records or privacy compliance, please contact our hospital administrative officer or email info@debidwarmedilab.com.'}
          </p>
        </div>

      </div>

    </div>
  );
};
