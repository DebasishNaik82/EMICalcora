import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-20" />
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div key={i} className="p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-4" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
