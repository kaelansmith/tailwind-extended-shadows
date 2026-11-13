import { Code, InlineCode } from "@/components/Code";
import { DocsPager } from "@/components/DocsPager";
import {
  ClassTable,
  Eyebrow,
  H1,
  H2,
  Lead,
  P,
  ThemeValues,
} from "@/components/Prose";
import { Swatch, SwatchGrid } from "@/components/Swatch";
import { pluginTheme } from "@/lib/pluginTheme";

export const metadata = { title: "Inset shadows" };

export default function InsetPage() {
  return (
    <>
      <Eyebrow>More</Eyebrow>
      <H1>Inset shadows</H1>
      <Lead>
        Each outer shadow class has an inset version. The inset classes use the
        same names as Tailwind CSS v4.
      </Lead>

      <H2 id="map">Outer and inset classes</H2>
      <P>
        Add <InlineCode>inset-</InlineCode> before an outer class to get the
        inset version.
      </P>
      <ClassTable
        rows={[
          {
            name: "inset-shadow-{size}",
            value: "Sets the inset base shadow. Same as shadow-{size}.",
          },
          { name: "inset-shadow-{color}", value: "Sets the inset color." },
          {
            name: "inset-shadow-x-*, inset-shadow-y-*",
            value: "Moves the inset shadow.",
          },
          { name: "inset-shadow-blur-*", value: "Sets the inset blur." },
          { name: "inset-shadow-spread-*", value: "Sets the inset spread." },
          { name: "inset-shadow-opacity-*", value: "Sets the inset opacity." },
          { name: "inset-shadows-{n}", value: "Adds inset layers." },
          {
            name: "inset-shadows-scale-*",
            value: "Sets the inset layer scale.",
          },
          {
            name: "inset-shadows-ease-{in,out}",
            value: "Sets the inset layer ease.",
          },
        ]}
      />

      <H2 id="sizes">Base sizes</H2>
      <P>
        An inset size class is necessary. The other inset classes have no effect
        without it.
      </P>
      <ClassTable
        rows={[
          {
            name: "inset-shadow",
            value: "inset 0 2px 4px 0. Same as inset-shadow-sm.",
          },
          {
            name: "inset-shadow-2xs",
            value: "inset 0 1px 0 0. A 1px line at the top edge.",
          },
          { name: "inset-shadow-xs", value: "inset 0 1px 1px 0." },
          { name: "inset-shadow-sm", value: "inset 0 2px 4px 0." },
          {
            name: "inset-shadow-none",
            value: "Removes the inset shadow only.",
          },
        ]}
      />
      <SwatchGrid columns={4}>
        <Swatch
          classes="inset-shadow-2xs inset-shadow-zinc-900/20"
          shapeClassName="bg-zinc-100"
        />
        <Swatch
          classes="inset-shadow-xs inset-shadow-zinc-900/20"
          shapeClassName="bg-zinc-100"
        />
        <Swatch
          classes="inset-shadow-sm inset-shadow-zinc-900/20"
          shapeClassName="bg-zinc-100"
        />
        <Swatch
          classes="inset-shadow-sm inset-shadow-y-1 inset-shadow-blur-3 inset-shadow-zinc-900/25"
          shapeClassName="bg-zinc-100"
        />
      </SwatchGrid>

      <H2 id="highlight">Top edge highlight</H2>
      <P>
        Use <InlineCode>inset-shadow-2xs</InlineCode> with a light color. This
        adds a thin highlight to dark surfaces.
      </P>
      <SwatchGrid>
        <Swatch dark classes="inset-shadow-2xs inset-shadow-white/10" />
        <Swatch dark classes="inset-shadow-2xs inset-shadow-white/25" />
        <Swatch
          dark
          classes="inset-shadow-2xs inset-shadow-white/25 shadow-lg shadow-black/40"
        />
      </SwatchGrid>

      <H2 id="together">Outer and inset together</H2>
      <P>
        The outer and inset shadows use different CSS variables. You can use
        them on the same element. One does not replace the other.
      </P>
      <SwatchGrid columns={2}>
        <Swatch
          classes="shadow-lg shadow-y-3 shadow-indigo-600/30 inset-shadow-2xs inset-shadow-white/40"
          shapeClassName="bg-indigo-500"
        />
        <Swatch classes="shadow-sm shadow-zinc-900/10 shadows-4 shadows-scale-2 inset-shadow-sm inset-shadow-zinc-900/10" />
      </SwatchGrid>

      <H2 id="layers">Inset layers</H2>
      <SwatchGrid>
        <Swatch
          classes="inset-shadow-sm inset-shadow-zinc-900/10"
          shapeClassName="bg-zinc-100"
        />
        <Swatch
          classes="inset-shadow-sm inset-shadow-zinc-900/10 inset-shadows-3 inset-shadows-scale-2"
          shapeClassName="bg-zinc-100"
        />
        <Swatch
          classes="inset-shadow-sm inset-shadow-zinc-900/10 inset-shadows-5 inset-shadows-scale-2 inset-shadows-ease-out"
          shapeClassName="bg-zinc-100"
        />
      </SwatchGrid>

      <H2 id="clear">Remove shadows</H2>
      <P>
        <InlineCode>shadow-none</InlineCode> removes the outer shadow only.{" "}
        <InlineCode>inset-shadow-none</InlineCode> removes the inset shadow
        only. The Tailwind v3 <InlineCode>shadow-inner</InlineCode> class is an
        inset shadow. Thus <InlineCode>inset-shadow-none</InlineCode> also
        removes it.
      </P>
      <Code title="HTML">{`
<!-- Remove the inset shadow at the md breakpoint. Keep the outer shadow. -->
<div class="shadow-md inset-shadow-sm md:inset-shadow-none">
  <!-- ... -->
</div>
`}</Code>

      <H2 id="theme">Theme values</H2>
      <P>
        Change the sizes with{" "}
        <InlineCode>theme.extend.insetBoxShadow</InlineCode>. The other inset
        classes use the same scales as the outer classes.
      </P>
      <ThemeValues
        themeKey="insetBoxShadow"
        values={pluginTheme.insetBoxShadow}
      />

      <DocsPager href="/docs/inset" />
    </>
  );
}
