import Link from "next/link";
import { CopyButton } from "@/components/CopyButton";
import { Code } from "@/components/Code";
import { site } from "@/lib/site";

const features = [
  {
    title: "Offset",
    text: "Move the shadow in a direction.",
    href: "/docs/offset",
    classes: "shadow-lg shadow-x-3 shadow-y-3 shadow-zinc-900/15",
  },
  {
    title: "Blur",
    text: "Make the edge sharp or soft.",
    href: "/docs/blur",
    classes:
      "shadow-sm shadow-x-1.5 shadow-y-1.5 shadow-blur-0 shadow-zinc-900/80",
  },
  {
    title: "Spread",
    text: "Make the shadow larger or smaller.",
    href: "/docs/spread",
    classes: "shadow-xl shadow-y-6 -shadow-spread-3 shadow-zinc-900/25",
  },
  {
    title: "Opacity",
    text: "Change the opacity. Keep the color.",
    href: "/docs/opacity",
    classes: "shadow-lg shadow-y-3 shadow-indigo-600 shadow-opacity-30",
  },
  {
    title: "Layers",
    text: "Add smooth, natural shadow layers.",
    href: "/docs/layers",
    classes: "shadow-sm shadow-zinc-900/10 shadows-6 shadows-scale-2",
  },
  {
    title: "Inset",
    text: "Do all of this inside the element.",
    href: "/docs/inset",
    classes:
      "inset-shadow-sm inset-shadow-zinc-900/10 inset-shadows-4 inset-shadows-scale-2",
    shape: "bg-zinc-100",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-24 text-center sm:pt-32">
        <p className="mb-5 inline-block rounded-full bg-white px-3 py-1 text-xs font-medium text-zinc-500 shadow-sm shadow-zinc-900/5 ring-1 ring-zinc-900/5">
          A plugin for Tailwind CSS v3
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-6xl">
          Control each part of a box shadow.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-500">
          Use utility classes to set the offset, blur, spread, opacity, and
          layers of each shadow.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/docs"
            className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm shadow-y-1 shadow-zinc-900/30 shadows-3 shadows-scale-2 inset-shadow-2xs inset-shadow-white/20 transition-shadow hover:shadow-y-1.5"
          >
            Read the docs
          </Link>
          <div className="flex items-center gap-1 rounded-full bg-white py-1.5 pl-4 pr-1.5 font-mono text-sm text-zinc-600 shadow-sm shadow-zinc-900/5 ring-1 ring-zinc-900/5">
            <span className="select-all">npm i tailwind-extended-shadows</span>
            <CopyButton
              value="npm i tailwind-extended-shadows"
              className="rounded-full"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Compare label="Tailwind" classes="shadow-xl shadow-zinc-900/10" />
          <Compare
            label="Tailwind Extended Shadows"
            classes="shadow-sm shadow-y-px shadow-blur-0.5 shadow-zinc-900/6 shadows-6 shadows-scale-2.25"
          />
        </div>
        <p className="mt-6 text-center text-sm text-zinc-500">
          Two shadows of almost the same size. The second shadow has six layers.
          It looks more natural.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-32">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
            One class for each value
          </h2>
          <p className="mt-4 leading-7 text-zinc-500">
            Each class changes one part of the shadow. The other parts do not
            change.
          </p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="group rounded-3xl bg-white p-2 ring-1 ring-zinc-900/5 transition-shadow hover:shadow-sm hover:shadow-zinc-900/5 hover:shadows-4 hover:shadows-scale-2"
            >
              <div className="flex h-44 items-center justify-center rounded-2xl bg-zinc-50">
                <div
                  className={`size-20 rounded-xl ${feature.shape ?? "bg-white"} ${feature.classes}`}
                />
              </div>
              <div className="px-4 pb-4 pt-5">
                <p className="font-medium text-zinc-900">{feature.title}</p>
                <p className="mt-1 text-sm text-zinc-500">{feature.text}</p>
                <p className="mt-4 font-mono text-xs leading-relaxed text-zinc-400">
                  {feature.classes}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
            Start in one minute
          </h2>
          <p className="mt-4 leading-7 text-zinc-500">
            Add the plugin. Then add the classes to your HTML.
          </p>
        </div>
        <Code title="tailwind.config.js" className="mt-10">{`
module.exports = {
  plugins: [require("tailwind-extended-shadows")],
};
`}</Code>
        <Code title="HTML">{`
<div class="shadow-sm shadow-zinc-900/10 shadows-5 shadows-scale-2">
  <!-- A smooth shadow with five layers -->
</div>
`}</Code>
        <div className="mt-10 flex justify-center gap-6 text-sm">
          <Link
            href="/examples"
            className="font-medium text-indigo-600 hover:underline"
          >
            See all examples
          </Link>
          <Link
            href="/playground"
            className="font-medium text-indigo-600 hover:underline"
          >
            Open the playground
          </Link>
          <a
            href={site.github}
            className="font-medium text-indigo-600 hover:underline"
          >
            View on GitHub
          </a>
        </div>
      </section>
    </>
  );
}

function Compare({ label, classes }: { label: string; classes: string }) {
  return (
    <figure className="flex flex-col">
      <div className="flex h-80 items-center justify-center rounded-3xl bg-zinc-100/70">
        <div className={`h-36 w-56 rounded-2xl bg-white ${classes}`} />
      </div>
      <figcaption className="px-1 pt-4">
        <p className="text-sm font-medium text-zinc-900">{label}</p>
        <p className="mt-1 font-mono text-xs text-zinc-500">{classes}</p>
      </figcaption>
    </figure>
  );
}
