import clsx from "clsx";
import { getTranslations } from "next-intl/server";

import HairlineFigure from "~/components/hairlineFigure";
import Heading from "~/components/heading";
import { AppCollection, PortfolioSection } from "~/settings/constants";
import { AppTranslation } from "~/settings/i18n";
import type { IEducation } from "~/types/data";
import getCollection from "~/utils/getCollection";
import { byOrder, isStudying } from "~/utils/normalize";

import * as styles from "./styles.css";
import * as timeline from "../experiences/styles.css";
import Section from "../section";
import * as sectionStyles from "../section/styles.css";

const Education = async () => {
  const [t, items] = await Promise.all([
    getTranslations(`${AppTranslation.Portfolio}.education`),
    getCollection<IEducation>(AppCollection.Education),
  ]);
  if (items.length === 0) return null;
  const thisYear = new Date().getFullYear();

  return (
    <Section
      id={PortfolioSection.Education}
      className={styles.band}
      innerClassName={sectionStyles.split}
    >
      <div className={clsx(sectionStyles.splitAside, timeline.aside)}>
        <Heading title={t("title")} />
        <HairlineFigure className={styles.figure} figure="Riffle" label={t("title")} />
      </div>
      <ol className={clsx(sectionStyles.splitMain, timeline.timeline)}>
        {[...items].sort(byOrder).map((item) => {
          const isCurrent = isStudying(item.end, thisYear);
          return (
            <li key={item.id} className={timeline.item}>
              <span
                aria-hidden="true"
                className={clsx(timeline.dot, { [timeline.current]: isCurrent })}
              />
              <span className={clsx(timeline.range, { [timeline.currentRange]: isCurrent })}>
                {[item.start, item.end].filter(Boolean).join(" – ")}
              </span>
              <h3 className={timeline.role}>{item.degree}</h3>
              <span className={timeline.place}>{item.institution}</span>
            </li>
          );
        })}
      </ol>
    </Section>
  );
};
export default Education;
