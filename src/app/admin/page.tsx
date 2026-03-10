export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-2 font-mono text-sm uppercase tracking-wider">System Overview</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col justify-between">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total Users</h3>
          <div className="mt-4 text-4xl font-light text-gray-900">1,248</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col justify-between">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Canonical Meds</h3>
          <div className="mt-4 text-4xl font-light text-gray-900">482</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col justify-between">
          <h3 className="text-sm font-semibold text-[#006338] uppercase tracking-wide">Pending Corrections</h3>
          <div className="mt-4 text-4xl font-semibold text-[#006338]">89</div>
        </div>
      </div>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center min-h-[300px] shadow-inner">
        <h2 className="text-2xl font-bold text-gray-400 mb-2">Welcome Back</h2>
        <p className="text-sm text-gray-500 max-w-md text-center">
          The admin interface is fully initialized. Use the sidebar to navigate between managing users, resolving medication corrections, and reviewing audit logs.
        </p>
      </div>
    </div>
  )
}
