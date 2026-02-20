import { getTranslations } from "next-intl/server";

import Browser from "~/components/browser";
import Hashtag from "~/components/hashtag";
import Heading from "~/components/heading";
import Image from "~/components/image";
import { AppCollection, PortfolioSection } from "~/settings/constants";
import { AppTranslation } from "~/settings/i18n";
import { ISocialMedia } from "~/types/data";
import getDocument from "~/utils/getDocument";
import getStorageUrl from "~/utils/getStorageUrl";

import * as styles from "./styles.css";
import Section from "../section";

const About = async () => {
  const [t, ct] = await Promise.all([
    getTranslations(`${AppTranslation.Portfolio}.about`),
    getTranslations(AppTranslation.Common),
  ]);

  const [photoUrl, socialData] = await Promise.all([
    getStorageUrl(t("photoPath")),
    getDocument<ISocialMedia>(AppCollection.SocialMedia, "linkedin"),
  ]);
  const url = socialData?.value;

  return (
    <Section isLight id={PortfolioSection.About} className={styles.about}>
      <Heading isDark title={t("title")} description={t("subtitle")} />
      <Browser isDark className={styles.browser} title={ct("title")}>
        <div className={styles.browserContent}>
          <a className={styles.photo} href={url} target="_blank">
            <Image src={photoUrl} alt="Benny Yuen" width={300} height={300} loading="lazy" />
            <span className={styles.overlay}>{t("photoDescription")}</span>
          </a>
          <div className={styles.content}>
            <Heading isDark title={t("heading")} />
            <p className={styles.paragraph}>{t("description")}</p>
            <div className={styles.hashtag}>
              {t.rich("techStack", { tech: (chunks) => <Hashtag isDark>#{chunks}</Hashtag> })}
            </div>
          </div>
        </div>
      </Browser>
    </Section>
  );
};
export default About;
