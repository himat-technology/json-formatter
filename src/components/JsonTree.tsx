import React, { useState, useEffect, useCallback } from 'react';
import { Search, Maximize2, Minimize2 } from 'lucide-react';
import { JsonTreeNode } from './JsonTreeNode';

interface JsonTreeProps {
  jsonString: string;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const JsonTree: React.FC<JsonTreeProps> = ({
  jsonString,
  searchQuery,
  onSearchChange,
}) => {
  const [parsedData, setParsedData] = useState<unknown>(null);
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set(['root']));

  useEffect(() => {
    try {
      if (jsonString.trim()) {
        const parsed = JSON.parse(jsonString);
        setParsedData(parsed);
        // Expand root by default
        setExpandedKeys(new Set(['root']));
      } else {
        setParsedData(null);
      }
    } catch {
      setParsedData(null);
    }
  }, [jsonString]);

  const toggleExpand = useCallback((pathKey: string) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(pathKey)) {
        next.delete(pathKey);
      } else {
        next.add(pathKey);
      }
      return next;
    });
  }, []);

  const collectAllKeys = useCallback((data: unknown, currentPath = 'root'): string[] => {
    const keys: string[] = [currentPath];
    if (data !== null && typeof data === 'object') {
      if (Array.isArray(data)) {
        data.forEach((val, i) => {
          keys.push(...collectAllKeys(val, `${currentPath}.${i}`));
        });
      } else {
        Object.entries(data as Record<string, unknown>).forEach(([k, v]) => {
          keys.push(...collectAllKeys(v, `${currentPath}.${k}`));
        });
      }
    }
    return keys;
  }, []);

  const handleExpandAll = () => {
    if (parsedData !== null) {
      const allKeys = collectAllKeys(parsedData);
      setExpandedKeys(new Set(allKeys));
    }
  };

  const handleCollapseAll = () => {
    setExpandedKeys(new Set());
  };

  if (parsedData === null) {
    return (
      <div className="p-6 text-center text-slate-400 text-sm">
        No valid JSON data available to render tree view.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Tree Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 border-b border-slate-200">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[180px]">
          <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search keys or values..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-himat-500 focus:border-transparent"
          />
        </div>

        {/* Expand / Collapse Actions */}
        <div className="flex items-center space-x-1.5">
          <button
            type="button"
            onClick={handleExpandAll}
            className="inline-flex items-center px-2.5 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium transition-colors"
            title="Expand all nodes"
          >
            <Maximize2 className="w-3 h-3 mr-1" />
            Expand All
          </button>
          <button
            type="button"
            onClick={handleCollapseAll}
            className="inline-flex items-center px-2.5 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium transition-colors"
            title="Collapse all nodes"
          >
            <Minimize2 className="w-3 h-3 mr-1" />
            Collapse All
          </button>
        </div>
      </div>

      {/* Tree View Canvas */}
      <div className="p-4 overflow-y-auto max-h-[500px]">
        <JsonTreeNode
          keyName="root"
          value={parsedData}
          depth={0}
          pathKey="root"
          expandedKeys={expandedKeys}
          toggleExpand={toggleExpand}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
};
