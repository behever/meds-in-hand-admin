import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function UsersCorrectionsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Corrections Queue</h1>
          <p className="text-gray-500 mt-2 font-mono text-sm uppercase tracking-wider">Flagged User Inputs</p>
        </div>
      </div>

      <div className="bg-red-50 border border-red-100 p-4 flex gap-4 items-center rounded-lg shadow-sm">
        <Badge variant="destructive" className="bg-red-500 text-white hover:bg-red-600 rounded-md shadow-sm">Warning</Badge>
        <span className="text-sm font-medium text-red-800">There are currently 89 unmapped user medications in the system.</span>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="border-b border-gray-200 hover:bg-transparent">
              <TableHead className="font-semibold text-gray-700 uppercase tracking-wider text-xs">User Input</TableHead>
              <TableHead className="font-semibold text-gray-700 uppercase tracking-wider text-xs">User ID</TableHead>
              <TableHead className="font-semibold text-gray-700 uppercase tracking-wider text-xs text-right">Mapping</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-b border-gray-100 hover:bg-red-50/50 transition-colors">
              <TableCell className="font-medium font-mono text-red-600">Lizanoprill</TableCell>
              <TableCell className="text-gray-400 font-mono text-xs">usr_01HJ...8820</TableCell>
              <TableCell className="text-right">
                <button className="text-xs border border-[#006338] text-[#006338] px-3 py-1.5 rounded-md hover:bg-[#006338] hover:text-white transition-all font-medium shadow-sm">
                  Map to Canonical
                </button>
              </TableCell>
            </TableRow>
            <TableRow className="border-b border-gray-100 hover:bg-red-50/50 transition-colors">
              <TableCell className="font-medium font-mono text-red-600">Tylenol 500mg (red ones)</TableCell>
              <TableCell className="text-gray-400 font-mono text-xs">usr_01HJ...2291</TableCell>
              <TableCell className="text-right">
                <button className="text-xs border border-[#006338] text-[#006338] px-3 py-1.5 rounded-md hover:bg-[#006338] hover:text-white transition-all font-medium shadow-sm">
                  Map to Canonical
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
