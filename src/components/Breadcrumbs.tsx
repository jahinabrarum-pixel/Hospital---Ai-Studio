import React from 'react';
import { useHospital } from '../context/HospitalContext';
import { PageRoute } from '../types';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  items: {
    label: string;
    page?: PageRoute;
    params?: { id?: string; dept?: string };
  }[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const { navigateTo, t } = useHospital();

  return (
    <nav className="flex items-center text-xs text-slate-500 py-3 mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap gap-1.5">
        <li>
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-1 hover:text-[#1769D2] transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{t.navHome}</span>
          </button>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <li>
                {isLast || !item.page ? (
                  <span className="font-semibold text-slate-800 line-clamp-1">{item.label}</span>
                ) : (
                  <button
                    onClick={() => item.page && navigateTo(item.page, item.params)}
                    className="hover:text-[#1769D2] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
