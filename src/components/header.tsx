import Link from "next/link";
import HeaderNav from "./header-nav";
import HeaderAuth from "./auth-header";

export default function Header() {
  return (
    <header className="w-full shadow-sm mb-6 bg-white/95 dark:bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-40">
      <nav className="container mx-auto flex flex-row items-center justify-between py-2 px-2 sm:px-4 md:px-6 w-full">
        {/* Brand */}
        <div className="flex items-center gap-4 md:gap-8 min-w-0">
          <Link
            href="/"
            className="font-bold text-xl text-purple-700 tracking-tight hover:text-purple-900 transition-colors"
          >
            TwoTales
            <span className="transition-colors from-purple-400 to-black bg-gradient-to-br bg-clip-text text-transparent">
              AI
            </span>
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
