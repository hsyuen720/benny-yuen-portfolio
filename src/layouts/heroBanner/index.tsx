import { useTranslations } from "next-intl";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

import Button from "~/components/button";
import Image from "~/components/image";
import TypingWords from "~/components/typingWords";
import Section from "~/layouts/section";
import { PortfolioSection } from "~/settings/constants";
import { AppTranslation } from "~/settings/i18n";

import profile from "./profile.jpeg";
import styles from "./styles.module.scss";

const HeroBanner = () => {
  const t = useTranslations(`${AppTranslation.Portfolio}.heroBanner`);
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
