import { useTranslations } from "next-intl";

import Browser from "~/components/browser";
import Heading from "~/components/heading";
import Image from "~/components/image";
import Label from "~/components/label";
import Section from "~/layouts/section";
import { PortfolioSection } from "~/settings/constants";
import { AppTranslation } from "~/settings/i18n";

import image from "./benny.jpeg";
import styles from "./styles.module.scss";

const About = () => {
  const t = useTranslations(`${AppTranslation.Portfolio}.about`);
  const commonT = useTranslations(AppTranslation.Common);
  return (
    <Section isLight id={PortfolioSection.About} className={styles.about}>
      <Heading isDark title={t("title")} description={t("subtitle")} />
      <Browser isDark className={styles.browser} title={commonT("title")}>
        <Image className={styles.photo} src={image} alt="Benny Yuen" width={300} height={300} />
        <div className={styles.content}>
          <Heading isDark title={t("heading")} />
          <p>{t("description")}</p>
          <div className={styles.hashtag}>
            {t.rich("techStack", { tech: (chunks) => <Label>#{chunks}</Label> })}
          </div>
        </div>
      </Browser>
    </Section>
  );
};
export default About;
