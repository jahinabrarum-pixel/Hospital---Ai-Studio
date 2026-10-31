import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import { blogPostsData } from '../data/hospitalData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Search, Clock, User, ChevronRight, BookOpen } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const { language, t, navigateTo } = useHospital();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', labelEn: 'All Health Articles', labelBn: 'সকল স্বাস্থ্য নিবন্ধ' },
    { id: 'cardiology', labelEn: 'Cardiology', labelBn: 'হৃদরোগ ও ইমার্জেন্সি' },
    { id: 'maternal', labelEn: 'Maternal Health', labelBn: 'মাতৃস্বাস্থ্য ও প্রসূতি' },
    { id: 'endocrinology', labelEn: 'Diabetes', labelBn: 'ডায়াবেটিস ও হরমোন' },
    { id: 'pediatrics', labelEn: 'Pediatrics', labelBn: 'শিশু স্বাস্থ্য' },
    { id: 'orthopedics', labelEn: 'Orthopedics', labelBn: 'হাড় ও স্পাইন' },
  ];

  const filteredPosts = blogPostsData.filter(post => {
    const matchesSearch = !searchTerm || 
      post.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.titleBn.includes(searchTerm) ||
      post.excerptEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerptBn.includes(searchTerm);

    const matchesCat = selectedCategory === 'all' || 
      post.categoryEn.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: t.navBlog }]} />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#142B45] to-[#1769D2] text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl text-center md:text-left">
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-md">
            {language === 'bn' ? 'ডাক্তারদের স্বাস্থ্য কথা' : 'Expert Health Knowledge'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {t.secBlogTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {t.secBlogSub}
          </p>
        </div>

        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={language === 'bn' ? 'স্বাস্থ্য বিষয় খুঁজুন...' : 'Search articles...'}
            className="w-full text-xs pl-10 pr-4 py-2.5 bg-white text-slate-800 rounded-xl focus:outline-none shadow-md"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#1769D2] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {language === 'bn' ? cat.labelBn : cat.labelEn}
          </button>
        ))}
      </div>

      {/* Blog Cards Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <div
              key={post.id}
              onClick={() => navigateTo('blog-details', { id: post.id })}
              className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl border border-slate-200 transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="h-52 overflow-hidden relative bg-slate-100">
                  <img
                    src={post.image}
                    alt={post.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#1769D2] text-white text-[11px] font-bold px-3 py-1 rounded-md shadow-xs">
                    {language === 'bn' ? post.categoryBn : post.categoryEn}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{language === 'bn' ? post.readTimeBn : post.readTimeEn}</span>
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-[#1769D2] transition-colors leading-snug">
                    {language === 'bn' ? post.titleBn : post.titleEn}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {language === 'bn' ? post.excerptBn : post.excerptEn}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 mt-2 pt-4 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-[#1769D2] flex items-center justify-center font-bold text-xs">
                    Dr
                  </div>
                  <span className="font-semibold text-slate-700 text-xs">
                    {language === 'bn' ? post.authorBn : post.authorEn}
                  </span>
                </div>
                <span className="font-semibold text-[#1769D2] flex items-center gap-1">
                  {t.viewDetails} →
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-2" />
          <p className="text-xs text-slate-500">{language === 'bn' ? 'কোনো নিবন্ধ পাওয়া যায়নি।' : 'No articles matched your criteria.'}</p>
        </div>
      )}

    </div>
  );
};
