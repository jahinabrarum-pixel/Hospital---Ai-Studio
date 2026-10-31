import React from 'react';
import { useHospital } from '../context/HospitalContext';
import { blogPostsData } from '../data/hospitalData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { 
  Clock, 
  Calendar, 
  User, 
  Share2, 
  ArrowLeft, 
  Tag, 
  CheckCircle2, 
  BookOpen 
} from 'lucide-react';

export const BlogDetailsPage: React.FC = () => {
  const { 
    language, 
    t, 
    selectedBlogId, 
    navigateTo, 
    showToast 
  } = useHospital();

  const post = blogPostsData.find(b => b.id === selectedBlogId) || blogPostsData[0];
  const relatedPosts = blogPostsData.filter(b => b.id !== post.id && b.categoryEn === post.categoryEn);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast(
      language === 'bn' ? 'আর্টিকেলের লিংক কপি হয়েছে!' : 'Article link copied to clipboard!',
      'info'
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={[
          { label: t.navBlog, page: 'blog' },
          { label: language === 'bn' ? post.titleBn : post.titleEn }
        ]} 
      />

      {/* Article Header */}
      <div className="space-y-4">
        <span className="text-xs font-bold text-[#1769D2] bg-blue-50 px-3 py-1 rounded-md border border-blue-100 uppercase">
          {language === 'bn' ? post.categoryBn : post.categoryEn}
        </span>
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
          {language === 'bn' ? post.titleBn : post.titleEn}
        </h1>

        {/* Metadata & Author Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-slate-200 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-100 text-[#1769D2] flex items-center justify-center font-bold">
              Dr
            </div>
            <div>
              <p className="font-bold text-slate-800">{language === 'bn' ? post.authorBn : post.authorEn}</p>
              <p className="text-[11px] text-slate-500">{language === 'bn' ? post.authorRoleBn : post.authorRoleEn}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.date}</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? post.readTimeBn : post.readTimeEn}</span>
            </span>
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 flex items-center gap-1 cursor-pointer transition-colors"
              title="Share"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="text-[10px] font-semibold">{language === 'bn' ? 'শেয়ার' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Featured Cover Image */}
      <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 h-72 sm:h-96">
        <img
          src={post.image}
          alt={post.titleEn}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Body Content */}
      <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-5 text-sm sm:text-base">
        {(language === 'bn' ? post.contentBn : post.contentEn).map((paragraph, index) => (
          <p key={index} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Tags */}
      <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mr-2">
          <Tag className="w-3.5 h-3.5" />
          <span>{language === 'bn' ? 'ট্যাগস:' : 'Tags:'}</span>
        </span>
        {(language === 'bn' ? post.tagsBn : post.tagsEn).map((tag, idx) => (
          <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-lg">
            #{tag}
          </span>
        ))}
      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <div className="pt-8 border-t border-slate-200 space-y-4">
          <h3 className="text-lg font-bold text-slate-900">
            {language === 'bn' ? 'সম্পর্কিত অন্যান্য স্বাস্থ্য নিবন্ধ' : 'Related Health Articles'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedPosts.map(rel => (
              <div
                key={rel.id}
                onClick={() => navigateTo('blog-details', { id: rel.id })}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:shadow-md transition-all cursor-pointer space-y-2 group"
              >
                <h4 className="font-bold text-slate-800 text-sm group-hover:text-[#1769D2] transition-colors line-clamp-1">
                  {language === 'bn' ? rel.titleBn : rel.titleEn}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {language === 'bn' ? rel.excerptBn : rel.excerptEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Back button */}
      <div>
        <button
          onClick={() => navigateTo('blog')}
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'bn' ? 'ব্লগে ফিরে যান' : 'Back to Health Blog'}</span>
        </button>
      </div>

    </div>
  );
};
