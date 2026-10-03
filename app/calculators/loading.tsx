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
        
        <div className="space-y-16">
          {[1, 2, 3].map((cat) => (
            <div key={cat} className="space-y-6">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-6 w-48" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
                    <div className="flex gap-4">
                      <Skeleton className="h-10 w-10 rounded-xl" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-5/6" />
                      </div>
                    </div>
                    <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-3 w-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
