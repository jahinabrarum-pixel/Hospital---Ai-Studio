import React, { useState, useEffect } from 'react';
import { HospitalProvider, useHospital } from './context/HospitalContext';
import { TopHeader } from './components/TopHeader';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AppointmentModal } from './components/AppointmentModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { Toast } from './components/Toast';

// All 22 Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { DoctorDetailsPage } from './pages/DoctorDetailsPage';
import { DepartmentsPage } from './pages/DepartmentsPage';
import { DepartmentDetailsPage } from './pages/DepartmentDetailsPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailsPage } from './pages/ServiceDetailsPage';
import { AppointmentPage } from './pages/AppointmentPage';
import { ContactPage } from './pages/ContactPage';
import { PatientsPage } from './pages/PatientsPage';
import { PackagesPage } from './pages/PackagesPage';
import { DiagnosticsPage } from './pages/DiagnosticsPage';
import { EmergencyPage } from './pages/EmergencyPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailsPage } from './pages/BlogDetailsPage';
import { CareersPage } from './pages/CareersPage';
import { FaqPage } from './pages/FaqPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { ArrowUp, PhoneCall, Ambulance } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentPage, language, navigateTo } = useHospital();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'about': return <AboutPage />;
      case 'doctors': return <DoctorsPage />;
      case 'doctor-details': return <DoctorDetailsPage />;
      case 'departments': return <DepartmentsPage />;
      case 'department-details': return <DepartmentDetailsPage />;
      case 'services': return <ServicesPage />;
      case 'service-details': return <ServiceDetailsPage />;
      case 'appointment': return <AppointmentPage />;
      case 'contact': return <ContactPage />;
      case 'patients': return <PatientsPage />;
      case 'packages': return <PackagesPage />;
      case 'diagnostics': return <DiagnosticsPage />;
      case 'emergency': return <EmergencyPage />;
      case 'blog': return <BlogPage />;
      case 'blog-details': return <BlogDetailsPage />;
      case 'careers': return <CareersPage />;
      case 'faq': return <FaqPage />;
      case 'testimonials': return <TestimonialsPage />;
      case 'privacy': return <PrivacyPage />;
      case 'terms': return <TermsPage />;
      case '404': return <NotFoundPage />;
      default: return <NotFoundPage />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#F5F8FC] text-[#26374A] ${language === 'bn' ? 'font-bangla' : 'font-sans'}`}>
      
      {/* 1. Global Top Header */}
      <TopHeader />

      {/* 2. Global Sticky Navbar */}
      <Navbar />

      {/* 3. Main Content Router View */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* 4. Global Footer */}
      <Footer />

      {/* 5. Modals and Floating Elements */}
      <AppointmentModal />
      <GlobalSearchModal />
      <Toast />

      {/* Floating Action Buttons: Emergency Quick Dial & Back To Top */}
      <div className="fixed bottom-6 left-6 z-30 flex items-center gap-2">
        <button
          onClick={() => navigateTo('emergency')}
          className="p-3 bg-rose-600 hover:bg-rose-700 text-white rounded-full shadow-xl hover:scale-105 transition-all flex items-center gap-2 cursor-pointer group"
          title={language === 'bn' ? 'জরুরি সেবা ২৪/৭' : '24/7 Emergency Care'}
        >
          <Ambulance className="w-5 h-5 animate-pulse" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 text-xs font-bold whitespace-nowrap pr-1">
            {language === 'bn' ? 'জরুরি হটলাইন' : 'Emergency 24/7'}
          </span>
        </button>
      </div>

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-30 p-3 bg-white text-slate-700 hover:text-[#1769D2] hover:bg-blue-50 border border-slate-200 rounded-full shadow-lg hover:scale-105 transition-all cursor-pointer animate-in fade-in"
          title="Scroll to Top"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
};

export default function App() {
  return (
    <HospitalProvider>
      <AppContent />
    </HospitalProvider>
  );
}
