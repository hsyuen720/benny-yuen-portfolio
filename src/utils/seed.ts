// shortcut: dev-only placeholder content to preview the full design; delete this file and its
// two call sites (getCollection, getDocument) once Firestore holds the real content.
import { AppCollection } from "~/settings/constants";

type SeedDoc = { id: string } & Record<string, unknown>;

const seed: Record<string, SeedDoc[]> = {
  [AppCollection.Content]: [
    {
      id: "home",
      intro:
        "Seven years on health insurance, hospitality and enterprise apps in Hong Kong. Now in Copenhagen, building AI meeting notes at Jurnie.",
      experienceIntro:
        "Four teams since 2019, from a clinic CMS in Hong Kong to meeting notes in Copenhagen.",
    },
  ],
  [AppCollection.Projects]: [
    {
      id: "treklay",
      title: "Treklay",
      summary:
        "Shared and personal budgets in one app. Each book and wallet shows its net balance on a single home screen.",
      stack: [
        { label: "App", value: "Expo, React Native" },
        { label: "API", value: "NestJS, TypeScript" },
        { label: "Delivery", value: "pnpm monorepo, GitHub Actions, EAS" },
      ],
      links: { code: "https://github.com/hsyuen720/treklay" },
      featured: true,
      order: 1,
      status: "In development",
    },
    {
      id: "svg-annotation",
      title: "React SVG Annotation",
      summary:
        "An open-source React library for drawing freehand lines and shapes on top of any image.",
      stack: ["React", "SVG", "Storybook"],
      links: {
        code: "https://github.com/hsyuen720/react-svg-annotation",
        demo: "https://example.com",
      },
      featured: true,
      order: 2,
    },
    {
      id: "hkid",
      title: "HKID Tools",
      summary: "Generate and validate Hong Kong identity card numbers for testing.",
      stack: ["Remix"],
      links: { code: "https://github.com/hsyuen720/hkid-tools", demo: "https://example.com" },
      order: 3,
    },
    {
      id: "portfolio",
      title: "This website",
      summary: "One-page portfolio whose content updates from Firebase without a redeploy.",
      stack: ["Next.js", "Firebase"],
      links: { code: "https://github.com/hsyuen720/benny-yuen-portfolio" },
      order: 4,
    },
    ...[5, 6, 7, 8].map((n) => ({
      id: `sample-${n}`,
      title: `Sample project ${n}`,
      summary: "Placeholder row to preview the list and the Show all button.",
      stack: ["TypeScript"],
      links: { code: "https://example.com" },
      order: n,
    })),
  ],
  [AppCollection.Experiences]: [
    {
      id: "jurnie",
      role: "Software Engineer",
      company: "Jurnie",
      location: "Copenhagen",
      workMode: "part-time",
      start: "2026-08-01",
      end: null,
      summary:
        "Building the Next.js web app and the Tauri desktop client for AI meeting transcription and notes.",
    },
    {
      id: "melco",
      role: "Software Engineer",
      company: "Melco Resorts & Entertainment",
      companyShort: "Melco",
      location: "Hong Kong",
      workMode: "remote",
      start: "2024-03-01",
      end: "2026-07-01",
      summary:
        "Led the rebuild of the MelcoToday app in React, React Native and Node.js, and set the team's Git and documentation practice.",
    },
    {
      id: "amplify",
      role: "Frontend Engineer",
      company: "Amplify Health",
      location: "Hong Kong",
      workMode: "hybrid",
      start: "2022-11-01",
      end: "2024-03-01",
      summary:
        "Led the mobile team on the AIA Vitality Indonesia app and set up its CI/CD with Detox, Fastlane and Azure Pipelines.",
    },
    {
      id: "fujifilm",
      role: "Analyst Programmer",
      company: "FUJIFILM Business Innovation",
      companyShort: "FUJIFILM",
      location: "Hong Kong",
      workMode: "started as Programmer",
      start: "2019-07-01",
      end: "2022-11-01",
      summary:
        "Built a clinic CMS from scratch and its React Native apps, cut bundle size and re-renders, and trained new developers.",
    },
    // Ten placeholder jobs to stress the timeline and commit graph
    ...Array.from({ length: 10 }, (_, i) => {
      const year = 2018 - i;
      return {
        id: `sample-job-${i + 1}`,
        role: `Sample role ${i + 1}`,
        company: `Sample company ${i + 1}`,
        location: "Hong Kong",
        workMode: "on-site",
        start: `${year}-01-01`,
        end: `${year}-12-01`,
        summary: "Placeholder job to preview a long career on the timeline and commit graph.",
      };
    }),
  ],
  [AppCollection.Tools]: [
    {
      id: "t1",
      group: "ai",
      name: "Claude Code",
      detail: "My main coding agent, on Treklay and at work",
      order: 1,
    },
    {
      id: "t2",
      group: "ai",
      name: "Specs first",
      detail: "Every task starts as a written spec before any prompt",
      order: 2,
    },
    {
      id: "t3",
      group: "ai",
      name: "Agent pipeline",
      detail: "A developer agent builds, a QA agent checks, I review",
      order: 3,
    },
    {
      id: "t4",
      group: "ai",
      name: "Parallel work",
      detail: "Git worktrees so several agents can work at once",
      order: 4,
    },
    {
      id: "t5",
      group: "stack",
      name: "Web",
      detail: "TypeScript, React, Next.js, Tauri",
      order: 1,
    },
    {
      id: "t6",
      group: "stack",
      name: "Mobile",
      detail: "React Native, Expo, Detox, Fastlane",
      order: 2,
    },
    { id: "t7", group: "stack", name: "Server", detail: "Node.js, NestJS, Firebase", order: 3 },
  ],
  [AppCollection.Education]: [
    {
      id: "dtu",
      degree: "MSc Computer Science",
      institution: "Technical University of Denmark",
      institutionShort: "DTU",
      start: "2025",
      end: "2027",
      order: 1,
    },
    {
      id: "hkust",
      degree: "Bachelor's degree in Computer Engineering",
      institution: "The Hong Kong University of Science and Technology",
      institutionShort: "HKUST",
      start: "2015",
      end: "2019",
      order: 2,
    },
  ],
};

const isSeedOn = () => process.env.NODE_ENV === "development" && process.env.USE_SEED_DATA === "1";

/** Seed documents for a collection, or undefined to read Firestore as usual. */
export const getSeedCollection = (collection: string) =>
  isSeedOn() ? seed[collection] : undefined;

/** A seed document, or undefined to read Firestore as usual. */
export const getSeedDocument = (collection: string, id: string) =>
  isSeedOn() ? (seed[collection]?.find((doc) => doc.id === id) ?? null) : undefined;
