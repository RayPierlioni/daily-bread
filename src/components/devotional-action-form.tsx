"use client";

import type { ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { CalendarCheck, CheckCircle2, Heart } from "lucide-react";
import { Button as UIButton } from "@/components/ui/button";

type ButtonVariant = NonNullable<ComponentProps<typeof UIButton>["variant"]>;
type DevotionalActionIcon = "calendar" | "check" | "heart";

function DevotionalActionIcon({ name }: { name: DevotionalActionIcon }) {
  const iconClassName = "h-4 w-4";

  if (name === "calendar") return <CalendarCheck className={iconClassName} aria-hidden={true} />;
  if (name === "heart") return <Heart className={iconClassName} aria-hidden={true} />;
  return <CheckCircle2 className={iconClassName} aria-hidden={true} />;
}

export function DevotionalSubmitButton({
  icon,
  label,
  pendingLabel,
  variant,
  disabled,
  className
}: {
  icon: DevotionalActionIcon;
  label: string;
  pendingLabel: string;
  variant: ButtonVariant;
  disabled?: boolean;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <UIButton type="submit" variant={variant} disabled={disabled || pending} className={className}>
      <DevotionalActionIcon name={icon} />
      {pending ? pendingLabel : label}
    </UIButton>
  );
}

export function DevotionalIconSubmitButton({
  icon,
  label,
  pendingLabel,
  disabled,
  className
}: {
  icon: DevotionalActionIcon;
  label: string;
  pendingLabel: string;
  disabled?: boolean;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      className={className}
      type="submit"
      aria-label={pending ? pendingLabel : label}
      disabled={disabled || pending}
    >
      <DevotionalActionIcon name={icon} />
    </button>
  );
}
