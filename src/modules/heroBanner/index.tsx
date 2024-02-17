import { getTranslations } from "next-intl/server";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

import Button from "~/components/button";
import Image from "~/components/image";
import TypingWords from "~/components/typingWords";
import { PortfolioSection } from "~/settings/constants";
import { AppTranslation } from "~/settings/i18n";
import getFileUrl from "~/utils/getFileUrl";

import styles from "./styles.module.scss";
import Section from "../section";

const HeroBanner = async () => {
  const t = await getTranslations(`${AppTranslation.Portfolio}.heroBanner`);
  const profile = await getFileUrl(t("photoPath"));

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
        <div className={styles.socialMedia}>
          <Button icon={FaGithub} />
          <Button icon={FaLinkedin} />
          <Button icon={FaEnvelope} />
        </div>
      </div>
      <Image
        className={styles.profile}
        src={profile}
        alt="profile picture"
        width={350}
        height={350}
      />
    </Section>
  );
};
export default HeroBanner;
