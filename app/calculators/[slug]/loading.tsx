import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <div className="flex gap-4">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Skeleton className="h-10 w-48 mb-6" />
            <div className="space-y-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-6">
              <div className="flex justify-between">
                <Skeleton className="h-8 w-64" />
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-32" />
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Skeleton className="h-24 w-full rounded-xl" />
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-20 w-full rounded-xl" />
                    <Skeleton className="h-20 w-full rounded-xl" />
                  </div>
                  <Skeleton className="h-16 w-full rounded-xl" />
                </div>
                <div className="flex justify-center items-center">
                  <Skeleton className="h-64 w-64 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
