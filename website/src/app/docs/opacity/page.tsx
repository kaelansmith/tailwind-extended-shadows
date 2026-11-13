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

export const metadata = { title: "Opacity" };

export default function OpacityPage() {
  return (
    <>
      <Eyebrow>Shadow parts</Eyebrow>
      <H1>Opacity</H1>
      <Lead>
        The opacity classes change the opacity of the shadow color. The color
        itself does not change.
      </Lead>

      <H2 id="syntax">Class syntax</H2>
      <ClassTable
        rows={[
          {
            name: "shadow-opacity-{value}",
            value: "Sets the opacity from 0 to 100.",
          },
          {
            name: "shadow-opacity-0",
            value: "Makes the shadow fully transparent.",
          },
          {
            name: "shadow-opacity-100",
            value: "Makes the shadow fully opaque.",
          },
        ]}
      />

      <H2 id="why">When to use it</H2>
      <P>
        Use this class when you want to change the opacity in one state only.
        You do not have to write the color again.
      </P>
      <Code title="HTML">{`
<!-- The color is set one time. Only the opacity changes on hover. -->
<button class="shadow-lg shadow-indigo-600 shadow-opacity-20 hover:shadow-opacity-40">
  Save
</button>
`}</Code>

      <H2 id="scale">Opacity scale</H2>
      <SwatchGrid columns={4}>
        <Swatch classes="shadow-lg shadow-y-4 shadow-indigo-600 shadow-opacity-10" />
        <Swatch classes="shadow-lg shadow-y-4 shadow-indigo-600 shadow-opacity-25" />
        <Swatch classes="shadow-lg shadow-y-4 shadow-indigo-600 shadow-opacity-50" />
        <Swatch classes="shadow-lg shadow-y-4 shadow-indigo-600 shadow-opacity-100" />
      </SwatchGrid>

      <H2 id="hover">Opacity on hover</H2>
      <P>Move the pointer onto the shapes below.</P>
      <SwatchGrid columns={2}>
        <Swatch
          classes="shadow-lg shadow-y-4 shadow-indigo-600 shadow-opacity-15 hover:shadow-opacity-50"
          shapeClassName="transition-shadow duration-300"
        />
        <Swatch
          classes="shadow-lg shadow-y-4 shadow-rose-600 shadow-opacity-0 hover:shadow-opacity-40"
          shapeClassName="transition-shadow duration-300"
        />
      </SwatchGrid>

      <H2 id="theme">Theme values</H2>
      <P>
        The default scale goes from 0 to 100 in steps of 5. Change it with{" "}
        <InlineCode>theme.extend.boxShadowOpacity</InlineCode>.
      </P>
      <ThemeValues
        themeKey="boxShadowOpacity"
        values={pluginTheme.boxShadowOpacity}
      />

      <DocsPager href="/docs/opacity" />
    </>
  );
}
