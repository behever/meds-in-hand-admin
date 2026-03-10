import { login } from './actions'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const error = resolvedSearchParams?.error;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 p-4 font-sans selection:bg-[#92C145] selection:text-white">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center flex flex-col items-center">
          {/* Logo representation using the dark green and light green from the image */}
          <h1 className="text-4xl font-extrabold tracking-tighter text-[#006338] flex items-baseline gap-1">
            <span className="text-[#92C145] text-5xl font-serif italic pr-1">Rx</span> Meds In Hand
          </h1>
          <p className="text-gray-400 mt-4 uppercase text-[10px] tracking-[0.2em] font-mono">
            Admin Authentication
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-100 p-3 text-xs text-center rounded-sm font-mono">
            {error}
          </div>
        )}

        <form action={login} className="space-y-5 mt-8">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-[11px] font-mono text-gray-500 uppercase tracking-wider block">
              Email Address
            </label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="admin@example.com" 
              required 
              className="w-full bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#006338] focus:border-[#006338] rounded-sm px-3 py-2.5 text-sm transition-all shadow-sm" 
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-[11px] font-mono text-gray-500 uppercase tracking-wider block">
              Password
            </label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              required 
              className="w-full bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#006338] focus:border-[#006338] rounded-sm px-3 py-2.5 text-sm transition-all shadow-sm" 
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-white border border-[#006338] text-[#006338] hover:bg-[#006338] hover:text-white font-mono uppercase tracking-[0.15em] text-xs py-3 rounded-sm transition-all mt-6 shadow-sm"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
