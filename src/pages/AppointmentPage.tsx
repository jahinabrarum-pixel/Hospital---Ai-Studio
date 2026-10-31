import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import { doctorsData, departmentsData, hospitalInfo } from '../data/hospitalData';
import { isValidBdPhone, generateAppointmentRef } from '../utils/hospitalLogic';
import { AppointmentBooking } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Info, 
  Copy, 
  AlertCircle, 
  PhoneCall, 
  CalendarCheck,
  ClipboardList
} from 'lucide-react';

export const AppointmentPage: React.FC = () => {
  const { 
    language, 
    t, 
    bookedAppointments, 
    addAppointmentBooking, 
    showToast,
    navigateTo 
  } = useHospital();

  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    email: '',
    age: '',
    gender: 'male',
    departmentId: '',
    doctorId: '',
    date: todayStr,
    timeSlot: 'Morning (10:00 AM - 1:00 PM)',
    appointmentType: 'new' as 'new' | 'followup' | 'report_consultation',
    reason: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successBooking, setSuccessBooking] = useState<AppointmentBooking | null>(null);

  const availableDoctors = formData.departmentId 
    ? doctorsData.filter(d => d.departmentId === formData.departmentId)
    : doctorsData;

  const handleDeptChange = (deptId: string) => {
    setFormData(prev => ({
      ...prev,
      departmentId: deptId,
      doctorId: ''
    }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.patientName.trim()) {
      errs.patientName = language === 'bn' ? 'রোগীর পূর্ণ নাম আবশ্যক' : 'Patient name is required';
    } else if (formData.patientName.trim().length < 3) {
      errs.patientName = language === 'bn' ? 'কমপক্ষে ৩ অক্ষরের নাম লিখুন' : 'Name must be at least 3 characters';
    }

    if (!formData.phone.trim()) {
      errs.phone = language === 'bn' ? 'মোবাইল নম্বর প্রদান করুন' : 'Phone number is required';
    } else if (!isValidBdPhone(formData.phone)) {
      errs.phone = language === 'bn' 
        ? 'সঠিক বাংলাদেশি নম্বর দিন (যেমন: 01711234567)' 
        : 'Enter a valid Bangladesh mobile number (e.g. 01711234567)';
    }

    if (!formData.departmentId) {
      errs.departmentId = language === 'bn' ? 'বিভাগ নির্বাচন করুন' : 'Please select a department';
    }

    if (!formData.doctorId) {
      errs.doctorId = language === 'bn' ? 'ডাক্তার নির্বাচন করুন' : 'Please select a specialist doctor';
    }

    if (!formData.date) {
      errs.date = language === 'bn' ? 'তারিখ নির্বাচন করুন' : 'Appointment date is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast(
        language === 'bn' ? 'অনুগ্রহ করে লাল চিহ্নিত ঘরগুলো পূরণ করুন' : 'Please resolve the highlighted validation errors',
        'warning'
      );
      return;
    }

    const doc = doctorsData.find(d => d.id === formData.doctorId);
    const dept = departmentsData.find(d => d.id === formData.departmentId);
    const refNo = generateAppointmentRef();

    const booking: AppointmentBooking = {
      id: `book-${Date.now()}`,
      refNo,
      patientName: formData.patientName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || undefined,
      gender: formData.gender,
      age: formData.age || 'N/A',
      departmentId: formData.departmentId,
      doctorId: formData.doctorId,
      doctorName: language === 'bn' ? (doc?.nameBn || '') : (doc?.nameEn || ''),
      departmentName: language === 'bn' ? (dept?.nameBn || '') : (dept?.nameEn || ''),
      date: formData.date,
      timeSlot: formData.timeSlot,
      appointmentType: formData.appointmentType,
      notes: formData.notes.trim() || undefined,
      createdAt: new Date().toISOString(),
      status: 'Confirmed (Demo)'
    };

    addAppointmentBooking(booking);
    setSuccessBooking(booking);
    showToast(
      language === 'bn' ? `অ্যাপয়েন্টমেন্ট সফল! রেফারেন্স: ${refNo}` : `Appointment booked! Ref: ${refNo}`,
      'success'
    );
  };

  const copyRef = (ref: string) => {
    navigator.clipboard.writeText(ref);
    showToast(language === 'bn' ? 'রেফারেন্স কোড কপি হয়েছে' : 'Reference code copied!', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: t.bookAppointment }]} />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#142B45] to-[#1769D2] text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl text-center md:text-left">
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-md">
            {language === 'bn' ? 'অনলাইন চেম্বার বুকিং' : 'Doctor Chamber Appointments'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {t.formTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {language === 'bn'
              ? 'ঘরে বসেই আপনার পছন্দের বিশেষজ্ঞ চিকিৎসকের সিরিয়াল বুকিং সম্পন্ন করুন। আমাদের সিরিয়াল কো-অর্ডিনেটর আপনাকে দ্রুত যোগাযোগ করবেন।'
              : 'Book your specialist doctor consultation in Debidwar with zero queue hassle. Confirmation notification delivered instantly.'}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center shrink-0">
          <p className="text-[11px] text-slate-300">{language === 'bn' ? 'সরাসরি সিরিয়াল হেল্পলাইন:' : 'Direct Serial Hotline:'}</p>
          <a href={`tel:${hospitalInfo.phoneEn}`} className="text-lg font-black text-white hover:text-emerald-300 block">
            {hospitalInfo.phoneEn}
          </a>
          <p className="text-[10px] text-emerald-300 mt-0.5">{language === 'bn' ? 'প্রতিদিন সকাল ৮:০০ - রাত ১০:০০' : '8:00 AM - 10:00 PM Daily'}</p>
        </div>
      </div>

      {/* Demo Notice Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3 text-xs text-amber-800">
        <Info className="w-5 h-5 text-amber-600 shrink-0" />
        <div>
          <p className="font-bold">{language === 'bn' ? 'প্রদর্শনী বুকিং ইন্টারফেস নির্দেশিকা' : 'Demonstration Booking Interface'}</p>
          <p>{t.formNotice}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Appointment Booking Form */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          
          {successBooking ? (
            /* Success confirmation card */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900">{t.bookingSuccessTitle}</h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1">
                  {t.bookingSuccessSub}
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 max-w-md mx-auto text-left space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="text-xs font-semibold text-slate-500">{t.bookingRefText}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-mono font-black text-[#1769D2]">{successBooking.refNo}</span>
                    <button
                      onClick={() => copyRef(successBooking.refNo)}
                      className="p-1 text-slate-400 hover:text-[#1769D2] rounded transition-colors"
                      title="Copy Reference"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <p><span className="text-slate-400">{t.patientName}:</span> <span className="font-bold text-slate-800">{successBooking.patientName}</span></p>
                  <p><span className="text-slate-400">{t.patientPhone}:</span> <span className="font-bold text-slate-800">{successBooking.phone}</span></p>
                  <p><span className="text-slate-400">{t.selectDoctor}:</span> <span className="font-bold text-[#1769D2]">{successBooking.doctorName}</span></p>
                  <p><span className="text-slate-400">{t.selectDate}:</span> <span className="font-bold text-slate-800">{successBooking.date} ({successBooking.timeSlot})</span></p>
                  <p><span className="text-slate-400">{language === 'bn' ? 'স্ট্যাটাস:' : 'Status:'}</span> <span className="font-bold text-emerald-600">{successBooking.status}</span></p>
                </div>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => setSuccessBooking(null)}
                  className="px-6 py-2.5 bg-[#1769D2] hover:bg-blue-600 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  {t.bookAnother}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                {language === 'bn' ? 'রোগী ও ডাক্তারের তথ্য' : 'Patient & Consultation Details'}
              </h2>

              {/* Patient Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="app-page-patient-name" className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.patientName} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="app-page-patient-name"
                    type="text"
                    value={formData.patientName}
                    onChange={e => setFormData({ ...formData, patientName: e.target.value })}
                    placeholder={language === 'bn' ? 'উদা: মোঃ নাজমুল হক' : 'e.g. Md. Nazmul Hoque'}
                    className={`w-full text-xs px-3.5 py-2.5 border rounded-xl focus:outline-none focus:ring-1 ${
                      errors.patientName ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-300 focus:ring-[#1769D2]'
                    }`}
                  />
                  {errors.patientName && <p className="text-[11px] text-rose-500 mt-1">{errors.patientName}</p>}
                </div>

                <div>
                  <label htmlFor="app-page-patient-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.patientPhone} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="app-page-patient-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="01711234567"
                    className={`w-full text-xs px-3.5 py-2.5 border rounded-xl focus:outline-none focus:ring-1 ${
                      errors.phone ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-300 focus:ring-[#1769D2]'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Age, Gender & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="app-page-patient-age" className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.patientAge}
                  </label>
                  <input
                    id="app-page-patient-age"
                    type="number"
                    min="1"
                    max="115"
                    value={formData.age}
                    onChange={e => setFormData({ ...formData, age: e.target.value })}
                    placeholder="28"
                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1769D2]"
                  />
                </div>

                <div>
                  <label htmlFor="app-page-patient-gender" className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.patientGender}
                  </label>
                  <select
                    id="app-page-patient-gender"
                    value={formData.gender}
                    onChange={e => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1769D2]"
                  >
                    <option value="male">{t.genderMale}</option>
                    <option value="female">{t.genderFemale}</option>
                    <option value="other">{t.genderOther}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="app-page-patient-email" className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.patientEmail}
                  </label>
                  <input
                    id="app-page-patient-email"
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="patient@gmail.com"
                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1769D2]"
                  />
                </div>
              </div>

              {/* Department & Doctor Select */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="app-page-dept" className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.selectDept} <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="app-page-dept"
                    value={formData.departmentId}
                    onChange={e => handleDeptChange(e.target.value)}
                    className={`w-full text-xs px-3.5 py-2.5 border rounded-xl focus:outline-none focus:ring-1 ${
                      errors.departmentId ? 'border-rose-400' : 'border-slate-300 focus:ring-[#1769D2]'
                    }`}
                  >
                    <option value="">-- {t.selectDept} --</option>
                    {departmentsData.map(dept => (
                      <option key={dept.id} value={dept.id}>
                        {language === 'bn' ? dept.nameBn : dept.nameEn}
                      </option>
                    ))}
                  </select>
                  {errors.departmentId && <p className="text-[11px] text-rose-500 mt-1">{errors.departmentId}</p>}
                </div>

                <div>
                  <label htmlFor="app-page-doctor" className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.selectDoctor} <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="app-page-doctor"
                    value={formData.doctorId}
                    onChange={e => setFormData({ ...formData, doctorId: e.target.value })}
                    className={`w-full text-xs px-3.5 py-2.5 border rounded-xl focus:outline-none focus:ring-1 ${
                      errors.doctorId ? 'border-rose-400' : 'border-slate-300 focus:ring-[#1769D2]'
                    }`}
                  >
                    <option value="">-- {t.selectDoctor} --</option>
                    {availableDoctors.map(doc => (
                      <option key={doc.id} value={doc.id}>
                        {language === 'bn' ? doc.nameBn : doc.nameEn} ({doc.roomNo})
                      </option>
                    ))}
                  </select>
                  {errors.doctorId && <p className="text-[11px] text-rose-500 mt-1">{errors.doctorId}</p>}
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="app-page-date" className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.selectDate} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="app-page-date"
                    type="date"
                    min={todayStr}
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className={`w-full text-xs px-3.5 py-2.5 border rounded-xl focus:outline-none focus:ring-1 ${
                      errors.date ? 'border-rose-400' : 'border-slate-300 focus:ring-[#1769D2]'
                    }`}
                  />
                  {errors.date && <p className="text-[11px] text-rose-500 mt-1">{errors.date}</p>}
                </div>

                <div>
                  <label htmlFor="app-page-timeslot" className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.selectTimeSlot}
                  </label>
                  <select
                    id="app-page-timeslot"
                    value={formData.timeSlot}
                    onChange={e => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1769D2]"
                  >
                    <option value="Morning (10:00 AM - 1:00 PM)">
                      {language === 'bn' ? 'সকাল (১০:০০ - দুপুর ১:০০)' : 'Morning (10:00 AM - 1:00 PM)'}
                    </option>
                    <option value="Afternoon (3:30 PM - 6:00 PM)">
                      {language === 'bn' ? 'বিকাল (৩:৩০ - সন্ধ্যা ৬:০০)' : 'Afternoon (3:30 PM - 6:00 PM)'}
                    </option>
                    <option value="Evening (6:00 PM - 8:30 PM)">
                      {language === 'bn' ? 'সন্ধ্যা (৬:০০ - রাত ৮:৩০)' : 'Evening (6:00 PM - 8:30 PM)'}
                    </option>
                  </select>
                </div>
              </div>

              {/* Visit Type */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {t.appointmentType}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'new', label: t.typeNew },
                    { id: 'followup', label: t.typeFollowup },
                    { id: 'report_consultation', label: t.typeReport },
                  ].map(item => (
                    <label
                      key={item.id}
                      className={`text-xs p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                        formData.appointmentType === item.id
                          ? 'bg-blue-50 border-[#1769D2] text-[#1769D2] font-bold shadow-2xs'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="appointmentTypePage"
                        value={item.id}
                        checked={formData.appointmentType === item.id}
                        onChange={() => setFormData({ ...formData, appointmentType: item.id as any })}
                        className="sr-only"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Symptoms / Notes */}
              <div>
                <label htmlFor="app-page-reason" className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.reasonForVisit}
                </label>
                <textarea
                  id="app-page-reason"
                  rows={2}
                  value={formData.reason}
                  onChange={e => setFormData({ ...formData, reason: e.target.value })}
                  placeholder={language === 'bn' ? 'রোগের প্রধান লক্ষণ বা কারণ...' : 'Describe main symptoms or concern...'}
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1769D2]"
                />
              </div>

              <div>
                <label htmlFor="app-page-notes" className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.additionalNotes}
                </label>
                <input
                  id="app-page-notes"
                  type="text"
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={language === 'bn' ? 'পূর্বের কোনো প্রেসক্রিপশন বা অপারেশনের নোট...' : 'Previous prescription notes or surgery history...'}
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1769D2]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-[#1769D2] to-[#0E9F92] hover:brightness-105 text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-98 cursor-pointer"
              >
                {t.submit}
              </button>

            </form>
          )}

        </div>

        {/* Right Sidebar: Instructions & Session Bookings */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Instructions Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
              {language === 'bn' ? 'সিরিয়াল বুকিংয়ের নিয়মাবলী' : 'Booking Instructions'}
            </h3>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-[#1769D2] flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">1</span>
                <p>{language === 'bn' ? 'অনলাইন ফর্মটি নির্ভুল তথ্য ও সচল মোবাইল নম্বর দিয়ে পূরণ করুন।' : 'Submit the booking form with accurate patient info and valid phone.'}</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-[#1769D2] flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">2</span>
                <p>{language === 'bn' ? 'বুকিং শেষে একটি ইউনিক ডেমো রেফারেন্স কোড পাবেন।' : 'A unique Demo Reference code will be generated upon submission.'}</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-[#1769D2] flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">3</span>
                <p>{language === 'bn' ? 'হাসপাতালে পৌঁছানোর পর নির্ধারিত চেম্বার কাউন্টারে টোকেন সংগ্রহ করুন।' : 'Present your reference number at the chamber serial reception counter.'}</p>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] text-slate-500">
              {language === 'bn' ? 'জরুরি জরুরি রোগীদের জন্য সিরিয়াল ছাড়া সরাসরি ইমার্জেন্সি বিভাগে যোগাযোগের পরামর্শ দেওয়া হচ্ছে।' : 'For life-threatening trauma or chest pain, proceed directly to the 24/7 Emergency Triage desk.'}
            </div>
          </div>

          {/* Session Booked Appointments */}
          {bookedAppointments.length > 0 && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-slate-900">
                <ClipboardList className="w-4 h-4 text-[#1769D2]" />
                <h3 className="font-bold text-sm">
                  {language === 'bn' ? 'আপনার সেশনের বুকিং সমূহ' : 'Your Session Bookings'} ({bookedAppointments.length})
                </h3>
              </div>

              <div className="space-y-2.5 max-h-72 overflow-y-auto">
                {bookedAppointments.map(bk => (
                  <div key={bk.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-[#1769D2]">{bk.refNo}</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                        {bk.status}
                      </span>
                    </div>
                    <p className="font-semibold text-slate-800">{bk.patientName} • {bk.doctorName}</p>
                    <p className="text-[11px] text-slate-500">{bk.date} ({bk.timeSlot.split(' ')[0]})</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
