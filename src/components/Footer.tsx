import React from 'react';
import { FileJson, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-lg bg-himat-600 flex items-center justify-center text-white">
                <FileJson className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white tracking-tight">
                  HiMat Technology
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-himat-400">
                  Free Developer Tools
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Standalone, 100% browser-local JSON Formatter, Validator, Minifier, and Repair tool. Built for modern engineers who prioritize privacy and instant performance.
            </p>
            <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Your JSON stays on your device. No server uploads. No logs.</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Tools & Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#workspace" className="hover:text-white transition-colors">
                  JSON Formatter
                </a>
              </li>
              <li>
                <a href="#how-to-use" className="hover:text-white transition-colors">
                  How to Use
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: HiMat Platform */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              HiMat Network
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://himat.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  HiMat Home
                </a>
              </li>
              <li>
                <a
                  href="https://himat.tech/free-tools"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  All Free Tools
                </a>
              </li>
              <li>
                <a
                  href="https://himat.tech/free-tools/json-formatter"
                  className="hover:text-white transition-colors"
                >
                  Online Live Reference
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} HiMat Technology. All rights reserved.</p>
          <div className="flex items-center space-x-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for developers worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
