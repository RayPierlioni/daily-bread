"use client";

import type { ComponentProps, ComponentType } from "react";
import { useFormStatus } from "react-dom";
import { Button as UIButton } from "@/components/ui/button";

type ButtonVariant = NonNullable<ComponentProps<typeof UIButton>["variant"]>;

export function DevotionalSubmitButton({
  icon: Icon,
  label,
  pendingLabel,
  variant,
  disabled,
  className
}: {
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  pendingLabel: string;
  variant: ButtonVariant;
  disabled?: boolean;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <UIButton type="submit" variant={variant} disabled={disabled || pending} className={className}>
      <Icon className="h-4 w-4" aria-hidden={true} />
      {pending ? pendingLabel : label}
    </UIButton>
  );
}

export function DevotionalIconSubmitButton({
  icon: Icon,
  label,
  pendingLabel,
  disabled,
  className
}: {
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
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
      <Icon className="h-4 w-4" aria-hidden={true} />
    </button>
  );
}
