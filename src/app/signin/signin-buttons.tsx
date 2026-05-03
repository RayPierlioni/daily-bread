"use client";

import { signIn } from "next-auth/react";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SignInButtons({ googleConfigured }: { googleConfigured: boolean }) {
  const signInAsFirstTimeUser = () => {
    const email = `new-user-${Date.now()}@firsttime.dailybreadhub.local`;
    signIn("demo", { email, callbackUrl: "/dashboard" });
  };

  return (
    <div className="space-y-3">
      {googleConfigured ? (
        <Button className="w-full" onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
          <LogIn className="h-4 w-4" aria-hidden="true" />
          Continue with Google
        </Button>
      ) : null}
      <Button variant={googleConfigured ? "secondary" : "primary"} className="w-full" onClick={() => signIn("demo", { email: "demo@dailybreadhub.local", callbackUrl: "/dashboard" })}>
        <LogIn className="h-4 w-4" aria-hidden="true" />
        Use demo sign-in
      </Button>
      <Button variant="secondary" className="w-full" onClick={signInAsFirstTimeUser}>
        <LogIn className="h-4 w-4" aria-hidden="true" />
        Try first-time assessment
      </Button>
      <Button variant="ghost" className="w-full" onClick={() => signIn("demo", { email: "admin@dailybreadhub.local", callbackUrl: "/admin" })}>
        Admin demo
      </Button>
    </div>
  );
}
