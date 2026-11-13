import { CopyButton } from "@/components/CopyButton";
import { cx } from "@/lib/cx";

type SwatchProps = {
  /** Shadow classes to show. Write them as full literal strings so Tailwind can find them. */
  classes: string;
  /** Short text above the class list. */
  label?: string;
  /** Extra classes for the shape only. They do not show in the caption. */
  shapeClassName?: string;
  dark?: boolean;
};

export function Swatch({ classes, label, shapeClassName, dark }: SwatchProps) {
  const classList = classes.split(/\s+/).filter(Boolean);

  return (
    <figure className="group flex flex-col">
      <div
        className={cx(
          "flex items-center justify-center rounded-2xl px-6 py-12",
          dark ? "bg-zinc-900" : "bg-zinc-100/70",
        )}
      >
        <div
          className={cx(
            "h-20 w-full max-w-[9rem] rounded-xl",
            dark ? "bg-zinc-800" : "bg-white",
            shapeClassName,
            classes,
          )}
        />
      </div>
      <figcaption className="flex items-start justify-between gap-2 px-1 pt-3">
        <div className="min-w-0">
          {label ? (
            <p className="mb-1 text-xs font-medium text-zinc-900">{label}</p>
          ) : null}
          <p className="font-mono text-xs leading-relaxed text-zinc-500">
            {classList.map((name) => (
              <span key={name} className="mr-1.5 inline-block">
                {name}
              </span>
            ))}
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

type SwatchGridProps = {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
};

export function SwatchGrid({ children, columns = 3 }: SwatchGridProps) {
  return (
    <div
      className={cx(
        "my-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2",
        columns === 3 && "lg:grid-cols-3",
        columns === 4 && "lg:grid-cols-4",
      )}
    >
      {children}
    </div>
  );
}
