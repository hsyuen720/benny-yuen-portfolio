import { headers } from "next/headers";
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

import styles from "./styles.module.scss";
import Section from "../section";

const About = async () => {
  const headerList = await headers();
  const userCountry = headerList.get("x-user-country") || "HK";

  const isHongKong = userCountry === "HK";

  const t = await getTranslations(`${AppTranslation.Portfolio}.about`);
  const ct = await getTranslations(AppTranslation.Common);
  const photoUrl = await getStorageUrl(t("photoPath"));
  const url = isHongKong
    ? await getStorageUrl(t("resumePath"))
    : (await getDocument<ISocialMedia>(AppCollection.SocialMedia, "linkedin"))?.value;

  return (
    <Section isLight id={PortfolioSection.About} className={styles.about}>
      <Heading isDark title={t("title")} description={t("subtitle")} />
      <Browser isDark className={styles.browser} title={ct("title")}>
        <a className={styles.photo} href={url} target="_blank">
          <Image src={photoUrl} alt="Benny Yuen" width={300} height={300} />
          <span className={styles.overlay}>
            {isHongKong ? t("resumeDescription") : t("linkedInDescription")}
          </span>
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
