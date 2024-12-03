"use client";
import '../../styles/globals.css';
import { USERS_TITLE, USER_ROLES_TITLE, NAME_HEADER, EMAIL_HEADER, ROLE_HEADER, ACTION_HEADER } from '../../constants/strings';

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
      <div className="flex justify-between items-center page-header">
        <h1 >{USERS_TITLE}</h1>
      </div>
      <div className='p-7'>
        <div className="flex justify-between items-center mb-3">
          <h2 className="title">{USER_ROLES_TITLE}</h2>
          <button className="px-2 py-1 btn-success bg-[#0fc18c] border border-[#0fc18c] text-white rounded">Add User</button>
        </div>
        {users.length === 0 ? (
          <div className="text-center text-info fs-6">No Users.</div>
        ) : (
          <div>
            <div className="table-head flex justify-between bg-grey-1 p-2 rounded border">
              <div className="table-col">
                <div className="text-left">{NAME_HEADER}</div>
              </div>
              <div className="table-col">
                <div className="text-left">{EMAIL_HEADER}</div>
              </div>
              <div className="table-col">
                <div className="text-left">{ROLE_HEADER}</div>
              </div>
              <div className="table-col">
                <div className="text-left">{ACTION_HEADER}</div>
              </div>
            </div>

            <div className="table-body bg-grey-2 rounded border">
              {users.map((user, index) => (
                <div key={index} className="table-row flex justify-between">
                  <div className="table-cell">
                    <div className="text-left">{user.name}</div>
                  </div>
                  <div className="table-cell">
                    <div className="text-left">{user.email}</div>
                  </div>
                  <div className="table-cell">
                    <div className="text-left">{user.role}</div>
                  </div>
                  <div className="table-cell">
                    <div className="text-left"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
