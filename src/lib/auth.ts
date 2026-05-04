import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

const googleConfigured = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/signin"
  },
  providers: [
    ...(googleConfigured
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
          })
        ]
      : []),
    CredentialsProvider({
      id: "demo",
      name: "Demo Sign In",
      credentials: {
        email: { label: "Email", type: "email" }
      },
      async authorize(credentials) {
        const requestedEmail = credentials?.email?.trim().toLowerCase() || "demo@nextfaithfulstep.local";
        const isAdmin = requestedEmail === "admin@nextfaithfulstep.local";
        const isFirstTimeDemo =
          requestedEmail === "new@nextfaithfulstep.local" || requestedEmail.endsWith("@firsttime.nextfaithfulstep.local");
        const email = isAdmin ? requestedEmail : isFirstTimeDemo ? requestedEmail : "demo@nextfaithfulstep.local";
        const user = await prisma.user.upsert({
          where: { email },
          update: {},
          create: {
            email,
            name: isAdmin ? "Next Faithful Step Admin" : isFirstTimeDemo ? "First-Time Demo" : "Demo Believer",
            role: isAdmin ? "ADMIN" : "USER",
            onboardingCompleted: isAdmin || !isFirstTimeDemo,
            spiritualFocusProfile: isAdmin || !isFirstTimeDemo ? "Growing in Scripture" : null
          }
        });

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
      }

      if (token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          select: {
            id: true,
            role: true,
            onboardingCompleted: true,
            spiritualFocusProfile: true
          }
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
          token.onboardingCompleted = dbUser.onboardingCompleted;
          token.spiritualFocusProfile = dbUser.spiritualFocusProfile;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id ?? "");
        session.user.role = token.role as "USER" | "ADMIN";
        session.user.onboardingCompleted = Boolean(token.onboardingCompleted);
        session.user.spiritualFocusProfile = token.spiritualFocusProfile as string | null;
      }

      return session;
    }
  }
};

export const isGoogleAuthConfigured = googleConfigured;
