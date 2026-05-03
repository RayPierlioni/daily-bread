import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AppShell } from "@/components/app-shell";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: "Daily Bread Hub | Free Christian Devotional and Prayer Journal App",
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteConfig.name,
    title: "Daily Bread Hub | Start Every Morning with Scripture and Prayer",
    description: siteConfig.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Daily Bread Hub devotional and prayer app"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Bread Hub | Free Christian Devotional App",
    description: siteConfig.description,
    images: ["/opengraph-image"]
  },
  robots: {
    index: true,
    follow: true
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || "p4c8uoxvWhMXQEBOZycmQzY9iGg-d5QeV78Z3YfF6VM"
  }
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppShell user={session?.user ?? null}>{children}</AppShell>
      </body>
    </html>
  );
}
