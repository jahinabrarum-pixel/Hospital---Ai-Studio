import React, { useState, useEffect } from 'react';
import { useHospital } from '../context/HospitalContext';
import { doctorsData, departmentsData } from '../data/hospitalData';
import { isValidBdPhone, generateAppointmentRef } from '../utils/hospitalLogic';
import { AppointmentBooking } from '../types';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Stethoscope, 
  AlertCircle, 
  CheckCircle2, 
  Copy, 
  Info,
  CalendarCheck
} from 'lucide-react';

export const AppointmentModal: React.FC = () => {
  const { 
    language, 
    t, 
    isAppointmentModalOpen, 
    closeAppointmentModal, 
    appointmentModalDoctorId, 
    appointmentModalDeptId,
    addAppointmentBooking,
    showToast 
  } = useHospital();

  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    email: '',
    gender: 'male',
    age: '',
    departmentId: '',
    doctorId: '',
    date: '',
    timeSlot: 'Morning (10:00 AM - 1:00 PM)',
    appointmentType: 'new' as 'new' | 'followup' | 'report_consultation',
    reason: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedBooking, setSubmittedBooking] = useState<AppointmentBooking | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // Set today's date formatted as YYYY-MM-DD for min date
  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (isAppointmentModalOpen) {
      setSubmittedBooking(null);
      setErrors({});
      setFormData(prev => ({
        ...prev,
        departmentId: appointmentModalDeptId || (appointmentModalDoctorId ? doctorsData.find(d => d.id === appointmentModalDoctorId)?.departmentId || '' : ''),
        doctorId: appointmentModalDoctorId || '',
        date: todayStr
      }));
    }
  }, [isAppointmentModalOpen, appointmentModalDoctorId, appointmentModalDeptId, todayStr]);

  if (!isAppointmentModalOpen) return null;

  // Filter available doctors if department selected
  const availableDoctors = formData.departmentId 
    ? doctorsData.filter(d => d.departmentId === formData.departmentId)
    : doctorsData;

  const handleDeptChange = (deptId: string) => {
    setFormData(prev => ({
      ...prev,
      departmentId: deptId,
      doctorId: '' // reset doctor when department changes
    }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.patientName.trim()) {
      errs.patientName = language === 'bn' ? 'রোগীর নাম প্রদান করুন' : 'Patient name is required';
    } else if (formData.patientName.trim().length < 3) {
      errs.patientName = language === 'bn' ? 'কমপক্ষে ৩ অক্ষরের নাম দিন' : 'Name must be at least 3 characters';
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
        language === 'bn' 
          ? 'অনুগ্রহ করে ফর্মের ভুলগুলো সংশোধন করুন' 
          : 'Please fix the errors in the booking form',
        'warning'
      );
      return;
    }

    const doc = doctorsData.find(d => d.id === formData.doctorId);
    const dept = departmentsData.find(d => d.id === formData.departmentId);

    const refNo = generateAppointmentRef();
    const newBooking: AppointmentBooking = {
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

    addAppointmentBooking(newBooking);
    setSubmittedBooking(newBooking);
    showToast(
      language === 'bn' 
        ? `অ্যাপয়েন্টমেন্ট সফল! রেফারেন্স: ${refNo}` 
        : `Appointment submitted! Ref: ${refNo}`,
      'success'
    );
  };

  const copyRefNumber = () => {
    if (submittedBooking?.refNo) {
      navigator.clipboard.writeText(submittedBooking.refNo);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
      showToast(language === 'bn' ? 'রেফারেন্স কোড কপি হয়েছে' : 'Reference code copied to clipboard', 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#142B45] to-[#1769D2] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-white/10">
              <CalendarCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">{t.formTitle}</h3>
              <p className="text-xs text-blue-200">
                {language === 'bn' ? 'দেবীদ্বার মেডিলাব হাসপাতাল' : 'Debidwar Medilab Hospital - Serial Desk'}
              </p>
            </div>
          </div>
          <button
            onClick={closeAppointmentModal}
            className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close appointment modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Notice Banner */}
        <div className="bg-amber-50 border-b border-amber-200/80 px-6 py-2.5 flex items-center gap-2 text-xs text-amber-800">
          <Info className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{t.formNotice}</span>
        </div>

        {/* Body: Form or Success Confirmation */}
        <div className="p-6">
          {submittedBooking ? (
            /* Confirmation View */
            <div className="text-center py-4 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-slate-800">{t.bookingSuccessTitle}</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                  {t.bookingSuccessSub}
                </p>
              </div>

              {/* Reference Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-md mx-auto text-left space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-xs font-semibold text-slate-500">{t.bookingRefText}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-mono font-bold text-[#1769D2]">{submittedBooking.refNo}</span>
                    <button
                      onClick={copyRefNumber}
                      className="p-1 text-slate-500 hover:text-[#1769D2] rounded transition-colors"
                      title="Copy Reference"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block">{language === 'bn' ? 'রোগীর নাম:' : 'Patient:'}</span>
                    <span className="font-semibold text-slate-800">{submittedBooking.patientName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{language === 'bn' ? 'মোবাইল:' : 'Phone:'}</span>
                    <span className="font-semibold text-slate-800">{submittedBooking.phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{language === 'bn' ? 'বিশেষজ্ঞ ডাক্তার:' : 'Doctor:'}</span>
                    <span className="font-semibold text-slate-800">{submittedBooking.doctorName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{language === 'bn' ? 'তারিখ ও সময়:' : 'Date & Time:'}</span>
                    <span className="font-semibold text-slate-800">{submittedBooking.date} ({submittedBooking.timeSlot.split(' ')[0]})</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setSubmittedBooking(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                >
                  {t.bookAnother}
                </button>
                <button
                  onClick={closeAppointmentModal}
                  className="px-5 py-2 bg-[#1769D2] text-white text-xs font-semibold rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {t.close}
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Row 1: Patient Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="modal-patient-name" className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.patientName} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      id="modal-patient-name"
                      type="text"
                      value={formData.patientName}
                      onChange={e => setFormData({ ...formData, patientName: e.target.value })}
                      placeholder={language === 'bn' ? 'উদা: মোঃ আরিফুল ইসলাম' : 'e.g. Md. Ariful Islam'}
                      className={`w-full text-xs pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-1 ${
                        errors.patientName ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-300 focus:ring-[#1769D2]'
                      }`}
                    />
                  </div>
                  {errors.patientName && (
                    <p className="text-[11px] text-rose-500 mt-0.5">{errors.patientName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="modal-patient-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.patientPhone} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      id="modal-patient-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="01711234567"
                      className={`w-full text-xs pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-1 ${
                        errors.phone ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-300 focus:ring-[#1769D2]'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-[11px] text-rose-500 mt-0.5">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Age, Gender & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="modal-patient-age" className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.patientAge}
                  </label>
                  <input
                    id="modal-patient-age"
                    type="number"
                    min="1"
                    max="115"
                    value={formData.age}
                    onChange={e => setFormData({ ...formData, age: e.target.value })}
                    placeholder="35"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1769D2]"
                  />
                </div>

                <div>
                  <label htmlFor="modal-patient-gender" className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.patientGender}
                  </label>
                  <select
                    id="modal-patient-gender"
                    value={formData.gender}
                    onChange={e => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1769D2]"
                  >
                    <option value="male">{t.genderMale}</option>
                    <option value="female">{t.genderFemale}</option>
                    <option value="other">{t.genderOther}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="modal-patient-email" className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.patientEmail}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      id="modal-patient-email"
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="patient@gmail.com"
                      className="w-full text-xs pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1769D2]"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Department and Doctor */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="modal-dept-select" className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.selectDept} <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="modal-dept-select"
                    value={formData.departmentId}
                    onChange={e => handleDeptChange(e.target.value)}
                    className={`w-full text-xs px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 ${
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
                  {errors.departmentId && (
                    <p className="text-[11px] text-rose-500 mt-0.5">{errors.departmentId}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="modal-doc-select" className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.selectDoctor} <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="modal-doc-select"
                    value={formData.doctorId}
                    onChange={e => setFormData({ ...formData, doctorId: e.target.value })}
                    className={`w-full text-xs px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 ${
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
                  {errors.doctorId && (
                    <p className="text-[11px] text-rose-500 mt-0.5">{errors.doctorId}</p>
                  )}
                </div>
              </div>

              {/* Row 4: Appointment Date and Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="modal-app-date" className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.selectDate} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="modal-app-date"
                    type="date"
                    min={todayStr}
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className={`w-full text-xs px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 ${
                      errors.date ? 'border-rose-400' : 'border-slate-300 focus:ring-[#1769D2]'
                    }`}
                  />
                  {errors.date && (
                    <p className="text-[11px] text-rose-500 mt-0.5">{errors.date}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="modal-time-slot" className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.selectTimeSlot}
                  </label>
                  <select
                    id="modal-time-slot"
                    value={formData.timeSlot}
                    onChange={e => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1769D2]"
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

              {/* Row 5: Visit Type */}
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
                      className={`text-xs p-2 rounded-lg border text-center cursor-pointer transition-all ${
                        formData.appointmentType === item.id
                          ? 'bg-blue-50 border-[#1769D2] text-[#1769D2] font-semibold shadow-2xs'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="appointmentType"
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

              {/* Row 6: Symptoms / Reason */}
              <div>
                <label htmlFor="modal-reason" className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.reasonForVisit}
                </label>
                <textarea
                  id="modal-reason"
                  rows={2}
                  value={formData.reason}
                  onChange={e => setFormData({ ...formData, reason: e.target.value })}
                  placeholder={language === 'bn' ? 'রোগের প্রধান কষ্ট বা পূর্বের পরীক্ষার তথ্য...' : 'Describe main symptoms or medical history...'}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1769D2]"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeAppointmentModal}
                  className="px-4 py-2 border border-slate-300 text-slate-600 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                >
                  {t.close}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-[#1769D2] to-[#0E9F92] text-white text-xs font-semibold rounded-lg shadow-sm hover:shadow-md hover:brightness-105 active:scale-98 transition-all"
                >
                  {t.submit}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
