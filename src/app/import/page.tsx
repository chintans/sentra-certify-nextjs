'use client';

import { useState } from 'react';
import ProtectedPage from '@/components/ProtectedPage';
import ImportModal from '@/components/ImportModal';
import '../../styles/globals.css';

export default function ImportPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ProtectedPage>
      <div>
        <div className="flex justify-between items-center page-header">
          <h1 className="text-white">Import Data</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-success text-white px-4 py-2 rounded-lg hover:bg-[#45a049] transition-colors"
          >
            Add New Data
          </button>
        </div>
        {isModalOpen && (
          <ImportModal onClose={() => setIsModalOpen(false)} />
        )}
      </div>
    </ProtectedPage>
  );
}
