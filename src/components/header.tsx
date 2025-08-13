import Link from "next/link";

import HeaderAuth from "./auth-header";
import { CreditCard } from "lucide-react";
import { Badge } from "./ui/badge";
import { cn } from "@/utils/utils";

export default function Header() {
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";
  // Helper to check active route
  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/stories", label: "My Stories" },
    {
      href: "/credits",
      label: "Get Credits",
      icon: <CreditCard className="w-4 h-4" />,
    },
  ];

  return (
    <header className="shadow-sm mb-6 bg-white w-full border-b border-slate-100 sticky top-0 z-40">
      <nav className="container mx-auto flex flex-row items-center justify-between py-2 px-2 sm:px-4 md:px-6 w-full">
        {/* Brand */}
        <div className="flex items-center gap-4 md:gap-8 min-w-0">
          <Link
            href="/"
            className="font-bold text-xl text-purple-700 tracking-tight hover:text-purple-900 transition-colors"
          >
            TwoTales
          </Link>
        </div>
        {/* Nav links */}
        <div className="flex flex-row items-center gap-2 md:gap-4 lg:gap-6 min-w-0">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1 truncate",
                  isActive
                    ? "bg-purple-50 text-purple-700 shadow-sm"
                    : "text-slate-700 hover:bg-slate-50 hover:text-purple-700"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {link.icon && link.icon}
                {link.label}
                {isActive && (
                  <Badge
                    variant="outline"
                    className="ml-2 border-purple-300 text-purple-700 bg-purple-50"
                  >
                    Current
                  </Badge>
                )}
              </Link>
            );
          })}
        </div>
        {/* Auth always on the right */}
        <div className="flex items-center min-w-0">
          <HeaderAuth />
        </div>
      </nav>
    </header>
  );
}
