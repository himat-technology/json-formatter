import { useState, useCallback } from 'react';

export function useClipboard(timeout = 2500) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const copyToClipboard = useCallback(
    async (text: string): Promise<boolean> => {
      if (!text) return false;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else {
          // Fallback for non-HTTPS or legacy browsers
          const textArea = document.createElement('textarea');
          textArea.value = text;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }
        
        setCopied(true);
        setError(null);
        setTimeout(() => setCopied(false), timeout);
        return true;
      } catch (err: unknown) {
        setCopied(false);
        const msg = err instanceof Error ? err.message : 'Failed to copy to clipboard';
        setError(msg);
        return false;
      }
    },
    [timeout]
  );

  return { copied, error, copyToClipboard };
}
