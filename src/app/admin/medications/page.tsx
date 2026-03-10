import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function MedicationsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-primary">Medications</h1>
          <p className="text-muted-foreground mt-2">// Canonical library of medications and categories</p>
        </div>
        <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-black">
          + Add Medication
        </Button>
      </div>

      <div className="border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="font-bold text-foreground">Canonical Name</TableHead>
              <TableHead className="font-bold text-foreground">Category</TableHead>
              <TableHead className="font-bold text-foreground text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-border">
              <TableCell className="font-medium">Lisinopril</TableCell>
              <TableCell><Badge variant="outline" className="text-primary border-primary">ACE Inhibitor</Badge></TableCell>
              <TableCell className="text-right"><Button variant="ghost" size="sm">Edit</Button></TableCell>
            </TableRow>
            <TableRow className="border-border">
              <TableCell className="font-medium">Amoxicillin</TableCell>
              <TableCell><Badge variant="outline" className="text-primary border-primary">Antibiotic</Badge></TableCell>
              <TableCell className="text-right"><Button variant="ghost" size="sm">Edit</Button></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
