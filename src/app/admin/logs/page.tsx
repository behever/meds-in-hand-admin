import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/utils/supabase/server"

export default async function AuditLogsPage() {
  const supabase = await createClient()
  const { data: logs } = await supabase
    .from('audit_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)

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
            {logs?.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-gray-500">No audit logs recorded yet.</TableCell>
              </TableRow>
            )}
            {logs?.map((log) => (
              <TableRow key={log.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <TableCell className="text-gray-400 font-mono text-xs whitespace-nowrap">
                  {new Date(log.created_at).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={
                      log.actor_type === 'admin' 
                        ? 'text-[#006338] border-[#006338]/20 bg-[#006338]/5 rounded-md font-medium'
                        : log.actor_type === 'system'
                        ? 'text-blue-600 border-blue-200 bg-blue-50 rounded-md font-medium'
                        : 'text-gray-600 border-gray-200 bg-gray-100 rounded-md font-medium'
                    }
                  >
                    {log.actor_type}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium font-mono text-xs text-gray-900">{log.event_type}</TableCell>
                <TableCell className="text-gray-500 text-sm truncate max-w-[300px]">
                  {log.details ? JSON.stringify(log.details) : '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
