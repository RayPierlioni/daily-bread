"use client";

import { signIn } from "next-auth/react";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SignInButtons({ googleConfigured }: { googleConfigured: boolean }) {
  return (
    <div className="space-y-3">
      {googleConfigured ? (
        <Button className="w-full" onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
          <LogIn className="h-4 w-4" aria-hidden="true" />
          Continue with Google
        </Button>
      ) : (
        <Button className="w-full" disabled>
          <LogIn className="h-4 w-4" aria-hidden="true" />
          Google sign-in unavailable
        </Button>
      )}
    </div>
  );
}
