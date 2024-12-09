'use client';

import { useState } from 'react';
import ProtectedPage from '@/components/ProtectedPage';
import '../../styles/globals.css';

interface UploadedFile {
  id: number;
  name: string;
  size: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  message?: string;
}

export default function ImportPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  };

  const handleFiles = (newFiles: File[]) => {
    const fileEntries = newFiles.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      size: formatFileSize(file.size),
      status: 'pending' as const,
      progress: 0
    }));

    setFiles(prev => [...prev, ...fileEntries]);
    
    // Process each file
    fileEntries.forEach((fileEntry, index) => {
      processFile(newFiles[index], fileEntry.id);
    });
  };

  const processFile = async (file: File, fileId: number) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      // Update status to processing
      setFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, status: 'processing' as const } : f
      ));

      const response = await fetch('/api/import', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      // Update status to completed
      setFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, status: 'completed' as const, progress: 100 } : f
      ));
    } catch (error) {
      // Update status to failed
      setFiles(prev => prev.map(f => 
        f.id === fileId ? { 
          ...f, 
          status: 'failed' as const, 
          message: error instanceof Error ? error.message : 'Upload failed' 
        } : f
      ));
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <ProtectedPage>
      <div>
        <div className="flex justify-between items-center page-header">
          <h1 className="text-white">Import Certify</h1>
        </div>
        <div className="p-8">
          <div className="bg-[#1c1c24] p-6 rounded-lg">
            {/* Upload Area */}
            <div
              onDragEnter={handleDragEnter}
              onDragOver={(e) => e.preventDefault()}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                ${isDragging ? 'border-[#1bb789] bg-[#1bb789]/10' : 'border-gray-600 hover:border-gray-500'}`}
            >
              <div className="flex flex-col items-center space-y-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <div className="text-gray-400">
                  <p className="text-lg font-medium">Drag and drop your files here</p>
                  <p className="text-sm mt-1">or</p>
                </div>
                
                <label className="btn-upload cursor-pointer text-gray-400 hover:text-white">
                  Browse Files
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileSelect}
                    multiple
                  />
                </label>
              </div>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-8">
                <h3 className="text-white text-lg mb-4">Uploaded Files</h3>
                <div className="space-y-4">
                  {files.map(file => (
                    <div key={file.id} className="bg-[#2a2a36] rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-white">{file.name}</p>
                          <p className="text-gray-400 text-sm">{file.size}</p>
                        </div>
                        <div className="flex items-center">
                          {file.status === 'pending' && (
                            <span className="text-yellow-500">Pending</span>
                          )}
                          {file.status === 'processing' && (
                            <span className="text-blue-500">Processing</span>
                          )}
                          {file.status === 'completed' && (
                            <span className="text-green-500">Completed</span>
                          )}
                          {file.status === 'failed' && (
                            <span className="text-red-500">Failed</span>
                          )}
                        </div>
                      </div>
                      {file.status === 'processing' && (
                        <div className="mt-2 h-2 bg-gray-700 rounded-full">
                          <div 
                            className="h-full bg-blue-500 rounded-full transition-all duration-300"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                      )}
                      {file.status === 'failed' && file.message && (
                        <p className="mt-2 text-red-500 text-sm">{file.message}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
}
