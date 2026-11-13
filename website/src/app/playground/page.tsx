import { Playground } from "@/components/playground/Playground";
import { Eyebrow, H1, Lead } from "@/components/Prose";

export const metadata = { title: "Playground" };

export default function PlaygroundPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <Eyebrow>Playground</Eyebrow>
      <H1>Playground</H1>
      <Lead>
        Change the controls to make a shadow. Then copy the classes into your
        project.
      </Lead>
      <div className="mt-12">
        <Playground />
      </div>
    </div>
  );
}
