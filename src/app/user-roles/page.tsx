export default function UserRolesPage() {
  const users = [
    { name: 'Karnik Patel', email: 'karnik@gmail.com', role: 'Member' },
    { name: 'Chirag Sharma', email: 'chirag@gmail.com', role: 'Member' },
    { name: 'Rutvika', email: 'rutvika@gmail.com', role: 'Tech Reviewer' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-white mb-8">Users</h1>
      <div className="bg-[#1c1c24] p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-white mb-4">User Roles</h2>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="text-gray-400">Name</th>
              <th className="text-gray-400">Email</th>
              <th className="text-gray-400">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-t border-gray-700">
                <td className="py-2 text-white">{user.name}</td>
                <td className="py-2 text-white">{user.email}</td>
                <td className="py-2 text-white">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Add User</button>
      </div>
    </div>
  );
}
