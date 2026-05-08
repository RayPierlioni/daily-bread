"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Smartphone, X } from "lucide-react";
import { dismissInstallPrompt, INSTALL_CARD_DISMISSED_KEY, INSTALL_DISMISSED_KEY, InstallAppButton } from "@/components/install-app-button";
import { trackClientEvent } from "@/lib/client-analytics";

const dashboardVisitCountKey = "dashboardVisitCount";

function isStandaloneMode() {
  if (typeof window === "undefined") return false;
  const navigatorWithStandalone = navigator as Navigator & { standalone?: boolean };
  return window.matchMedia("(display-mode: standalone)").matches || Boolean(navigatorWithStandalone.standalone);
}

function isInstallCardDismissed() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(INSTALL_CARD_DISMISSED_KEY) === "true" || window.localStorage.getItem(INSTALL_DISMISSED_KEY) === "true";
}

function dismissInstallCard() {
  window.localStorage.setItem(INSTALL_CARD_DISMISSED_KEY, "true");
  dismissInstallPrompt();
}

export function InstallAppCard() {
  const [isInstalled] = useState(() => isStandaloneMode());
  const [dismissed, setDismissed] = useState(() => isInstallCardDismissed());
  const [showOnThisVisit, setShowOnThisVisit] = useState(false);
  const countedVisit = useRef(false);

  useEffect(() => {
    if (countedVisit.current) return;
    countedVisit.current = true;

    const currentCount = Number(window.localStorage.getItem(dashboardVisitCountKey) ?? "0");
    const nextCount = currentCount + 1;
    window.localStorage.setItem(dashboardVisitCountKey, String(nextCount));
    setShowOnThisVisit(nextCount >= 2);
    setDismissed(isInstallCardDismissed());
  }, []);

  if (isInstalled || dismissed || !showOnThisVisit) return null;

  function handleDismiss(source: "card_dismiss" | "install_click" = "card_dismiss") {
    dismissInstallCard();
    setDismissed(true);
    trackClientEvent("pwa_install_dismissed", { source: source === "install_click" ? "dashboard_card_install_click" : "dashboard_card" });
  }

  return (
    <section className="relative rounded-2xl border border-[#d9cfbd] bg-[#fffdf8] p-4 pr-11 shadow-sm">
      <button
        type="button"
        className="absolute right-3 top-3 rounded-full p-1 text-[#68706e] transition hover:bg-[#f0eadf] hover:text-[#24302f]"
        aria-label="Dismiss install app reminder"
        onClick={() => handleDismiss()}
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e9f0ea] text-[#345d6f]">
            <Smartphone className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="font-semibold text-[#24302f]">Want this to feel like an app?</p>
            <p className="mt-1 text-sm leading-6 text-[#68706e]">
              Install Next Faithful Step on your phone so it opens from your home screen.
            </p>
          </div>
        </div>
        <InstallAppButton className="sm:shrink-0" onInstallClick={() => handleDismiss("install_click")} />
      </div>
      <p className="mt-3 flex items-center gap-2 text-xs leading-5 text-[#68706e]">
        <Download className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        On iPhone, the button will show the Share then Add to Home Screen instructions.
      </p>
      <button type="button" className="mt-2 text-xs font-medium text-[#345d6f] hover:text-[#24302f]" onClick={() => handleDismiss()}>
        Not now. I can install it later from Settings.
      </button>
    </section>
  );
}
