import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isGoogleAuthConfigured } from "@/lib/auth";
import { SignInButtons } from "./signin-buttons";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link href="/" className="mx-auto inline-flex">
            <BrandMark iconSize={58} showText={false} />
            <span className="sr-only">Daily Bread Hub home</span>
          </Link>
          <CardTitle className="text-2xl">Welcome to Daily Bread Hub</CardTitle>
          <p className="text-sm leading-6 text-[#68706e]">Sign in to keep your prayers, faith questions, and devotional notes private.</p>
        </CardHeader>
        <CardContent>
          <SignInButtons googleConfigured={isGoogleAuthConfigured} />
          {!isGoogleAuthConfigured ? (
            <p className="mt-4 rounded-lg bg-[#fbf7ef] p-3 text-xs leading-5 text-[#68706e]">
              Google OAuth is ready in the codebase. Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to enable it locally.
            </p>
          ) : null}
        </CardContent>
      </Card>
    </main>
  );
}
