import clsx from "clsx";
import { getLocale, getTranslations } from "next-intl/server";

import Heading from "~/components/heading";
import { AppCollection, PortfolioSection } from "~/settings/constants";
import { AppTranslation } from "~/settings/i18n";
import type { IExperience, IHomeContent } from "~/types/data";
import getCollection from "~/utils/getCollection";
import getDocument from "~/utils/getDocument";
import { sortExperiences, toExperience } from "~/utils/normalize";

import CommitGraph from "./commitGraph";
import * as styles from "./styles.css";
import Section from "../section";
import * as sectionStyles from "../section/styles.css";

const GRAPH_JOBS = 5;

const Experiences = async () => {
  const [locale, t, ct, docs, content] = await Promise.all([
    getLocale(),
    getTranslations(`${AppTranslation.Portfolio}.experience`),
    getTranslations(AppTranslation.Common),
    // No orderBy: Firestore drops documents that lack the ordered field; we sort below
    getCollection<IExperience>(AppCollection.Experiences),
    getDocument<IHomeContent>(AppCollection.Content, "home"),
  ]);
  const experiences = sortExperiences(docs.map(toExperience));
  const formatDate = new Intl.DateTimeFormat(locale, { month: "short", year: "numeric" }).format;
  // The graph shows the latest few jobs, oldest first; the root node sums up the rest
  const jobs = experiences
    .slice(0, GRAPH_JOBS)
    .map((e, index) => ({
      company: e.companyShort,
      years: e.start
        ? `${e.start.getFullYear()} – ${e.end ? e.end.getFullYear() : ct("date.present")}`
        : "",
      current: index === 0 && !e.end,
    }))
    .reverse();
  const earlier = experiences.length - jobs.length;
  const firstYear = experiences.at(-1)?.start?.getFullYear();
  const since =
    firstYear === undefined
      ? undefined
      : earlier > 0
        ? t("earlier", { count: earlier, year: firstYear })
        : t("since", { year: firstYear });

  return (
    <Section
      id={PortfolioSection.Experience}
      className={clsx(sectionStyles.deep, styles.band)}
      innerClassName={sectionStyles.split}
    >
      <div className={clsx(sectionStyles.splitAside, styles.aside)}>
        <Heading title={t("title")} description={content?.experienceIntro || t("intro")} />
        <CommitGraph
          className={styles.graph}
          jobs={jobs}
          since={since}
          label={t("graphLabel", {
            // Screen readers get the full company names
            jobs: experiences
              .slice(0, GRAPH_JOBS)
              .map((e, i) => `${e.company} ${jobs[jobs.length - 1 - i].years}`)
              .join(", "),
          })}
        />
      </div>
      <ol className={clsx(sectionStyles.splitMain, styles.timeline)}>
        {experiences.map((job, index) => {
          const isCurrent = index === 0 && !job.end;
          const range = `${job.start ? formatDate(job.start) : ""} – ${
            job.end ? formatDate(job.end) : ct("date.present")
          }`;
          const place = [job.location, job.workMode].filter(Boolean).join(", ");
          return (
            <li key={job.id} className={styles.item}>
              <span
                aria-hidden="true"
                className={clsx(styles.dot, { [styles.current]: isCurrent })}
              />
              <span className={clsx(styles.range, { [styles.currentRange]: isCurrent })}>
                {range}
              </span>
              <h3 className={styles.role}>{[job.role, job.company].filter(Boolean).join(", ")}</h3>
              {place ? <span className={styles.place}>{place}</span> : null}
              {job.summary ? <p>{job.summary}</p> : null}
            </li>
          );
        })}
      </ol>
    </Section>
  );
};
export default Experiences;
