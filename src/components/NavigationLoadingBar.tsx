import React, { useEffect, useState, useRef } from 'react';
import { useHospital } from '../context/HospitalContext';
import { Loader2 } from 'lucide-react';

export const NavigationLoadingBar: React.FC = () => {
  const { currentPage, language } = useHospital();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Avoid triggering full progress on initial mount
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setLoading(true);
    setProgress(30);

    const timer1 = setTimeout(() => {
      setProgress(75);
    }, 60);

    const timer2 = setTimeout(() => {
      setProgress(100);
    }, 220);

    const timer3 = setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 450);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [currentPage]);

  if (!loading && progress === 0) return null;

  return (
    <>
      {/* Top slim progress bar */}
      <div 
        className="fixed top-0 left-0 right-0 z-[100] h-1 bg-slate-200/20 dark:bg-slate-800/20 pointer-events-none"
        role="progressbar"
        aria-label="Navigation loading bar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div 
          className="h-full bg-gradient-to-r from-[#0E9F92] via-[#1769D2] to-sky-400 shadow-[0_0_12px_rgba(23,105,210,0.8)] transition-all ease-out"
          style={{
            width: `${progress}%`,
            transitionDuration: progress === 100 ? '180ms' : '220ms',
            opacity: progress === 100 ? 0 : 1,
          }}
        />
      </div>

      {/* Subtle floating badge in top-right corner during rapid transit */}
      {loading && progress < 100 && (
        <div className="fixed top-3 right-4 z-[100] flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 dark:bg-[#142036]/95 backdrop-blur-md shadow-lg border border-blue-100 dark:border-blue-900/50 text-[#1769D2] dark:text-blue-400 text-xs font-medium animate-in fade-in zoom-in duration-150 pointer-events-none">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#0E9F92]" />
          <span>{language === 'bn' ? 'লোড হচ্ছে...' : 'Loading...'}</span>
        </div>
      )}
    </>
  );
};
