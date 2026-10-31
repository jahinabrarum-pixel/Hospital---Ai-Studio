import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import { diagnosticCategoriesData, hospitalInfo } from '../data/hospitalData';
import { formatBdCurrency } from '../utils/hospitalLogic';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { 
  Search, 
  FlaskConical, 
  Clock, 
  FileCheck, 
  Layers, 
  Download, 
  CheckCircle, 
  AlertCircle, 
  Calendar 
} from 'lucide-react';

export const DiagnosticsPage: React.FC = () => {
  const { language, t, openAppointmentModal, showToast } = useHospital();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTest, setSearchTest] = useState<string>('');

  const filteredCategories = diagnosticCategoriesData.filter(cat => 
    activeCategory === 'all' || cat.id === activeCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: t.navDiagnostics }]} />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#142B45] to-[#1769D2] text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl text-center md:text-left">
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-md">
            {language === 'bn' ? 'অটোমেটেড ল্যাব ও ডিজিটাল ইমেজিং' : 'Modern Diagnostic Center'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {t.diagnosticTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {t.diagnosticSub}
          </p>
        </div>

        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTest}
            onChange={e => setSearchTest(e.target.value)}
            placeholder={language === 'bn' ? 'টেস্টের নাম দিয়ে খুঁজুন...' : 'Search lab test or scan...'}
            className="w-full text-xs pl-10 pr-4 py-2.5 bg-white text-slate-800 rounded-xl focus:outline-none shadow-md"
          />
        </div>
      </div>

      {/* Preparation & Report Instructions Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-[#1769D2]">
            <Clock className="w-5 h-5" />
            <h3 className="font-bold text-base text-slate-900">{t.sampleGuidelineTitle}</h3>
          </div>
          <div className="text-xs text-slate-600 space-y-2">
            <p>• <span className="font-semibold text-slate-800">{language === 'bn' ? 'ফাস্টিং ব্লাড সুগার ও লিপিড:' : 'Fasting Blood Sugar & Lipids:'}</span> {language === 'bn' ? 'সকালে রক্ত দেওয়ার পূর্বে ৮-১০ ঘণ্টা খালি পেটে থাকতে হবে।' : 'Requires 8-10 hours overnight fasting prior to morning blood collection.'}</p>
            <p>• <span className="font-semibold text-slate-800">{language === 'bn' ? 'আল্ট্রাসনোগ্রাম (হোল অ্যাবডোমেন):' : 'Abdominal Ultrasound:'}</span> {language === 'bn' ? 'পরীক্ষার ১ ঘণ্টা পূর্বে ৪-৫ গ্লাস পানি পান করে প্রস্রাবের বেগ রাখতে হবে।' : 'Drink 4-5 glasses of plain water 1 hour prior to maintain full bladder.'}</p>
            <p>• <span className="font-semibold text-slate-800">{language === 'bn' ? 'জরুরি টেস্ট:' : 'Emergency Blood Tests:'}</span> {language === 'bn' ? 'সিবিসি, ট্রপোনিন-আই, ইলেক্ট্রোলাইট ও ব্লাড গ্রুপ ২৪ ঘণ্টা যেকোনো সময় নেওয়া হয়।' : 'CBC, Troponin-I, Electrolytes, and Cross-match collected 24 hours without delay.'}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-[#0E9F92]">
            <FileCheck className="w-5 h-5" />
            <h3 className="font-bold text-base text-slate-900">{t.reportDeliveryTitle}</h3>
          </div>
          <div className="text-xs text-slate-600 space-y-2">
            <p>• <span className="font-semibold text-slate-800">{language === 'bn' ? 'রুটিন ব্লাড রিপোর্ট:' : 'Routine Blood Reports:'}</span> {language === 'bn' ? 'স্যাম্পল দেওয়ার ১ থেকে ৩ ঘণ্টার মধ্যে ডেলিভারি কাউন্টার থেকে সরবরাহ করা হয়।' : 'Delivered within 1 to 3 hours from central report delivery desk.'}</p>
            <p>• <span className="font-semibold text-slate-800">{language === 'bn' ? 'ডিজিটাল এক্স-রে ও ইউএসজি:' : 'Digital X-Ray & Ultrasound:'}</span> {language === 'bn' ? 'রেডিওলজিস্টের সইসহ একই দিন বিকেলের মধ্যে চূড়ান্ত ফিল্ম ও রিপোর্ট প্রদান।' : 'Verified by consultant radiologists with digital high-res films on same day.'}</p>
            <p>• <span className="font-semibold text-slate-800">{language === 'bn' ? 'মানি রিসিট সংরক্ষণ:' : 'Keep Your Receipt:'}</span> {language === 'bn' ? 'রিপোর্ট সংগ্রহের সময় মূল কম্পিউটারাইজড মানি রিসিট সঙ্গে রাখুন।' : 'Present original printed money receipt with barcode for collection.'}</p>
          </div>
        </div>

      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeCategory === 'all'
              ? 'bg-[#1769D2] text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          {language === 'bn' ? 'সকল ডায়াগনস্টিক টেস্ট' : 'All Test Categories'}
        </button>

        {diagnosticCategoriesData.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-[#1769D2] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {language === 'bn' ? cat.nameBn : cat.nameEn}
          </button>
        ))}
      </div>

      {/* Tests Tables by Category */}
      <div className="space-y-8">
        {filteredCategories.map(cat => {
          const matchedTests = cat.tests.filter(t => 
            !searchTest || 
            t.nameEn.toLowerCase().includes(searchTest.toLowerCase()) ||
            t.nameBn.includes(searchTest)
          );

          if (matchedTests.length === 0) return null;

          return (
            <div key={cat.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs">
              <div className="p-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {language === 'bn' ? cat.nameBn : cat.nameEn}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {language === 'bn' ? cat.descriptionBn : cat.descriptionEn}
                  </p>
                </div>
                <span className="text-xs font-semibold text-[#1769D2] bg-blue-50 px-3 py-1 rounded-full border border-blue-100 self-start sm:self-auto">
                  {matchedTests.length} {language === 'bn' ? 'টি টেস্ট' : 'Tests'}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100/70 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-6 font-semibold">{language === 'bn' ? 'টেস্টের নাম' : 'Test Name'}</th>
                      <th className="py-3 px-6 font-semibold">{language === 'bn' ? 'স্যাম্পলের ধরণ' : 'Sample / Method'}</th>
                      <th className="py-3 px-6 font-semibold">{language === 'bn' ? 'রিপোর্ট ডেলিভারি সময়' : 'Turnaround Time'}</th>
                      <th className="py-3 px-6 font-semibold text-right">{language === 'bn' ? 'ফি (টাকা)' : 'Fee (BDT)'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {matchedTests.map((test, i) => (
                      <tr key={i} className="hover:bg-blue-50/40 transition-colors">
                        <td className="py-3.5 px-6 font-semibold text-slate-800">
                          {language === 'bn' ? test.nameBn : test.nameEn}
                        </td>
                        <td className="py-3.5 px-6 text-slate-500">
                          {language === 'bn' ? test.sampleTypeBn : test.sampleTypeEn}
                        </td>
                        <td className="py-3.5 px-6 text-slate-500 font-medium">
                          {language === 'bn' ? test.deliveryTimeBn : test.deliveryTimeEn}
                        </td>
                        <td className="py-3.5 px-6 font-bold text-[#1769D2] text-right">
                          {formatBdCurrency(test.priceBdt, language)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
