import React from 'react';
import {
  ShieldCheck,
  Wand2,
  Network,
  Minimize2,
  ArrowDownAZ,
  Upload,
} from 'lucide-react';

export const Features: React.FC = () => {
  const featureList = [
    {
      icon: ShieldCheck,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      title: '100% Browser-Local Processing',
      description:
        'Your JSON data never leaves your device. All formatting, validation, repair, and minification run entirely in client-side JavaScript.',
    },
    {
      icon: Wand2,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
      title: 'Smart Auto-Repair Engine',
      description:
        'Instantly fixes single-quoted strings, unquoted object keys, JavaScript comments, trailing commas, Python literals, and missing closing brackets.',
    },
    {
      icon: Network,
      color: 'text-himat-600 bg-himat-50 border-himat-100',
      title: 'Interactive Searchable Tree View',
      description:
        'Explore complex deeply nested JSON objects with expandable nodes, type color-coding, Expand/Collapse controls, and real-time key/value search.',
    },
    {
      icon: Minimize2,
      color: 'text-purple-600 bg-purple-50 border-purple-100',
      title: 'Beautify & Minify',
      description:
        'Switch between 2 Spaces, 4 Spaces, or Tab indentation for high readability, or collapse whitespace completely with one-click Minify.',
    },
    {
      icon: ArrowDownAZ,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
      title: 'Key Sorting & Real-Time Stats',
      description:
        'Alphabetically sort object keys recursively across nested payloads and monitor UTF-8 byte payload size, node counts, and nesting depth.',
    },
    {
      icon: Upload,
      color: 'text-cyan-600 bg-cyan-50 border-cyan-100',
      title: 'Drag & Drop File Support',
      description:
        'Seamlessly load .json and .txt files directly from your file system via native drag-and-drop or file upload picker.',
    },
  ];

  return (
    <section id="features" className="mt-16 pt-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Why Engineers Choose This JSON Formatter
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Built for performance, privacy, and seamless developer productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureList.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${feat.color}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
