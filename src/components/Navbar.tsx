import React, { useState, useEffect, useRef } from 'react';
import { useHospital } from '../context/HospitalContext';
import { PageRoute } from '../types';
import { departmentsData, medicalServicesData, hospitalInfo } from '../data/hospitalData';
import { 
  Search, 
  Menu, 
  X, 
  Calendar, 
  ChevronDown, 
  PhoneCall, 
  Activity, 
  HeartPulse, 
  Ambulance, 
  Globe,
  Sun,
  Moon
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    language, 
    toggleLanguage, 
    theme,
    toggleTheme,
    t, 
    currentPage, 
    navigateTo, 
    openAppointmentModal, 
    setIsSearchModalOpen 
  } = useHospital();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDeptDropdownOpen, setIsDeptDropdownOpen] = useState(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const deptDropdownRef = useRef<HTMLDivElement>(null);
  const serviceDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (deptDropdownRef.current && !deptDropdownRef.current.contains(e.target as Node)) {
        setIsDeptDropdownOpen(false);
      }
      if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(e.target as Node)) {
        setIsServiceDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (page: PageRoute, params?: { id?: string; dept?: string }) => {
    navigateTo(page, params);
    setIsMobileMenuOpen(false);
    setIsDeptDropdownOpen(false);
    setIsServiceDropdownOpen(false);
  };

  const navItems = [
    { page: 'home' as PageRoute, label: t.navHome },
    { page: 'about' as PageRoute, label: t.navAbout },
    { page: 'doctors' as PageRoute, label: t.navDoctors },
    { 
      page: 'departments' as PageRoute, 
      label: t.navDepartments, 
      hasDropdown: true,
      type: 'dept'
    },
    { 
      page: 'services' as PageRoute, 
      label: t.navServices, 
      hasDropdown: true,
      type: 'service'
    },
    { page: 'diagnostics' as PageRoute, label: t.navDiagnostics },
    { page: 'packages' as PageRoute, label: t.navPackages },
    { page: 'patients' as PageRoute, label: t.navPatients },
    { page: 'emergency' as PageRoute, label: t.navEmergency, isEmergency: true },
    { page: 'blog' as PageRoute, label: t.navBlog },
    { page: 'contact' as PageRoute, label: t.navContact }
  ];

  return (
    <header className={`sticky top-0 z-40 transition-all duration-200 ${
      isScrolled 
        ? 'bg-white shadow-md border-b border-slate-200/80 py-2.5' 
        : 'bg-white border-b border-[#E5EBF2] py-3.5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-1.5 sm:gap-2.5 text-left group cursor-pointer focus:outline-none shrink"
            aria-label="Debidwar Medilab Hospital Home"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#1769D2] to-[#0E9F92] flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform shrink-0">
              <HeartPulse className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-[#142B45] text-xs sm:text-base lg:text-lg leading-tight tracking-tight truncate">
                <span>{language === 'bn' ? 'দেবীদ্বার মেডিলাব' : 'Debidwar Medilab'}</span>{' '}
                <span className="text-[#1769D2] font-extrabold">{language === 'bn' ? 'হাসপাতাল' : 'Hospital'}</span>
              </div>
              <p className="text-[9px] sm:text-xs text-[#718096] font-medium leading-none mt-0.5 hidden md:block">
                {language === 'bn' ? 'দেবীদ্বার, কুমিল্লা | ২৪/৭ জরুরি সেবা' : 'Debidwar, Cumilla | 24/7 Healthcare'}
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;

              if (item.hasDropdown && item.type === 'dept') {
                return (
                  <div key={item.page} className="relative" ref={deptDropdownRef}>
                    <button
                      onClick={() => setIsDeptDropdownOpen(!isDeptDropdownOpen)}
                      className={`flex items-center gap-0.5 px-2.5 py-1.5 text-xs 2xl:text-sm font-medium rounded-md transition-colors cursor-pointer ${
                        isActive || currentPage === 'department-details'
                          ? 'text-[#1769D2] bg-blue-50'
                          : 'text-[#26374A] hover:text-[#1769D2] hover:bg-slate-50'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDeptDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Department Dropdown Menu */}
                    {isDeptDropdownOpen && (
                      <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                        <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                          {language === 'bn' ? 'প্রধান চিকিৎসা বিভাগসমূহ' : 'Specialty Departments'}
                        </div>
                        <div className="max-h-72 overflow-y-auto py-1">
                          {departmentsData.slice(0, 8).map(dept => (
                            <button
                              key={dept.id}
                              onClick={() => handleNavClick('department-details', { id: dept.id })}
                              className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-[#1769D2] flex items-center justify-between transition-colors"
                            >
                              <span>{language === 'bn' ? dept.nameBn : dept.nameEn}</span>
                              <span className="text-[10px] text-slate-400">→</span>
                            </button>
                          ))}
                        </div>
                        <div className="border-t border-slate-100 pt-1.5 mt-1 px-2">
                          <button
                            onClick={() => handleNavClick('departments')}
                            className="w-full py-1.5 text-center text-xs font-semibold text-[#1769D2] hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            {language === 'bn' ? 'সকল ১৬টি বিভাগ দেখুন →' : 'View All 16 Departments →'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              if (item.hasDropdown && item.type === 'service') {
                return (
                  <div key={item.page} className="relative" ref={serviceDropdownRef}>
                    <button
                      onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                      className={`flex items-center gap-0.5 px-2.5 py-1.5 text-xs 2xl:text-sm font-medium rounded-md transition-colors cursor-pointer ${
                        isActive || currentPage === 'service-details'
                          ? 'text-[#1769D2] bg-blue-50'
                          : 'text-[#26374A] hover:text-[#1769D2] hover:bg-slate-50'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isServiceDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Services Dropdown */}
                    {isServiceDropdownOpen && (
                      <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                        <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                          {language === 'bn' ? 'জরুরি ও ক্লিনিক্যাল সেবা' : 'Clinical & Emergency Services'}
                        </div>
                        <div className="max-h-72 overflow-y-auto py-1">
                          {medicalServicesData.slice(0, 8).map(srv => (
                            <button
                              key={srv.id}
                              onClick={() => handleNavClick('service-details', { id: srv.id })}
                              className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-[#1769D2] flex items-center justify-between transition-colors"
                            >
                              <span>{language === 'bn' ? srv.nameBn : srv.nameEn}</span>
                              <span className="text-[10px] text-slate-400">→</span>
                            </button>
                          ))}
                        </div>
                        <div className="border-t border-slate-100 pt-1.5 mt-1 px-2">
                          <button
                            onClick={() => handleNavClick('services')}
                            className="w-full py-1.5 text-center text-xs font-semibold text-[#1769D2] hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            {language === 'bn' ? 'সকল চিকিৎসাসেবা দেখুন →' : 'View All Medical Services →'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`px-2.5 py-1.5 text-xs 2xl:text-sm font-medium rounded-md transition-colors cursor-pointer relative ${
                    item.isEmergency
                      ? 'text-rose-600 bg-rose-50/80 hover:bg-rose-100 font-semibold'
                      : isActive 
                        ? 'text-[#1769D2] bg-blue-50 font-semibold' 
                        : 'text-[#26374A] hover:text-[#1769D2] hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                  {item.isEmergency && (
                    <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-pulse ml-1 align-middle" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Search, Lang Switcher, Book Appointment */}
          <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
            
            {/* Global Search Button */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="p-1.5 sm:p-2 text-slate-600 hover:text-[#1769D2] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
              title={language === 'bn' ? 'অনুসন্ধান করুন' : 'Search Website'}
              aria-label="Search"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Language Switcher Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 py-1 text-[11px] sm:text-xs font-bold rounded-lg border border-slate-200 hover:border-[#1769D2] text-[#142B45] hover:text-[#1769D2] bg-slate-50 hover:bg-blue-50/50 transition-all cursor-pointer shadow-2xs"
              title={language === 'en' ? 'বাংলা ভাষায় দেখুন' : 'Switch to English'}
              aria-label="Switch Language"
            >
              <Globe className="w-3 h-3 text-[#0E9F92]" />
              <span className={language === 'bn' ? 'font-semibold text-slate-400' : 'text-[#1769D2]'}>EN</span>
              <span className="text-slate-300">/</span>
              <span className={language === 'bn' ? 'text-[#1769D2] font-bold font-bangla' : 'text-slate-400 font-bangla'}>বাং</span>
            </button>

            {/* Theme Toggle Button (Light / High-Contrast Dark) */}
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 text-slate-600 hover:text-[#1769D2] hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
              title={theme === 'dark' ? (language === 'bn' ? 'লাইট মোড চালু করুন' : 'Switch to Light Mode') : (language === 'bn' ? 'হাই-কন্ট্রাস্ট ডার্ক মোড চালু করুন' : 'Switch to High-Contrast Dark Mode')}
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700 hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* Book Appointment CTA */}
            <button
              onClick={() => openAppointmentModal()}
              className="hidden lg:inline-flex items-center gap-2 bg-gradient-to-r from-[#1769D2] to-[#0E9F92] text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm hover:shadow-md hover:brightness-105 active:scale-98 transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t.bookAppointment}</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-1.5 text-slate-700 hover:text-[#1769D2] hover:bg-slate-100 rounded-lg focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className={`xl:hidden fixed inset-x-0 top-[65px] bottom-0 ${
          theme === 'dark' ? 'bg-[#0E172C] text-slate-100 border-[#243552]' : 'bg-white text-slate-800 border-slate-200'
        } z-50 border-t overflow-y-auto px-4 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top-4 duration-200`}>
          
          {/* Theme Toggle Card for Mobile */}
          <div className={`p-3 rounded-xl border flex items-center justify-between ${
            theme === 'dark' ? 'bg-[#142036] border-[#243552]' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-amber-400/20 text-amber-400' : 'bg-blue-100 text-[#1769D2]'}`}>
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </div>
              <div>
                <p className={`text-xs font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                  {language === 'bn' ? 'ওয়েবসাইট থিম' : 'Website Theme'}
                </p>
                <p className={`text-[11px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  {theme === 'dark' 
                    ? (language === 'bn' ? 'হাই-কন্ট্রাস্ট ডার্ক মোড' : 'High-Contrast Dark Mode')
                    : (language === 'bn' ? 'স্ট্যান্ডার্ড লাইট মোড' : 'Standard Light Mode')
                  }
                </p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all bg-[#1769D2] hover:bg-blue-700 text-white cursor-pointer shadow-xs"
            >
              {theme === 'dark' ? (language === 'bn' ? 'লাইট মোড' : 'Light Mode') : (language === 'bn' ? 'ডার্ক মোড' : 'Dark Mode')}
            </button>
          </div>

          {/* Emergency Hotline Banner for Mobile */}
          <div className={`p-3 rounded-xl border flex items-center justify-between ${
            theme === 'dark' ? 'bg-[#331A27] border-[#4C2336]' : 'bg-rose-50 border-rose-200'
          }`}>
            <div className="flex items-center gap-2 text-rose-500">
              <Ambulance className="w-5 h-5 text-rose-500 animate-pulse" />
              <div>
                <p className="text-xs font-semibold text-rose-400">{language === 'bn' ? '২৪ ঘণ্টা জরুরি সেবা' : '24/7 Emergency Care'}</p>
                <p className="text-sm font-bold text-white">{hospitalInfo.emergencyPhoneEn}</p>
              </div>
            </div>
            <a 
              href={`tel:${hospitalInfo.emergencyPhoneEn.replace(/\s+/g, '')}`}
              className="bg-rose-600 text-white text-xs px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'কল করুন' : 'Call'}</span>
            </a>
          </div>

          {/* Quick Book Appointment CTA */}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              openAppointmentModal();
            }}
            className="w-full flex items-center justify-center gap-2 bg-[#1769D2] hover:bg-blue-600 text-white text-sm font-semibold py-3 rounded-xl shadow-md cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>{t.bookAppointment}</span>
          </button>

          {/* Mobile Nav Links List */}
          <div className={`grid grid-cols-1 divide-y ${theme === 'dark' ? 'divide-[#243552]' : 'divide-slate-100'}`}>
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`w-full text-left py-3 px-2 text-sm font-medium flex items-center justify-between transition-colors ${
                  currentPage === item.page
                    ? theme === 'dark' ? 'text-blue-400 font-bold bg-[#142036] rounded-lg' : 'text-[#1769D2] font-bold bg-blue-50/50 rounded-lg'
                    : item.isEmergency 
                      ? 'text-rose-500 font-semibold'
                      : theme === 'dark' ? 'text-slate-200 hover:text-blue-400' : 'text-slate-700 hover:text-[#1769D2]'
                }`}
              >
                <span>{item.label}</span>
                <span className={theme === 'dark' ? 'text-slate-500 text-xs' : 'text-slate-400 text-xs'}>→</span>
              </button>
            ))}
            
            {/* Additional Secondary Links */}
            <button
              onClick={() => handleNavClick('careers')}
              className={`w-full text-left py-3 px-2 text-sm flex justify-between ${
                theme === 'dark' ? 'text-slate-300 hover:text-blue-400' : 'text-slate-600 hover:text-[#1769D2]'
              }`}
            >
              <span>{t.navCareers}</span>
              <span className={theme === 'dark' ? 'text-slate-500 text-xs' : 'text-slate-400 text-xs'}>→</span>
            </button>
            <button
              onClick={() => handleNavClick('faq')}
              className={`w-full text-left py-3 px-2 text-sm flex justify-between ${
                theme === 'dark' ? 'text-slate-300 hover:text-blue-400' : 'text-slate-600 hover:text-[#1769D2]'
              }`}
            >
              <span>{t.navFaq}</span>
              <span className={theme === 'dark' ? 'text-slate-500 text-xs' : 'text-slate-400 text-xs'}>→</span>
            </button>
            <button
              onClick={() => handleNavClick('testimonials')}
              className={`w-full text-left py-3 px-2 text-sm flex justify-between ${
                theme === 'dark' ? 'text-slate-300 hover:text-blue-400' : 'text-slate-600 hover:text-[#1769D2]'
              }`}
            >
              <span>{t.navTestimonials}</span>
              <span className={theme === 'dark' ? 'text-slate-500 text-xs' : 'text-slate-400 text-xs'}>→</span>
            </button>
          </div>

          <div className="pt-4 text-center border-t border-slate-100 text-xs text-slate-400">
            <p>{language === 'bn' ? hospitalInfo.locationBn : hospitalInfo.locationEn}</p>
          </div>
        </div>
      )}
    </header>
  );
};
