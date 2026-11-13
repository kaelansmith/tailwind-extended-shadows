import { Eyebrow, H1, Lead } from "@/components/Prose";
import { Swatch, SwatchGrid } from "@/components/Swatch";
import { Recipe } from "@/components/Recipe";

export const metadata = { title: "Examples" };

const sections = [
  { id: "sizes", title: "Sizes and layers" },
  { id: "elevation", title: "Elevation" },
  { id: "color", title: "Colored shadows" },
  { id: "dark", title: "Dark surfaces" },
  { id: "inset", title: "Inset" },
  { id: "hover", title: "Hover states" },
  { id: "recipes", title: "UI recipes" },
];

export default function ExamplesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <Eyebrow>Examples</Eyebrow>
      <H1>Examples</H1>
      <Lead>
        Each example shows the classes below the shape. Move the pointer onto an
        example. Then click Copy to copy its classes.
      </Lead>

      <nav className="mt-8 flex flex-wrap gap-2 text-sm">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="rounded-full bg-white px-3.5 py-1.5 text-zinc-600 shadow-sm shadow-zinc-900/5 ring-1 ring-zinc-900/5 transition-colors hover:text-zinc-950"
          >
            {section.title}
          </a>
        ))}
      </nav>

      <Section id="sizes" title="Sizes and layers">
        Each row uses one Tailwind size. The second shape adds layers to the
        same size.
      </Section>
      <SwatchGrid columns={4}>
        <Swatch label="sm" classes="shadow-sm shadow-zinc-900/10" />
        <Swatch
          label="sm, layered"
          classes="shadow-sm shadow-zinc-900/10 shadows-5 shadows-scale-2"
        />
        <Swatch label="md" classes="shadow-md shadow-zinc-900/10" />
        <Swatch
          label="md, layered"
          classes="shadow-md shadow-zinc-900/7 shadows-4 shadows-scale-1.75"
        />
        <Swatch label="lg" classes="shadow-lg shadow-zinc-900/10" />
        <Swatch
          label="lg, layered"
          classes="shadow-lg shadow-zinc-900/6 shadows-4 shadows-scale-1.5"
        />
        <Swatch label="xl" classes="shadow-xl shadow-zinc-900/10" />
        <Swatch
          label="xl, layered"
          classes="shadow-xl shadow-zinc-900/5 shadows-3 shadows-scale-1.5"
        />
      </SwatchGrid>

      <Section id="elevation" title="Elevation">
        A set of four levels for one design system. Each level has more offset,
        more blur, and more layers.
      </Section>
      <SwatchGrid columns={4}>
        <Swatch
          label="Level 1"
          classes="shadow-sm shadow-y-px shadow-blur-0.5 shadow-zinc-900/10 shadows-2 shadows-scale-2"
        />
        <Swatch
          label="Level 2"
          classes="shadow-sm shadow-y-px shadow-blur-0.5 shadow-zinc-900/8 shadows-4 shadows-scale-2"
        />
        <Swatch
          label="Level 3"
          classes="shadow-sm shadow-y-px shadow-blur-0.5 shadow-zinc-900/7 shadows-5 shadows-scale-2.25"
        />
        <Swatch
          label="Level 4"
          classes="shadow-sm shadow-y-px shadow-blur-0.5 shadow-zinc-900/6 shadows-6 shadows-scale-2.25"
        />
      </SwatchGrid>

      <Section id="color" title="Colored shadows">
        Use a shadow color that matches the surface. Layers make the glow
        smooth.
      </Section>
      <SwatchGrid columns={4}>
        <Swatch
          classes="shadow-md shadow-y-2 shadow-indigo-600/25 shadows-4 shadows-scale-1.75"
          shapeClassName="bg-indigo-500"
        />
        <Swatch
          classes="shadow-md shadow-y-2 shadow-rose-600/25 shadows-4 shadows-scale-1.75"
          shapeClassName="bg-rose-500"
        />
        <Swatch
          classes="shadow-md shadow-y-2 shadow-emerald-600/25 shadows-4 shadows-scale-1.75"
          shapeClassName="bg-emerald-500"
        />
        <Swatch
          classes="shadow-md shadow-y-2 shadow-amber-600/30 shadows-4 shadows-scale-1.75"
          shapeClassName="bg-amber-400"
        />
      </SwatchGrid>

      <Section id="dark" title="Dark surfaces">
        On a dark page, a dark shadow is hard to see. Use a glow or a top edge
        highlight.
      </Section>
      <SwatchGrid columns={4}>
        <Swatch
          dark
          classes="shadow-lg shadow-black/50 shadows-3 shadows-scale-2"
        />
        <Swatch
          dark
          classes="inset-shadow-2xs inset-shadow-white/15 shadow-lg shadow-black/50"
        />
        <Swatch
          dark
          classes="shadow-sm shadow-blur-6 shadow-indigo-500/40 shadows-3 shadows-scale-2"
          shapeClassName="ring-1 ring-indigo-400/30"
        />
        <Swatch
          dark
          classes="shadow-sm shadow-y-0 shadow-blur-0 shadow-spread-px shadow-white/10 inset-shadow-2xs inset-shadow-white/10"
        />
      </SwatchGrid>

      <Section id="inset" title="Inset">
        Inset shadows make a surface look lower than the page.
      </Section>
      <SwatchGrid columns={4}>
        <Swatch
          label="Well"
          classes="inset-shadow-sm inset-shadow-zinc-900/10"
          shapeClassName="bg-zinc-100"
        />
        <Swatch
          label="Deep well"
          classes="inset-shadow-sm inset-shadow-zinc-900/10 inset-shadows-4 inset-shadows-scale-2"
          shapeClassName="bg-zinc-100"
        />
        <Swatch
          label="Light from the side"
          classes="inset-shadow-sm inset-shadow-x-2 inset-shadow-y-2 inset-shadow-blur-4 inset-shadow-zinc-900/15"
          shapeClassName="bg-zinc-100"
        />
        <Swatch
          label="Inner glow"
          classes="inset-shadow-sm inset-shadow-y-0 inset-shadow-blur-8 inset-shadow-indigo-500/40"
          shapeClassName="bg-indigo-50"
        />
      </SwatchGrid>

      <Section id="hover" title="Hover states">
        Move the pointer onto these shapes. Each one changes one or two values
        only.
      </Section>
      <SwatchGrid columns={4}>
        <Swatch
          label="Lift"
          classes="shadow-md shadow-y-1 shadow-zinc-900/10 hover:shadow-y-5 hover:shadow-blur-8"
          shapeClassName="transition-all duration-300 hover:-translate-y-1"
        />
        <Swatch
          label="Add layers"
          classes="shadow-sm shadow-zinc-900/10 shadows-5 shadows-scale-1 hover:shadows-scale-2"
          shapeClassName="transition-shadow duration-300"
        />
        <Swatch
          label="Show glow"
          classes="shadow-lg shadow-y-3 shadow-indigo-600 shadow-opacity-0 hover:shadow-opacity-30"
          shapeClassName="bg-indigo-500 transition-shadow duration-300"
        />
        <Swatch
          label="Press"
          classes="shadow-md shadow-y-1 shadow-zinc-900/10 active:shadow-y-0 active:shadow-blur-0.5 hover:shadow-y-3"
          shapeClassName="transition-all duration-150 active:translate-y-px"
        />
      </SwatchGrid>

      <Section id="recipes" title="UI recipes">
        Common interface parts. Each recipe uses only Tailwind and plugin
        classes.
      </Section>
      <div className="my-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Recipe
          title="Primary button"
          classes="shadow-sm shadow-y-1 shadow-indigo-700/30 shadows-3 shadows-scale-2 inset-shadow-2xs inset-shadow-white/25"
        >
          <button
            type="button"
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm shadow-y-1 shadow-indigo-700/30 shadows-3 shadows-scale-2 inset-shadow-2xs inset-shadow-white/25 transition-shadow hover:shadow-y-1.5 active:shadow-y-0"
          >
            Save changes
          </button>
        </Recipe>

        <Recipe
          title="Secondary button"
          classes="shadow-sm shadow-y-px shadow-zinc-900/10 shadows-2 shadows-scale-2 inset-shadow-2xs inset-shadow-white"
        >
          <button
            type="button"
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-zinc-800 ring-1 ring-zinc-900/10 shadow-sm shadow-y-px shadow-zinc-900/10 shadows-2 shadows-scale-2 inset-shadow-2xs inset-shadow-white transition-shadow active:inset-shadow-sm active:inset-shadow-zinc-900/10 active:shadow-none"
          >
            Cancel
          </button>
        </Recipe>

        <Recipe
          title="Text field"
          classes="inset-shadow-xs inset-shadow-zinc-900/5 focus:shadow-sm focus:shadow-y-0 focus:shadow-blur-0 focus:shadow-spread-1 focus:shadow-indigo-500/20"
        >
          <input
            type="text"
            placeholder="name@example.com"
            className="w-64 rounded-lg bg-white px-3.5 py-2.5 text-sm text-zinc-800 outline-none ring-1 ring-zinc-900/10 placeholder:text-zinc-400 inset-shadow-xs inset-shadow-zinc-900/5 focus:shadow-sm focus:shadow-y-0 focus:shadow-blur-0 focus:shadow-spread-1 focus:shadow-indigo-500/20 focus:ring-indigo-500"
          />
        </Recipe>

        <Recipe
          title="Toggle knob"
          classes="shadow-sm shadow-y-px shadow-zinc-900/20 shadows-3 shadows-scale-2"
        >
          <div className="flex h-7 w-12 items-center rounded-full bg-indigo-500 p-0.5 inset-shadow-sm inset-shadow-zinc-900/15">
            <div className="ml-auto size-6 rounded-full bg-white shadow-sm shadow-y-px shadow-zinc-900/20 shadows-3 shadows-scale-2" />
          </div>
        </Recipe>

        <Recipe
          title="Card"
          classes="shadow-sm shadow-y-px shadow-zinc-900/6 shadows-5 shadows-scale-2"
        >
          <div className="w-64 rounded-2xl bg-white p-5 shadow-sm shadow-y-px shadow-zinc-900/6 shadows-5 shadows-scale-2">
            <div className="mb-3 size-9 rounded-lg bg-indigo-100" />
            <p className="text-sm font-medium text-zinc-900">Monthly report</p>
            <p className="mt-1 text-sm text-zinc-500">Updated 2 hours ago</p>
          </div>
        </Recipe>

        <Recipe
          title="Dialog"
          classes="shadow-2xl shadow-zinc-900/10 -shadow-spread-2 shadows-3 shadows-scale-1.5"
        >
          <div className="w-72 rounded-2xl bg-white p-5 shadow-2xl shadow-zinc-900/10 -shadow-spread-2 shadows-3 shadows-scale-1.5 ring-1 ring-zinc-900/5">
            <p className="text-sm font-medium text-zinc-900">
              Delete this file?
            </p>
            <p className="mt-1 text-sm text-zinc-500">
              You cannot undo this action.
            </p>
            <div className="mt-4 flex justify-end gap-2 text-sm">
              <span className="rounded-md px-3 py-1.5 text-zinc-600">
                Cancel
              </span>
              <span className="rounded-md bg-rose-600 px-3 py-1.5 text-white shadow-sm shadow-y-px shadow-rose-700/30">
                Delete
              </span>
            </div>
          </div>
        </Recipe>

        <Recipe
          title="Toolbar"
          classes="shadow-lg shadow-y-2 shadow-black/30 shadows-3 shadows-scale-2 inset-shadow-2xs inset-shadow-white/10"
          dark
        >
          <div className="flex gap-1 rounded-full bg-zinc-800 p-1.5 shadow-lg shadow-y-2 shadow-black/30 shadows-3 shadows-scale-2 inset-shadow-2xs inset-shadow-white/10">
            {["B", "I", "U", "S"].map((letter, i) => (
              <span
                key={letter}
                className={
                  i === 0
                    ? "flex size-8 items-center justify-center rounded-full bg-zinc-700 text-xs font-medium text-white inset-shadow-2xs inset-shadow-white/15"
                    : "flex size-8 items-center justify-center rounded-full text-xs font-medium text-zinc-400"
                }
              >
                {letter}
              </span>
            ))}
          </div>
        </Recipe>

        <Recipe
          title="Retro card"
          classes="shadow-sm shadow-x-1.5 shadow-y-1.5 shadow-blur-0 shadow-zinc-900"
        >
          <div className="w-60 rounded-lg bg-amber-100 p-5 ring-1 ring-zinc-900 shadow-sm shadow-x-1.5 shadow-y-1.5 shadow-blur-0 shadow-zinc-900 transition-shadow hover:shadow-x-2.5 hover:shadow-y-2.5">
            <p className="text-sm font-semibold text-zinc-900">New feature</p>
            <p className="mt-1 text-sm text-zinc-700">
              Hard shadows with zero blur.
            </p>
          </div>
        </Recipe>
      </div>
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-20 scroll-mt-24" id={id}>
      <h2 className="text-xl font-semibold tracking-tight text-zinc-950">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl leading-7 text-zinc-500">{children}</p>
    </div>
  );
}
