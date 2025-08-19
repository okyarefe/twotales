export default function HeaderSkeleton() {
  return (
    <div className="flex flex-row items-center gap-2 md:gap-4 lg:gap-6 min-w-0">
      <div className="h-10 w-24 bg-slate-200 animate-pulse rounded" />
      <div className="h-10 w-24 bg-slate-200 animate-pulse rounded" />
      <div className="h-10 w-32 bg-slate-200 animate-pulse rounded" />
    </div>
  );
}
