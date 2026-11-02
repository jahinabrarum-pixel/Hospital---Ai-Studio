export type Language = 'en' | 'bn';
export type Theme = 'light' | 'dark';

export type PageRoute = 
  | 'home'
  | 'about'
  | 'doctors'
  | 'doctor-details'
  | 'departments'
  | 'department-details'
  | 'services'
  | 'service-details'
  | 'appointment'
  | 'contact'
  | 'patients'
  | 'packages'
  | 'diagnostics'
  | 'emergency'
  | 'blog'
  | 'blog-details'
  | 'careers'
  | 'faq'
  | 'testimonials'
  | 'privacy'
  | 'terms'
  | '404';

export interface Doctor {
  id: string;
  nameEn: string;
  nameBn: string;
  titleEn: string;
  titleBn: string;
  degreesEn: string;
  degreesBn: string;
  departmentId: string;
  departmentEn: string;
  departmentBn: string;
  experienceYears: number;
  bmdcRegNo: string;
  roomNo: string;
  visitingDaysEn: string;
  visitingDaysBn: string;
  visitingTimeEn: string;
  visitingTimeBn: string;
  feeNewPatient: number;
  feeFollowUp: number;
  image: string;
  aboutEn: string;
  aboutBn: string;
  specializationsEn: string[];
  specializationsBn: string[];
  educationEn: string[];
  educationBn: string[];
  isAvailableToday?: boolean;
}

export interface Department {
  id: string;
  nameEn: string;
  nameBn: string;
  taglineEn: string;
  taglineBn: string;
  iconName: string;
  descriptionEn: string;
  descriptionBn: string;
  image: string;
  servicesEn: string[];
  servicesBn: string[];
  facilitiesEn: string[];
  facilitiesBn: string[];
  roomEn: string;
  roomBn: string;
}

export interface MedicalService {
  id: string;
  nameEn: string;
  nameBn: string;
  category: 'clinical' | 'emergency' | 'diagnostic' | 'support';
  shortDescEn: string;
  shortDescBn: string;
  fullDescEn: string;
  fullDescBn: string;
  iconName: string;
  image: string;
  featuresEn: string[];
  featuresBn: string[];
  availabilityEn: string;
  availabilityBn: string;
  inchargeEn: string;
  inchargeBn: string;
}

export interface HealthPackage {
  id: string;
  nameEn: string;
  nameBn: string;
  badgeEn?: string;
  badgeBn?: string;
  taglineEn: string;
  taglineBn: string;
  priceBdt: number;
  originalPriceBdt?: number;
  targetEn: string;
  targetBn: string;
  testsCount: number;
  testsIncludedEn: string[];
  testsIncludedBn: string[];
  prepGuidelinesEn: string;
  prepGuidelinesBn: string;
  recommendedForEn: string;
  recommendedForBn: string;
}

export interface DiagnosticCategory {
  id: string;
  nameEn: string;
  nameBn: string;
  iconName: string;
  descriptionEn: string;
  descriptionBn: string;
  tests: {
    nameEn: string;
    nameBn: string;
    sampleTypeEn: string;
    sampleTypeBn: string;
    deliveryTimeEn: string;
    deliveryTimeBn: string;
    priceBdt: number;
  }[];
}

export interface BlogPost {
  id: string;
  titleEn: string;
  titleBn: string;
  slug: string;
  categoryEn: string;
  categoryBn: string;
  authorEn: string;
  authorBn: string;
  authorRoleEn: string;
  authorRoleBn: string;
  date: string;
  readTimeEn: string;
  readTimeBn: string;
  image: string;
  excerptEn: string;
  excerptBn: string;
  contentEn: string[];
  contentBn: string[];
  tagsEn: string[];
  tagsBn: string[];
}

export interface Testimonial {
  id: string;
  patientNameEn: string;
  patientNameBn: string;
  locationEn: string;
  locationBn: string;
  treatmentEn: string;
  treatmentBn: string;
  rating: number;
  quoteEn: string;
  quoteBn: string;
  date: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  category: 'appointment' | 'emergency' | 'diagnostic' | 'billing' | 'general';
  questionEn: string;
  questionBn: string;
  answerEn: string;
  answerBn: string;
}

export interface JobOpening {
  id: string;
  titleEn: string;
  titleBn: string;
  departmentEn: string;
  departmentBn: string;
  typeEn: string;
  typeBn: string;
  experienceEn: string;
  experienceBn: string;
  deadline: string;
  descriptionEn: string;
  descriptionBn: string;
  requirementsEn: string[];
  requirementsBn: string[];
}

export interface AppointmentBooking {
  id: string;
  refNo: string;
  patientName: string;
  phone: string;
  email?: string;
  gender: string;
  age: string;
  departmentId: string;
  doctorId: string;
  doctorName: string;
  departmentName: string;
  date: string;
  timeSlot: string;
  appointmentType: 'new' | 'followup' | 'report_consultation';
  notes?: string;
  createdAt: string;
  status: 'Confirmed (Demo)' | 'Pending Review';
}
