import { Code, InlineCode } from "@/components/Code";
import { DocsPager } from "@/components/DocsPager";
import { Eyebrow, H1, H2, Lead, Note, P } from "@/components/Prose";
import { Swatch, SwatchGrid } from "@/components/Swatch";

export const metadata = { title: "Basic rules" };

export default function BasicsPage() {
  return (
    <>
      <Eyebrow>Start</Eyebrow>
      <H1>Basic rules</H1>
      <Lead>
        Learn these five rules first. Then all of the classes are easy to use.
      </Lead>

      <H2 id="size">1. Always add a shadow size class</H2>
      <P>
        The plugin classes change the values of a shadow. They do not make a
        shadow. Add a <InlineCode>shadow-&#123;size&#125;</InlineCode> class,
        for example <InlineCode>shadow-md</InlineCode>. Then add the plugin
        classes.
      </P>
      <SwatchGrid columns={2}>
        <Swatch
          label="No size class: no shadow"
          classes="shadow-y-4 shadow-blur-6"
        />
        <Swatch
          label="With a size class"
          classes="shadow-md shadow-y-4 shadow-blur-6"
        />
      </SwatchGrid>

      <H2 id="override">2. A plugin class replaces one value</H2>
      <P>
        Each size class sets default values for offset, blur, and spread. A
        plugin class replaces one of these values. The other values do not
        change.
      </P>
      <SwatchGrid>
        <Swatch label="Default" classes="shadow-xl shadow-zinc-900/15" />
        <Swatch
          label="Offset changed"
          classes="shadow-xl shadow-y-0 shadow-zinc-900/15"
        />
        <Swatch
          label="Blur changed"
          classes="shadow-xl shadow-blur-0 shadow-zinc-900/15"
        />
      </SwatchGrid>

      <H2 id="color">3. Color stays with Tailwind</H2>
      <P>
        Use the usual <InlineCode>shadow-&#123;color&#125;</InlineCode> classes
        to set the color. You can add an opacity modifier, for example{" "}
        <InlineCode>shadow-indigo-500/30</InlineCode>.
      </P>
      <SwatchGrid>
        <Swatch classes="shadow-lg shadow-y-4 shadow-indigo-500/30" />
        <Swatch classes="shadow-lg shadow-y-4 shadow-rose-500/30" />
        <Swatch classes="shadow-lg shadow-y-4 shadow-emerald-500/30" />
      </SwatchGrid>

      <H2 id="values">4. Use negative and arbitrary values</H2>
      <P>
        Put a minus sign before a class to use a negative value. Use square
        brackets to set a value that is not in the theme.
      </P>
      <SwatchGrid>
        <Swatch
          label="Negative offset"
          classes="shadow-lg -shadow-y-4 shadow-zinc-900/15"
        />
        <Swatch
          label="Arbitrary offset"
          classes="shadow-lg shadow-y-[18px] shadow-zinc-900/15"
        />
        <Swatch
          label="Arbitrary blur"
          classes="shadow-lg shadow-blur-[3px] shadow-zinc-900/20"
        />
      </SwatchGrid>

      <H2 id="variants">5. Use variants</H2>
      <P>
        All classes operate with Tailwind variants, for example{" "}
        <InlineCode>hover:</InlineCode> and <InlineCode>md:</InlineCode>. Move
        the pointer onto the shape below to see the hover state.
      </P>
      <SwatchGrid columns={2}>
        <Swatch
          label="Lift on hover"
          classes="shadow-md shadow-y-1 shadow-zinc-900/10 hover:shadow-y-6 hover:shadow-blur-10"
          shapeClassName="transition-shadow duration-300"
        />
        <Swatch
          label="Layers on hover"
          classes="shadow-sm shadow-zinc-900/10 hover:shadows-5 hover:shadows-scale-2"
          shapeClassName="transition-shadow duration-300"
        />
      </SwatchGrid>
      <Code title="HTML">{`
<div class="shadow-md shadow-y-1 transition-shadow hover:shadow-y-6 hover:shadow-blur-10">
  <!-- ... -->
</div>
`}</Code>

      <Note title="Tip">
        Add <InlineCode>transition-shadow</InlineCode> to animate changes
        between two shadow states.
      </Note>

      <DocsPager href="/docs/basics" />
    </>
  );
}
