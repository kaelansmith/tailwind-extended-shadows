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

export const metadata = { title: "Offset" };

export default function OffsetPage() {
  return (
    <>
      <Eyebrow>Shadow parts</Eyebrow>
      <H1>Offset</H1>
      <Lead>
        The offset classes move the shadow. Use them to show the direction of
        the light.
      </Lead>

      <H2 id="syntax">Class syntax</H2>
      <ClassTable
        rows={[
          { name: "shadow-x-{value}", value: "Moves the shadow to the right." },
          { name: "-shadow-x-{value}", value: "Moves the shadow to the left." },
          { name: "shadow-y-{value}", value: "Moves the shadow down." },
          { name: "-shadow-y-{value}", value: "Moves the shadow up." },
          {
            name: "shadow-y-[3px]",
            value: "Moves the shadow down by 3px (arbitrary value).",
          },
        ]}
      />

      <H2 id="vertical">Vertical offset</H2>
      <P>
        Increase the y offset to make the element look higher above the page.
      </P>
      <SwatchGrid columns={4}>
        <Swatch classes="shadow-lg shadow-y-0 shadow-zinc-900/15" />
        <Swatch classes="shadow-lg shadow-y-2 shadow-zinc-900/15" />
        <Swatch classes="shadow-lg shadow-y-5 shadow-zinc-900/15" />
        <Swatch classes="shadow-lg shadow-y-8 shadow-zinc-900/15" />
      </SwatchGrid>

      <H2 id="horizontal">Horizontal offset</H2>
      <P>Use the x offset when the light comes from one side.</P>
      <SwatchGrid columns={4}>
        <Swatch classes="shadow-lg -shadow-x-6 shadow-y-2 shadow-zinc-900/15" />
        <Swatch classes="shadow-lg -shadow-x-2 shadow-y-2 shadow-zinc-900/15" />
        <Swatch classes="shadow-lg shadow-x-2 shadow-y-2 shadow-zinc-900/15" />
        <Swatch classes="shadow-lg shadow-x-6 shadow-y-2 shadow-zinc-900/15" />
      </SwatchGrid>

      <H2 id="light">Light direction</H2>
      <P>
        Each shape below has a light source in a different position. The shadow
        always moves away from the light.
      </P>
      <div className="my-8 grid max-w-xl grid-cols-3 gap-4">
        <LightCell
          label="Top left"
          classes="shadow-lg shadow-x-4 shadow-y-4 shadow-zinc-900/15"
        />
        <LightCell
          label="Top"
          classes="shadow-lg shadow-x-0 shadow-y-4 shadow-zinc-900/15"
        />
        <LightCell
          label="Top right"
          classes="shadow-lg -shadow-x-4 shadow-y-4 shadow-zinc-900/15"
        />
        <LightCell
          label="Left"
          classes="shadow-lg shadow-x-4 shadow-y-0 shadow-zinc-900/15"
        />
        <LightCell
          label="Above"
          classes="shadow-lg shadow-x-0 shadow-y-0 shadow-zinc-900/15"
        />
        <LightCell
          label="Right"
          classes="shadow-lg -shadow-x-4 shadow-y-0 shadow-zinc-900/15"
        />
        <LightCell
          label="Bottom left"
          classes="shadow-lg shadow-x-4 -shadow-y-4 shadow-zinc-900/15"
        />
        <LightCell
          label="Bottom"
          classes="shadow-lg shadow-x-0 -shadow-y-4 shadow-zinc-900/15"
        />
        <LightCell
          label="Bottom right"
          classes="shadow-lg -shadow-x-4 -shadow-y-4 shadow-zinc-900/15"
        />
      </div>

      <H2 id="theme">Theme values</H2>
      <P>
        The x and y classes use the same scale. Change it with{" "}
        <InlineCode>theme.extend.boxShadowOffset</InlineCode>.
      </P>
      <ThemeValues
        themeKey="boxShadowOffset"
        values={pluginTheme.boxShadowOffset}
      />

      <DocsPager href="/docs/offset" />
    </>
  );
}

function LightCell({ label, classes }: { label: string; classes: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl bg-zinc-100/70 p-6">
      <div className={`size-14 rounded-xl bg-white ${classes}`} />
      <span className="text-xs text-zinc-500">{label}</span>
    </div>
  );
}
