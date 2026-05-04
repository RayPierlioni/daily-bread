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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: "Next Faithful Step | A Free Devotional Path at Your Pace",
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
    title: "Next Faithful Step | Take the Next Faithful Step",
    description: siteConfig.description,
    images: [
      {
        url: "/opengraph-image",
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
    images: ["/opengraph-image"]
  },
  icons: {
    icon: [
      { url: "/brand/next-faithful-step.svg", type: "image/svg+xml" }
    ],
    apple: [{ url: "/brand/next-faithful-step.svg", type: "image/svg+xml" }]
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
