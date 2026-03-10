import { login } from './actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const error = resolvedSearchParams?.error;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 font-mono">
      <div className="w-full max-w-md space-y-8 border border-border p-8 bg-card relative">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tighter text-primary uppercase">Meds_Admin</h1>
          <p className="text-muted-foreground mt-2 uppercase text-xs">// authentication required</p>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive border border-destructive/20 p-3 text-sm text-center">
            {error}
          </div>
        )}

        <form action={login} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-muted-foreground">User_ID (Email)</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="admin@example.com" 
              required 
              className="bg-background border-border text-foreground focus-visible:ring-primary rounded-none" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-muted-foreground">Pass_Key</Label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              required 
              className="bg-background border-border text-foreground focus-visible:ring-primary rounded-none" 
            />
          </div>
          
          <Button type="submit" 
             
            className="w-full bg-primary text-black hover:bg-primary/90 font-bold uppercase tracking-widest rounded-none mt-4"
          >
            Init Session
          </Button>
        </form>
        
        <div className="absolute top-0 right-0 p-2 opacity-20 pointer-events-none">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H10V10H0V0Z" fill="currentColor"/>
            <path d="M20 0H30V10H20V0Z" fill="currentColor"/>
            <path d="M10 10H20V20H10V10Z" fill="currentColor"/>
            <path d="M30 10H40V20H30V10Z" fill="currentColor"/>
            <path d="M0 20H10V30H0V20Z" fill="currentColor"/>
            <path d="M20 20H30V30H20V20Z" fill="currentColor"/>
            <path d="M10 30H20V40H10V30Z" fill="currentColor"/>
            <path d="M30 30H40V40H30V30Z" fill="currentColor"/>
          </svg>
        </div>
      </div>
    </div>
  )
}
