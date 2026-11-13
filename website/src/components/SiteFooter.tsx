import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-10 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          {site.name}. Made by{" "}
          <a
            href="https://kaelansmith.com"
            className="text-zinc-700 hover:text-zinc-900"
          >
            Kaelan Smith
          </a>
          .
        </p>
        <div className="flex gap-5">
          <a href={site.github} className="hover:text-zinc-900">
            GitHub
          </a>
          <a href={site.npm} className="hover:text-zinc-900">
            npm
          </a>
        </div>
      </div>
    </footer>
  );
}
