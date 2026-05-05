"use client";

import type { ComponentProps, ComponentType } from "react";
import { useFormStatus } from "react-dom";
import { Button as UIButton } from "@/components/ui/button";

type ButtonVariant = NonNullable<ComponentProps<typeof UIButton>["variant"]>;
type FormAction = NonNullable<ComponentProps<"form">["action"]>;

function DevotionalSubmitButton({
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

function IconSubmitButton({
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

export function DevotionalActionForm({
  action,
  icon,
  label,
  pendingLabel,
  variant = "primary",
  disabled,
  className
}: {
  action: FormAction;
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  pendingLabel: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <form action={action}>
      <DevotionalSubmitButton icon={icon} label={label} pendingLabel={pendingLabel} variant={variant} disabled={disabled} className={className} />
    </form>
  );
}

export function DevotionalIconActionForm({
  action,
  icon,
  label,
  pendingLabel,
  disabled,
  className = "rounded-full p-2 transition hover:bg-[#f3eee4] disabled:cursor-not-allowed disabled:opacity-60"
}: {
  action: FormAction;
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  pendingLabel: string;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <form action={action}>
      <IconSubmitButton icon={icon} label={label} pendingLabel={pendingLabel} disabled={disabled} className={className} />
    </form>
  );
}
