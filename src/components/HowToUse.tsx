import React from 'react';
import { FileUp, CheckCircle, Download } from 'lucide-react';

export const HowToUse: React.FC = () => {
  return (
    <section id="how-to-use" className="mt-16 pt-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How to Use the Online JSON Formatter
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Format, validate, and beautify your raw JSON data in three easy steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Step 1 */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs relative">
            <div className="w-12 h-12 rounded-xl bg-himat-50 border border-himat-100 flex items-center justify-center text-himat-600 font-bold text-lg mb-4">
              <FileUp className="w-6 h-6" />
            </div>
            <span className="absolute top-6 right-6 text-xs font-extrabold text-slate-300 uppercase tracking-widest">
              Step 01
            </span>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              1. Paste or Drop JSON
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Paste raw JSON code directly into the left editor panel or drag and drop a <code>.json</code> or <code>.txt</code> file from your computer.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs relative">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-lg mb-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <span className="absolute top-6 right-6 text-xs font-extrabold text-slate-300 uppercase tracking-widest">
              Step 02
            </span>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              2. Auto-Format & Validate
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              The tool automatically validates your JSON syntax in real time. Click <strong>Auto-Repair</strong> if your JSON has missing quotes or trailing commas.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs relative">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg mb-4">
              <Download className="w-6 h-6" />
            </div>
            <span className="absolute top-6 right-6 text-xs font-extrabold text-slate-300 uppercase tracking-widest">
              Step 03
            </span>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              3. Copy or Download
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Inspect the formatted code or interactive tree view. Use <strong>Copy</strong> to send it to clipboard or <strong>Download</strong> to save <code>formatted.json</code>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
