import { Doctor, Department, MedicalService, BlogPost } from '../types';

/**
 * Validates Bangladeshi mobile phone numbers.
 * Supports:
 * - 01XXXXXXXXX (11 digits starting with 01[3-9])
 * - +8801XXXXXXXXX or 8801XXXXXXXXX
 * - Formatted with spaces or hyphens like 01711-234567 or +88 01711 234567
 */
export function isValidBdPhone(phone: string): boolean {
  if (!phone) return false;
  // Clean all whitespace, dashes, parens
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  // Matches:
  // ^(?:\+?880|880|0)?1[3-9]\d{8}$
  const bdPhoneRegex = /^(?:\+?880|880|0)?1[3-9]\d{8}$/;
  return bdPhoneRegex.test(cleaned);
}

/**
 * Normalizes a Bangladeshi phone number into standard display format: +880 1XXX-XXXXXX
 */
export function normalizeBdPhone(phone: string): string {
  if (!phone) return '';
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  let digitsOnly = cleaned;
  if (digitsOnly.startsWith('+880')) {
    digitsOnly = digitsOnly.slice(4);
  } else if (digitsOnly.startsWith('880')) {
    digitsOnly = digitsOnly.slice(3);
  } else if (digitsOnly.startsWith('0')) {
    digitsOnly = digitsOnly.slice(1);
  }
  
  if (digitsOnly.length === 10) {
    return `+880 ${digitsOnly.slice(0, 4)}-${digitsOnly.slice(4)}`;
  }
  return phone;
}

/**
 * Formats a currency number with Bangladeshi Taka symbol (৳)
 */
export function formatBdCurrency(amount: number, lang: 'en' | 'bn' = 'en'): string {
  const formatted = amount.toLocaleString('en-US');
  if (lang === 'bn') {
    const enToBnDigits: Record<string, string> = {
      '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
      '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
      ',': ','
    };
    const bnNum = formatted.split('').map(char => enToBnDigits[char] || char).join('');
    return `৳${bnNum}`;
  }
  return `৳${formatted}`;
}

/**
 * Convert English number string to Bengali digits
 */
export function toBengaliNumber(num: number | string): string {
  const str = String(num);
  const map: Record<string, string> = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
  };
  return str.replace(/[0-9]/g, match => map[match] || match);
}

/**
 * Generate a unique Demo Appointment Reference Code
 * Example: DMH-784291
 */
export function generateAppointmentRef(): string {
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `DMH-${rand}`;
}

/**
 * Filters and sorts doctors based on user criteria
 */
export function filterDoctors(
  doctors: Doctor[],
  params: {
    query?: string;
    departmentId?: string;
    availableTodayOnly?: boolean;
    sortBy?: 'experience' | 'fee-low' | 'fee-high' | 'name';
  }
): Doctor[] {
  let result = [...doctors];

  if (params.departmentId && params.departmentId !== 'all') {
    result = result.filter(doc => doc.departmentId === params.departmentId);
  }

  if (params.availableTodayOnly) {
    result = result.filter(doc => doc.isAvailableToday);
  }

  if (params.query && params.query.trim()) {
    const q = params.query.trim().toLowerCase();
    result = result.filter(doc => 
      doc.nameEn.toLowerCase().includes(q) ||
      doc.nameBn.includes(q) ||
      doc.departmentEn.toLowerCase().includes(q) ||
      doc.departmentBn.includes(q) ||
      doc.titleEn.toLowerCase().includes(q) ||
      doc.degreesEn.toLowerCase().includes(q) ||
      doc.specializationsEn.some(s => s.toLowerCase().includes(q))
    );
  }

  if (params.sortBy) {
    switch (params.sortBy) {
      case 'experience':
        result.sort((a, b) => b.experienceYears - a.experienceYears);
        break;
      case 'fee-low':
        result.sort((a, b) => a.feeNewPatient - b.feeNewPatient);
        break;
      case 'fee-high':
        result.sort((a, b) => b.feeNewPatient - a.feeNewPatient);
        break;
      case 'name':
        result.sort((a, b) => a.nameEn.localeCompare(b.nameEn));
        break;
    }
  }

  return result;
}

export interface SearchResultItem {
  type: 'doctor' | 'department' | 'service' | 'blog' | 'package';
  id: string;
  titleEn: string;
  titleBn: string;
  subtitleEn: string;
  subtitleBn: string;
  targetPage: string;
  targetId: string;
}

/**
 * Global search helper
 */
export function performGlobalSearch(
  query: string,
  doctors: Doctor[],
  departments: Department[],
  services: MedicalService[],
  blogs: BlogPost[]
): SearchResultItem[] {
  if (!query || query.trim().length < 2) return [];
  const q = query.trim().toLowerCase();
  const results: SearchResultItem[] = [];

  // Match doctors
  for (const doc of doctors) {
    if (
      doc.nameEn.toLowerCase().includes(q) ||
      doc.nameBn.includes(q) ||
      doc.departmentEn.toLowerCase().includes(q) ||
      doc.specializationsEn.some(s => s.toLowerCase().includes(q))
    ) {
      results.push({
        type: 'doctor',
        id: doc.id,
        titleEn: doc.nameEn,
        titleBn: doc.nameBn,
        subtitleEn: `${doc.departmentEn} - ${doc.degreesEn}`,
        subtitleBn: `${doc.departmentBn} - ${doc.degreesBn}`,
        targetPage: 'doctor-details',
        targetId: doc.id
      });
    }
  }

  // Match departments
  for (const dept of departments) {
    if (
      dept.nameEn.toLowerCase().includes(q) ||
      dept.nameBn.includes(q) ||
      dept.descriptionEn.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'department',
        id: dept.id,
        titleEn: dept.nameEn,
        titleBn: dept.nameBn,
        subtitleEn: dept.taglineEn,
        subtitleBn: dept.taglineBn,
        targetPage: 'department-details',
        targetId: dept.id
      });
    }
  }

  // Match services
  for (const s of services) {
    if (
      s.nameEn.toLowerCase().includes(q) ||
      s.nameBn.includes(q) ||
      s.shortDescEn.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'service',
        id: s.id,
        titleEn: s.nameEn,
        titleBn: s.nameBn,
        subtitleEn: s.shortDescEn,
        subtitleBn: s.shortDescBn,
        targetPage: 'service-details',
        targetId: s.id
      });
    }
  }

  // Match blogs
  for (const b of blogs) {
    if (
      b.titleEn.toLowerCase().includes(q) ||
      b.titleBn.includes(q) ||
      b.excerptEn.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'blog',
        id: b.id,
        titleEn: b.titleEn,
        titleBn: b.titleBn,
        subtitleEn: b.categoryEn,
        subtitleBn: b.categoryBn,
        targetPage: 'blog-details',
        targetId: b.id
      });
    }
  }

  return results.slice(0, 10);
}

/**
 * Helper to compute the opposite theme for toggling
 */
export function getOppositeTheme(current: 'light' | 'dark'): 'light' | 'dark' {
  return current === 'light' ? 'dark' : 'light';
}

/**
 * Returns human-readable theme label in English or Bengali
 */
export function getThemeLabel(theme: 'light' | 'dark', lang: 'en' | 'bn' = 'en'): string {
  if (lang === 'bn') {
    return theme === 'dark' ? 'হাই-কন্ট্রাস্ট ডার্ক মোড' : 'স্ট্যান্ডার্ড লাইট মোড';
  }
  return theme === 'dark' ? 'High-Contrast Dark Mode' : 'Standard Light Mode';
}
