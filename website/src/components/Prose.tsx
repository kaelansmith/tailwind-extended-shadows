import { cx } from "@/lib/cx";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-sm font-medium text-indigo-600">{children}</p>;
}

export function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
      {children}
    </h1>
  );
}

export function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-500">
      {children}
    </p>
  );
}

export function H2({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="mt-16 scroll-mt-24 text-xl font-semibold tracking-tight text-zinc-950"
    >
      {children}
    </h2>
  );
}

export function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-10 text-base font-semibold text-zinc-900">{children}</h3>
  );
}

export function P({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cx("mt-4 max-w-2xl leading-7 text-zinc-600", className)}>
      {children}
    </p>
  );
}

export function List({ children }: { children: React.ReactNode }) {
  return (
    <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 leading-7 text-zinc-600 marker:text-zinc-300">
      {children}
    </ul>
  );
}

export function Steps({ children }: { children: React.ReactNode }) {
  return (
    <ol className="mt-4 max-w-2xl list-decimal space-y-2 pl-5 leading-7 text-zinc-600 marker:text-zinc-400">
      {children}
    </ol>
  );
}

export function Note({
  children,
  title = "Note",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <aside className="my-8 max-w-2xl rounded-xl bg-indigo-50/60 px-5 py-4 text-sm leading-6 text-indigo-950/80 ring-1 ring-indigo-100">
      <p className="mb-1 font-semibold text-indigo-950">{title}</p>
      {children}
    </aside>
  );
}

type ClassTableRow = {
  name: string;
  value: string;
};

export function ClassTable({ rows }: { rows: ClassTableRow[] }) {
  return (
    <div className="my-6 max-w-2xl overflow-hidden rounded-xl bg-white ring-1 ring-zinc-900/[0.07]">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-zinc-100 text-xs text-zinc-400">
            <th className="px-4 py-2.5 font-medium">Class</th>
            <th className="px-4 py-2.5 font-medium">Result</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.name}
              className="border-b border-zinc-100 last:border-0"
            >
              <td className="whitespace-nowrap px-4 py-2.5 font-mono text-[13px] text-indigo-700">
                {row.name}
              </td>
              <td className="px-4 py-2.5 text-zinc-600">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ThemeValues({
  themeKey,
  values,
}: {
  themeKey: string;
  values: Record<string, string>;
}) {
  const entries = Object.entries(values);

  return (
    <details className="group my-6 max-w-2xl rounded-xl bg-white ring-1 ring-zinc-900/[0.07]">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm text-zinc-700">
        <span>
          Default values for{" "}
          <span className="font-mono text-[13px]">theme.{themeKey}</span>
        </span>
        <span className="text-zinc-400 transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="grid grid-cols-2 gap-x-6 gap-y-1 border-t border-zinc-100 px-4 py-3 font-mono text-[13px] text-zinc-600 sm:grid-cols-3">
        {entries.map(([key, value]) => (
          <div key={key} className="flex justify-between gap-3">
            <span className="text-zinc-400">{key}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </details>
  );
}
