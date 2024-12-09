'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import '../styles/globals.css';

interface ImportModalProps {
  onClose: () => void;
}

export default function ImportModal({ onClose }: ImportModalProps) {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    setSelectedFile(file);
    setShowSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('/api/import', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      onClose();
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1c1c24] rounded-lg w-[500px] p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-xl">Upload document</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {showSuccess && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center">
            <span>File selected successfully: {selectedFile?.name}</span>
          </div>
        )}

        <div
          {...getRootProps()}
          className={`border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer
            ${isDragActive ? 'border-[#4CAF50] bg-[#4CAF50]/10' : 'hover:border-gray-500'}`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center space-y-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <div className="text-gray-400">
              <p className="text-lg font-medium">Drag files to upload</p>
              <p className="text-sm mt-1">or</p>
            </div>
            <button
              type="button"
              className="btn-upload px-4 py-2 text-sm rounded-lg hover:bg-[#4CAF50]/10 transition-colors"
            >
              Browse Files
            </button>
          </div>
        </div>

        {selectedFile && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="btn-success text-white px-4 py-2 rounded-lg hover:bg-[#45a049] transition-colors disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Upload File'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
