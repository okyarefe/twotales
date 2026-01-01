"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import HeaderNav from "./header-nav";
import HeaderAuth from "./auth-header";
import MobileSidebar from "./mobile-sidebar";

export default function Header() {
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      // Check if mobile (width < 768px) AND landscape (width > height)
      const isMobile = window.innerWidth < 768;
      const isLandscape = window.innerWidth > window.innerHeight;
      setIsMobileLandscape(isMobile && isLandscape);
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
      <header className="w-full shadow-md mb-6 bg-white/90 dark:bg-card/95 backdrop-blur border-b border-border sticky top-0 z-40">
        <nav className="container mx-auto flex flex-row items-center justify-between py-2 px-3 sm:px-4 w-full">
          {/* Mobile Landscape Sidebar */}
          <div>
            <MobileSidebar />
          </div>

          {/* Brand */}
          <div className="flex items-center">
            <Link
              href="/"
              className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-500 hover:opacity-95 transition-opacity"
            >
              TwoTales
            </Link>
          </div>
          
          <div>
            <HeaderAuth />
          </div>
        </nav>
      </header>
    );
  }

  // Default layout for portrait mobile and desktop
  return (
    <header className="w-full shadow-md mb-6 bg-white/90 dark:bg-card/95 backdrop-blur border-b border-border sticky top-0 z-40">
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
