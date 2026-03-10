import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function AuditLogsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-primary">Audit Logs</h1>
          <p className="text-muted-foreground mt-2">// System-wide activity and event tracking</p>
        </div>
      </div>

      <div className="border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="font-bold text-foreground">Timestamp</TableHead>
              <TableHead className="font-bold text-foreground">Actor</TableHead>
              <TableHead className="font-bold text-foreground">Event</TableHead>
              <TableHead className="font-bold text-foreground">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-border">
              <TableCell className="text-muted-foreground text-xs whitespace-nowrap">2026-03-10 09:45:12</TableCell>
              <TableCell><Badge variant="outline" className="text-primary border-primary">Admin_01</Badge></TableCell>
              <TableCell className="font-medium text-foreground">MAPPED_MEDICATION</TableCell>
              <TableCell className="text-muted-foreground text-xs truncate max-w-[300px]">Mapped user input "Lizanoprill" to canonical "Lisinopril"</TableCell>
            </TableRow>
            <TableRow className="border-border">
              <TableCell className="text-muted-foreground text-xs whitespace-nowrap">2026-03-10 09:40:05</TableCell>
              <TableCell><Badge variant="outline" className="text-foreground border-border">User_8820</Badge></TableCell>
              <TableCell className="font-medium text-foreground">ADDED_MEDICATION</TableCell>
              <TableCell className="text-muted-foreground text-xs truncate max-w-[300px]">Added new medication "Lizanoprill" to their profile</TableCell>
            </TableRow>
            <TableRow className="border-border">
              <TableCell className="text-muted-foreground text-xs whitespace-nowrap">2026-03-10 09:12:33</TableCell>
              <TableCell><Badge variant="outline" className="text-primary border-primary">Admin_01</Badge></TableCell>
              <TableCell className="font-medium text-foreground">ADMIN_LOGIN</TableCell>
              <TableCell className="text-muted-foreground text-xs truncate max-w-[300px]">Successful authentication via Supabase Auth</TableCell>
            </TableRow>
            <TableRow className="border-border">
              <TableCell className="text-muted-foreground text-xs whitespace-nowrap">2026-03-10 08:55:20</TableCell>
              <TableCell><Badge variant="outline" className="text-foreground border-border">System</Badge></TableCell>
              <TableCell className="font-medium text-foreground">USER_CREATED</TableCell>
              <TableCell className="text-muted-foreground text-xs truncate max-w-[300px]">New account registered: usr_01HJ...8820</TableCell>
            </TableRow>
            <TableRow className="border-border">
              <TableCell className="text-muted-foreground text-xs whitespace-nowrap">2026-03-10 08:30:11</TableCell>
              <TableCell><Badge variant="outline" className="text-primary border-primary">Admin_02</Badge></TableCell>
              <TableCell className="font-medium text-foreground">CREATED_CANONICAL</TableCell>
              <TableCell className="text-muted-foreground text-xs truncate max-w-[300px]">Added canonical medication "Amoxicillin" to category "Antibiotic"</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
