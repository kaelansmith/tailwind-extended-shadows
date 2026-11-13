import { InlineCode } from "@/components/Code";
import { DocsPager } from "@/components/DocsPager";
import {
  ClassTable,
  Eyebrow,
  H1,
  H2,
  Lead,
  Note,
  P,
  ThemeValues,
} from "@/components/Prose";
import { Swatch, SwatchGrid } from "@/components/Swatch";
import { pluginTheme } from "@/lib/pluginTheme";

export const metadata = { title: "Spread" };

export default function SpreadPage() {
  return (
    <>
      <Eyebrow>Shadow parts</Eyebrow>
      <H1>Spread</H1>
      <Lead>
        The spread classes make the shadow larger or smaller on all sides.
      </Lead>

      <H2 id="syntax">Class syntax</H2>
      <ClassTable
        rows={[
          { name: "shadow-spread-{value}", value: "Makes the shadow larger." },
          {
            name: "-shadow-spread-{value}",
            value: "Makes the shadow smaller.",
          },
          {
            name: "shadow-spread-[3px]",
            value: "Makes the shadow 3px larger (arbitrary value).",
          },
        ]}
      />

      <H2 id="scale">Spread scale</H2>
      <P>
        All shapes below have the same offset and blur. Only the spread changes.
      </P>
      <SwatchGrid columns={4}>
        <Swatch classes="shadow-lg shadow-y-6 shadow-blur-8 -shadow-spread-4 shadow-zinc-900/20" />
        <Swatch classes="shadow-lg shadow-y-6 shadow-blur-8 -shadow-spread-2 shadow-zinc-900/20" />
        <Swatch classes="shadow-lg shadow-y-6 shadow-blur-8 shadow-spread-0 shadow-zinc-900/20" />
        <Swatch classes="shadow-lg shadow-y-6 shadow-blur-8 shadow-spread-2 shadow-zinc-900/20" />
      </SwatchGrid>

      <H2 id="below">A shadow below the element only</H2>
      <P>
        Use a negative spread with a large y offset. The shadow then shows below
        the element and not on the sides.
      </P>
      <SwatchGrid columns={2}>
        <Swatch
          label="Shadow on all sides"
          classes="shadow-xl shadow-y-6 shadow-zinc-900/20"
        />
        <Swatch
          label="Shadow below only"
          classes="shadow-xl shadow-y-6 -shadow-spread-3 shadow-zinc-900/20"
        />
      </SwatchGrid>

      <H2 id="outline">Outlines</H2>
      <P>
        Set the offset and blur to zero. The spread then makes a line around the
        element.
      </P>
      <SwatchGrid>
        <Swatch classes="shadow-sm shadow-y-0 shadow-blur-0 shadow-spread-px shadow-zinc-900/10" />
        <Swatch classes="shadow-sm shadow-y-0 shadow-blur-0 shadow-spread-1 shadow-indigo-500/30" />
        <Swatch classes="shadow-sm shadow-y-0 shadow-blur-0 shadow-spread-2 shadow-amber-400/50" />
      </SwatchGrid>

      <Note>
        The spread stays the same in all layers. The{" "}
        <InlineCode>shadows-scale-*</InlineCode> classes do not change it.
      </Note>

      <H2 id="theme">Theme values</H2>
      <P>
        Change the scale with{" "}
        <InlineCode>theme.extend.boxShadowSpread</InlineCode>.
      </P>
      <ThemeValues
        themeKey="boxShadowSpread"
        values={pluginTheme.boxShadowSpread}
      />

      <DocsPager href="/docs/spread" />
    </>
  );
}
