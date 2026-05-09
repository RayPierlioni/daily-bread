import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AppShell } from "@/components/app-shell";
import { prisma } from "@/lib/prisma";
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

const canonicalUrl = siteConfig.url;
const openGraphImageUrl = `${canonicalUrl}/opengraph-image`;

export const metadata: Metadata = {
  metadataBase: new URL(canonicalUrl),
  applicationName: siteConfig.name,
  title: {
    default: "Next Faithful Step | God Does Not Move On Without You",
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  alternates: {
    canonical: canonicalUrl
  },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    siteName: siteConfig.name,
    title: "Next Faithful Step | God Does Not Move On Without You",
    description: siteConfig.description,
    images: [
      {
        url: openGraphImageUrl,
        width: 1200,
        height: 630,
        alt: "Next Faithful Step free devotional path"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Next Faithful Step | Free Christian Devotional Path",
    description: siteConfig.description,
    images: [openGraphImageUrl]
  },
  icons: {
    icon: [
      { url: "/brand/nfs-favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/nfs-favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/brand/next-faithful-step.svg", type: "image/svg+xml" }
    ],
    apple: [{ url: "/brand/nfs-apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
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
  const userSettings = session?.user
    ? await prisma.user.findFirst({
        where: {
          OR: [
            session.user.id ? { id: session.user.id } : undefined,
            session.user.email ? { email: session.user.email } : undefined
          ].filter(Boolean) as { id?: string; email?: string }[]
        },
        select: { notificationSettings: true }
      })
    : null;
  const shellUser = session?.user ? { ...session.user, notificationSettings: userSettings?.notificationSettings ?? null } : null;

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppShell user={shellUser}>{children}</AppShell>
      </body>
    </html>
  );
}
