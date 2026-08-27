export type IndentOption = '2' | '4' | 'tab';
export type ViewMode = 'code' | 'tree';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  line?: number;
  column?: number;
}

export interface JsonStats {
  payloadSizeFormatted: string;
  payloadSizeBytes: number;
  totalNodes: number;
  totalKeys: number;
  maxDepth: number;
}

export interface ToastState {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}
