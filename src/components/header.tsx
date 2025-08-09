import Link from "next/link";
import HeaderAuth from "./auth-header";
import { CreditCard } from 'lucide-react'

export default function Header() {
  return (
    <header className="shadow mb-6 bg-white w-full">
      <nav className="container mx-auto flex flex-row items-center justify-between py-2 px-1 sm:px-4 md:px-6 w-full">
        {/* Brand and nav links - always horizontal */}
        <div className="flex flex-row items-center space-x-4 md:space-x-8 min-w-0">
          <Link 
            href="/dashboard"
            className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors truncate"
          >
            Dashboard
          </Link>
          <Link 
            href="/stories"
            className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors truncate"
          >
            My Stories
          </Link>
          <Link 
            href="/credits"
            className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors flex items-center gap-1 truncate"
          >
            <CreditCard className="w-4 h-4" />
            Get Credits
          </Link>
        </div>
        {/* Auth always on the right, same row */}
        <div className="flex items-center min-w-0">
          <HeaderAuth />
        </div>
      </nav>
    </header>
  );
}
