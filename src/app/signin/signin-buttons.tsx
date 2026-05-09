"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { AlertCircle, Check, Copy, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackClientEvent } from "@/lib/client-analytics";

const signinUrl = "https://nextfaithfulstep.com/signin";

export function SignInButtons({ googleConfigured, embeddedBrowser }: { googleConfigured: boolean; embeddedBrowser: boolean }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (embeddedBrowser) {
      trackClientEvent("signin_embedded_browser_detected", { source: "signin_page" });
    }
  }, [embeddedBrowser]);

  async function copySigninLink() {
    try {
      await navigator.clipboard.writeText(signinUrl);
    } catch {
      window.prompt("Copy this link, then open it in Safari or Chrome:", signinUrl);
    }

    setCopied(true);
    trackClientEvent("signin_link_copied", { source: "embedded_browser_warning" });
    window.setTimeout(() => setCopied(false), 1800);
  }

  if (embeddedBrowser) {
    return (
      <div className="space-y-3">
        <div className="rounded-xl border border-[#d9cfbd] bg-[#fff7e8] p-4 text-sm leading-6 text-[#5a3e18]">
          <div className="flex gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-none text-[#b38b4d]" aria-hidden="true" />
            <div>
              <p className="font-semibold text-[#24302f]">Open this page in Safari or Chrome first.</p>
              <p className="mt-1">
                Messenger and Facebook use an in-app browser that Google blocks for sign-in. Tap the share icon or three dots, choose Open in Browser, then continue with Google.
              </p>
              <p className="mt-2 text-xs leading-5 text-[#68706e]">
                You can also copy this link, open Safari or Chrome, and paste it there.
              </p>
            </div>
          </div>
        </div>
        <Button className="w-full" variant="secondary" onClick={copySigninLink}>
          {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
          {copied ? "Link copied" : "Copy sign-in link"}
        </Button>
        <Button className="w-full" disabled>
          <LogIn className="h-4 w-4" aria-hidden="true" />
          Google sign-in is blocked in this browser
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {googleConfigured ? (
        <Button
          className="w-full"
          onClick={() => {
            trackClientEvent("signin_started", { provider: "google", source: "signin_page" });
            void signIn("google", { callbackUrl: "/dashboard" });
          }}
        >
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
