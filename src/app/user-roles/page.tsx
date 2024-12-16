"use client";
import '../../styles/globals.css';
import { useState, useEffect } from 'react';
import { USERS_TITLE, USER_ROLES_TITLE, NAME_HEADER, EMAIL_HEADER, ROLE_HEADER, ACTION_HEADER } from '../../constants/strings';
import ProtectedPage from '@/components/ProtectedPage';
import { companyService, userService } from '@/services/userService';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: {
    name: string;
  };
}

const truncateEmail = (email: string) => {
  const maxLength = 10; // Adjust this value as needed
  if (email.length <= maxLength) return email;
  
  const atIndex = email.indexOf('@');
  if (atIndex === -1) return `${email.slice(0, maxLength)}...`;
  
  const localPart = email.slice(0, atIndex);
  const domain = email.slice(atIndex);
  
  if (localPart.length <= maxLength - 3) return email;
  return `${localPart.slice(0, maxLength - 3)}...${domain}`;
};

export default function UserRolesPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Get tenantId from localStorage
        const tenantId = localStorage.getItem('user_metadata');
        
        if (!tenantId) {
          setError('Tenant ID not found. Please login again.');
          setLoading(false);
          return;
        }

        // Get companyId using tenantId
        const companyId = await companyService.getCompanyIdByTenant(tenantId);

        if (!companyId) {
          setError('Company not found for this tenant.');
          setLoading(false);
          return;
        }

        const fetchedUsers = await userService.getUsers(companyId);
        setUsers(fetchedUsers);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setError('Failed to load users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <ProtectedPage>
      <div>
        <div className="flex justify-between items-center page-header">
          <h1>{USERS_TITLE}</h1>
        </div>
        <div className='p-8'>
          <div className="flex justify-between items-center mb-3">
            <h2 className="title">{USER_ROLES_TITLE}</h2>
            <button className="px-2 py-1 btn-success bg-[#0fc18c] border border-[#0fc18c] text-white rounded">
              Add User
            </button>
          </div>

          {loading ? (
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : users.length === 0 ? (
            <div className="text-center text-info fs-6">No Users.</div>
          ) : (
            <div>
              <div className="table-head flex justify-between bg-grey-1 p-2 rounded border">
                <div className="table-col w-1/4">
                  <div className="text-left font-semibold">{NAME_HEADER}</div>
                </div>
                <div className="table-col w-2/5">
                  <div className="text-left font-semibold">{EMAIL_HEADER}</div>
                </div>
                <div className="table-col w-1/5">
                  <div className="text-left font-semibold">{ROLE_HEADER}</div>
                </div>
                <div className="table-col w-1/5">
                  <div className="text-left font-semibold">{ACTION_HEADER}</div>
                </div>
              </div>
              <div className="table-body bg-grey-2 rounded border">
                {users.map((user, index) => (
                  <div key={index} className="table-row flex justify-between p-2 border-b last:border-b-0">
                    <div className="table-cell w-1/4">
                      <div className="text-left">{user.firstName} {user.lastName}</div>
                    </div>
                    <div className="table-cell w-1/5">
                      <div className="group relative">
                        <div className="text-gray-900 truncate">
                          {truncateEmail(user.email)}
                        </div>
                        <div className="invisible group-hover:visible absolute z-10 bg-gray-900 text-white text-sm rounded py-1 px-2 -top-8 left-0 whitespace-nowrap">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <div className="table-cell w-1/5">
                      <div className="text-left">{user.role.name}</div>
                    </div>
                    <div className="table-cell w-1/5">
                      
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedPage>
  );
}