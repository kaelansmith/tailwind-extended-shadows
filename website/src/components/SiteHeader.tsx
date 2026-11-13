import Link from "next/link";
import { NavLink } from "@/components/NavLink";
import { Logo } from "@/components/Logo";
import { mainNav, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200/70 bg-zinc-50/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-zinc-900"
        >
          <Logo />
          {site.shortName}
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {mainNav.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              matchPrefix
              className="rounded-full px-3 py-1.5 text-zinc-500 transition-colors hover:text-zinc-900"
              activeClassName="bg-white text-zinc-900 shadow-sm shadow-zinc-900/5"
            >
              {item.label}
            </NavLink>
          ))}
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="ml-2 hidden rounded-full px-3 py-1.5 text-zinc-500 transition-colors hover:text-zinc-900 sm:block"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
