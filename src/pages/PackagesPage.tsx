import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import { healthPackagesData } from '../data/hospitalData';
import { formatBdCurrency } from '../utils/hospitalLogic';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { 
  CheckCircle, 
  Sparkles, 
  Clock, 
  HelpCircle, 
  FileText, 
  Calendar, 
  ShieldCheck 
} from 'lucide-react';

export const PackagesPage: React.FC = () => {
  const { language, t, openAppointmentModal } = useHospital();
  const [selectedPkgId, setSelectedPkgId] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: t.navPackages }]} />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#142B45] to-[#1769D2] text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl text-center md:text-left">
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-md">
            {language === 'bn' ? 'প্রিভেন্টিভ হেলথ প্যাকেজ' : 'Health Screening Packages'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {t.packageTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {t.packageSub}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center shrink-0">
          <p className="text-xs text-emerald-300 font-bold uppercase">{language === 'bn' ? 'বিশেষ ছাড় অন্তর্ভুক্ত' : 'Special Bundled Savings'}</p>
          <p className="text-xs text-slate-200 mt-1">{language === 'bn' ? 'একই দিনে দ্রুত রিপোর্ট ডেলিভারি' : 'Same-Day Fast Reporting'}</p>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {healthPackagesData.map(pkg => (
          <div
            key={pkg.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1769D2] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  {language === 'bn' ? pkg.badgeBn : pkg.badgeEn}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {pkg.testsCount} {language === 'bn' ? 'টি টেস্ট ও পরামর্শ' : 'Tests & Review'}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-xl">
                  {language === 'bn' ? pkg.nameBn : pkg.nameEn}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {language === 'bn' ? pkg.taglineBn : pkg.taglineEn}
                </p>
              </div>

              {/* Pricing Box */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">{language === 'bn' ? 'প্যাকেজ মূল্য:' : 'Package Price:'}</span>
                  <span className="text-2xl sm:text-3xl font-black text-[#1769D2]">
                    {formatBdCurrency(pkg.priceBdt, language)}
                  </span>
                </div>
                {pkg.originalPriceBdt && (
                  <div className="text-right">
                    <span className="text-xs text-slate-400 line-through block">
                      {formatBdCurrency(pkg.originalPriceBdt, language)}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      {language === 'bn' ? 'সাশ্রয়ী' : 'Save ~30%'}
                    </span>
                  </div>
                )}
              </div>

              {/* Target & Recommended */}
              <div className="text-xs text-slate-600 space-y-1 bg-blue-50/40 p-3 rounded-xl border border-blue-100">
                <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wide">
                  {language === 'bn' ? 'যাদের জন্য প্রযোজ্য:' : 'Recommended For:'}
                </span>
                <p>{language === 'bn' ? pkg.recommendedForBn : pkg.recommendedForEn}</p>
              </div>

              {/* Tests Included */}
              <div className="space-y-2 pt-2">
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                  {t.testsIncluded} ({pkg.testsCount}):
                </h4>
                <div className="space-y-1.5 text-xs text-slate-600">
                  {(language === 'bn' ? pkg.testsIncludedBn : pkg.testsIncludedEn).map((tst, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{tst}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prep Guidelines */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/70 text-[11px] text-amber-900 space-y-0.5">
                <span className="font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-700" />
                  <span>{t.prepRequired}:</span>
                </span>
                <p>{language === 'bn' ? pkg.prepGuidelinesBn : pkg.prepGuidelinesEn}</p>
              </div>

            </div>

            <button
              onClick={() => openAppointmentModal(undefined, 'diagnostics')}
              className="w-full py-3 bg-gradient-to-r from-[#1769D2] to-[#0E9F92] hover:brightness-105 text-white font-bold text-xs rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.selectThisPackage}</span>
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
