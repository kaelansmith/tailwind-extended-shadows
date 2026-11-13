import { Code, InlineCode } from "@/components/Code";
import { DocsPager } from "@/components/DocsPager";
import { ClassTable, Eyebrow, H1, H2, Lead, Note, P } from "@/components/Prose";

export const metadata = { title: "Theme values" };

export default function ThemePage() {
  return (
    <>
      <Eyebrow>More</Eyebrow>
      <H1>Theme values</H1>
      <Lead>
        Each class group reads its values from the Tailwind theme. Add or change
        values in your Tailwind configuration file.
      </Lead>

      <H2 id="keys">Theme keys</H2>
      <ClassTable
        rows={[
          {
            name: "boxShadowOffset",
            value: "shadow-x-*, shadow-y-*, and the inset versions.",
          },
          {
            name: "boxShadowBlur",
            value: "shadow-blur-* and inset-shadow-blur-*.",
          },
          {
            name: "boxShadowSpread",
            value: "shadow-spread-* and inset-shadow-spread-*.",
          },
          {
            name: "boxShadowOpacity",
            value: "shadow-opacity-* and inset-shadow-opacity-*.",
          },
          { name: "boxShadowLayers", value: "shadows-* and inset-shadows-*." },
          {
            name: "boxShadowLayersScale",
            value: "shadows-scale-* and inset-shadows-scale-*.",
          },
          { name: "insetBoxShadow", value: "inset-shadow-{size}." },
          {
            name: "boxShadow",
            value: "shadow-{size}. This is the usual Tailwind key.",
          },
          {
            name: "boxShadowColor",
            value: "shadow-{color} and inset-shadow-{color}.",
          },
        ]}
      />

      <H2 id="extend">Add values</H2>
      <P>
        Use <InlineCode>theme.extend</InlineCode> to add values. The default
        values stay available.
      </P>
      <Code title="tailwind.config.js">{`
module.exports = {
  theme: {
    extend: {
      boxShadowOffset: {
        10: "2.5rem",
        12: "3rem",
      },
      boxShadowLayers: {
        10: "10",
      },
    },
  },
  plugins: [require("tailwind-extended-shadows")],
};
`}</Code>

      <H2 id="replace">Replace values</H2>
      <P>
        Put a key directly in <InlineCode>theme</InlineCode> to replace all of
        its default values.
      </P>
      <Code title="tailwind.config.js">{`
module.exports = {
  theme: {
    // Only these three blur classes will exist.
    boxShadowBlur: {
      sm: "4px",
      md: "12px",
      lg: "24px",
    },
  },
  plugins: [require("tailwind-extended-shadows")],
};
`}</Code>

      <H2 id="custom-size">Custom shadow sizes</H2>
      <P>
        You can add your own <InlineCode>boxShadow</InlineCode> sizes. The
        plugin reads each value and makes it a base shadow. If a value has more
        than one shadow, the last shadow becomes the base layer.
      </P>
      <Code title="tailwind.config.js">{`
module.exports = {
  theme: {
    extend: {
      boxShadow: {
        card: "0 0 0 1px rgb(0 0 0 / 0.05), 0 2px 4px 0 rgb(0 0 0 / 0.08)",
      },
    },
  },
};
`}</Code>
      <P>
        With this value, <InlineCode>shadow-card shadow-y-2</InlineCode> changes
        the second shadow only. The 1px outline does not change.
      </P>

      <Note>
        A shadow value must use lengths and an RGB, RGBA, or hex color. A value
        that mixes inset and outer shadows is not supported.
      </Note>

      <DocsPager href="/docs/theme" />
    </>
  );
}
