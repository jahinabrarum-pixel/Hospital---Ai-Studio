import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, PageRoute, AppointmentBooking, Doctor, Department } from '../types';
import { doctorsData, departmentsData } from '../data/hospitalData';
import { getTranslation } from '../data/translations';

interface ToastState {
  id: number;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface HospitalContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: ReturnType<typeof getTranslation>;
  currentPage: PageRoute;
  selectedDoctorId: string | null;
  selectedDeptId: string | null;
  selectedServiceId: string | null;
  selectedBlogId: string | null;
  navigateTo: (
    page: PageRoute, 
    params?: { 
      id?: string; 
      dept?: string; 
      doc?: string;
    }
  ) => void;
  isAppointmentModalOpen: boolean;
  appointmentModalDoctorId?: string;
  appointmentModalDeptId?: string;
  openAppointmentModal: (doctorId?: string, deptId?: string) => void;
  closeAppointmentModal: () => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  toasts: ToastState[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  dismissToast: (id: number) => void;
  bookedAppointments: AppointmentBooking[];
  addAppointmentBooking: (booking: AppointmentBooking) => void;
  preselectedDoctor?: Doctor;
  preselectedDept?: Department;
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined);

function parseUrlToRoute(): { page: PageRoute; id?: string } {
  const hash = window.location.hash.replace(/^#\/?/, '');
  const searchParams = new URLSearchParams(window.location.search);
  const pageParam = searchParams.get('page');
  const idParam = searchParams.get('id');

  // Check query param first e.g. ?page=doctors
  if (pageParam) {
    return { page: (pageParam as PageRoute) || 'home', id: idParam || undefined };
  }

  if (!hash) return { page: 'home' };

  // Parse hash e.g. #doctor-details?id=doc-1 or #about.html or #about
  const [routePart, queryPart] = hash.split('?');
  const cleanRoute = routePart.replace(/\.html$/, '').replace(/^\//, '');

  let idFromHash: string | undefined;
  if (queryPart) {
    const qParams = new URLSearchParams(queryPart);
    idFromHash = qParams.get('id') || undefined;
  }

  const validRoutes: PageRoute[] = [
    'home', 'about', 'doctors', 'doctor-details', 'departments', 'department-details',
    'services', 'service-details', 'appointment', 'contact', 'patients', 'packages',
    'diagnostics', 'emergency', 'blog', 'blog-details', 'careers', 'faq', 'testimonials',
    'privacy', 'terms', '404'
  ];

  if (validRoutes.includes(cleanRoute as PageRoute)) {
    return { page: cleanRoute as PageRoute, id: idFromHash };
  }

  if (cleanRoute === '' || cleanRoute === 'index') {
    return { page: 'home' };
  }

  return { page: '404' };
}

export const HospitalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Language state with localStorage persistence
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('dmh_lang');
      return (saved === 'bn' || saved === 'en') ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('dmh_lang', lang);
      if (lang === 'bn') {
        document.body.classList.add('lang-bn');
      } else {
        document.body.classList.remove('lang-bn');
      }
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
  };

  useEffect(() => {
    if (language === 'bn') {
      document.body.classList.add('lang-bn');
    } else {
      document.body.classList.remove('lang-bn');
    }
  }, [language]);

  // 2. Routing state
  const initialRoute = parseUrlToRoute();
  const [currentPage, setCurrentPage] = useState<PageRoute>(initialRoute.page);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(initialRoute.id || null);
  const [selectedDeptId, setSelectedDeptId] = useState<string | null>(initialRoute.id || null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(initialRoute.id || null);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(initialRoute.id || null);

  // Sync with browser back/forward and hash changes
  useEffect(() => {
    const handlePopState = () => {
      const routeInfo = parseUrlToRoute();
      setCurrentPage(routeInfo.page);
      if (routeInfo.id) {
        if (routeInfo.page === 'doctor-details') setSelectedDoctorId(routeInfo.id);
        if (routeInfo.page === 'department-details') setSelectedDeptId(routeInfo.id);
        if (routeInfo.page === 'service-details') setSelectedServiceId(routeInfo.id);
        if (routeInfo.page === 'blog-details') setSelectedBlogId(routeInfo.id);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigateTo = (
    page: PageRoute, 
    params?: { id?: string; dept?: string; doc?: string }
  ) => {
    setCurrentPage(page);
    let hashUrl = `#${page}`;
    if (params?.id) {
      hashUrl += `?id=${params.id}`;
      if (page === 'doctor-details') setSelectedDoctorId(params.id);
      if (page === 'department-details') setSelectedDeptId(params.id);
      if (page === 'service-details') setSelectedServiceId(params.id);
      if (page === 'blog-details') setSelectedBlogId(params.id);
    }
    if (params?.dept) {
      setSelectedDeptId(params.dept);
    }
    if (params?.doc) {
      setSelectedDoctorId(params.doc);
    }

    try {
      window.history.pushState(null, '', hashUrl);
    } catch {
      window.location.hash = hashUrl;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 3. Appointment Modal state
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [appointmentModalDoctorId, setAppointmentModalDoctorId] = useState<string | undefined>(undefined);
  const [appointmentModalDeptId, setAppointmentModalDeptId] = useState<string | undefined>(undefined);

  const openAppointmentModal = (doctorId?: string, deptId?: string) => {
    setAppointmentModalDoctorId(doctorId);
    setAppointmentModalDeptId(deptId);
    setIsAppointmentModalOpen(true);
  };

  const closeAppointmentModal = () => {
    setIsAppointmentModalOpen(false);
    setAppointmentModalDoctorId(undefined);
    setAppointmentModalDeptId(undefined);
  };

  // 4. Global Search Modal
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // 5. Toast notifications
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // 6. Booked Appointments session state
  const [bookedAppointments, setBookedAppointments] = useState<AppointmentBooking[]>([]);

  const addAppointmentBooking = (booking: AppointmentBooking) => {
    setBookedAppointments(prev => [booking, ...prev]);
  };

  const preselectedDoctor = appointmentModalDoctorId 
    ? doctorsData.find(d => d.id === appointmentModalDoctorId)
    : undefined;

  const preselectedDept = appointmentModalDeptId
    ? departmentsData.find(d => d.id === appointmentModalDeptId)
    : undefined;

  const t = getTranslation(language);

  return (
    <HospitalContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        currentPage,
        selectedDoctorId,
        selectedDeptId,
        selectedServiceId,
        selectedBlogId,
        navigateTo,
        isAppointmentModalOpen,
        appointmentModalDoctorId,
        appointmentModalDeptId,
        openAppointmentModal,
        closeAppointmentModal,
        isSearchModalOpen,
        setIsSearchModalOpen,
        toasts,
        showToast,
        dismissToast,
        bookedAppointments,
        addAppointmentBooking,
        preselectedDoctor,
        preselectedDept
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospital = () => {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error('useHospital must be used within a HospitalProvider');
  }
  return context;
};
