import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function UsersCorrectionsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-destructive">Corrections Queue</h1>
          <p className="text-muted-foreground mt-2">// Flagged user inputs awaiting canonical mapping</p>
        </div>
      </div>

      <div className="border border-destructive/20 bg-destructive/5 p-4 flex gap-4 items-center">
        <Badge variant="destructive" className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Warning</Badge>
        <span className="text-sm">There are currently 89 unmapped user medications in the system.</span>
      </div>

      <div className="border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="font-bold text-foreground">User Input</TableHead>
              <TableHead className="font-bold text-foreground">User ID</TableHead>
              <TableHead className="font-bold text-foreground text-right">Mapping</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-border bg-destructive/5 hover:bg-destructive/10">
              <TableCell className="font-medium font-mono text-destructive">Lizanoprill</TableCell>
              <TableCell className="text-muted-foreground text-xs">usr_01HJ...8820</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-black">
                  Map to Canonical
                </Button>
              </TableCell>
            </TableRow>
            <TableRow className="border-border bg-destructive/5 hover:bg-destructive/10">
              <TableCell className="font-medium font-mono text-destructive">Tylenol 500mg (red ones)</TableCell>
              <TableCell className="text-muted-foreground text-xs">usr_01HJ...2291</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-black">
                  Map to Canonical
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
