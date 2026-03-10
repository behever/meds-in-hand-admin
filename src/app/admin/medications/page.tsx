import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function MedicationsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Medications</h1>
          <p className="text-gray-500 mt-2 font-mono text-sm uppercase tracking-wider">Canonical Library</p>
        </div>
        <button className="bg-[#006338] text-white px-4 py-2 rounded-md font-medium text-sm shadow-sm hover:bg-[#006338]/90 transition-colors">
          + Add Medication
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="border-b border-gray-200 hover:bg-transparent">
              <TableHead className="font-semibold text-gray-700 uppercase tracking-wider text-xs">Canonical Name</TableHead>
              <TableHead className="font-semibold text-gray-700 uppercase tracking-wider text-xs">Category</TableHead>
              <TableHead className="font-semibold text-gray-700 uppercase tracking-wider text-xs text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <TableCell className="font-medium text-gray-900">Lisinopril</TableCell>
              <TableCell>
                <Badge variant="outline" className="text-[#006338] border-[#006338]/20 bg-[#006338]/5 rounded-md font-medium">ACE Inhibitor</Badge>
              </TableCell>
              <TableCell className="text-right">
                <button className="text-sm text-gray-500 hover:text-[#006338] font-medium transition-colors">Edit</button>
              </TableCell>
            </TableRow>
            <TableRow className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <TableCell className="font-medium text-gray-900">Amoxicillin</TableCell>
              <TableCell>
                <Badge variant="outline" className="text-[#006338] border-[#006338]/20 bg-[#006338]/5 rounded-md font-medium">Antibiotic</Badge>
              </TableCell>
              <TableCell className="text-right">
                <button className="text-sm text-gray-500 hover:text-[#006338] font-medium transition-colors">Edit</button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
