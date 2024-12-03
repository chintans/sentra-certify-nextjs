export default function SettingsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-white mb-8">Profile</h1>
      <div className="bg-[#1c1c24] p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-white mb-4">Company Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-400 mb-1">Company</label>
            <input type="text" className="w-full p-2 bg-gray-800 text-white rounded" />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Email</label>
            <input type="email" className="w-full p-2 bg-gray-800 text-white rounded" />
          </div>
        </div>
        <button className="px-4 py-2 bg-green-500 text-white rounded">Update</button>
      </div>
    </div>
  );
}
