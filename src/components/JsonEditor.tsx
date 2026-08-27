import React from 'react';
import { FileText, FileUp } from 'lucide-react';

interface JsonEditorProps {
  value: string;
  onChange: (val: string) => void;
  charCount: number;
}

export const JsonEditor: React.FC<JsonEditorProps> = ({
  value,
  onChange,
  charCount,
}) => {
  const lineCount = value ? value.split('\n').length : 0;

  return (
    <div className="flex flex-col h-full bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      {/* Panel Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-himat-600" />
          <h3 className="text-sm font-semibold text-slate-800">
            Raw Input / Unformatted JSON
          </h3>
        </div>

        <div className="flex items-center space-x-3 text-xs text-slate-500 font-mono">
          <span>{lineCount} {lineCount === 1 ? 'line' : 'lines'}</span>
          <span>•</span>
          <span>{charCount.toLocaleString()} chars</span>
        </div>
      </div>

      {/* Editor Body */}
      <div className="relative flex-1 min-h-[420px] sm:min-h-[480px]">
        {!value && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-slate-400 pointer-events-none z-10">
            <FileUp className="w-10 h-10 mb-2 stroke-1 text-slate-300" />
            <p className="text-sm font-medium text-slate-600">
              Paste raw JSON or drag and drop a .json file here
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Supports single quotes, unquoted keys, and comments via Auto-Repair
            </p>
          </div>
        )}

        <textarea
          id="raw-json-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder=""
          spellCheck={false}
          className="w-full h-full p-4 font-mono text-xs sm:text-sm text-slate-900 bg-transparent resize-none border-none outline-none focus:ring-0 leading-relaxed overflow-y-auto"
          aria-label="Raw JSON Input Editor"
        />
      </div>
    </div>
  );
};
