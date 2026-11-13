import Link from "next/link";
import { docsPages } from "@/lib/site";

export function DocsPager({ href }: { href: string }) {
  const index = docsPages.findIndex((page) => page.href === href);
  const previous = index > 0 ? docsPages[index - 1] : null;
  const next = index < docsPages.length - 1 ? docsPages[index + 1] : null;

  return (
    <nav className="mt-24 flex max-w-2xl justify-between gap-4 border-t border-zinc-200/70 pt-8 text-sm">
      {previous ? (
        <Link href={previous.href} className="group">
          <span className="block text-xs text-zinc-400">Previous</span>
          <span className="font-medium text-zinc-700 group-hover:text-zinc-950">
            {previous.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={next.href} className="group text-right">
          <span className="block text-xs text-zinc-400">Next</span>
          <span className="font-medium text-zinc-700 group-hover:text-zinc-950">
            {next.title}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
