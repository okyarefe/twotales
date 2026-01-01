"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, CreditCard, Home, HelpCircle, Mail } from "lucide-react";
import { cn } from "@/utils/utils";
import { useUser } from "@/contexts/user-context";

export default function HeaderNav() {
  // Helper to normalize paths (remove trailing slashes)
  const normalize = (path: string) => path.replace(/\/+$/, "");
  const pathname = usePathname();

  // Public links visible only when not logged in
  const publicLinks = [
    {
      href: "/how-it-works",
      label: "How It Works",
      icon: <HelpCircle className="w-5 h-5" />,
    },
    {
      href: "/contact",
      label: "Contact",
      icon: <Mail className="w-5 h-5" />,
    },
  ];

  // Private links visible only to logged-in users
  const privateLinks = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <Home className="w-5 h-5" />,
    },
    {
      href: "/stories",
      label: "My Stories",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      href: "/credits",
      label: "Get Credits",
      icon: <CreditCard className="w-4 h-4" />,
    },
  ];

  const { user } = useUser();

  // Show public links only when not logged in, private links when logged in
  const navLinks = user ? privateLinks : publicLinks;

  return (
    <div className="flex flex-row items-center gap-2 md:gap-4 lg:gap-6 min-w-0">
      {navLinks.map((link) => {
        const isActive =
          normalize(pathname) === normalize(link.href) ||
          normalize(pathname).startsWith(normalize(link.href) + "/");
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "relative px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1 truncate",
              isActive
                ? "bg-purple-200 text-purple-700 border-purple-600"
                : "text-slate-700 hover:bg-slate-50 hover:text-purple-700"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {link.icon && link.icon}
            <span className="hidden md:inline">{link.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
