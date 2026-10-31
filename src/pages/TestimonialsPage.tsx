import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import { testimonialsData } from '../data/hospitalData';
import { Testimonial } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Star, MessageSquare, CheckCircle2, User, Send } from 'lucide-react';

export const TestimonialsPage: React.FC = () => {
  const { language, t, showToast } = useHospital();
  
  const [list, setList] = useState<Testimonial[]>(testimonialsData);
  const [newReview, setNewReview] = useState({
    name: '',
    location: '',
    treatment: '',
    rating: 5,
    quote: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.quote) {
      showToast(language === 'bn' ? 'অনুগ্রহ করে নাম ও মন্তব্য লিখুন' : 'Please provide your name and feedback', 'warning');
      return;
    }

    const created: Testimonial = {
      id: `test-${Date.now()}`,
      patientNameEn: newReview.name,
      patientNameBn: newReview.name,
      locationEn: newReview.location || 'Debidwar, Cumilla',
      locationBn: newReview.location || 'দেবীদ্বার, কুমিল্লা',
      treatmentEn: newReview.treatment || 'Consultation & Inpatient Care',
      treatmentBn: newReview.treatment || 'পরামর্শ ও চিকিৎসাসেবা',
      rating: newReview.rating,
      quoteEn: newReview.quote,
      quoteBn: newReview.quote,
      date: 'Just now',
      verified: true
    };

    setList([created, ...list]);
    setSubmitted(true);
    showToast(
      language === 'bn' ? 'আপনার মূল্যবান মতামতের জন্য ধন্যবাদ!' : 'Thank you for your valuable feedback!',
      'success'
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: t.navTestimonials }]} />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#142B45] to-[#1769D2] text-white rounded-3xl p-8 sm:p-12 shadow-xl text-center space-y-3">
        <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-md">
          {language === 'bn' ? 'রোগীদের আরোগ্য ও ভালোবাসা' : 'Patient Stories & Reviews'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          {t.secTestimonialsTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto leading-relaxed">
          {t.secTestimonialsSub}
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold border border-emerald-200">
                  {language === 'bn' ? 'যাচাইকৃত রোগী' : 'Verified Patient'}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                "{language === 'bn' ? item.quoteBn : item.quoteEn}"
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                  {language === 'bn' ? item.patientNameBn : item.patientNameEn}
                </h4>
                <p className="text-[11px] text-slate-400">
                  {language === 'bn' ? item.locationBn : item.locationEn}
                </p>
                <p className="text-[10px] text-[#1769D2] font-medium mt-0.5">
                  {language === 'bn' ? item.treatmentBn : item.treatmentEn}
                </p>
              </div>
              <span className="text-[10px] text-slate-400">{item.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Leave Feedback Form */}
      <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-1">
          <h3 className="text-xl font-bold text-slate-900">
            {language === 'bn' ? 'আপনার অভিজ্ঞতা শেয়ার করুন' : 'Share Your Experience with Us'}
          </h3>
          <p className="text-xs text-slate-500">
            {language === 'bn' ? 'আমাদের সেবা সম্পর্কে আপনার মূল্যবান মতামত আমাদের চিকিৎসা মান উন্নত করতে সহায়তা করে।' : 'Your feedback helps us continuously elevate our standards of healthcare in Debidwar.'}
          </p>
        </div>

        {submitted ? (
          <div className="p-6 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <h4 className="font-bold text-slate-800 text-sm">
              {language === 'bn' ? 'আপনার মতামত যুক্ত হয়েছে!' : 'Your Review has Been Added!'}
            </h4>
            <button
              onClick={() => {
                setSubmitted(false);
                setNewReview({ name: '', location: '', treatment: '', rating: 5, quote: '' });
              }}
              className="text-xs font-semibold text-[#1769D2] hover:underline"
            >
              {language === 'bn' ? 'আরেকটি মতামত দিন' : 'Submit another review'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'bn' ? 'আপনার নাম' : 'Your Name'} *
                </label>
                <input
                  type="text"
                  required
                  value={newReview.name}
                  onChange={e => setNewReview({ ...newReview, name: e.target.value })}
                  placeholder={language === 'bn' ? 'নাম লিখুন' : 'Full Name'}
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'bn' ? 'এলাকা / ঠিকানা' : 'Location (Upazila)'}
                </label>
                <input
                  type="text"
                  value={newReview.location}
                  onChange={e => setNewReview({ ...newReview, location: e.target.value })}
                  placeholder={language === 'bn' ? 'দেবীদ্বার, কুমিল্লা' : 'Debidwar, Cumilla'}
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'bn' ? 'চিকিৎসা বা বিভাগের নাম' : 'Treatment / Department'}
                </label>
                <input
                  type="text"
                  value={newReview.treatment}
                  onChange={e => setNewReview({ ...newReview, treatment: e.target.value })}
                  placeholder={language === 'bn' ? 'কার্ডিওলজি / নরমাল ডেলিভারি' : 'e.g. Cardiology / General Surgery'}
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'bn' ? 'রেটিং' : 'Rating'}
                </label>
                <select
                  value={newReview.rating}
                  onChange={e => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none"
                >
                  <option value={5}>5 Stars (Excellent / চমৎকার)</option>
                  <option value={4}>4 Stars (Very Good / খুব ভালো)</option>
                  <option value={3}>3 Stars (Average / সাধারণ)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === 'bn' ? 'আপনার অভিজ্ঞতা বা মন্তব্য' : 'Your Review / Experience'} *
              </label>
              <textarea
                required
                rows={3}
                value={newReview.quote}
                onChange={e => setNewReview({ ...newReview, quote: e.target.value })}
                placeholder={language === 'bn' ? 'হাসপাতালের সেবা ও ডাক্তারদের সম্পর্কে আপনার অভিজ্ঞতা লিখুন...' : 'Write your feedback regarding doctors and nursing care...'}
                className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#1769D2] hover:bg-blue-600 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'মতামত সাবমিট করুন' : 'Submit Review'}</span>
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
