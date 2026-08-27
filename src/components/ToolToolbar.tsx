import React, { useRef } from 'react';
import {
  Wand2,
  ArrowDownAZ,
  Minimize2,
  FileCode2,
  Upload,
  Trash2,
  Copy,
  Download,
  Check,
} from 'lucide-react';
import { IndentOption } from '../types/json';

interface ToolToolbarProps {
  indent: IndentOption;
  onIndentChange: (indent: IndentOption) => void;
  onFormat: () => void;
  onAutoRepair: () => void;
  onSortKeys: () => void;
  onMinify: () => void;
  onLoadSample: () => void;
  onClear: () => void;
  onFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCopy: () => void;
  onDownload: () => void;
  copied: boolean;
  isValid: boolean;
  hasInput: boolean;
}

export const ToolToolbar: React.FC<ToolToolbarProps> = ({
  indent,
  onIndentChange,
  onFormat,
  onAutoRepair,
  onSortKeys,
  onMinify,
  onLoadSample,
  onClear,
  onFileInput,
  onCopy,
  onDownload,
  copied,
  isValid,
  hasInput,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3 sm:p-4 shadow-sm mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,.txt,application/json"
          onChange={onFileInput}
          className="hidden"
          aria-label="Upload JSON file"
        />

        {/* Left Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Format / Beautify Action */}
          <button
            type="button"
            onClick={onFormat}
            disabled={!hasInput}
            className="inline-flex items-center px-3.5 py-2 rounded-lg bg-himat-600 hover:bg-himat-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-colors focus:ring-2 focus:ring-himat-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Beautify and format JSON with active indentation"
          >
            <FileCode2 className="w-4 h-4 mr-1.5" />
            Format
          </button>

          {/* Auto-Repair Button */}
          <button
            type="button"
            onClick={onAutoRepair}
            disabled={!hasInput}
            className="inline-flex items-center px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-semibold shadow-sm transition-colors focus:ring-2 focus:ring-amber-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Auto-repair common JSON errors (quotes, trailing commas, comments)"
          >
            <Wand2 className="w-4 h-4 mr-1.5" />
            Auto-Repair
          </button>

          {/* Sort Keys Button */}
          <button
            type="button"
            onClick={onSortKeys}
            disabled={!hasInput || !isValid}
            className="inline-flex items-center px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs sm:text-sm font-semibold transition-colors focus:ring-2 focus:ring-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Sort object keys alphabetically"
          >
            <ArrowDownAZ className="w-4 h-4 mr-1.5 text-slate-500" />
            Sort Keys
          </button>

          {/* Minify Button */}
          <button
            type="button"
            onClick={onMinify}
            disabled={!hasInput || !isValid}
            className="inline-flex items-center px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs sm:text-sm font-semibold transition-colors focus:ring-2 focus:ring-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Remove all unnecessary whitespace"
          >
            <Minimize2 className="w-4 h-4 mr-1.5 text-slate-500" />
            Minify
          </button>

          <div className="h-5 w-px bg-slate-200 mx-1 hidden sm:block" />

          {/* Load Sample Button */}
          <button
            type="button"
            onClick={onLoadSample}
            className="inline-flex items-center px-3 py-2 rounded-lg bg-himat-50 hover:bg-himat-100 text-himat-700 border border-himat-200 text-xs sm:text-sm font-medium transition-colors focus:ring-2 focus:ring-himat-500"
            title="Load sample JSON dataset"
          >
            Load Sample
          </button>

          {/* Upload File Button */}
          <button
            type="button"
            onClick={handleUploadClick}
            className="inline-flex items-center px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs sm:text-sm font-medium transition-colors focus:ring-2 focus:ring-slate-400"
            title="Upload a .json file from your computer"
          >
            <Upload className="w-4 h-4 mr-1.5 text-slate-500" />
            Upload File
          </button>

          {/* Clear Button */}
          <button
            type="button"
            onClick={onClear}
            disabled={!hasInput}
            className="inline-flex items-center px-3 py-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs sm:text-sm font-medium transition-colors focus:ring-2 focus:ring-rose-400 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Clear raw input editor"
          >
            <Trash2 className="w-4 h-4 mr-1.5" />
            Clear
          </button>
        </div>

        {/* Right Section: Indent Select & Export */}
        <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
          {/* Indentation selector */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Indent:
            </span>
            <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
              <button
                type="button"
                onClick={() => onIndentChange('2')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                  indent === '2'
                    ? 'bg-white text-himat-700 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                2 Spaces
              </button>
              <button
                type="button"
                onClick={() => onIndentChange('4')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                  indent === '4'
                    ? 'bg-white text-himat-700 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                4 Spaces
              </button>
              <button
                type="button"
                onClick={() => onIndentChange('tab')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                  indent === 'tab'
                    ? 'bg-white text-himat-700 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tab
              </button>
            </div>
          </div>

          {/* Copy / Download Buttons */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onCopy}
              disabled={!hasInput || !isValid}
              className="inline-flex items-center px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Copy formatted JSON to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-1.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1.5" />
                  Copy
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onDownload}
              disabled={!hasInput || !isValid}
              className="inline-flex items-center px-3 py-2 rounded-lg bg-himat-700 hover:bg-himat-800 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors focus:ring-2 focus:ring-himat-600 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Download formatted.json"
            >
              <Download className="w-4 h-4 mr-1.5" />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
