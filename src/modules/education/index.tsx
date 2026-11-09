import { getTranslations } from "next-intl/server";

import { AppCollection, PortfolioSection } from "~/settings/constants";
import { AppTranslation } from "~/settings/i18n";
import type { IEducation } from "~/types/data";
import getCollection from "~/utils/getCollection";
import { byOrder } from "~/utils/normalize";

import * as styles from "./styles.css";
import Section from "../section";
import * as sectionStyles from "../section/styles.css";

const Education = async () => {
  const [t, items] = await Promise.all([
    getTranslations(`${AppTranslation.Portfolio}.education`),
    getCollection<IEducation>(AppCollection.Education),
  ]);
  if (items.length === 0) return null;

  return (
    <Section id={PortfolioSection.Education} innerClassName={styles.inner}>
      <h2 className={styles.title}>{t("title")}</h2>
      <ul className={sectionStyles.splitMain}>
        {[...items].sort(byOrder).map((item) => (
          <li key={item.id} className={styles.row}>
            <span className={styles.degree}>
              {item.degree}, {item.institution}
            </span>
            <span className={styles.years}>
              {[item.start, item.end].filter(Boolean).join(" – ")}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
};
export default Education;
