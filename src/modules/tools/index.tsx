import { getTranslations } from "next-intl/server";

import HairlineFigure from "~/components/hairlineFigure";
import Heading from "~/components/heading";
import { AppCollection, PortfolioSection } from "~/settings/constants";
import { AppTranslation } from "~/settings/i18n";
import type { ITool } from "~/types/data";
import getCollection from "~/utils/getCollection";
import { byOrder } from "~/utils/normalize";

import * as styles from "./styles.css";
import Section from "../section";
import * as sectionStyles from "../section/styles.css";

const groups = ["ai", "stack"] as const;

const Tools = async () => {
  const [t, tools] = await Promise.all([
    getTranslations(`${AppTranslation.Portfolio}.tools`),
    getCollection<ITool>(AppCollection.Tools),
  ]);

  return (
    <Section
      id={PortfolioSection.Tools}
      className={styles.band}
      innerClassName={sectionStyles.split}
    >
      <div className={sectionStyles.splitAside}>
        <Heading title={t("title")} description={t("description")} />
        <HairlineFigure className={styles.figure} figure="Keyboard" label={t("title")} />
      </div>
      <div className={`${sectionStyles.splitMain} ${styles.lists}`}>
        {groups.map((group) => {
          const items = tools.filter((tool) => tool.group === group).sort(byOrder);
          if (items.length === 0) return null;
          return (
            <div key={group}>
              <h3 className={sectionStyles.listTitle}>{t(group)}</h3>
              <ul>
                {items.map((tool) => (
                  <li key={tool.id} className={sectionStyles.row}>
                    <span className={sectionStyles.rowLabel}>{tool.name}</span>
                    <span>{tool.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
};
export default Tools;
