import { CopyButton } from "@/components/CopyButton";
import { cx } from "@/lib/cx";

type CodeProps = {
  children: string;
  title?: string;
  className?: string;
};

export function Code({ children, title, className }: CodeProps) {
  const code = children.trim();

  return (
    <div
      className={cx(
        "group relative my-6 overflow-hidden rounded-xl bg-white ring-1 ring-zinc-900/[0.07]",
        className,
      )}
    >
      {title ? (
        <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-2">
          <span className="font-mono text-xs text-zinc-400">{title}</span>
          <CopyButton value={code} />
        </div>
      ) : (
        <CopyButton
          value={code}
          className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
        />
      )}
      <pre className="overflow-x-auto px-4 py-3.5 font-mono text-[13px] leading-relaxed text-zinc-700">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-md bg-zinc-900/[0.05] px-1.5 py-0.5 font-mono text-[0.85em] text-zinc-800">
      {children}
    </code>
  );
}
