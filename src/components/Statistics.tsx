import React from 'react';
import { HardDrive, Layers, Key, Layers3 } from 'lucide-react';
import { JsonStats } from '../types/json';

interface StatisticsProps {
  stats: JsonStats;
}

export const Statistics: React.FC<StatisticsProps> = ({ stats }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs mt-6">
      <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
          Real-Time Payload Statistics
        </h3>
        <span className="text-xs font-medium text-slate-500">
          Calculated locally in browser
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Payload Size */}
        <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-himat-50 border border-himat-100 flex items-center justify-center text-himat-600 shrink-0">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
              Payload Size
            </p>
            <p className="text-base sm:text-lg font-extrabold text-slate-900 font-mono">
              {stats.payloadSizeFormatted}
            </p>
          </div>
        </div>

        {/* Total Nodes */}
        <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
              Total Nodes
            </p>
            <p className="text-base sm:text-lg font-extrabold text-slate-900 font-mono">
              {stats.totalNodes.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Total Object Keys */}
        <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
              Total Object Keys
            </p>
            <p className="text-base sm:text-lg font-extrabold text-slate-900 font-mono">
              {stats.totalKeys.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Max Nesting Depth */}
        <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
            <Layers3 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
              Max Depth
            </p>
            <p className="text-base sm:text-lg font-extrabold text-slate-900 font-mono">
              {stats.maxDepth} {stats.maxDepth === 1 ? 'level' : 'levels'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
