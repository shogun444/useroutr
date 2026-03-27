"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, Clock, Prohibit } from "@phosphor-icons/react";
import type { LinkStatus } from "@tavvio/types";

interface LinkStatusBadgeProps {
  status: LinkStatus;
  className?: string;
}

const STATUS_CONFIG: Record<
  LinkStatus,
  { label: string; colorClass: string; icon: typeof CheckCircle }
> = {
  active: {
    label: "Active",
    colorClass: "bg-[var(--green)]/15 text-[var(--green)]",
    icon: CheckCircle,
  },
  expired: {
    label: "Expired",
    colorClass: "bg-[var(--muted)] text-[var(--muted-foreground)]",
    icon: Clock,
  },
  deactivated: {
    label: "Deactivated",
    colorClass: "bg-[var(--red)]/15 text-[var(--red)]",
    icon: Prohibit,
  },
};

export function LinkStatusBadge({ status, className }: LinkStatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.colorClass,
        className
      )}
    >
      <Icon size={14} weight="fill" />
      {config.label}
    </span>
  );
}
