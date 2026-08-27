import React from 'react';
import { AlertCircle, AlertTriangle } from 'lucide-react';
import { ValidationResult } from '../types/json';

interface ErrorMessageProps {
  validationResult: ValidationResult;
  onAutoRepair?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  validationResult,
  onAutoRepair,
}) => {
  if (validationResult.isValid) return null;

  return (
    <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-rose-900 shadow-xs space-y-2">
      <div className="flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        <div className="flex-1">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h4 className="text-sm font-bold text-rose-800">
              Invalid JSON Structure
            </h4>
            {validationResult.line !== undefined && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-semibold bg-rose-100 text-rose-700">
                Line {validationResult.line}
                {validationResult.column !== undefined && `, Col ${validationResult.column}`}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm font-mono mt-1 text-rose-700 leading-relaxed">
            {validationResult.error}
          </p>

          {onAutoRepair && (
            <div className="mt-3 pt-2 border-t border-rose-200 flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs text-rose-600 flex items-center">
                <AlertTriangle className="w-3.5 h-3.5 mr-1 text-amber-500" />
                This input might contain single quotes, unquoted keys, or comments.
              </span>
              <button
                type="button"
                onClick={onAutoRepair}
                className="px-3 py-1 rounded bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                Try Auto-Repair
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
