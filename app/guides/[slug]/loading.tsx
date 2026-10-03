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
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-12 w-3/4" />
          <div className="flex gap-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-96 w-full rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="space-y-4 pt-8">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-20 w-full rounded-xl" />
            <Skeleton className="h-20 w-full rounded-xl" />
          </div>
        </div>
      </main>
    </div>
  );
}
