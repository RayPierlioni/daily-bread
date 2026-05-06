"use client";

import { useEffect, useState } from "react";
import { Download, MonitorSmartphone, Share2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackClientEvent } from "@/lib/client-analytics";
import { cn } from "@/lib/utils";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

function isStandaloneMode() {
  if (typeof window === "undefined") return false;
  const navigatorWithStandalone = navigator as Navigator & { standalone?: boolean };
  return window.matchMedia("(display-mode: standalone)").matches || Boolean(navigatorWithStandalone.standalone);
}

function isAppleMobile() {
  if (typeof navigator === "undefined") return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

export function InstallAppButton({ className, compact = false }: { className?: string; compact?: boolean }) {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isInstalled, setIsInstalled] = useState(() => isStandaloneMode());

  useEffect(() => {
    function handleBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    }

    function handleInstalled() {
      setIsInstalled(true);
      setShowInstructions(false);
      trackClientEvent("pwa_install_completed");
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  if (isInstalled) return null;

  async function handleInstallClick() {
    trackClientEvent("pwa_install_clicked", {
      hasNativePrompt: Boolean(installPrompt),
      platform: isAppleMobile() ? "ios" : "web"
    });

    if (!installPrompt) {
      setShowInstructions(true);
      return;
    }

    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    trackClientEvent("pwa_install_prompt_result", {
      outcome: choice.outcome,
      platform: choice.platform
    });
    setInstallPrompt(null);

    if (choice.outcome !== "accepted") setShowInstructions(true);
  }

  return (
    <div className={cn("relative", className)}>
      <Button type="button" variant={compact ? "ghost" : "secondary"} size="sm" onClick={handleInstallClick} className={compact ? "px-2" : ""}>
        <Download className="h-4 w-4" aria-hidden="true" />
        <span>{compact ? "Install App" : "Install App"}</span>
      </Button>

      {showInstructions ? (
        <div className="absolute right-0 top-12 z-50 w-[min(21rem,calc(100vw-2rem))] rounded-2xl border border-[#e4dccd] bg-[#fffdf8] p-4 text-left shadow-[0_18px_40px_rgba(36,48,47,0.16)]">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <MonitorSmartphone className="h-5 w-5 text-[#345d6f]" aria-hidden="true" />
              <p className="font-semibold text-[#24302f]">Add Next Faithful Step</p>
            </div>
            <button
              type="button"
              className="rounded-full p-1 text-[#68706e] transition hover:bg-[#f0eadf] hover:text-[#24302f]"
              aria-label="Close install instructions"
              onClick={() => setShowInstructions(false)}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-3 space-y-2 text-sm leading-6 text-[#52605d]">
            {isAppleMobile() ? (
              <>
                <p className="flex gap-2">
                  <Share2 className="mt-0.5 h-4 w-4 shrink-0 text-[#b38b4d]" aria-hidden="true" />
                  <span>On iPhone, tap the Share button in Safari, then choose Add to Home Screen.</span>
                </p>
                <p>After that, Next Faithful Step opens like an app from your phone.</p>
              </>
            ) : (
              <>
                <p>Look for Install App, Add to Home Screen, or the install icon in your browser menu.</p>
                <p>Chrome on Android usually shows the install prompt automatically after you tap this button.</p>
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
