import { getTranslations } from "next-intl/server";

import Browser from "~/components/browser";
import Hashtag from "~/components/hashtag";
import Heading from "~/components/heading";
import Image from "~/components/image";
import { PortfolioSection } from "~/settings/constants";
import { AppTranslation } from "~/settings/i18n";
import getStorageUrl from "~/utils/getStorageUrl";

import styles from "./styles.module.scss";
import Section from "../section";

const About = async () => {
  const t = await getTranslations(`${AppTranslation.Portfolio}.about`);
  const commonTrans = await getTranslations(AppTranslation.Common);
  const photoUrl = await getStorageUrl(t("photoPath"));
  const resumeUrl = await getStorageUrl(t("resumePath"));

  return (
    <Section isLight id={PortfolioSection.About} className={styles.about}>
      <Heading isDark title={t("title")} description={t("subtitle")} />
      <Browser isDark className={styles.browser} title={commonTrans("title")}>
        <a href={resumeUrl} target="_blank">
          <Image
            className={styles.photo}
            src={photoUrl}
            alt="Benny Yuen"
            width={300}
            height={300}
          />
        </a>
        <div className={styles.content}>
          <Heading isDark title={t("heading")} />
          <p>{t("description")}</p>
          <div className={styles.hashtag}>
            {t.rich("techStack", { tech: (chunks) => <Hashtag isDark>#{chunks}</Hashtag> })}
          </div>
        </div>
      </Browser>
    </Section>
  );
};
export default About;
