export default function HeaderSkeleton() {
  return (
    <nav className="flex flex-row items-center gap-2 md:gap-4 lg:gap-6 min-w-0">
      {/* Mobile: show only icon skeletons */}
      <div className="flex gap-2 md:hidden">
        <div className="h-8 w-10 bg-slate-200 animate-pulse rounded-full border-2 border-purple-300" />
        <div className="h-8 w-10 bg-slate-200 animate-pulse rounded-full border-2 border-purple-300" />
        <div className="h-8 w-10 bg-slate-200 animate-pulse rounded-full border-2 border-purple-300" />
      </div>
      {/* Desktop: show full skeleton */}
      <div className="hidden md:flex gap-12 mx-auto">
        <div className="h-8 w-28 bg-slate-200 animate-pulse rounded border-2 border-purple-300" />
        <div className="h-8 w-28 bg-slate-200 animate-pulse rounded border-2 border-purple-300" />
        <div className="h-8 w-28 bg-slate-200 animate-pulse rounded border-2 border-purple-300" />
      </div>
    </nav>
  );
}
