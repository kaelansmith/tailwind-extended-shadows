import { NavLink } from "@/components/NavLink";
import { docsNav } from "@/lib/site";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-6xl gap-16 px-6 py-14">
      <aside className="hidden w-48 shrink-0 md:block">
        <nav className="sticky top-28 space-y-8 text-sm">
          {docsNav.map((group) => (
            <div key={group.title}>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-400">
                {group.title}
              </p>
              <ul className="space-y-0.5">
                {group.pages.map((page) => (
                  <li key={page.href}>
                    <NavLink
                      href={page.href}
                      className="-mx-3 block rounded-lg px-3 py-1.5 text-zinc-500 transition-colors hover:text-zinc-900"
                      activeClassName="bg-white font-medium text-zinc-900 shadow-sm shadow-zinc-900/5 ring-1 ring-zinc-900/5"
                    >
                      {page.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
      <article className="min-w-0 flex-1 pb-10">{children}</article>
    </div>
  );
}
