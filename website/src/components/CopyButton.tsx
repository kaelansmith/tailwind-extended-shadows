"use client";

import { useState } from "react";
import { cx } from "@/lib/cx";

type CopyButtonProps = {
  value: string;
  className?: string;
  label?: string;
};

export function CopyButton({
  value,
  className,
  label = "Copy",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cx(
        "rounded-md px-2 py-1 text-xs font-medium text-zinc-500 transition-colors hover:bg-zinc-900/5 hover:text-zinc-900",
        className,
      )}
    >
      {copied ? "Copied" : label}
    </button>
  );
}
