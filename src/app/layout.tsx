import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { UserProvider } from "@/contexts/user-context";
import { createClient } from "@/lib/supabase/server";
import { getUserData } from "@/actions/user-data";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TwoTales",
  description: "AI-powered storytelling platform",
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
      <body className={inter.className}>
        <UserProvider
          initialUser={user?.data.user}
          initialUserData={userFromSupabase}
        >
          <Header></Header>

          <div className="container mx-auto px-4 max-w-6xl rounded bg-purple-100">
            {" "}
            {children}
            <Toaster />
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
