import React from 'react';
import { ChevronRight, ChevronDown, Braces, Brackets } from 'lucide-react';

interface JsonTreeNodeProps {
  keyName: string | number | null;
  value: unknown;
  depth: number;
  pathKey: string;
  expandedKeys: Set<string>;
  toggleExpand: (pathKey: string) => void;
  searchQuery: string;
}

export const JsonTreeNode: React.FC<JsonTreeNodeProps> = ({
  keyName,
  value,
  depth,
  pathKey,
  expandedKeys,
  toggleExpand,
  searchQuery,
}) => {
  const isObject = value !== null && typeof value === 'object' && !Array.isArray(value);
  const isArray = Array.isArray(value);
  const isExpandable = isObject || isArray;
  const isExpanded = expandedKeys.has(pathKey);

  // Search filter logic
  const matchesSearch = React.useMemo(() => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    
    // Key match
    if (keyName !== null && String(keyName).toLowerCase().includes(query)) return true;
    
    // Value match for primitives
    if (!isExpandable) {
      return String(value).toLowerCase().includes(query);
    }
    return false;
  }, [searchQuery, keyName, value, isExpandable]);

  if (searchQuery && !matchesSearch && !isExpandable) {
    return null;
  }

  // Render Primitive Values
  const renderPrimitiveValue = (val: unknown) => {
    if (val === null) {
      return <span className="text-rose-500 font-semibold italic">null</span>;
    }
    if (typeof val === 'boolean') {
      return <span className="text-purple-600 font-semibold">{val ? 'true' : 'false'}</span>;
    }
    if (typeof val === 'number') {
      return <span className="text-blue-600 font-semibold">{val}</span>;
    }
    if (typeof val === 'string') {
      return <span className="text-emerald-600">"{val}"</span>;
    }
    return <span className="text-slate-700">{String(val)}</span>;
  };

  const getChildEntries = () => {
    if (isObject) {
      return Object.entries(value as Record<string, unknown>);
    }
    if (isArray) {
      return (value as unknown[]).map((val, idx) => [String(idx), val] as [string, unknown]);
    }
    return [];
  };

  const entries = getChildEntries();
  const itemCount = entries.length;

  return (
    <div className="font-mono text-xs sm:text-sm select-none">
      <div
        className={`flex items-center py-1 px-1.5 rounded-md hover:bg-slate-100/80 transition-colors ${
          isExpandable ? 'cursor-pointer' : ''
        }`}
        style={{ paddingLeft: `${Math.max(4, depth * 16)}px` }}
        onClick={() => isExpandable && toggleExpand(pathKey)}
      >
        {/* Toggle Icon */}
        {isExpandable ? (
          <button
            type="button"
            className="p-0.5 mr-1 text-slate-400 hover:text-slate-700 rounded focus:outline-none"
            aria-label={isExpanded ? 'Collapse node' : 'Expand node'}
          >
            {isExpanded ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5" />
            )}
          </button>
        ) : (
          <span className="w-4 mr-1 inline-block" />
        )}

        {/* Node Icon */}
        {isObject && <Braces className="w-3.5 h-3.5 mr-1.5 text-himat-600 shrink-0" />}
        {isArray && <Brackets className="w-3.5 h-3.5 mr-1.5 text-indigo-600 shrink-0" />}

        {/* Key Label */}
        {keyName !== null && (
          <span className="text-slate-800 font-medium mr-1.5">
            {typeof keyName === 'number' ? (
              <span className="text-slate-400 font-mono text-[11px]">{keyName}:</span>
            ) : (
              <span className="text-himat-900 font-semibold">{keyName}:</span>
            )}
          </span>
        )}

        {/* Value or Summary */}
        {isExpandable ? (
          <span className="text-slate-400 text-xs font-sans">
            {isObject ? `{ ${itemCount} ${itemCount === 1 ? 'key' : 'keys'} }` : `[ ${itemCount} items ]`}
          </span>
        ) : (
          renderPrimitiveValue(value)
        )}
      </div>

      {/* Children Nodes */}
      {isExpandable && isExpanded && (
        <div className="border-l border-slate-200 ml-2 sm:ml-3">
          {entries.map(([k, v]) => (
            <JsonTreeNode
              key={`${pathKey}.${k}`}
              keyName={k}
              value={v}
              depth={depth + 1}
              pathKey={`${pathKey}.${k}`}
              expandedKeys={expandedKeys}
              toggleExpand={toggleExpand}
              searchQuery={searchQuery}
            />
          ))}
        </div>
      )}
    </div>
  );
};
