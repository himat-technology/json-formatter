import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumb: React.FC = () => {
  return (
    <nav className="flex px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-3 text-xs sm:text-sm text-slate-500 font-medium" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1.5 sm:space-x-2 flex-wrap">
        <li className="inline-flex items-center">
          <a
            href="https://himat.tech"
            className="inline-flex items-center hover:text-himat-600 transition-colors"
          >
            <Home className="w-3.5 h-3.5 mr-1" />
            <span>Home</span>
          </a>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <a
              href="https://himat.tech/free-tools"
              className="ml-1.5 sm:ml-2 hover:text-himat-600 transition-colors"
            >
              Free Tools
            </a>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="ml-1.5 sm:ml-2 text-slate-900 font-semibold">
              JSON Formatter & Validator
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
};
