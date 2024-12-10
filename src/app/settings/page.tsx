"use client";
import '../../styles/globals.css';
import { useState, useEffect } from 'react';
import { PROFILE_TITLE, COMPANY_OVERVIEW_TITLE, COMPANY_LABEL, EMAIL_LABEL, UPDATE_BUTTON_TEXT } from '../../constants/strings';
import ProtectedPage from '@/components/ProtectedPage';
import { companyService } from '@/services/userService';

interface Company {
  name: string;
  email: string;
}

export default function SettingsPage() {
  const [company, setCompany] = useState<Company>({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const tenantId = localStorage.getItem('user_metadata');
        if (!tenantId) {
          setError('Tenant ID not found');
          return;
        }
        const companyId = await companyService.getCompanyIdByTenant(tenantId);
        if (!companyId) {
          setError('Company ID not found');
          return;
        }

        const companyData = await companyService.getCompany(companyId);
        setCompany(companyData);
      } catch (error) {
        setError('Failed to load company data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, []);

  // Auto-hide success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setError(null);
    setSuccessMessage(null);
    try {
      //const companyId = localStorage.getItem('companyId');
      const companyId = '1';
      if (!companyId) {
        setError('Company ID not found');
        return;
      }

      await companyService.updateCompany(parseInt(companyId), company);
      setSuccessMessage('Company details updated successfully!');
    } catch (error) {
      setError('Failed to update company');
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompany(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <ProtectedPage>
      <div>
        <div className="flex justify-between items-center page-header">
          <h1 className="text-white">{PROFILE_TITLE}</h1>
        </div>
        <div className='p-8'>
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
              {successMessage}
            </div>
          )}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className='bg-[#1c1c24] p-6 rounded-lg'>
            <h2 className="text-white text-xl mb-6">{COMPANY_OVERVIEW_TITLE}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">{COMPANY_LABEL}</label>
                <input 
                  type="text"
                  name="name"
                  value={company.name}
                  onChange={handleChange}
                  className="w-full bg-[#2a2a36] text-white rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">{EMAIL_LABEL}</label>
                <input 
                  type="email"
                  name="email"
                  value={company.email}
                  onChange={handleChange}
                  className="w-full bg-[#2a2a36] text-white rounded-lg px-4 py-2"
                />
              </div>
            </div>
            <div className="mt-6">
              <button 
                type="submit"
                disabled={updating}
                className="bg-[#4CAF50] text-white px-6 py-2 btn-success rounded-lg hover:bg-[#45a049] transition-colors disabled:opacity-50"
              >
                {updating ? 'Updating...' : UPDATE_BUTTON_TEXT}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ProtectedPage>
  );
}