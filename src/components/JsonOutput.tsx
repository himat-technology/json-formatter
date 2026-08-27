import React from 'react';
import { CheckCircle2, Code2, Network } from 'lucide-react';
import { ValidationResult, ViewMode } from '../types/json';
import { JsonTree } from './JsonTree';
import { ErrorMessage } from './ErrorMessage';

interface JsonOutputProps {
  formattedOutput: string;
  rawInput: string;
  validationResult: ValidationResult;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onAutoRepair: () => void;
}

export const JsonOutput: React.FC<JsonOutputProps> = ({
  formattedOutput,
  rawInput,
  validationResult,
  viewMode,
  onViewModeChange,
  searchQuery,
  onSearchChange,
  onAutoRepair,
}) => {
  const lineCount = formattedOutput ? formattedOutput.split('\n').length : 0;
  const charCount = formattedOutput ? formattedOutput.length : 0;

  return (
    <div className="flex flex-col h-full bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      {/* Panel Header */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200 gap-2">
        {/* Left: View Mode Tabs */}
        <div className="flex items-center space-x-2">
          <div className="inline-flex rounded-lg bg-slate-200/70 p-0.5">
            <button
              type="button"
              onClick={() => onViewModeChange('code')}
              className={`inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                viewMode === 'code'
                  ? 'bg-white text-himat-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 mr-1.5" />
              Code View
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('tree')}
              disabled={!validationResult.isValid}
              className={`inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                viewMode === 'tree'
                  ? 'bg-white text-himat-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              <Network className="w-3.5 h-3.5 mr-1.5" />
              Interactive Tree
            </button>
          </div>
        </div>

        {/* Right: Validation Badge */}
        <div className="flex items-center space-x-2">
          {validationResult.isValid ? (
            <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
              Valid JSON
            </div>
          ) : rawInput.trim() ? (
            <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold border border-rose-200">
              Invalid JSON
            </div>
          ) : null}

          {validationResult.isValid && viewMode === 'code' && (
            <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-slate-500">
              <span>{lineCount} lines</span>
              <span>•</span>
              <span>{charCount.toLocaleString()} chars</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Display Body */}
      <div className="relative flex-1 min-h-[420px] sm:min-h-[480px] overflow-y-auto">
        {!validationResult.isValid ? (
          <div className="p-4 sm:p-6">
            <ErrorMessage
              validationResult={validationResult}
              onAutoRepair={onAutoRepair}
            />
          </div>
        ) : viewMode === 'tree' ? (
          <JsonTree
            jsonString={formattedOutput}
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
          />
        ) : (
          <textarea
            id="formatted-json-output"
            readOnly
            value={formattedOutput}
            placeholder="Formatted output will appear here..."
            spellCheck={false}
            className="w-full h-full p-4 font-mono text-xs sm:text-sm text-slate-800 bg-slate-50/50 resize-none border-none outline-none leading-relaxed overflow-y-auto"
            aria-label="Formatted JSON Result"
          />
        )}
      </div>
    </div>
  );
};
