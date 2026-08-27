import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Is my JSON data uploaded to a server?',
      answer:
        'No, absolutely not. All parsing, validation, formatting, repair, key sorting, and statistics calculation occur 100% locally inside your web browser. No JSON contents or uploaded files are ever transmitted to any remote API or server.',
    },
    {
      question: 'How does JSON auto-repair work?',
      answer:
        'The auto-repair engine safely detects common non-standard JSON syntax rules, including JavaScript single-quoted strings, unquoted object property keys, trailing commas in arrays/objects, JS single-line and multi-line comments, Python literals (True, False, None), and missing closing brackets at the end of truncated payloads.',
    },
    {
      question: 'Can I handle large JSON files?',
      answer:
        'Yes! The tool is optimized for client-side memory efficiency and can process multi-megabyte JSON payloads instantly without freezing your browser window.',
    },
    {
      question: 'Can I download formatted JSON?',
      answer:
        'Yes. Clicking the "Download" button immediately triggers a native browser Blob download, saving the formatted JSON as formatted.json directly to your computer.',
    },
    {
      question: 'Is this JSON formatter free?',
      answer:
        'Yes, HiMat JSON Formatter & Validator is 100% free with no registration, subscription, rate limits, or hidden fees.',
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="mt-16 pt-12 pb-16 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Everything you need to know about security, auto-repair, and features.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-himat-500"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-himat-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
