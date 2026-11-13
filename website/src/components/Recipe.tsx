import { CopyButton } from "@/components/CopyButton";
import { cx } from "@/lib/cx";

type RecipeProps = {
  title: string;
  /** The shadow classes of the main element, as shown in the caption. */
  classes: string;
  children: React.ReactNode;
  dark?: boolean;
};

export function Recipe({ title, classes, children, dark }: RecipeProps) {
  return (
    <figure className="group flex flex-col">
      <div
        className={cx(
          "flex min-h-56 items-center justify-center rounded-2xl p-8",
          dark ? "bg-zinc-900" : "bg-zinc-100/70",
        )}
      >
        {children}
      </div>
      <figcaption className="flex items-start justify-between gap-2 px-1 pt-3">
        <div className="min-w-0">
          <p className="mb-1 text-xs font-medium text-zinc-900">{title}</p>
          <p className="font-mono text-xs leading-relaxed text-zinc-500">
            {classes}
          </p>
        </div>
        <CopyButton
          value={classes}
          className="-mr-1 -mt-0.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
        />
      </figcaption>
    </figure>
  );
}
