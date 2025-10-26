import { getTranslations } from "next-intl/server";

import Image from "~/components/image";
import TypingWords from "~/components/typingWords";
import SocialMedia from "~/modules/socialMedia";
import { PortfolioSection } from "~/settings/constants";
import { AppTranslation } from "~/settings/i18n";
import getStorageUrl from "~/utils/getStorageUrl";

import * as styles from "./styles.css";
import Section from "../section";

const HeroBanner = async () => {
  const t = await getTranslations(`${AppTranslation.Portfolio}.heroBanner`);
  const profile = await getStorageUrl(t("photoPath"));

  return (
    <Section id={PortfolioSection.HeroBanner} className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.greeting}>{t("greeting")}</h2>
        <h1 className={styles.introduction}>
          {t.rich("introduction", {
            role: (chunks) => <TypingWords words={chunks?.toString().split(", ") ?? []} />,
          })}
        </h1>
        <p className={styles.briefDescription}>{t("description")}</p>
        <SocialMedia className={styles.socialMedia} />
      </div>
      <Image
        className={styles.profile}
        src={profile}
        alt="profile picture"
        width={350}
        height={350}
        priority
        fetchPriority="high"
      />
    </Section>
  );
};
export default HeroBanner;
