import { createClient } from '@/utils/supabase/server'
import { changePassword } from './actions'

export default async function SettingsPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string; success?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-2 font-mono text-sm uppercase tracking-wider">Account</p>
      </div>

      <div className="max-w-md space-y-6">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-500 font-mono">Logged in as</p>
          <p className="font-medium text-gray-900 mt-1">{user?.email}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-4">Change Password</h2>

          {params.error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
              {decodeURIComponent(params.error)}
            </div>
          )}
          {params.success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm mb-4">
              {decodeURIComponent(params.success)}
            </div>
          )}

          <form action={changePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                name="new_password"
                required
                minLength={8}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#006338] focus:border-[#006338]"
                placeholder="Min. 8 characters"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirm_password"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#006338] focus:border-[#006338]"
                placeholder="Repeat new password"
              />
            </div>
            <button
              type="submit"
              className="bg-[#006338] text-white px-4 py-2 rounded-md font-medium text-sm shadow-sm hover:bg-[#006338]/90 transition-colors w-full"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
