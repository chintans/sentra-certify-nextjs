"use client";
import '../../styles/globals.css';
import { PROFILE_TITLE, COMPANY_OVERVIEW_TITLE, COMPANY_LABEL, EMAIL_LABEL, UPDATE_BUTTON_TEXT } from '../../constants/strings';
import ProtectedPage from '@/components/ProtectedPage';

export default function SettingsPage() {
  return (
    <ProtectedPage>
      <div>
        <div className="flex justify-between items-center page-header">
          <h1 className="text-white">{PROFILE_TITLE}</h1>
        </div>
        <div className='p-8'>
          <div className='bg-[#1c1c24] p-6 rounded-lg'>
            <h2 className="text-white text-xl mb-6">{COMPANY_OVERVIEW_TITLE}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">{COMPANY_LABEL}</label>
                <input type="text" className="w-full bg-[#2a2a36] text-white rounded-lg px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">{EMAIL_LABEL}</label>
                <input type="email" className="w-full bg-[#2a2a36] text-white rounded-lg px-4 py-2" />
              </div>
            </div>
            <div className="mt-6">
              <button className="bg-[#4CAF50] text-white px-6 py-2 rounded-lg hover:bg-[#45a049] transition-colors">
                {UPDATE_BUTTON_TEXT}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
}
