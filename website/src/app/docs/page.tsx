import Link from "next/link";
import { Code, InlineCode } from "@/components/Code";
import { DocsPager } from "@/components/DocsPager";
import { ClassTable, Eyebrow, H1, H2, Lead, Note, P } from "@/components/Prose";
import { Swatch, SwatchGrid } from "@/components/Swatch";

export const metadata = { title: "Install" };

export default function InstallPage() {
  return (
    <>
      <Eyebrow>Start</Eyebrow>
      <H1>Install</H1>
      <Lead>
        Tailwind Extended Shadows is a plugin for Tailwind CSS v3. It adds
        utility classes that control each part of a box shadow.
      </Lead>

      <H2 id="step-1">1. Install the package</H2>
      <P>Install the package from npm.</P>
      <Code title="Terminal">npm install tailwind-extended-shadows</Code>

      <H2 id="step-2">2. Add the plugin</H2>
      <P>
        Add the plugin to the <InlineCode>plugins</InlineCode> list in your
        Tailwind configuration file.
      </P>
      <Code title="tailwind.config.js">{`
module.exports = {
  // ...
  plugins: [require("tailwind-extended-shadows")],
};
`}</Code>

      <H2 id="step-3">3. Use the classes</H2>
      <P>
        Add a Tailwind shadow size class to an element. Then add one or more
        plugin classes to change the shadow.
      </P>
      <Code title="HTML">{`
<div class="shadow-lg shadow-y-6 shadow-blur-8 shadow-zinc-900/15">
  <!-- ... -->
</div>
`}</Code>
      <SwatchGrid columns={2}>
        <Swatch label="Tailwind only" classes="shadow-lg shadow-zinc-900/15" />
        <Swatch
          label="With plugin classes"
          classes="shadow-lg shadow-y-6 shadow-blur-8 shadow-zinc-900/15"
        />
      </SwatchGrid>

      <H2 id="classes">Class groups</H2>
      <P>The plugin adds these class groups.</P>
      <ClassTable
        rows={[
          {
            name: "shadow-x-*, shadow-y-*",
            value: "Move the shadow horizontally or vertically.",
          },
          {
            name: "shadow-blur-*",
            value: "Make the shadow edge sharp or soft.",
          },
          {
            name: "shadow-spread-*",
            value: "Make the shadow larger or smaller.",
          },
          {
            name: "shadow-opacity-*",
            value: "Change the opacity. The color stays the same.",
          },
          { name: "shadows-*", value: "Add more layers to the shadow." },
          {
            name: "shadows-scale-*",
            value: "Make each layer larger than the last layer.",
          },
          {
            name: "shadows-ease-in, shadows-ease-out",
            value: "Change how the layers increase in size.",
          },
          {
            name: "inset-shadow-*",
            value: "Do all of the above for inset shadows.",
          },
        ]}
      />

      <Note>
        This version supports Tailwind CSS v3 only. The plugin replaces the
        Tailwind <InlineCode>boxShadow</InlineCode> and{" "}
        <InlineCode>boxShadowColor</InlineCode> core plugins. The{" "}
        <InlineCode>shadow-&#123;size&#125;</InlineCode> and{" "}
        <InlineCode>shadow-&#123;color&#125;</InlineCode> classes continue to
        operate as usual.
      </Note>

      <P>
        Read the{" "}
        <Link href="/docs/basics" className="text-indigo-600 hover:underline">
          basic rules
        </Link>{" "}
        next. They tell you how the classes operate together.
      </P>

      <DocsPager href="/docs" />
    </>
  );
}
