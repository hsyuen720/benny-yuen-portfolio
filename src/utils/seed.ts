// shortcut: dev-only preview of the real content before it is in Firestore (same data as the
// content draft); delete this file and its two call sites (getCollection, getDocument) once
// Firestore holds it.
import { AppCollection } from "~/settings/constants";

type SeedDoc = { id: string } & Record<string, unknown>;

const seed: Record<string, SeedDoc[]> = {
  [AppCollection.Content]: [
    {
      id: "home",
      intro:
        "Seven years on health insurance, hospitality and membership rewards apps in Hong Kong. Now in Copenhagen, building AI meeting notes at Jurnie.",
      experienceIntro:
        "Four teams since 2019, from a clinic CMS in Hong Kong to meeting notes in Copenhagen.",
    },
  ],
  [AppCollection.Projects]: [
    {
      id: "treklay",
      title: "Treklay",
      summary:
        "A privacy-first group expense tracker. Shared and personal budgets in one app, each with its net balance on a single home screen.",
      stack: [
        {
          label: "Frontend",
          value: "Expo, React Native",
        },
        {
          label: "Backend",
          value: "NestJS, TypeScript",
        },
        {
          label: "Delivery",
          value: "pnpm monorepo, GitHub Actions, EAS",
        },
      ],
      links: {
        code: "https://github.com/hsyuen720/treklay",
      },
      featured: true,
      order: 1,
      status: "In development",
    },
    {
      id: "dNWMAIFJ9oXmAfGWMJoK",
      title: "React SVG Annotation",
      summary:
        "An open-source React library for drawing freehand lines and shapes on top of any image.",
      stack: ["React", "SVG", "Storybook"],
      links: {
        code: "https://github.com/hsyuen720/react-svg-annotation",
        demo: "https://hsyuen720.github.io/react-svg-annotation/?path=/story/svg-annotation--basic",
      },
      featured: true,
      order: 2,
      status: "live",
    },
    {
      id: "n3ZhWtXxI4joBPqYHg1v",
      title: "HKID Tools",
      summary: "Generate and validate Hong Kong identity card numbers for testing.",
      stack: ["Remix", "React"],
      links: {
        code: "https://github.com/hsyuen720/hkid-tools",
        demo: "https://hkid-tools.vercel.app/",
      },
      image:
        "https://firebasestorage.googleapis.com/v0/b/benny-yuen-portfolio-4718c.appspot.com/o/projects%2FScreenshot%202024-02-17%20at%2020.21.56.png?alt=media&token=78995345-ee00-4ff0-9564-49f04be68226",
      featured: false,
      order: 3,
      status: "live",
    },
    {
      id: "ejMc4KaZFExX03mpWJZm",
      title: "This website",
      summary: "One-page portfolio whose content updates from Firebase without a redeploy.",
      stack: ["Next.js", "Firebase"],
      links: {
        code: "https://github.com/hsyuen720/benny-yuen-portfolio",
        demo: "https://benny-yuen-portfolio.vercel.app/",
      },
      image:
        "https://firebasestorage.googleapis.com/v0/b/benny-yuen-portfolio-4718c.appspot.com/o/projects%2FScreenshot%202024-02-17%20at%2020.17.57.png?alt=media&token=a85933d3-1d03-49d3-a985-96b2ca08bfec",
      featured: false,
      order: 4,
      status: "live",
    },
  ],
  [AppCollection.Experiences]: [
    {
      id: "jurnie",
      role: "Software Engineer",
      company: "Jurnie",
      location: "Copenhagen",
      workMode: "hybrid, part-time",
      start: "2026-08-01",
      end: null,
      summary:
        "Building AI meeting transcription and notes across the Next.js web app, the Tauri desktop client, the mobile app and the Django backend.",
    },
    {
      id: "sfbyuwHxQNDgsHL197QN",
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
      id: "VmscvKXuOLZDQlTySX1V",
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
      id: "sPz2lDDEeocPSBEBdgkj",
      role: "Analyst Programmer",
      company: "FUJIFILM Business Innovation Hong Kong",
      companyShort: "FBHK",
      location: "Hong Kong",
      workMode: "on-site",
      start: "2019-07-01",
      end: "2022-11-01",
      summary:
        "Joined as Programmer and became Analyst Programmer: built a clinic CMS from scratch and its React Native apps, cut bundle size and re-renders, and trained new developers.",
    },
  ],
  [AppCollection.Tools]: [
    {
      id: "t1",
      group: "ai",
      name: "AI coding agents",
      detail: "Claude Code, GitHub Copilot and the like do the typing; I own the direction",
      order: 1,
    },
    {
      id: "t2",
      group: "ai",
      name: "Spec first",
      detail: "Agree on the problem and what done looks like before building",
      order: 2,
    },
    {
      id: "t3",
      group: "ai",
      name: "Verified",
      detail: "Every change is tested and reviewed before it ships",
      order: 3,
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
      detail: "React Native, Expo, Flutter, Fastlane",
      order: 2,
    },
    {
      id: "t7",
      group: "stack",
      name: "Backend & services",
      detail: "Node.js, NestJS, AWS, Azure, GCP",
      order: 3,
    },
  ],
  [AppCollection.Education]: [
    {
      id: "dtu",
      degree: "MSc Computer Science",
      institution: "Technical University of Denmark",
      institutionShort: "DTU",
      start: "2025",
      end: "2027 (expected)",
      order: 1,
    },
    {
      id: "hkust",
      degree: "BEng in Computer Engineering",
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
