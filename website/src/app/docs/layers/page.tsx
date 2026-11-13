import Link from "next/link";
import { Code, InlineCode } from "@/components/Code";
import { DocsPager } from "@/components/DocsPager";
import {
  ClassTable,
  Eyebrow,
  H1,
  H2,
  Lead,
  List,
  Note,
  P,
  ThemeValues,
} from "@/components/Prose";
import { Swatch, SwatchGrid } from "@/components/Swatch";
import { pluginTheme } from "@/lib/pluginTheme";

export const metadata = { title: "Number of layers" };

export default function LayersPage() {
  return (
    <>
      <Eyebrow>Layers</Eyebrow>
      <H1>Number of layers</H1>
      <Lead>
        A layered shadow has many shadows on top of each other. Layers make
        shadows look smooth and natural. The plugin makes the layers for you
        with pure CSS.
      </Lead>

      <H2 id="syntax">Class syntax</H2>
      <ClassTable
        rows={[
          {
            name: "shadows-{2-8}",
            value: "Sets the total number of layers, including the base layer.",
          },
          { name: "shadows-3", value: "Adds 2 layers to the base layer." },
          { name: "shadows-8", value: "Adds 7 layers to the base layer." },
        ]}
      />

      <H2 id="base">The base layer</H2>
      <P>
        The first layer is the base layer. The size class and the offset, blur,
        and spread classes set its values. The plugin makes each new layer from
        the base layer.
      </P>
      <Code title="HTML">{`
<div class="shadow-sm shadow-zinc-900/10 shadows-5 shadows-scale-2">
  <!-- ... -->
</div>
`}</Code>

      <H2 id="copies">Layers without scale</H2>
      <P>
        Without a scale class, each layer is a copy of the base layer. The
        shadow only becomes darker.
      </P>
      <SwatchGrid columns={4}>
        <Swatch classes="shadow-sm shadow-zinc-900/10" />
        <Swatch classes="shadow-sm shadow-zinc-900/10 shadows-3" />
        <Swatch classes="shadow-sm shadow-zinc-900/10 shadows-5" />
        <Swatch classes="shadow-sm shadow-zinc-900/10 shadows-8" />
      </SwatchGrid>

      <H2 id="scaled">Layers with scale</H2>
      <P>
        Add a{" "}
        <Link href="/docs/scale" className="text-indigo-600 hover:underline">
          scale class
        </Link>
        . Each layer then becomes larger than the last layer. This is the usual
        way to use layers.
      </P>
      <SwatchGrid columns={4}>
        <Swatch classes="shadow-sm shadow-zinc-900/10 shadows-2 shadows-scale-2" />
        <Swatch classes="shadow-sm shadow-zinc-900/10 shadows-4 shadows-scale-2" />
        <Swatch classes="shadow-sm shadow-zinc-900/10 shadows-6 shadows-scale-2" />
        <Swatch classes="shadow-sm shadow-zinc-900/10 shadows-8 shadows-scale-2" />
      </SwatchGrid>

      <H2 id="compare">Compare with one shadow</H2>
      <P>
        The two shapes have a shadow of almost the same size. The layered shadow
        has a darker center and a softer edge.
      </P>
      <SwatchGrid columns={2}>
        <Swatch label="One shadow" classes="shadow-2xl shadow-zinc-900/20" />
        <Swatch
          label="Five layers"
          classes="shadow-sm shadow-y-0.5 shadow-blur-0.5 shadow-zinc-900/7 shadows-5 shadows-scale-2.25"
        />
      </SwatchGrid>

      <H2 id="tips">Tips</H2>
      <List>
        <li>
          More layers make a darker shadow. Decrease the opacity of the shadow
          color to balance this.
        </li>
        <li>
          Each layer comes from the base layer. Keep the base layer small. Use{" "}
          <InlineCode>shadow-sm</InlineCode> and not{" "}
          <InlineCode>shadow-xl</InlineCode>.
        </li>
        <li>
          Use small offset and blur values on the base layer, for example{" "}
          <InlineCode>shadow-y-px</InlineCode>.
        </li>
      </List>

      <Note>
        If a theme shadow has more than one shadow, the last shadow becomes the
        base layer. The other shadows do not change.
      </Note>

      <H2 id="theme">Theme values</H2>
      <P>
        Change the scale with{" "}
        <InlineCode>theme.extend.boxShadowLayers</InlineCode>.
      </P>
      <ThemeValues
        themeKey="boxShadowLayers"
        values={pluginTheme.boxShadowLayers}
      />

      <DocsPager href="/docs/layers" />
    </>
  );
}
