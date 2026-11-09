import { getTranslations } from "next-intl/server";

import HairlineFigure from "~/components/hairlineFigure";
import SocialMedia from "~/modules/socialMedia";
import { PortfolioSection } from "~/settings/constants";
import { AppTranslation } from "~/settings/i18n";

import * as styles from "./styles.css";
import Section from "../section";
import * as sectionStyles from "../section/styles.css";

const Contact = async () => {
  const [t, ct] = await Promise.all([
    getTranslations(`${AppTranslation.Portfolio}.contact`),
    getTranslations(AppTranslation.Common),
  ]);
  return (
    <>
      <Section
        id={PortfolioSection.Contact}
        className={sectionStyles.deep}
        innerClassName={styles.inner}
      >
        <div className={styles.content}>
          <h2 className={styles.title}>{t("title")}</h2>
          <p className={styles.description}>{t("description")}</p>
          <SocialMedia className={styles.links} showEmailAddress />
        </div>
        <HairlineFigure className={styles.figure} figure="Hub" label={t("title")} />
      </Section>
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          {t("copyright", { year: new Date().getFullYear(), name: ct("author") })}
        </div>
      </footer>
    </>
  );
};
export default Contact;
