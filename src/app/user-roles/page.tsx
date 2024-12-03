"use client";
import '../../styles/globals.css';
import { USERS_TITLE, USER_ROLES_TITLE, NAME_HEADER, EMAIL_HEADER, ROLE_HEADER, ACTION_HEADER } from '../../constants/strings';

export default function UserRolesPage() {
  const users = [
    { name: 'Karnik Patel', email: 'karnik@gmail.com', role: 'Member' },
    { name: 'Chirag Sharma', email: 'chirag@gmail.com', role: 'Member' },
    { name: 'Rutvika', email: 'rutvika@gmail.com', role: 'Tech Reviewer' },
  ];
  return (
    <div>
      <div className="flex justify-between items-center mb-8 page-header">
        <h1 >{USERS_TITLE}</h1>
      </div>
      <div className='p-8'>
      <div className="bg-[#1c1c24] rounded-lg">
        <div className="flex justify-between items-center mb-3">
          <h2 className="title">{USER_ROLES_TITLE}</h2>
          <button className="px-2 py-1 btn-success bg-[#0fc18c] border border-[#0fc18c] text-white rounded">Add User</button>
        </div>
        {users.length === 0 ? (
          <div className="text-center text-info fs-6">No Users.</div>
        ) : (
          <div>
            <table className="w-full table">
              <thead className="border border-gray-700 border-radius-8 overflow-hidden">
                <tr>
                  <th className="table-header">{NAME_HEADER}</th>
                  <th className="table-header">{EMAIL_HEADER}</th>
                  <th className="table-header">{ROLE_HEADER}</th>
                  <th className="table-header">{ACTION_HEADER}</th>
                </tr>
              </thead>
              <tbody className="border border-gray-700 border-radius-8 overflow-hidden table-body">
                {users.map((user, index) => (
                  <tr key={index}>
                    <td className="py-2 text-white table-cell">{user.name}</td>
                    <td className="py-2 text-white table-cell">{user.email}</td>
                    <td className="py-2 text-white table-cell">{user.role}</td>
                    <td className="py-2 text-white table-cell"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
