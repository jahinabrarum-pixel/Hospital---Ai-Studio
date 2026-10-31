import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isValidBdPhone,
  normalizeBdPhone,
  formatBdCurrency,
  toBengaliNumber,
  generateAppointmentRef,
  filterDoctors
} from './hospitalLogic';
import { Doctor } from '../types';

test('isValidBdPhone correctly validates Bangladeshi phone numbers', () => {
  // Valid formats
  assert.equal(isValidBdPhone('01711234567'), true);
  assert.equal(isValidBdPhone('01812345678'), true);
  assert.equal(isValidBdPhone('+8801711234567'), true);
  assert.equal(isValidBdPhone('8801912345678'), true);
  assert.equal(isValidBdPhone('01711-234567'), true);
  assert.equal(isValidBdPhone('+880 1711 234567'), true);
  assert.equal(isValidBdPhone('01300000000'), true);
  assert.equal(isValidBdPhone('01400000000'), true);
  assert.equal(isValidBdPhone('01500000000'), true);

  // Invalid formats
  assert.equal(isValidBdPhone(''), false);
  assert.equal(isValidBdPhone('12345'), false);
  assert.equal(isValidBdPhone('01211234567'), false); // 012 is invalid in BD
  assert.equal(isValidBdPhone('0171123456'), false); // only 10 digits
  assert.equal(isValidBdPhone('017112345678'), false); // 12 digits
  assert.equal(isValidBdPhone('abcdefghijk'), false);
});

test('normalizeBdPhone formats valid numbers cleanly', () => {
  assert.equal(normalizeBdPhone('01711234567'), '+880 1711-234567');
  assert.equal(normalizeBdPhone('+8801819987654'), '+880 1819-987654');
});

test('formatBdCurrency formats both English and Bengali correctly', () => {
  assert.equal(formatBdCurrency(1200, 'en'), '৳1,200');
  assert.equal(formatBdCurrency(1200, 'bn'), '৳১,২০০');
});

test('toBengaliNumber converts English digits to Bengali digits', () => {
  assert.equal(toBengaliNumber('12345'), '১২৩৪৫');
  assert.equal(toBengaliNumber('2026-10-30'), '২০২৬-১০-৩০');
});

test('generateAppointmentRef produces valid format', () => {
  const ref = generateAppointmentRef();
  assert.match(ref, /^DMH-\d{6}$/);
});

test('filterDoctors correctly filters by department and query', () => {
  const sampleDoctors: Doctor[] = [
    {
      id: 'doc-1',
      nameEn: 'Dr. Md. Rafiqul Islam',
      nameBn: 'ডাঃ মোঃ রফিকুল ইসলাম',
      titleEn: 'Senior Consultant & Head of Cardiology',
      titleBn: 'সিনিয়র কনসালট্যান্ট ও কার্ডিওলজি বিভাগীয় প্রধান',
      degreesEn: 'MBBS, FCPS (Cardiology), MD',
      degreesBn: 'এমবিবিএস, এফসিপিএস (কার্ডিওলজি)',
      departmentId: 'cardiology',
      departmentEn: 'Cardiology',
      departmentBn: 'কার্ডিওলজি',
      experienceYears: 18,
      bmdcRegNo: 'A-32451',
      roomNo: 'Room 302',
      visitingDaysEn: 'Sat - Thu',
      visitingDaysBn: 'শনি - বৃহস্পতি',
      visitingTimeEn: '4:00 PM - 8:00 PM',
      visitingTimeBn: 'বিকাল ৪:০০ - রাত ৮:০০',
      feeNewPatient: 1000,
      feeFollowUp: 600,
      image: '/images/doctors/doctor1.jpg',
      aboutEn: 'Expert cardiologist with 18+ years experience.',
      aboutBn: '১৮+ বছরের অভিজ্ঞ হৃদরোগ বিশেষজ্ঞ।',
      specializationsEn: ['Interventional Cardiology', 'Hypertension'],
      specializationsBn: ['ইন্টারভেনশনাল কার্ডিওলজি', 'উচ্চ রক্তচাপ'],
      educationEn: ['MBBS (DMC)'],
      educationBn: ['এমবিবিএস (ডিএমসি)'],
      isAvailableToday: true,
    },
    {
      id: 'doc-2',
      nameEn: 'Dr. Nusrat Jahan',
      nameBn: 'ডাঃ নুসরত জাহান',
      titleEn: 'Consultant Obstetrician & Gynecologist',
      titleBn: 'কনসালট্যান্ট স্ত্রীরোগ ও প্রসূতি বিশেষজ্ঞ',
      degreesEn: 'MBBS, DGO, MCPS',
      degreesBn: 'এমবিবিএস, ডিজিও, এমসিপিএস',
      departmentId: 'gynecology',
      departmentEn: 'Gynecology & Obstetrics',
      departmentBn: 'স্ত্রীরোগ ও প্রসূতিবিদ্যা',
      experienceYears: 12,
      bmdcRegNo: 'A-45892',
      roomNo: 'Room 205',
      visitingDaysEn: 'Sun - Fri',
      visitingDaysBn: 'রবি - শুক্র',
      visitingTimeEn: '10:00 AM - 2:00 PM',
      visitingTimeBn: 'সকাল ১০:০০ - দুপুর ২:০০',
      feeNewPatient: 800,
      feeFollowUp: 500,
      image: '/images/doctors/doctor2.jpg',
      aboutEn: 'Specialist in high-risk pregnancy and gynecological surgery.',
      aboutBn: 'উচ্চ ঝুঁকিপূর্ণ গর্ভাবস্থা বিশেষজ্ঞ।',
      specializationsEn: ['High Risk Pregnancy', 'Laparoscopy'],
      specializationsBn: ['ঝুঁকিপূর্ণ গর্ভাবস্থা', 'ল্যাপারোস্কোপিক সার্জারি'],
      educationEn: ['MBBS (SSMC)'],
      educationBn: ['এমবিবিএস (এসএসএমসি)'],
      isAvailableToday: false,
    }
  ];

  const cardiologyOnly = filterDoctors(sampleDoctors, { departmentId: 'cardiology' });
  assert.equal(cardiologyOnly.length, 1);
  assert.equal(cardiologyOnly[0].id, 'doc-1');

  const availableOnly = filterDoctors(sampleDoctors, { availableTodayOnly: true });
  assert.equal(availableOnly.length, 1);
  assert.equal(availableOnly[0].id, 'doc-1');

  const searchByName = filterDoctors(sampleDoctors, { query: 'Nusrat' });
  assert.equal(searchByName.length, 1);
  assert.equal(searchByName[0].id, 'doc-2');
});
