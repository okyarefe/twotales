import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { UserProvider } from "@/contexts/user-context";
import { createClient } from "@/lib/supabase/server";
import { getUserData } from "@/actions/user-data";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TwoTales",
  description: "AI-powered language learning platform",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await (await createClient()).auth.getUser();

  const userId = user?.data.user?.id;
  const userFromSupabase = userId ? await getUserData(userId) : null;

  return (
    <html lang="en">
      <head>
        <script src="https://app.lemonsqueezy.com/js/lemon.js" defer></script>
      </head>
      <body className={inter.className}>
        <UserProvider
          initialUser={user?.data.user}
          initialUserData={userFromSupabase}
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Analytics />
            <Toaster />
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
