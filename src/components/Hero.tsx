import React from 'react';
import { Lock, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        {/* Privacy Pill Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-himat-50 border border-himat-200 text-himat-700 text-xs font-semibold shadow-xs">
          <Lock className="w-3.5 h-3.5 text-himat-600" />
          <span>100% Browser-Local Processing & Privacy First</span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          JSON Formatter & Validator <span className="text-himat-600">Online</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          Format, beautify, validate, minify, sort object keys, and repair common JSON errors instantly in your browser.
        </p>

        <div className="pt-1 flex items-center justify-center space-x-4 text-xs font-medium text-slate-500">
          <span className="flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Smart Auto-Repair</span>
          </span>
          <span>•</span>
          <span>Zero Server Uploads</span>
          <span>•</span>
          <span>Interactive Tree View</span>
        </div>
      </div>
    </section>
  );
};
