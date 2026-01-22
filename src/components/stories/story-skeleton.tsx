export function StoryCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden animate-pulse h-[240px]">
      <div className="p-6 space-y-5">
        {/* Title and Badge skeleton */}
        <div className="flex justify-between items-start gap-4">
          <div className="h-6 bg-slate-100 rounded-md w-3/4"></div>
          <div className="h-6 bg-slate-100 rounded-full w-16"></div>
        </div>
        
        {/* Accent Line */}
        <div className="h-1 bg-slate-100 rounded-full w-full"></div>
        
        {/* Language Badges */}
        <div className="flex gap-2">
          <div className="h-6 bg-slate-100 rounded-full w-20"></div>
          <div className="h-6 bg-slate-100 rounded-full w-24"></div>
        </div>

        {/* Date and Actions */}
        <div className="space-y-4 pt-2">
          <div className="h-4 bg-slate-50 rounded w-32"></div>
          <div className="flex gap-2">
            <div className="h-9 bg-slate-100 rounded-md w-28"></div>
            <div className="h-9 bg-slate-100 rounded-md w-28"></div>
            <div className="h-9 bg-slate-100 rounded-md w-12"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StoryGridSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <StoryCardSkeleton key={i} />
      ))}
    </>
  );
}
