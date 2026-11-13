import { InlineCode } from "@/components/Code";
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

export const metadata = { title: "Blur" };

export default function BlurPage() {
  return (
    <>
      <Eyebrow>Shadow parts</Eyebrow>
      <H1>Blur</H1>
      <Lead>
        The blur classes control the edge of the shadow. A low value makes a
        sharp edge. A high value makes a soft edge.
      </Lead>

      <H2 id="syntax">Class syntax</H2>
      <ClassTable
        rows={[
          { name: "shadow-blur-{value}", value: "Sets the blur radius." },
          {
            name: "shadow-blur-0",
            value: "Removes the blur. The edge is fully sharp.",
          },
          {
            name: "shadow-blur-[3px]",
            value: "Sets the blur radius to 3px (arbitrary value).",
          },
        ]}
      />

      <H2 id="scale">Blur scale</H2>
      <P>All shapes below have the same offset. Only the blur changes.</P>
      <SwatchGrid columns={4}>
        <Swatch classes="shadow-lg shadow-y-4 shadow-blur-0 shadow-zinc-900/15" />
        <Swatch classes="shadow-lg shadow-y-4 shadow-blur-2 shadow-zinc-900/15" />
        <Swatch classes="shadow-lg shadow-y-4 shadow-blur-4 shadow-zinc-900/15" />
        <Swatch classes="shadow-lg shadow-y-4 shadow-blur-6 shadow-zinc-900/15" />
        <Swatch classes="shadow-lg shadow-y-4 shadow-blur-8 shadow-zinc-900/15" />
        <Swatch classes="shadow-lg shadow-y-4 shadow-blur-10 shadow-zinc-900/15" />
        <Swatch classes="shadow-lg shadow-y-4 shadow-blur-12 shadow-zinc-900/15" />
        <Swatch classes="shadow-lg shadow-y-4 shadow-blur-16 shadow-zinc-900/15" />
      </SwatchGrid>

      <H2 id="hard">Hard shadows</H2>
      <P>
        Set the blur to zero and add an offset. This makes a flat, graphic
        shadow.
      </P>
      <SwatchGrid>
        <Swatch
          classes="shadow-sm shadow-x-1.5 shadow-y-1.5 shadow-blur-0 shadow-zinc-900"
          shapeClassName="ring-1 ring-zinc-900"
        />
        <Swatch
          classes="shadow-sm shadow-x-2 shadow-y-2 shadow-blur-0 shadow-indigo-500"
          shapeClassName="ring-1 ring-indigo-500"
        />
        <Swatch
          classes="shadow-sm shadow-x-0 shadow-y-1 shadow-blur-0 shadow-zinc-900/10"
          shapeClassName="ring-1 ring-zinc-900/10"
        />
      </SwatchGrid>

      <H2 id="theme">Theme values</H2>
      <P>
        Change the scale with{" "}
        <InlineCode>theme.extend.boxShadowBlur</InlineCode>.
      </P>
      <ThemeValues
        themeKey="boxShadowBlur"
        values={pluginTheme.boxShadowBlur}
      />

      <DocsPager href="/docs/blur" />
    </>
  );
}
