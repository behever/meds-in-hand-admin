export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter text-primary">System Status</h1>
        <p className="text-muted-foreground mt-2">// Overview of Meds In Hand database</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="border border-border bg-card text-card-foreground p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Total Users</h3>
          <div className="mt-4 text-4xl font-mono text-primary">1,248</div>
        </div>
        <div className="border border-border bg-card text-card-foreground p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Canonical Meds</h3>
          <div className="mt-4 text-4xl font-mono text-primary">482</div>
        </div>
        <div className="border border-border bg-card text-card-foreground p-6">
          <h3 className="text-sm font-medium text-destructive">Pending Corrections</h3>
          <div className="mt-4 text-4xl font-mono text-destructive">89</div>
        </div>
      </div>
      
      <div className="border border-border p-8 bg-card flex flex-col items-center justify-center min-h-[300px]">
        <div className="text-xs text-muted-foreground font-mono text-center leading-tight mb-6">
{`   _____               .___         .__          ___ ___                     .___ 
  /     \\   ____   __| _/______   |__| ____    /   |   \\_____    ____   __| _/ 
 /  \\ /  \\_/ __ \\ / __ |/  ___/   |  |/    \\  /    ~    \\__  \\  /    \\ / __ |  
/    Y    \\  ___// /_/ |\\___ \\    |  |   |  \\ \\    Y    // __ \\|   |  \\ /_/ |  
\\____|__  /\\___  >____ /____  >   |__|___|  /  \\___|_  /(____  /___|  /____ |  
        \\/     \\/     \\/    \\/            \\/         \\/      \\/     \\/     \\/  `}
        </div>
        <p className="text-sm text-muted-foreground max-w-md text-center">
          Terminal-style admin interface initialized. Awaiting commands.
        </p>
      </div>
    </div>
  )
}
