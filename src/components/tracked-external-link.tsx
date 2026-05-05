"use client";

import type { AnchorHTMLAttributes } from "react";
import { trackClientEvent } from "@/lib/client-analytics";

type TrackedExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  analytics: {
    amount: string;
    supportType: string;
    source: string;
  };
};

export function TrackedExternalLink({ analytics, onClick, children, ...props }: TrackedExternalLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackClientEvent("support_cta_clicked", {
          ...analytics,
          signedIn: false
        });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
