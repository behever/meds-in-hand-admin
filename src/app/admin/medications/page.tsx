import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/utils/supabase/server"
import { createMedication, updateMedication, deleteMedication } from "../actions"

export default async function MedicationsPage({
  searchParams
}: {
  searchParams: Promise<{ edit?: string; error?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()
  const { data: medications } = await supabase
    .from('medications')
    .select('*, categories(name)')
    .order('name')
  
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name')
    .order('name')

  const editingId = params.edit
  const editingMed = editingId ? medications?.find(m => m.id === editingId) : null

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Medications</h1>
          <p className="text-gray-500 mt-2 font-mono text-sm uppercase tracking-wider">Canonical Library</p>
        </div>
      </div>

      {params.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {decodeURIComponent(params.error)}
        </div>
      )}

      {editingMed ? (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="font-medium text-amber-800">Editing: {editingMed.name}</span>
            <a href="/admin/medications" className="text-sm text-gray-500 hover:text-gray-700">Cancel</a>
          </div>
          <form action={updateMedication} className="space-y-4">
            <input type="hidden" name="id" value={editingMed.id} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input 
                name="name" 
                required 
                defaultValue={editingMed.name}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#006338] focus:border-[#006338]" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select 
                name="category_id" 
                required 
                defaultValue={editingMed.category_id}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#006338] focus:border-[#006338]"
              >
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="bg-amber-600 text-white px-4 py-2 rounded-md font-medium text-sm shadow-sm hover:bg-amber-700 transition-colors">
              Save Changes
            </button>
          </form>
        </div>
      ) : (
        <details className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
          <summary className="cursor-pointer font-medium text-[#006338]">+ Add New Medication</summary>
          <form action={createMedication} className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input name="name" required className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#006338] focus:border-[#006338]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select name="category_id" required className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#006338] focus:border-[#006338]">
                <option value="">Select a category...</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="bg-[#006338] text-white px-4 py-2 rounded-md font-medium text-sm shadow-sm hover:bg-[#006338]/90 transition-colors">
              Add Medication
            </button>
          </form>
        </details>
      )}

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="border-b border-gray-200 hover:bg-transparent">
              <TableHead className="font-semibold text-gray-700 uppercase tracking-wider text-xs">Canonical Name</TableHead>
              <TableHead className="font-semibold text-gray-700 uppercase tracking-wider text-xs">Category</TableHead>
              <TableHead className="font-semibold text-gray-700 uppercase tracking-wider text-xs text-right w-[140px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medications?.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-6 text-gray-500">No medications found. Add one above.</TableCell>
              </TableRow>
            )}
            {medications?.map((med) => (
              <TableRow key={med.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <TableCell className="font-medium text-gray-900">{med.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-[#006338] border-[#006338]/20 bg-[#006338]/5 rounded-md font-medium">
                    {med.categories?.name ?? 'Uncategorized'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="inline-flex gap-2">
                    <a 
                      href={`/admin/medications?edit=${med.id}`}
                      className="text-xs border border-gray-300 text-gray-600 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-all font-medium"
                    >
                      Edit
                    </a>
                    <form action={deleteMedication} className="inline">
                      <input type="hidden" name="id" value={med.id} />
                      <button 
                        type="submit" 
                        className="text-xs border border-red-200 text-red-600 px-3 py-1.5 rounded-md hover:bg-red-50 transition-all font-medium"
                        onClick={(e) => {
                          if (!confirm(`Delete medication "${med.name}"? This cannot be undone.`)) {
                            e.preventDefault()
                          }
                        }}
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
