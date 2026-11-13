import { Code, InlineCode } from "@/components/Code";
import { DocsPager } from "@/components/DocsPager";
import { Eyebrow, H1, H2, Lead, P } from "@/components/Prose";
import { site } from "@/lib/site";

export const metadata = { title: "tailwind-merge" };

export default function TailwindMergePage() {
  return (
    <>
      <Eyebrow>More</Eyebrow>
      <H1>tailwind-merge</H1>
      <Lead>
        Do you use tailwind-merge? Then add the compatibility plugin. If you do
        not add it, tailwind-merge can remove the shadow classes.
      </Lead>

      <H2 id="problem">The problem</H2>
      <P>
        tailwind-merge removes classes that change the same CSS property. It
        sees <InlineCode>shadow-lg</InlineCode> and{" "}
        <InlineCode>shadow-y-2</InlineCode> as two shadow classes. Thus it keeps
        only the last class.
      </P>

      <H2 id="install">Install</H2>
      <P>
        Install the{" "}
        <a href={site.mergePackage} className="text-indigo-600 hover:underline">
          tailwind-extended-shadows-merge
        </a>{" "}
        package.
      </P>
      <Code title="Terminal">npm install tailwind-extended-shadows-merge</Code>

      <H2 id="configure">Configure</H2>
      <P>
        Give <InlineCode>withExtendedShadows</InlineCode> to{" "}
        <InlineCode>extendTailwindMerge</InlineCode>. Then use the new{" "}
        <InlineCode>twMerge</InlineCode> function in your app.
      </P>
      <Code title="lib/twMerge.ts">{`
import { extendTailwindMerge } from "tailwind-merge";
import { withExtendedShadows } from "tailwind-extended-shadows-merge";

export const twMerge = extendTailwindMerge(withExtendedShadows);
`}</Code>

      <H2 id="result">Result</H2>
      <Code title="Example">{`
twMerge("shadow-lg shadow-y-2 shadow-blur-4");
// → "shadow-lg shadow-y-2 shadow-blur-4"

twMerge("shadow-y-2 shadow-y-4");
// → "shadow-y-4"
`}</Code>

      <DocsPager href="/docs/tailwind-merge" />
    </>
  );
}
