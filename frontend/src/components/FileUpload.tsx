import React, { useState, useCallback } from 'react';
import { Upload, File, X } from 'lucide-react';
import { cn } from '../utils/cn';
import Button from './ui/Button';

interface FileUploadProps {
  onUpload: (file: File) => void;
  loading?: boolean;
  acceptedFileTypes?: string[];
}

const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  loading = false,
  acceptedFileTypes = ['.jar']
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      if (acceptedFileTypes.some(type => file.name.endsWith(type))) {
        setSelectedFile(file);
        onUpload(file);
      }
    }
  }, [acceptedFileTypes, onUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      onUpload(file);
    }
  }, [onUpload]);

  const handleRemoveFile = useCallback(() => {
    setSelectedFile(null);
  }, []);

  return (
    <div className="w-full">
      {!selectedFile ? (
        <div
          className={cn(
            'border-2 border-dashed rounded-lg p-8 text-center transition-colors',
            isDragOver
              ? 'border-primary-400 dark:border-primary-500 bg-primary-50 dark:bg-primary-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500',
            loading && 'opacity-50 pointer-events-none'
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              Upload JAR File
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Drag and drop your JAR file here, or click to browse
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Supported formats: {acceptedFileTypes.join(', ')}
            </p>
          </div>
          <input
            type="file"
            accept={acceptedFileTypes.join(',')}
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
            disabled={loading}
          />
                      <label
              htmlFor="file-upload"
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 dark:text-primary-300 bg-primary-100 dark:bg-primary-900/30 hover:bg-primary-200 dark:hover:bg-primary-900/50 cursor-pointer transition-colors"
            >
              Choose File
            </label>
        </div>
      ) : (
        <div className="border rounded-lg p-4 bg-gray-50 dark:bg-dark-800 border-gray-200 dark:border-dark-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <File className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{selectedFile.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleRemoveFile}
              disabled={loading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
