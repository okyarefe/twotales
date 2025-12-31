import Link from "next/link";
import HeaderNav from "./header-nav";
import HeaderAuth from "./auth-header";

export default function Header() {
  return (
    <header className="w-full shadow-md mb-6 bg-white/90 dark:bg-card/95 backdrop-blur border-b border-border sticky top-0 z-40">
      <nav className="container mx-auto flex flex-row items-center justify-between py-3 px-3 sm:px-4 md:px-6 w-full">
        {/* Brand */}
        <div className="flex items-center gap-4 md:gap-8 min-w-0">
          <Link
            href="/"
            className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-500 hover:opacity-95 transition-opacity"
          >
            TwoTales
          </Link>
        </div>
        {/* Nav links */}

        <div>
          <HeaderNav />
        </div>
        <div>
          <HeaderAuth />
        </div>
      </nav>
    </header>
  );
}
