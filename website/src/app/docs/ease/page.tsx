import { Code, InlineCode } from "@/components/Code";
import { DocsPager } from "@/components/DocsPager";
import { ClassTable, Eyebrow, H1, H2, Lead, Note, P } from "@/components/Prose";
import { Swatch, SwatchGrid } from "@/components/Swatch";

export const metadata = { title: "Layer ease" };

export default function EasePage() {
  return (
    <>
      <Eyebrow>Layers</Eyebrow>
      <H1>Layer ease</H1>
      <Lead>
        The ease classes change how the layers increase in size. The increase is
        then less linear and more smooth.
      </Lead>

      <H2 id="syntax">Class syntax</H2>
      <ClassTable
        rows={[
          {
            name: "shadows-ease-in",
            value:
              "The layers increase slowly at first. Then they increase quickly.",
          },
          {
            name: "shadows-ease-out",
            value:
              "The layers increase quickly at first. Then they increase slowly.",
          },
        ]}
      />

      <H2 id="usage">How to use</H2>
      <P>
        Put the ease class on the same element as a{" "}
        <InlineCode>shadows-&#123;n&#125;</InlineCode> class. An ease class has
        no effect without it.
      </P>
      <Code title="HTML">{`
<div class="shadow-md shadows-6 shadows-scale-1.5 shadows-ease-in">
  <!-- ... -->
</div>
`}</Code>

      <H2 id="compare">Compare</H2>
      <P>
        All shapes below have six layers with the same base layer and scale.
        Only the ease changes.
      </P>
      <SwatchGrid>
        <Swatch
          label="No ease"
          classes="shadow-md shadow-y-2 shadow-blur-3 shadow-zinc-900/10 shadows-6 shadows-scale-1.5"
        />
        <Swatch
          label="Ease in"
          classes="shadow-md shadow-y-2 shadow-blur-3 shadow-zinc-900/10 shadows-6 shadows-scale-1.5 shadows-ease-in"
        />
        <Swatch
          label="Ease out"
          classes="shadow-md shadow-y-2 shadow-blur-3 shadow-zinc-900/10 shadows-6 shadows-scale-1.5 shadows-ease-out"
        />
      </SwatchGrid>

      <Note>
        The ease effect is small when the base values are small. Use a larger
        offset, blur, or scale to see a clear difference.
      </Note>

      <P>
        The ease classes use quadratic math only. CSS cannot do more complex
        math. Thus you cannot change these classes in the theme.
      </P>

      <DocsPager href="/docs/ease" />
    </>
  );
}
