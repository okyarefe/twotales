import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { UserProvider } from "@/contexts/user-context";
import { createClient } from "@/lib/supabase/server";
import { getUserData } from "@/actions/user-data";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import styles from "./layout.module.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TwoTales",
    template: "%s | TwoTales",
  },
  description:
    "TwoTales helps you learn languages with AI-generated, interactive stories and quizzes.",
  applicationName: "TwoTales",
  keywords: [
    "language learning",
    "AI",
    "stories",
    "quizzes",
    "vocabulary",
    "grammar",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "TwoTales",
    title: "TwoTales — AI Language Learning",
    description:
      "Learn languages with interactive AI stories, personalized practice, and quizzes.",
  },
  twitter: {
    card: "summary",
    title: "TwoTales — AI Language Learning",
    description:
      "Learn languages with interactive AI stories, personalized practice, and quizzes.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "TwoTales",
              url: siteUrl,
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "TwoTales",
              url: siteUrl,
              potentialAction: {
                "@type": "SearchAction",
                target: `${siteUrl}/stories?query={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <UserProvider
          initialUser={user?.data.user}
          initialUserData={userFromSupabase}
        >
          <div className={`h-full flex flex-col ${styles.landscapeRow}`}>
            <Header />
            <main className="flex-1 flex flex-col overflow-y-auto">{children}</main>
            <Analytics />
            <Toaster />
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
