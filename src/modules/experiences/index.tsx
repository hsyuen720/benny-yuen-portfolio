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
  const years = experiences.map((e) => (e.start ? String(e.start.getFullYear()) : "")).reverse();

  return (
    <Section id={PortfolioSection.Experience} innerClassName={sectionStyles.split}>
      <div className={clsx(sectionStyles.splitAside, styles.aside)}>
        <Heading title={t("title")} description={content?.experienceIntro || t("intro")} />
        <CommitGraph
          className={styles.graph}
          years={years}
          label={t("graphLabel", { years: years.join(", ") })}
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
