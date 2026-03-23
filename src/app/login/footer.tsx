import { Brain } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-slate-100">
      <div className="container mx-auto max-w-6xl flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-violet-500" />
          <span className="text-sm font-semibold tracking-tight text-slate-700">
            TwoTalesAI
          </span>
        </div>
        <p className="text-xs text-slate-400">
          &copy; {new Date().getFullYear()} TwoTalesAI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
