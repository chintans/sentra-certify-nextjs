"use client";

import '../../styles/globals.css';

import { PROFILE_TITLE, COMPANY_OVERVIEW_TITLE, COMPANY_LABEL, EMAIL_LABEL, UPDATE_BUTTON_TEXT } from '../../constants/strings';

export default function SettingsPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-white">{PROFILE_TITLE}</h1>
      </div>
      <div className="bg-[#1c1c24] rounded-lg">
        <div className="flex justify-between items-center mb-3">
          <h2 className="title">{COMPANY_OVERVIEW_TITLE}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-6">
            <label className="block f-14">{COMPANY_LABEL}</label>
            <input type="text" className="w-2/3 p-2 bg-gray-800 text-white rounded" />
          </div>
          <div className="flex items-center gap-6">
            <label className="block f-14">{EMAIL_LABEL}</label>
            <input type="email" className="w-2/3 p-2 bg-gray-800 text-white rounded" />
          </div>
        </div>
        <button className="px-2 py-1 bg-[#0fc18c] btn-success border border-[#0fc18c] text-white rounded">{UPDATE_BUTTON_TEXT}</button>
      </div> 
    </div>
  );
}
