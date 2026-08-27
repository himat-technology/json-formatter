import React, { DragEvent } from 'react';
import { UploadCloud } from 'lucide-react';

interface DropZoneProps {
  isDragging: boolean;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: DragEvent<HTMLDivElement>) => void;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
}

export const DropZone: React.FC<DropZoneProps> = ({
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  children,
}) => {
  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className="relative w-full h-full"
    >
      {children}

      {isDragging && (
        <div className="absolute inset-0 bg-himat-500/10 backdrop-blur-xs border-2 border-dashed border-himat-500 rounded-xl z-30 flex flex-col items-center justify-center p-6 text-center shadow-lg transition-all animate-pulse">
          <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-himat-600 mb-3">
            <UploadCloud className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold text-himat-900 mb-1">
            Drop your .json file here
          </h4>
          <p className="text-sm font-medium text-himat-700">
            100% browser-local reading — file content will never be uploaded anywhere
          </p>
        </div>
      )}
    </div>
  );
};
