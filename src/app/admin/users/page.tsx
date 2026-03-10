import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/utils/supabase/server"
import { mapUserMedication, dismissUserMedication } from "../actions"

export default async function UsersCorrectionsPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()
  
  const { data: pendingMeds } = await supabase
    .from('user_medications')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false })
  
  const { data: medications } = await supabase
    .from('medications')
    .select('id, name')
    .order('name')
  
  const pendingCount = pendingMeds?.length ?? 0

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Corrections Queue</h1>
          <p className="text-gray-500 mt-2 font-mono text-sm uppercase tracking-wider">Flagged User Inputs</p>
        </div>
      </div>

      {params.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {decodeURIComponent(params.error)}
        </div>
      )}

      {pendingCount > 0 && (
        <div className="bg-red-50 border border-red-100 p-4 flex gap-4 items-center rounded-lg shadow-sm">
          <Badge variant="destructive" className="bg-red-500 text-white hover:bg-red-600 rounded-md shadow-sm">Warning</Badge>
          <span className="text-sm font-medium text-red-800">There are currently {pendingCount} unmapped user medications in the system.</span>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="border-b border-gray-200 hover:bg-transparent">
              <TableHead className="font-semibold text-gray-700 uppercase tracking-wider text-xs">User Input</TableHead>
              <TableHead className="font-semibold text-gray-700 uppercase tracking-wider text-xs">User ID</TableHead>
              <TableHead className="font-semibold text-gray-700 uppercase tracking-wider text-xs">Submitted</TableHead>
              <TableHead className="font-semibold text-gray-700 uppercase tracking-wider text-xs text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingMeds?.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-gray-500">No pending corrections. All user medications are mapped!</TableCell>
              </TableRow>
            )}
            {pendingMeds?.map((med) => (
              <TableRow key={med.id} className="border-b border-gray-100 hover:bg-red-50/50 transition-colors">
                <TableCell className="font-medium font-mono text-red-600">{med.raw_name}</TableCell>
                <TableCell className="text-gray-400 font-mono text-xs">{med.user_id.slice(0, 8)}...</TableCell>
                <TableCell className="text-gray-400 text-xs">
                  {new Date(med.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <form action={mapUserMedication} className="inline-flex gap-2">
                      <input type="hidden" name="user_med_id" value={med.id} />
                      <select name="canonical_id" required className="text-xs border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#006338]">
                        <option value="">Select medication...</option>
                        {medications?.map((m) => (
                          <option key={m.id} value={m.id}>{m.name}</option>
                        ))}
                      </select>
                      <button type="submit" className="text-xs border border-[#006338] text-[#006338] px-3 py-1.5 rounded-md hover:bg-[#006338] hover:text-white transition-all font-medium shadow-sm">
                        Map
                      </button>
                    </form>
                    <form action={dismissUserMedication} className="inline">
                      <input type="hidden" name="user_med_id" value={med.id} />
                      <button 
                        type="submit" 
                        className="text-xs border border-gray-300 text-gray-500 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-all font-medium"
                        title="Dismiss this entry without mapping"
                      >
                        Dismiss
                      </button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="text-xs text-gray-400 text-center">
        <strong>Map</strong> links a user's input to a canonical medication. <strong>Dismiss</strong> marks it as not a real medication (typo, garbage, etc).
      </div>
    </div>
  )
}
