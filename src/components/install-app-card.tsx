"use client";

import { useState } from "react";
import { Download, Smartphone } from "lucide-react";
import { InstallAppButton } from "@/components/install-app-button";

function isStandaloneMode() {
  if (typeof window === "undefined") return false;
  const navigatorWithStandalone = navigator as Navigator & { standalone?: boolean };
  return window.matchMedia("(display-mode: standalone)").matches || Boolean(navigatorWithStandalone.standalone);
}

export function InstallAppCard() {
  const [isInstalled] = useState(() => isStandaloneMode());

  if (isInstalled) return null;

  return (
    <section className="rounded-2xl border border-[#d9cfbd] bg-[#fffdf8] p-4 shadow-sm">
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
        <InstallAppButton className="sm:shrink-0" />
      </div>
      <p className="mt-3 flex items-center gap-2 text-xs leading-5 text-[#68706e]">
        <Download className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        On iPhone, the button will show the Share then Add to Home Screen instructions.
      </p>
    </section>
  );
}
