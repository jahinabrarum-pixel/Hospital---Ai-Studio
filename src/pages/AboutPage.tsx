import React from 'react';
import { useHospital } from '../context/HospitalContext';
import { hospitalInfo } from '../data/hospitalData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { 
  HeartPulse, 
  ShieldCheck, 
  Clock, 
  Target, 
  Eye, 
  Award, 
  CheckCircle, 
  Users, 
  Activity, 
  Building 
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { language, t, navigateTo, openAppointmentModal } = useHospital();

  const values = [
    {
      titleEn: 'Patient-First Compassion',
      titleBn: 'রোগীবান্ধব মানবিক সেবা',
      descEn: 'Every patient is treated with deep empathy, dignity, and personal attention regardless of socio-economic status.',
      descBn: 'সামাজিক বা অর্থনৈতিক ভেদাভেদ ভুলে প্রত্যেক রোগীকে আন্তরিক সহানুভূতি ও মর্যাদার সাথে সেবা প্রদান।'
    },
    {
      titleEn: 'Diagnostic Precision',
      titleBn: 'নির্ভুল রোগনির্ণয়',
      descEn: 'Zero tolerance for diagnostic errors through automated analyzers and double verification by specialists.',
      descBn: 'সর্বাধুনিক অটোমেটেড ল্যাব ও বিশেষজ্ঞদের প্রত্যক্ষ পর্যবেক্ষণে শতভাগ নির্ভরযোগ্য মেডিকেল রিপোর্ট।'
    },
    {
      titleEn: 'Affordability & Transparency',
      titleBn: 'স্বচ্ছতা ও সাশ্রয়ী চিকিৎসা',
      descEn: 'Fair, transparent billing without hidden costs, making advanced healthcare accessible for Debidwar families.',
      descBn: 'অপ্রয়োজনীয় টেস্ট পরিহার ও সাশ্রয়ী মূল্যে সঠিক চিকিৎসার মাধ্যমে সাধারণ মানুষের চিকিৎসা ব্যয় কমানো।'
    },
    {
      titleEn: '24/7 Rapid Emergency Response',
      titleBn: 'সার্বক্ষণিক জরুরি প্রস্তুতি',
      descEn: 'Trauma and cardiac resuscitation readiness around the clock with immediate ambulance dispatch.',
      descBn: 'দিন-রাত যেকোনো সময় হার্ট অ্যাটাক, দুর্ঘটনা বা মুমূর্ষু রোগীর তাৎক্ষণিক জীবনরক্ষাকারী চিকিৎসার পূর্ণাঙ্গ প্রস্তুতি।'
    }
  ];

  const milestones = [
    {
      year: '2018',
      titleEn: 'Hospital Foundation & DGHS Licensing',
      titleBn: 'হাসপাতালের যাত্রা শুরু ও সরকারি অনুমোদন',
      descEn: 'Inauguration of Debidwar Medilab with 50 beds and primary outpatient specialty clinics.',
      descBn: '৫০ শয্যা ও প্রাথমিক বহির্বিভাগীয় চেম্বার নিয়ে দেবীদ্বার মেডিলাব হাসপাতালের আনুষ্ঠানিক শুভ উদ্বোধন।'
    },
    {
      year: '2020',
      titleEn: 'Central Oxygen & Critical Care Unit',
      titleBn: 'সেন্ট্রাল অক্সিজেন প্ল্যান্ট ও ক্রিটিক্যাল কেয়ার',
      descEn: 'Installed central piped medical oxygen and expanded emergency resuscitation infrastructure.',
      descBn: 'করোনাকালীন সংকট মোকাবেলায় সেন্ট্রাল মেডিকেল অক্সিজেন লাইন ও আইসিইউ ইউনিট স্থাপন।'
    },
    {
      year: '2022',
      titleEn: 'Modular OT & 4D Digital Imaging',
      titleBn: 'মডুলার অপারেশন থিয়েটার ও ৪ডি ইমেজিং',
      descEn: 'Introduced laminar air-flow surgical suites and 4D Color Doppler ultrasound systems.',
      descBn: 'ল্যাপারোস্কোপিক সার্জারির জন্য জীবাণুমুক্ত মডুলার ওটি ও জাপানি ৪ডি আল্ট্রাসনোগ্রাম সংযোজন।'
    },
    {
      year: '2026',
      titleEn: 'Comprehensive 100-Bed Tertiary Facility',
      titleBn: 'পূর্ণাঙ্গ ১০০ শয্যার অত্যাধুনিক হাসপাতাল',
      descEn: '16 dedicated specialty departments, 35+ consultant physicians, and round-the-clock emergency care.',
      descBn: '১৬টি বিশেষায়িত বিভাগ, ৩৫+ বিশেষজ্ঞ চিকিৎসক এবং উত্তর কুমিল্লার স্বাস্থ্যসেবার আস্থার প্রতীক।'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: t.navAbout }]} />

      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-[#142B45] to-[#1769D2] text-white rounded-3xl p-8 sm:p-14 overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-md">
            {language === 'bn' ? 'দেবীদ্বার মেডিলাব হাসপাতাল' : 'About Debidwar Medilab Hospital'}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            {language === 'bn'
              ? 'মানবিক চিকিৎসাসেবার বিশ্বস্ত ঠিকানা'
              : 'Dedicated to Healing and Serving Our Community'}
          </h1>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {language === 'bn'
              ? 'দেবীদ্বার, মুরাদনগর, চান্দিনা ও ব্রাহ্মণপাড়া অঞ্চলের মানুষের জন্য আন্তর্জাতিক মানসম্পন্ন আধুনিক চিকিৎসা এবং বিশেষজ্ঞ ডাক্তারের পরামর্শ নিশ্চিত করাই আমাদের মূল ব্রত।'
              : 'Located in Debidwar, Cumilla, we blend clinical expertise, cutting-edge technology, and compassionate care to provide healing for every generation.'}
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1769D2] flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            {language === 'bn' ? 'আমাদের লক্ষ্য (Our Mission)' : 'Our Mission'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {language === 'bn'
              ? 'উত্তর কুমিল্লার প্রতিটি নাগরিকের জন্য মানসম্মত, আধুনিক ও সাশ্রয়ী স্বাস্থ্যসেবা নিশ্চিত করা। রোগী ও স্বজনদের আস্থা অর্জন এবং রোগ নিরাময়ে আন্তরিক মানবিক সেবা প্রদানে আমরা অবিচল।'
              : 'To deliver accessible, affordable, and high-quality clinical healthcare to the community of Debidwar and neighboring areas with unwavering clinical ethics and warmth.'}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#0E9F92] flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            {language === 'bn' ? 'আমাদের দর্শন (Our Vision)' : 'Our Vision'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {language === 'bn'
              ? 'কুমিল্লা জেলার শ্রেষ্ঠ আধুনিক ও আদর্শ হাসপাতাল হিসেবে আত্মপ্রকাশ করা, যেখানে উন্নত ডায়াগনস্টিক নির্ভুলতা ও বিশেষজ্ঞ চিকিৎসকদের সমন্বয়ে রোগীরা ঢাকায় না গিয়েই বিশ্বমানের চিকিৎসা পাবেন।'
              : 'To be the most trusted healthcare institution in Cumilla district, eliminating the necessity for patients to travel to metropolitan capitals for standard medical, surgical, and emergency interventions.'}
          </p>
        </div>

      </div>

      {/* Hospital Infrastructure & Facility Highlights */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {language === 'bn' ? 'হাসপাতালের অবকাঠামো ও আধুনিক সুবিধাসমূহ' : 'Hospital Infrastructure & Key Highlights'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {language === 'bn' ? 'রোগীদের সর্বোচ্চ আরাম ও জীবাণুমুক্ত পরিবেশ নিশ্চিত করতে আমাদের আধুনিক আয়োজন' : 'State-of-the-art facilities designed for patient comfort and clinical safety'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              titleEn: '100+ Bedded Inpatient Facility',
              titleBn: '১০০+ শয্যাবিশিষ্ট অন্তর্বিভাগ',
              descEn: 'Air-conditioned VIP cabins, deluxe cabins, and hygienically maintained separate male/female general wards.',
              descBn: 'শীতাতপ নিয়ন্ত্রিত ভিআইপি কেবিন ও স্বাস্থ্যসম্মত পুরুষ-মহিলা জেনারেল ওয়ার্ড।'
            },
            {
              titleEn: 'Laminar Air-Flow Modular OT',
              titleBn: 'ল্যামিনার ফ্লো মডুলার ওটি',
              descEn: 'Four ultra-sterile surgical theaters for general, laparoscopic, gynecological, and orthopedic surgeries.',
              descBn: 'সংক্রমণমুক্ত পরিবেশে বড় ধরনের সার্জারি ও সিজারিয়ানের জন্য ৪টি আধুনিক ওটি।'
            },
            {
              titleEn: 'High-Dependency ICU / HDU',
              titleBn: 'আইসিইউ ও এইচডিইউ ক্রিটিক্যাল কেয়ার',
              descEn: 'Life-support mechanical ventilators, multipara cardiac monitors, and 24-hour critical care supervision.',
              descBn: 'লাইফ সাপোর্ট ভেন্টিলেটর ও সার্বক্ষণিক চিকিৎসক সমৃদ্ধ নিবিড় পরিচর্যা কেন্দ্র।'
            },
            {
              titleEn: 'Fully Automated Pathology Lab',
              titleBn: 'অটোমেটেড প্যাথলজি ল্যাবরেটরি',
              descEn: 'Japanese 5-part hematology, German biochemistry, and chemiluminescence hormone testing.',
              descBn: 'বারকোডযুক্ত নির্ভুল রক্তের সেল কাউন্ট, হরমোন ও বায়োকেমিস্ট্রি পরীক্ষা।'
            },
            {
              titleEn: 'Central Piped Medical Oxygen',
              titleBn: 'সেন্ট্রাল মেডিকেল অক্সিজেন ব্যবস্থা',
              descEn: 'Continuous piped oxygen supply directly accessible at every inpatient bed and emergency trolley.',
              descBn: 'প্রতিটি শয্যা ও জরুরি বিভাগে পাইপলাইনের মাধ্যমে নিরবচ্ছিন্ন অক্সিজেন সরবরাহ।'
            },
            {
              titleEn: '24/7 Dedicated Cardiac Ambulance',
              titleBn: '২৪ ঘণ্টা কার্ডিয়াক অ্যাম্বুলেন্স',
              descEn: 'Equipped with oxygen cylinders, portable monitors, and trained paramedics for rapid hospital transfers.',
              descBn: 'কুমিল্লা ও ঢাকা মেডিকেল কলেজ হাসপাতালে জরুরি রোগী স্থানান্তরে প্রস্তুত।'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-[#1769D2]">
                <CheckCircle className="w-5 h-5 shrink-0" />
                <h4 className="font-bold text-slate-800 text-sm">
                  {language === 'bn' ? item.titleBn : item.titleEn}
                </h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed pl-7">
                {language === 'bn' ? item.descBn : item.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#1769D2] uppercase tracking-wider bg-blue-100/70 px-3 py-1 rounded-md">
            {language === 'bn' ? 'আমাদের মূলনীতি' : 'Our Guiding Principles'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {language === 'bn' ? 'যেসব মূলনীতির ওপর আমরা প্রতিষ্ঠিত' : 'Core Values That Drive Us'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1769D2] font-black text-sm flex items-center justify-center mb-2">
                0{i + 1}
              </div>
              <h4 className="font-bold text-slate-900 text-sm">
                {language === 'bn' ? v.titleBn : v.titleEn}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {language === 'bn' ? v.descBn : v.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones Timeline */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {language === 'bn' ? 'আমাদের অর্জনের পথচলা' : 'Our Growth Milestones'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((m, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <span className="text-2xl font-black text-[#1769D2] block mb-2 font-mono">
                {m.year}
              </span>
              <h4 className="font-bold text-slate-800 text-sm mb-1.5">
                {language === 'bn' ? m.titleBn : m.titleEn}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {language === 'bn' ? m.descBn : m.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Hospital Bottom CTA */}
      <div className="bg-[#142B45] text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl sm:text-2xl font-bold">
            {language === 'bn' ? 'বিশেষজ্ঞ ডাক্তারের সাথে পরামর্শ করতে চান?' : 'Need to Consult a Medical Specialist?'}
          </h3>
          <p className="text-xs text-slate-300">
            {language === 'bn' ? 'আমাদের ১৬টি বিভাগের অভিজ্ঞ কনসালট্যান্টদের সিরিয়াল নিতে এখনই ক্লিক করুন।' : 'Book a chamber serial online or call our serial desk anytime.'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => openAppointmentModal()}
            className="px-6 py-3 bg-[#1769D2] hover:bg-blue-600 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            {t.bookAppointment}
          </button>
          <button
            onClick={() => navigateTo('contact')}
            className="px-5 py-3 border border-white/20 hover:bg-white/10 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            {t.navContact}
          </button>
        </div>
      </div>

    </div>
  );
};
