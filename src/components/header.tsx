"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import HeaderNav from "./header-nav";
import HeaderAuth from "./auth-header";
import MobileSidebar from "./mobile-sidebar";

export default function Header() {
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      const isLandscape = window.innerWidth > window.innerHeight;
      const isShort = window.innerHeight < 500;
      setIsMobileLandscape(isTouch && isLandscape && isShort);
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  // In mobile landscape, show sidebar instead of navbar
  if (isMobileLandscape) {
    return (
      <header className="h-dvh w-14 sm:w-16 sticky top-0 left-0 bg-white/90 dark:bg-card/95 backdrop-blur border-r border-border shadow-md z-40 flex flex-col items-center justify-between py-2 shrink-0">
        {/* Mobile Menu Button - Top */}
        <div className="shrink-0 w-full flex justify-center">
          <MobileSidebar className="!flex items-center justify-center" />
        </div>

        {/* Mascot - Center (shrinks to give space to siblings) */}
        <div className="flex-1 flex items-center justify-center min-h-0 w-full px-1 overflow-hidden">
          <Link href="/" className="w-full flex justify-center">
            <Image
              src="/mascot.png"
              alt="Mascot"
              width={48}
              height={48}
              className="w-full h-auto max-h-[80px] object-contain hover:scale-110 transition-transform"
            />
          </Link>
        </div>

        {/* User Profile - Bottom */}
        <div className="shrink-0">
          <HeaderAuth orientation="vertical" />
        </div>
      </header>
    );
  }

  // Default layout for portrait mobile and desktop
  return (
    <header className="w-full shadow-md mb-2 md:mb-6 bg-white/90 dark:bg-card/95 backdrop-blur border-b border-border sticky top-0 z-40">
      <nav className="container mx-auto flex flex-row items-center justify-between py-3 px-3 sm:px-4 md:px-6 w-full">
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <MobileSidebar />
        </div>

        {/* Brand */}
        <div className="flex items-center gap-4 md:gap-8 min-w-0">
          <Link
            href="/"
            className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-500 hover:opacity-95 transition-opacity"
          >
            TwoTales
          </Link>
        </div>

        {/* Nav links - Hidden on mobile */}
        <div className="hidden md:block">
          <HeaderNav />
        </div>

        <div>
          <HeaderAuth />
        </div>
      </nav>
    </header>
  );
}
