export const site = {
  name: "Tailwind Extended Shadows",
  shortName: "Extended Shadows",
  description:
    "A Tailwind CSS plugin. Use utility classes to control the offset, blur, spread, opacity, and layers of each box shadow.",
  github: "https://github.com/kaelansmith/tailwind-extended-shadows",
  npm: "https://www.npmjs.com/package/tailwind-extended-shadows",
  mergePackage:
    "https://github.com/kaelansmith/tailwind-extended-shadows-merge",
};

export const mainNav = [
  { href: "/docs", label: "Docs" },
  { href: "/examples", label: "Examples" },
  { href: "/playground", label: "Playground" },
];

export type DocsPage = {
  href: string;
  title: string;
};

export type DocsGroup = {
  title: string;
  pages: DocsPage[];
};

export const docsNav: DocsGroup[] = [
  {
    title: "Start",
    pages: [
      { href: "/docs", title: "Install" },
      { href: "/docs/basics", title: "Basic rules" },
    ],
  },
  {
    title: "Shadow parts",
    pages: [
      { href: "/docs/offset", title: "Offset" },
      { href: "/docs/blur", title: "Blur" },
      { href: "/docs/spread", title: "Spread" },
      { href: "/docs/opacity", title: "Opacity" },
    ],
  },
  {
    title: "Layers",
    pages: [
      { href: "/docs/layers", title: "Number of layers" },
      { href: "/docs/scale", title: "Layer scale" },
      { href: "/docs/ease", title: "Layer ease" },
    ],
  },
  {
    title: "More",
    pages: [
      { href: "/docs/inset", title: "Inset shadows" },
      { href: "/docs/theme", title: "Theme values" },
      { href: "/docs/tailwind-merge", title: "tailwind-merge" },
      { href: "/docs/css-output", title: "CSS output" },
    ],
  },
];

export const docsPages = docsNav.flatMap((group) => group.pages);
