import clsx from "clsx";
import { DateTime } from "luxon";
import { getTranslations } from "next-intl/server";
import { Fragment } from "react";
import { FaBusinessTime, FaCodeBranch, FaSuitcase } from "react-icons/fa";

import Hashtag from "~/components/hashtag";
import Heading from "~/components/heading";
import Label from "~/components/label";
import useFormat from "~/hooks/useFormat";
import { AppCollection, PortfolioSection } from "~/settings/constants";
import { AppTranslation } from "~/settings/i18n";
import type { IExperience } from "~/types/data";
import getCollection from "~/utils/getCollection";

import styles from "./styles.module.scss";
import Section from "../section";

export const revalidate = 3600;

const Experiences = async () => {
  const format = useFormat();

  const t = await getTranslations(`${AppTranslation.Portfolio}.experience`);
  const ct = await getTranslations(AppTranslation.Common);

  const experiences = await getCollection<IExperience>(AppCollection.Experiences, {
    orderBy: "fromDate",
    order: "desc",
  });

  const startDate = DateTime.fromJSDate(experiences[experiences.length - 1].fromDate.toDate());
  const numOfYears = Math.ceil(DateTime.now().diff(startDate, "years").years);

  return (
    <Section id={PortfolioSection.Experience} className={styles.experiences}>
      <Heading isSeparatorShown title={t("title")} description={t("subtitle", { numOfYears })} />
      <div className={styles.timeline}>
        {experiences.map((experience, index) => {
          const { id, company, positions, fromDate, toDate, descriptions, technologies } =
            experience;
          const intlOption: Intl.DateTimeFormatOptions = { year: "numeric", month: "short" };

          const from = DateTime.fromJSDate(fromDate.toDate()).toLocaleString(intlOption);
          const to = toDate
            ? DateTime.fromJSDate(toDate.toDate()).toLocaleString(intlOption)
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
