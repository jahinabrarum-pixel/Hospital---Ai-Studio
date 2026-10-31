import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { 
  UserCheck, 
  Clock, 
  CreditCard, 
  ShieldAlert, 
  FileText, 
  CheckCircle2, 
  HelpCircle, 
  Building,
  Heart
} from 'lucide-react';

export const PatientsPage: React.FC = () => {
  const { language, t, navigateTo, openAppointmentModal } = useHospital();
  const [activeTab, setActiveTab] = useState<'admission' | 'discharge' | 'visitors' | 'rights' | 'billing'>('admission');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: t.navPatients }]} />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#142B45] to-[#1769D2] text-white rounded-3xl p-8 sm:p-12 shadow-xl">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-md">
            {language === 'bn' ? 'রোগী ও স্বজনদের সহায়িকা' : 'Patient & Visitor Information'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {language === 'bn' ? 'রোগী ভর্তি ও সেবামূলক নির্দেশিকা' : 'Your Guide to Hospital Care & Services'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {language === 'bn'
              ? 'ভর্তি প্রক্রিয়া, ছাড়পত্র, রোগী দেখার সময়সূচী, বিল পরিশোধের নিয়মাবলী এবং রোগীর অধিকার সম্পর্কিত যাবতীয় তথ্য।'
              : 'Everything you and your family need to know about admission, inpatient stay, visiting hours, and billing at Debidwar Medilab Hospital.'}
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
        {[
          { id: 'admission', labelEn: 'Inpatient Admission', labelBn: 'ভর্তি প্রক্রিয়া' },
          { id: 'discharge', labelEn: 'Discharge Process', labelBn: 'ছাড়পত্র বা ডিসচার্জ' },
          { id: 'visitors', labelEn: 'Visiting Hours & Rules', labelBn: 'রোগী দেখার সময়সূচী' },
          { id: 'billing', labelEn: 'Billing & Payments', labelBn: 'বিল ও পেমেন্ট ব্যবস্থা' },
          { id: 'rights', labelEn: 'Patient Rights & Duties', labelBn: 'রোগীর অধিকার ও দায়িত্ব' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#1769D2] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {language === 'bn' ? tab.labelBn : tab.labelEn}
          </button>
        ))}
      </div>

      {/* Tab Content Panes */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs">
        
        {/* Admission Procedure */}
        {activeTab === 'admission' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">
                {t.admissionProcedure}
              </h2>
              <p className="text-xs text-slate-500">
                {language === 'bn' ? 'জরুরি বা রুটিন ভর্তির ক্ষেত্রে নিচের ধাপগুলো অনুসরণ করুন।' : 'Standard procedure for scheduled or emergency inpatient hospitalization.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                <span className="w-8 h-8 rounded-lg bg-blue-100 text-[#1769D2] flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <h4 className="font-bold text-slate-800 text-sm">
                  {language === 'bn' ? 'চিকিৎসকের ভর্তি পরামর্শ (Doctor Rx)' : 'Doctor Admission Order'}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {language === 'bn' 
                    ? 'আমাদের বহির্বিভাগ বা জরুরি বিভাগের চিকিৎসকের লিখিত ভর্তির পরামর্শপত্র নিয়ে নিচতলার ভর্তি কাউন্টারে আসুন।' 
                    : 'Present the physician admission order at the 24/7 Ground Floor Inpatient Admission Desk.'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                <span className="w-8 h-8 rounded-lg bg-blue-100 text-[#1769D2] flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <h4 className="font-bold text-slate-800 text-sm">
                  {language === 'bn' ? 'কেবিন বা ওয়ার্ড নির্বাচন' : 'Cabin or Ward Selection'}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {language === 'bn' 
                    ? 'আপনার পছন্দ ও সাধ্য অনুযায়ী ভিআইপি এসি কেবিন, নন-এসি কেবিন বা সাধারণ ওয়ার্ডের বেড বরাদ্দ নিন।' 
                    : 'Choose from Deluxe AC Cabins, Standard Single Cabins, or Male/Female General Ward beds based on availability.'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                <span className="w-8 h-8 rounded-lg bg-blue-100 text-[#1769D2] flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <h4 className="font-bold text-slate-800 text-sm">
                  {language === 'bn' ? 'প্রাথমিক ফাইল তৈরি ও স্থানান্তর' : 'File Creation & Escort'}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {language === 'bn' 
                    ? 'নির্ধারিত এটেনডেন্ট পাস গ্রহণ করার পর নার্সিং স্টাফ রোগীকে কেবিন বা ওয়ার্ডে স্থানান্তর করবেন।' 
                    : 'Receive your attendant badge, inpatient wristband, and nursing escort to your prepared room.'}
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-xs text-blue-900 space-y-1">
              <p className="font-bold">{language === 'bn' ? 'ভর্তির সময় যা সাথে রাখবেন:' : 'Items to bring for admission:'}</p>
              <p>• {language === 'bn' ? 'রোগী ও অভিভাবকের জাতীয় পরিচয়পত্র বা জন্মনিবন্ধন কপি।' : 'Patient photo ID / NID card or birth registration.'}</p>
              <p>• {language === 'bn' ? 'পূর্বের সকল প্রেসক্রিপশন ও রোগনির্ণয় পরীক্ষার ফাইল।' : 'Previous diagnostic test reports, medication list, and surgical discharge history.'}</p>
            </div>
          </div>
        )}

        {/* Discharge Process */}
        {activeTab === 'discharge' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">
                {t.dischargeProcedure}
              </h2>
              <p className="text-xs text-slate-500">
                {language === 'bn' ? 'সুস্থ হয়ে বাড়ি ফেরার ধাপ ও ছাড়পত্র সংগ্রহের নিয়ম।' : 'Smooth and transparent checkout and medication counseling process.'}
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{language === 'bn' ? 'কনসালট্যান্টের ছাড়পত্র অনুমোদন' : 'Consultant Discharge Approval'}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{language === 'bn' ? 'সকালের রাউন্ডের সময় কনসালট্যান্ট চিকিৎসক রোগীকে পরীক্ষা করে ছাড়পত্র অনুমোদন করবেন।' : 'The attending specialist approves final discharge during morning clinical rounds.'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{language === 'bn' ? 'বিল প্রস্তুতি ও পরিশোধ' : 'Clearance & Billing Reconciliation'}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{language === 'bn' ? 'বিলিং কাউন্টার থেকে চূড়ান্ত স্বচ্ছ কম্পিউটারাইজড বিল গ্রহণ করে নগদ, বিকাশ বা কার্ডে পরিশোধ করুন।' : 'Review the detailed itemized bill and settle accounts at the central cash counter.'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{language === 'bn' ? 'ছাড়পত্র ও ওষুধের নির্দেশনা হস্তান্তর' : 'Discharge Summary & Prescription Counseling'}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{language === 'bn' ? 'বাসায় নিয়মমাফিক ওষুধ সেবন, পরবর্তী সাক্ষাতের তারিখ এবং জরুরি পরামর্শ সম্বলিত ডিসচার্জ সামারি প্রদান করা হবে।' : 'Nursing staff will deliver the physician-signed Discharge Summary with follow-up appointment date and dietary guidance.'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Visiting Hours & Rules */}
        {activeTab === 'visitors' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">
                {t.visitingHoursTitle}
              </h2>
              <p className="text-xs text-slate-500">
                {language === 'bn' ? 'রোগীদের মানসিক শান্তি ও সংক্রমণমুক্ত পরিবেশ রক্ষার জন্য নিয়মাবলী মেনে চলুন।' : 'Strict visiting guidelines designed to protect vulnerable patients from infections.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
                <div className="flex items-center gap-2 text-[#1769D2]">
                  <Clock className="w-5 h-5" />
                  <h4 className="font-bold text-sm">{language === 'bn' ? 'কেবিন ও সাধারণ ওয়ার্ডের সময়সূচী' : 'General Wards & Cabins'}</h4>
                </div>
                <p className="text-lg font-black text-slate-900">
                  {language === 'bn' ? 'প্রতিদিন বিকাল ৪:৩০ - সন্ধ্যা ৬:৩০' : 'Daily: 4:30 PM - 6:30 PM'}
                </p>
                <p className="text-xs text-slate-600">
                  {language === 'bn' ? 'প্রতি রোগীর সাথে সর্বাধিক ২ জন দর্শনার্থী একই সময়ে প্রবেশ করতে পারবেন।' : 'Maximum 2 visitors at bedside simultaneously to prevent overcrowding.'}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
                <div className="flex items-center gap-2 text-rose-600">
                  <ShieldAlert className="w-5 h-5" />
                  <h4 className="font-bold text-sm">{language === 'bn' ? 'আইসিইউ / সিসিইউ দেখার নিয়ম' : 'ICU / CCU Patient Guidelines'}</h4>
                </div>
                <p className="text-lg font-black text-slate-900">
                  {language === 'bn' ? 'বিকাল ৫:০০ - ৫:৩০ (মাত্র ১ জন)' : '5:00 PM - 5:30 PM (1 Family Member)'}
                </p>
                <p className="text-xs text-slate-600">
                  {language === 'bn' ? 'আইসিইউতে প্রবেশের পূর্বে জীবাণুমুক্ত গাউন ও শু-কভার পরিধান বাধ্যতামূলক।' : 'Sterile gown and shoe covers mandatory prior to entering critical care suites.'}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <p className="font-semibold text-slate-800">{language === 'bn' ? 'সাধারণ নীতিমালা:' : 'General Rules:'}</p>
              <p>• {language === 'bn' ? 'হাসপাতালে উচ্চস্বরে কথা বলা বা শব্দ করা সম্পূর্ণ নিষিদ্ধ।' : 'Maintain silence. Silence mobile ringers inside wards.'}</p>
              <p>• {language === 'bn' ? '১০ বছরের কম বয়সী শিশুদের সংক্রামক ওয়ার্ডে না আনার পরামর্শ দেওয়া হচ্ছে।' : 'Children under 10 are discouraged from visiting inpatient rooms for infection safety.'}</p>
              <p>• {language === 'bn' ? 'হাসপাতাল চত্বর সম্পূর্ণ ধূমপান ও তামাকমুক্ত এলাকা।' : 'Entire hospital premises is a strictly designated 100% smoke-free zone.'}</p>
            </div>
          </div>
        )}

        {/* Billing & Payments */}
        {activeTab === 'billing' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">
                {t.financialInfo}
              </h2>
              <p className="text-xs text-slate-500">
                {language === 'bn' ? 'স্বচ্ছ বিলিং ও গ্রহণযোগ্য মূল্য পরিশোধের মাধ্যমসমূহ।' : 'Transparent itemized accounting with zero hidden costs.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1 text-xs">
                <span className="font-bold text-slate-800 block text-sm">{language === 'bn' ? 'নগদ টাকা (BDT)' : 'Cash (BDT)'}</span>
                <p className="text-slate-500">{language === 'bn' ? 'প্রধান ক্যাশ কাউন্টারে সরাসরি পরিশোধ।' : 'Direct cash receipts at all 24/7 billing counters.'}</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1 text-xs">
                <span className="font-bold text-slate-800 block text-sm">{language === 'bn' ? 'মোবাইল ফিনান্সিয়াল সার্ভিস' : 'Mobile Banking (MFS)'}</span>
                <p className="text-slate-500">bKash, Nagad, Rocket Merchant QR Payments.</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1 text-xs">
                <span className="font-bold text-slate-800 block text-sm">{language === 'bn' ? 'ব্যাংক কার্ড' : 'Debit / Credit Cards'}</span>
                <p className="text-slate-500">VISA, MasterCard, and DBBL Nexus cards accepted.</p>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              {language === 'bn' 
                ? 'দাবিত্যাগ: কোনো কর্মচারী বা দালালের হাতে নগদ টাকা লেনদেন করবেন না। শুধুমাত্র হাসপাতালের ক্যাশ কাউন্টারের সিলযুক্ত কম্পিউটারাইজড মানি রিসিট গ্রহণ করুন।' 
                : 'Notice: Always collect official printed money receipts from authorized hospital counters. Do not hand cash to unauthorized individuals.'}
            </p>
          </div>
        )}

        {/* Patient Rights & Duties */}
        {activeTab === 'rights' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">
                {t.patientRights}
              </h2>
              <p className="text-xs text-slate-500">
                {language === 'bn' ? 'বিশ্ব স্বাস্থ্য সংস্থা ও বাংলাদেশ স্বাস্থ্য নীতি অনুযায়ী রোগীর অধিকার ও দায়িত্ব।' : 'Standards of clinical ethics upholding dignity and informed consent.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 text-[#1769D2]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{language === 'bn' ? 'রোগীর অধিকারসমূহ' : 'Patient Rights'}</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li>• {language === 'bn' ? 'ধর্ম, বর্ণ বা আর্থিক সক্ষমতা নির্বিশেষে মর্যাদা ও শ্রদ্ধাপূর্ণ সেবা পাওয়ার অধিকার।' : 'Right to respectful and compassionate care without discrimination.'}</li>
                  <li>• {language === 'bn' ? 'চিকিৎসা, সম্ভাব্য বিকল্প এবং অপারেশনের ঝুঁকি সম্পর্কে বিস্তারিত জানার অধিকার।' : 'Right to informed consent and complete explanation of medical treatments.'}</li>
                  <li>• {language === 'bn' ? 'ব্যক্তিগত তথ্য ও মেডিকেল রেকর্ডের সম্পূর্ণ গোপনীয়তা রক্ষার অধিকার।' : 'Right to privacy and confidentiality of medical history and diagnostic findings.'}</li>
                  <li>• {language === 'bn' ? 'যেকোনো সময় বিলের বিস্তারিত বিবরণ ও দ্বিতীয় বিশেষজ্ঞের মত নেওয়ার অধিকার।' : 'Right to an itemized invoice and seeking a second clinical opinion.'}</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 text-[#0E9F92]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{language === 'bn' ? 'রোগী ও স্বজনের দায়িত্বসমূহ' : 'Patient Responsibilities'}</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li>• {language === 'bn' ? 'পূর্বের সকল অসুখ ও নিয়মিত ওষুধের সঠিক তথ্য চিকিৎসককে প্রদান করা।' : 'Provide complete and accurate health history and ongoing prescription details.'}</li>
                  <li>• {language === 'bn' ? 'হাসপাতালের নিয়ম, দর্শনার্থীদের সময় এবং নীরবতা মেনে চলা।' : 'Comply with hospital visiting rules and maintain quiet environment for co-patients.'}</li>
                  <li>• {language === 'bn' ? 'চিকিৎসক, নার্স ও হাসপাতালের সকল কর্মীর সাথে সৌজন্যমূলক আচরণ বজায় রাখা।' : 'Treat clinical staff and fellow patients with mutual courtesy and dignity.'}</li>
                  <li>• {language === 'bn' ? 'হাসপাতালের সম্পত্তি ও মেডিকেল যন্ত্রপাতির ক্ষতি না করা।' : 'Respect hospital property and avoid damage to healthcare equipment.'}</li>
                </ul>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
