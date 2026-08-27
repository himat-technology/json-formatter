import { useState, useMemo, useCallback, useEffect } from 'react';
import { IndentOption, ValidationResult, ViewMode, ToastState } from '../types/json';
import { validateJson } from '../lib/jsonValidator';
import { formatJson, minifyJson } from '../lib/jsonFormatter';
import { repairJson } from '../lib/jsonRepair';
import { sortJsonKeys } from '../lib/jsonSorter';
import { calculateJsonStats } from '../lib/jsonStats';
import { SAMPLE_JSON } from '../data/sampleJson';

export function useJsonFormatter() {
  const [rawInput, setRawInput] = useState<string>(SAMPLE_JSON);
  const [indent, setIndent] = useState<IndentOption>('2');
  const [viewMode, setViewMode] = useState<ViewMode>('code');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({
      id: Date.now(),
      message,
      type,
    });
  }, []);

  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  // Compute validation in real-time
  const validationResult: ValidationResult = useMemo(() => {
    return validateJson(rawInput);
  }, [rawInput]);

  // Compute formatted JSON output in real-time if valid
  const formattedOutput = useMemo(() => {
    if (!validationResult.isValid) {
      return '';
    }
    try {
      return formatJson(rawInput, indent);
    } catch {
      return '';
    }
  }, [rawInput, indent, validationResult.isValid]);

  // Compute statistics in real-time
  const stats = useMemo(() => {
    return calculateJsonStats(validationResult.isValid ? formattedOutput || rawInput : rawInput);
  }, [rawInput, formattedOutput, validationResult.isValid]);

  // Format action (forces re-format with current indent)
  const handleFormat = useCallback(() => {
    if (!rawInput.trim()) {
      showToast('Input is empty.', 'error');
      return;
    }
    const val = validateJson(rawInput);
    if (!val.isValid) {
      showToast('Cannot format invalid JSON.', 'error');
      return;
    }
    const formatted = formatJson(rawInput, indent);
    setRawInput(formatted);
    showToast('JSON formatted successfully', 'success');
  }, [rawInput, indent, showToast]);

  // Auto-Repair action
  const handleAutoRepair = useCallback(() => {
    if (!rawInput.trim()) {
      showToast('Input is empty.', 'error');
      return;
    }
    const res = repairJson(rawInput);
    if (res.success) {
      setRawInput(res.repairedText);
      showToast(res.message, 'success');
    } else {
      showToast(res.message, 'error');
    }
  }, [rawInput, showToast]);

  // Sort Keys action
  const handleSortKeys = useCallback(() => {
    if (!rawInput.trim()) {
      showToast('Input is empty.', 'error');
      return;
    }
    const val = validateJson(rawInput);
    if (!val.isValid) {
      showToast('Cannot sort keys of invalid JSON.', 'error');
      return;
    }
    try {
      const sorted = sortJsonKeys(rawInput, indent);
      setRawInput(sorted);
      showToast('Object keys sorted alphabetically', 'success');
    } catch {
      showToast('Failed to sort JSON keys.', 'error');
    }
  }, [rawInput, indent, showToast]);

  // Minify action
  const handleMinify = useCallback(() => {
    if (!rawInput.trim()) {
      showToast('Input is empty.', 'error');
      return;
    }
    const val = validateJson(rawInput);
    if (!val.isValid) {
      showToast('Cannot minify invalid JSON.', 'error');
      return;
    }
    try {
      const minified = minifyJson(rawInput);
      setRawInput(minified);
      showToast('JSON minified', 'success');
    } catch {
      showToast('Failed to minify JSON.', 'error');
    }
  }, [rawInput, showToast]);

  // Load sample action
  const handleLoadSample = useCallback(() => {
    setRawInput(SAMPLE_JSON);
    showToast('Sample JSON loaded', 'info');
  }, [showToast]);

  // Clear action
  const handleClear = useCallback(() => {
    setRawInput('');
    setSearchQuery('');
    showToast('Cleared JSON editor', 'info');
  }, [showToast]);

  // Auto dismiss toast after 3 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return {
    rawInput,
    setRawInput,
    indent,
    setIndent,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    validationResult,
    formattedOutput,
    stats,
    toast,
    showToast,
    closeToast,
    handleFormat,
    handleAutoRepair,
    handleSortKeys,
    handleMinify,
    handleLoadSample,
    handleClear,
  };
}
