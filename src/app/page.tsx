export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-4">
            <h1 className="text-6xl font-bold tracking-tight">
              <span className="text-primary">WeSync</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A powerful task management and collaboration platform built with
              Next.js 15 and Tailwind CSS v4
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="p-6 rounded-lg border bg-card text-card-foreground">
              <h3 className="text-lg font-semibold mb-2">Modern Stack</h3>
              <p className="text-muted-foreground">
                Built with Next.js 15, React 19, and Tailwind CSS v4 for optimal
                performance
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card text-card-foreground">
              <h3 className="text-lg font-semibold mb-2">Design System</h3>
              <p className="text-muted-foreground">
                Comprehensive UI components with shadcn/ui and Radix UI
                primitives
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card text-card-foreground">
              <h3 className="text-lg font-semibold mb-2">Type Safe</h3>
              <p className="text-muted-foreground">
                Full TypeScript support with Zod validation and form handling
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center mt-12">
            <button className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              Get Started
            </button>
            <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              View Components
            </button>
          </div>

          {/* Status */}
          <div className="mt-16 p-4 rounded-lg bg-muted">
            <p className="text-sm text-muted-foreground">
              🚀 Phase 1 Complete: Environment & Dependencies Setup
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Ready for component migration from Tailwind v3 to v4
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
