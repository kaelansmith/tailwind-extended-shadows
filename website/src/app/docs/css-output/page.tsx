import { Code, InlineCode } from "@/components/Code";
import { DocsPager } from "@/components/DocsPager";
import { ClassTable, Eyebrow, H1, H2, Lead, Note, P } from "@/components/Prose";

export const metadata = { title: "CSS output" };

export default function CssOutputPage() {
  return (
    <>
      <Eyebrow>More</Eyebrow>
      <H1>CSS output</H1>
      <Lead>
        The plugin uses CSS custom properties. Each class sets one property. The{" "}
        <InlineCode>box-shadow</InlineCode> value reads all of them.
      </Lead>

      <H2 id="variables">Custom properties</H2>
      <ClassTable
        rows={[
          {
            name: "--tw-sx",
            value: "Set by shadow-{size} and shadow-x-*.",
          },
          {
            name: "--tw-sy",
            value: "Set by shadow-{size} and shadow-y-*.",
          },
          {
            name: "--tw-sb",
            value: "Set by shadow-{size} and shadow-blur-*.",
          },
          {
            name: "--tw-ss",
            value: "Set by shadow-{size} and shadow-spread-*.",
          },
          { name: "--tw-shadow-color", value: "Set by shadow-{color}." },
          {
            name: "--tw-so",
            value: "Set by shadow-{color} and shadow-opacity-*.",
          },
          { name: "--tw-sl", value: "Set by shadows-{n}." },
          { name: "--tw-sm", value: "Set by shadows-scale-*." },
        ]}
      />
      <P>
        The inset classes use the same properties with an{" "}
        <InlineCode>--tw-inset-</InlineCode> prefix.
      </P>

      <H2 id="size">A size class</H2>
      <P>
        A size class sets the default values. Then it builds the base layer from
        the properties.
      </P>
      <Code title="CSS">{`
.shadow-lg {
  --tw-sx: 0px;
  --tw-sy: 4px;
  --tw-sb: 6px;
  --tw-ss: -4px;
  --tw-so: 1;
  --tw-sl: 0 0 #0000;
  --tw-sm: 1;
  --tw-slb:
    0px 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / 0.1)),
    var(--tw-sx) var(--tw-sy) var(--tw-sb)
      var(--tw-ss) var(--tw-shadow-color, rgb(0 0 0 / 0.1));
  --tw-shadow: var(--tw-slb);
  box-shadow:
    var(--tw-inset-shadow, 0 0 #0000), var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow, 0 0 #0000);
}
`}</Code>

      <H2 id="part">A part class</H2>
      <P>
        A part class sets one property only. It comes after the size class in
        the CSS. Thus it replaces the default value.
      </P>
      <Code title="CSS">{`
.shadow-y-2 {
  --tw-sy: 0.5rem;
}
.shadow-blur-4 {
  --tw-sb: 1rem;
}
.shadow-zinc-900\\/15 {
  --tw-shadow-color: rgb(24 24 27 / var(--tw-so, 0.15));
  --tw-so: 0.15;
}
`}</Code>

      <H2 id="layers">A layer class</H2>
      <P>
        A layer class adds one <InlineCode>calc()</InlineCode> shadow for each
        new layer. Each layer multiplies the base values by the multiplier one
        more time.
      </P>
      <Code title="CSS">{`
.shadows-3 {
  --tw-sm: 1;
  --tw-sl:
    calc(var(--tw-sx) * var(--tw-sm))
      calc(var(--tw-sy) * var(--tw-sm))
      calc(var(--tw-sb) * var(--tw-sm))
      var(--tw-ss) var(--tw-shadow-color, rgb(0 0 0 / 0.1)),
    calc(var(--tw-sx) * var(--tw-sm) * var(--tw-sm))
      calc(var(--tw-sy) * var(--tw-sm) * var(--tw-sm))
      calc(var(--tw-sb) * var(--tw-sm) * var(--tw-sm))
      var(--tw-ss) var(--tw-shadow-color, rgb(0 0 0 / 0.1));
  --tw-shadow: var(--tw-slb), var(--tw-sl);
}
.shadows-scale-2 {
  --tw-sm: 2;
}
`}</Code>

      <Note title="File size">
        The plugin makes your CSS file larger. Layer classes with the ease
        classes add the most CSS. For most sites, the difference is small.
      </Note>

      <DocsPager href="/docs/css-output" />
    </>
  );
}
