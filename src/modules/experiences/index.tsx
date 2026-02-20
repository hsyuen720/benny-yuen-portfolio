import clsx from "clsx";
import { DateTime } from "luxon";
import { getTranslations } from "next-intl/server";
import { Fragment } from "react";
import { FaBusinessTime, FaCodeBranch, FaSuitcase } from "react-icons/fa";

import Hashtag from "~/components/hashtag";
import Heading from "~/components/heading";
import Label from "~/components/label";
import { AppCollection, PortfolioSection } from "~/settings/constants";
import { AppTranslation } from "~/settings/i18n";
import type { IExperience } from "~/types/data";
import getCollection from "~/utils/getCollection";
import getFormat from "~/utils/getFormat";

import * as styles from "./styles.css";
import Section from "../section";

// Helper function to safely convert Firebase Timestamp to Date
const convertToDate = (timestamp: unknown): Date => {
  if (typeof timestamp === "object" && timestamp !== null) {
    // If it's a Firestore Timestamp object
    if ("toDate" in timestamp && typeof timestamp.toDate === "function") {
      return timestamp.toDate();
    }
    // If it's serialized with seconds/nanoseconds
    else if ("seconds" in timestamp) {
      return new Date((timestamp as { seconds: number }).seconds * 1000);
    }
    // If it's already a Date object
    else {
      return new Date(timestamp as string | number | Date);
    }
  } else {
    // Fallback: try to parse as date
    return new Date(timestamp as string | number | Date);
  }
};

const Experiences = async () => {
  // All four are independent — fetch in parallel
  const [format, t, ct, experiences] = await Promise.all([
    getFormat(),
    getTranslations(`${AppTranslation.Portfolio}.experience`),
    getTranslations(AppTranslation.Common),
    getCollection<IExperience>(AppCollection.Experiences, {
      orderBy: "fromDate",
      order: "desc",
    }),
  ]);

  const startDate = DateTime.fromJSDate(
    convertToDate(experiences[experiences.length - 1].fromDate),
  );
  const numOfYears = Math.ceil(DateTime.now().diff(startDate, "years").years);

  return (
    <Section id={PortfolioSection.Experience} className={styles.experiences}>
      <Heading isSeparatorShown title={t("title")} description={t("subtitle", { numOfYears })} />
      <div className={styles.timeline}>
        {experiences.map((experience, index) => {
          const { id, company, positions, fromDate, toDate, descriptions, technologies } =
            experience;
          const intlOption: Intl.DateTimeFormatOptions = { year: "numeric", month: "short" };

          const from = DateTime.fromJSDate(convertToDate(fromDate)).toLocaleString(intlOption);
          const to = toDate
            ? DateTime.fromJSDate(convertToDate(toDate)).toLocaleString(intlOption)
            : ct("date.present");
          return (
            <div key={id ?? index} className={styles.item}>
              <Label className={styles.period} icon={FaBusinessTime} title={`${from} - ${to}`} />
              <div className={styles.separator}>
                <div className={clsx(styles.top, styles.line)} />
                <div className={styles.dot} />
                <div className={clsx(styles.bottom, styles.line)} />
              </div>
              <div className={styles.detail}>
                <Label icon={FaCodeBranch} className={styles.positions}>
                  {positions.map((position, index) => (
                    <Fragment key={index}>
                      <span className={styles.position}>{format(position)}</span>
                      {index !== positions.length - 1 && <span> | </span>}
                    </Fragment>
                  ))}
                </Label>
                <Label className={styles.company} icon={FaSuitcase} title={format(company)} />
                <ul className={styles.descriptions}>
                  {descriptions.map((description, index) => (
                    <li key={index} className={styles.description}>
                      {format(description)}
                    </li>
                  ))}
                </ul>
                <span className={styles.technologies}>
                  {technologies.map((technology) => (
                    <Hashtag key={technology}>#{technology}</Hashtag>
                  ))}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};
export default Experiences;
