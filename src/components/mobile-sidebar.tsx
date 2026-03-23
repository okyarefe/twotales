"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  BookOpen,
  CreditCard,
  Home,
  HelpCircle,
  Mail,
} from "lucide-react";
import { cn } from "@/utils/utils";
import { useUser } from "@/contexts/user-context";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function MobileSidebar({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();

  // Helper to normalize paths
  const normalize = (path: string) => path.replace(/\/+$/, "");

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

  const navLinks = user ? privateLinks : publicLinks;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("md:hidden", className)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] sm:w-[320px]">
        <SheetHeader>
          <SheetTitle className="text-left">
            <Link
              href="/"
              className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-500"
              onClick={() => setOpen(false)}
            >
              TwoTales
            </Link>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-2 mt-8">
          {navLinks.map((link) => {
            const isActive =
              normalize(pathname) === normalize(link.href) ||
              normalize(pathname).startsWith(normalize(link.href) + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors",
                  isActive
                    ? "bg-purple-100 text-purple-700"
                    : "text-slate-700 hover:bg-slate-100 hover:text-purple-700"
                )}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
