"use client";
import '../../styles/globals.css';
import { useState, useEffect } from 'react';
import { USERS_TITLE, USER_ROLES_TITLE, NAME_HEADER, EMAIL_HEADER, ROLE_HEADER, ACTION_HEADER } from '../../constants/strings';
import ProtectedPage from '@/components/ProtectedPage';
import { userService } from '@/services/userService';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: {
    name: string;
  };
}

export default function UserRolesPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Get companyId from localStorage
        const companyId = '1';
        
        // if (typeof window !== 'undefined') {
        //   companyId = localStorage.getItem('companyId');
        // }
        
        if (!companyId) {
          setError('Company ID not found. Please login again.');
          setLoading(false);
          return;
        }

        const fetchedUsers = await userService.getUsers(parseInt(companyId));
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
                  <div key={index} className="table-row flex justify-between p-2 border-b last:border-b-0 hover:bg-gray-50">
                    <div className="table-cell w-1/4">
                      <div className="text-left">{user.firstName} {user.lastName}</div>
                    </div>
                    <div className="table-cell w-2/5">
                      <div className="text-left break-words whitespace-normal">{user.email}</div>
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