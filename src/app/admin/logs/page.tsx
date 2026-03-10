import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function AuditLogsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Audit Logs</h1>
          <p className="text-gray-500 mt-2 font-mono text-sm uppercase tracking-wider">Activity Tracking</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="border-b border-gray-200 hover:bg-transparent">
              <TableHead className="font-semibold text-gray-700 uppercase tracking-wider text-xs w-[180px]">Timestamp</TableHead>
              <TableHead className="font-semibold text-gray-700 uppercase tracking-wider text-xs">Actor</TableHead>
              <TableHead className="font-semibold text-gray-700 uppercase tracking-wider text-xs">Event</TableHead>
              <TableHead className="font-semibold text-gray-700 uppercase tracking-wider text-xs">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <TableCell className="text-gray-400 font-mono text-xs whitespace-nowrap">2026-03-10 09:45:12</TableCell>
              <TableCell><Badge variant="outline" className="text-[#006338] border-[#006338]/20 bg-[#006338]/5 rounded-md font-medium">Admin_01</Badge></TableCell>
              <TableCell className="font-medium font-mono text-xs text-gray-900">MAPPED_MEDICATION</TableCell>
              <TableCell className="text-gray-500 text-sm truncate max-w-[300px]">Mapped user input "Lizanoprill" to canonical "Lisinopril"</TableCell>
            </TableRow>
            <TableRow className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <TableCell className="text-gray-400 font-mono text-xs whitespace-nowrap">2026-03-10 09:40:05</TableCell>
              <TableCell><Badge variant="outline" className="text-gray-600 border-gray-200 bg-gray-100 rounded-md font-medium">User_8820</Badge></TableCell>
              <TableCell className="font-medium font-mono text-xs text-gray-900">ADDED_MEDICATION</TableCell>
              <TableCell className="text-gray-500 text-sm truncate max-w-[300px]">Added new medication "Lizanoprill" to their profile</TableCell>
            </TableRow>
            <TableRow className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <TableCell className="text-gray-400 font-mono text-xs whitespace-nowrap">2026-03-10 09:12:33</TableCell>
              <TableCell><Badge variant="outline" className="text-[#006338] border-[#006338]/20 bg-[#006338]/5 rounded-md font-medium">Admin_01</Badge></TableCell>
              <TableCell className="font-medium font-mono text-xs text-gray-900">ADMIN_LOGIN</TableCell>
              <TableCell className="text-gray-500 text-sm truncate max-w-[300px]">Successful authentication via Supabase Auth</TableCell>
            </TableRow>
            <TableRow className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <TableCell className="text-gray-400 font-mono text-xs whitespace-nowrap">2026-03-10 08:55:20</TableCell>
              <TableCell><Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 rounded-md font-medium">System</Badge></TableCell>
              <TableCell className="font-medium font-mono text-xs text-gray-900">USER_CREATED</TableCell>
              <TableCell className="text-gray-500 text-sm truncate max-w-[300px]">New account registered: usr_01HJ...8820</TableCell>
            </TableRow>
            <TableRow className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <TableCell className="text-gray-400 font-mono text-xs whitespace-nowrap">2026-03-10 08:30:11</TableCell>
              <TableCell><Badge variant="outline" className="text-[#006338] border-[#006338]/20 bg-[#006338]/5 rounded-md font-medium">Admin_02</Badge></TableCell>
              <TableCell className="font-medium font-mono text-xs text-gray-900">CREATED_CANONICAL</TableCell>
              <TableCell className="text-gray-500 text-sm truncate max-w-[300px]">Added canonical medication "Amoxicillin" to category "Antibiotic"</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
