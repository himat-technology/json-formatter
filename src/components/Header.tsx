import React, { useState } from 'react';
import { FileJson, Menu, X, ShieldCheck, ExternalLink } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3">
            <a href="https://himat.tech" className="flex items-center space-x-2.5 group" aria-label="HiMat Technology">
              <div className="w-9 h-9 rounded-lg bg-himat-600 flex items-center justify-center text-white shadow-md shadow-himat-600/20 group-hover:bg-himat-700 transition-colors">
                <FileJson className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-slate-900 tracking-tight leading-tight group-hover:text-himat-600 transition-colors">
                  HiMat
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-himat-600">
                  Free Tools
                </span>
              </div>
            </a>

            <div className="hidden md:block h-5 w-px bg-slate-200 mx-2" />

            <div className="hidden md:flex items-center space-x-1">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                JSON Formatter & Validator
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#workspace"
              className="text-sm font-medium text-slate-600 hover:text-himat-600 transition-colors"
            >
              Formatter Tool
            </a>
            <a
              href="#how-to-use"
              className="text-sm font-medium text-slate-600 hover:text-himat-600 transition-colors"
            >
              How To Use
            </a>
            <a
              href="#features"
              className="text-sm font-medium text-slate-600 hover:text-himat-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-slate-600 hover:text-himat-600 transition-colors"
            >
              FAQ
            </a>
            
            <div className="flex items-center space-x-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Offline & Private</span>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-himat-500"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-2">
          <a
            href="#workspace"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            Formatter Tool
          </a>
          <a
            href="#how-to-use"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            How To Use
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            Features
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            FAQ
          </a>
          <a
            href="https://himat.tech/free-tools"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 px-3 py-2 rounded-md text-base font-medium text-himat-600 hover:bg-himat-50"
          >
            <span>All Free Tools</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  );
};
