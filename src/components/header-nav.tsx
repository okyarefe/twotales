"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/utils";
import { useUser } from "@/contexts/user-context";
import { publicLinks, privateLinks } from "@/config/nav-links";

export default function HeaderNav() {
  // Helper to normalize paths (remove trailing slashes)
  const normalize = (path: string) => path.replace(/\/+$/, "");
  const pathname = usePathname();

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
                : "text-slate-700 hover:bg-slate-50 hover:text-purple-700",
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
