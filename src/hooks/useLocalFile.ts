import { useState, useCallback, DragEvent, ChangeEvent } from 'react';

interface UseLocalFileOptions {
  onFileLoaded: (content: string, fileName: string) => void;
}

export function useLocalFile({ onFileLoaded }: UseLocalFileOptions) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const readFile = useCallback(
    (file: File) => {
      setError(null);

      // Validate file extension / mime type
      const isJson = file.name.endsWith('.json') || file.type === 'application/json' || file.name.endsWith('.txt');
      if (!isJson) {
        setError('Please select a valid .json or .txt file.');
        return;
      }

      if (file.size > 25 * 1024 * 1024) { // 25MB max check
        setError('File size exceeds 25MB limit.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onFileLoaded(content, file.name);
      };
      reader.onerror = () => {
        setError('Failed to read file content.');
      };
      reader.readAsText(file);
    },
    [onFileLoaded]
  );

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        readFile(file);
        e.dataTransfer.clearData();
      }
    },
    [readFile]
  );

  const handleFileInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        readFile(file);
        // Reset file input value so re-selecting same file triggers change
        e.target.value = '';
      }
    },
    [readFile]
  );

  return {
    isDragging,
    error,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInput,
    readFile,
  };
}
