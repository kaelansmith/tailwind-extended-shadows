import { Code, InlineCode } from "@/components/Code";
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

export const metadata = { title: "Layer scale" };

export default function ScalePage() {
  return (
    <>
      <Eyebrow>Layers</Eyebrow>
      <H1>Layer scale</H1>
      <Lead>
        The scale classes make each layer larger than the last layer. Use them
        with a <InlineCode>shadows-&#123;n&#125;</InlineCode> class.
      </Lead>

      <H2 id="syntax">Class syntax</H2>
      <ClassTable
        rows={[
          {
            name: "shadows-scale-{value}",
            value: "Sets the multiplier for each new layer.",
          },
          {
            name: "shadows-scale-1",
            value: "All layers are the same as the base layer.",
          },
          {
            name: "shadows-scale-2",
            value: "Each layer is two times larger than the last layer.",
          },
        ]}
      />

      <H2 id="math">How the scale operates</H2>
      <P>
        The plugin multiplies the base x offset, y offset, and blur by the
        scale. It does this one more time for each new layer. The spread does
        not change.
      </P>
      <Code title="shadows-5 shadows-scale-2">{`
0px  1px  1px 0px rgb(0 0 0 / 0.1)   /* base layer   */
0px  2px  2px 0px rgb(0 0 0 / 0.1)   /* base × 2     */
0px  4px  4px 0px rgb(0 0 0 / 0.1)   /* base × 2 × 2 */
0px  8px  8px 0px rgb(0 0 0 / 0.1)   /* base × 2³    */
0px 16px 16px 0px rgb(0 0 0 / 0.1)   /* base × 2⁴    */
`}</Code>

      <H2 id="scale">Scale values</H2>
      <P>All shapes below have five layers. Only the scale changes.</P>
      <SwatchGrid columns={4}>
        <Swatch classes="shadow-sm shadow-zinc-900/10 shadows-5 shadows-scale-1" />
        <Swatch classes="shadow-sm shadow-zinc-900/10 shadows-5 shadows-scale-1.5" />
        <Swatch classes="shadow-sm shadow-zinc-900/10 shadows-5 shadows-scale-2" />
        <Swatch classes="shadow-sm shadow-zinc-900/10 shadows-5 shadows-scale-2.5" />
      </SwatchGrid>

      <H2 id="direction">Scale and direction</H2>
      <P>
        The scale also multiplies the x offset. A side offset therefore becomes
        longer in each layer.
      </P>
      <SwatchGrid>
        <Swatch classes="shadow-sm shadow-x-px shadow-y-px shadow-zinc-900/10 shadows-6 shadows-scale-2" />
        <Swatch classes="shadow-sm -shadow-x-px shadow-y-px shadow-zinc-900/10 shadows-6 shadows-scale-2" />
        <Swatch classes="shadow-sm -shadow-y-px shadow-zinc-900/10 shadows-6 shadows-scale-2" />
      </SwatchGrid>

      <Note title="Caution">
        High scale values with many layers make very large shadows. Start with a
        scale of 2 or less. Then increase it in small steps.
      </Note>

      <H2 id="theme">Theme values</H2>
      <P>
        The default scale goes from 1 to 5 in steps of 0.25. Change it with{" "}
        <InlineCode>theme.extend.boxShadowLayersScale</InlineCode>.
      </P>
      <ThemeValues
        themeKey="boxShadowLayersScale"
        values={pluginTheme.boxShadowLayersScale}
      />

      <DocsPager href="/docs/scale" />
    </>
  );
}
