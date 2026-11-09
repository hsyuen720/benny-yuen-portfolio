import NextImage from "next/image";
import { getTranslations } from "next-intl/server";
import { LuArrowRight } from "react-icons/lu";

import Button from "~/components/button";
import SocialMedia from "~/modules/socialMedia";
import { AppCollection, PortfolioSection } from "~/settings/constants";
import { AppTranslation } from "~/settings/i18n";
import type { IExperience, IHomeContent } from "~/types/data";
import getCollection from "~/utils/getCollection";
import getDocument from "~/utils/getDocument";
import getStorageUrl from "~/utils/getStorageUrl";
import { careerStats, currentExperience, toExperience } from "~/utils/normalize";

import * as styles from "./styles.css";
import Section from "../section";

const HeroBanner = async () => {
  const [t, ct, content, docs] = await Promise.all([
    getTranslations(`${AppTranslation.Portfolio}.heroBanner`),
    getTranslations(AppTranslation.Common),
    getDocument<IHomeContent>(AppCollection.Content, "home"),
    getCollection<IExperience>(AppCollection.Experiences),
  ]);
  const photo = await getStorageUrl(t("photoPath"));
  const experiences = docs.map(toExperience);
  const { years, teams } = careerStats(experiences, new Date());
  // Both come from the experience documents, so they never go stale
  const stats = [
    { value: years > 0 ? `${years}+` : "", label: t("years") },
    { value: teams > 0 ? String(teams) : "", label: t("teams") },
  ].filter((stat) => stat.value);
  // The card hides when every job has ended
  const current = currentExperience(experiences);

  return (
    <Section id={PortfolioSection.HeroBanner} className={styles.band} innerClassName={styles.inner}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>
          <span className={styles.author}>{ct("author")}</span>
          <span>{t("role")}</span>
        </p>
        <h1 className={styles.headline}>
          {t.rich("headline", { em: (chunks) => <em className={styles.accent}>{chunks}</em> })}
        </h1>
        <p className={styles.intro}>{content?.intro || t("intro")}</p>
        <dl className={styles.stats}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <dt className={styles.statLabel}>{stat.label}</dt>
              <dd className={styles.statValue}>{stat.value}</dd>
            </div>
          ))}
        </dl>
        <div className={styles.actions}>
          <Button variant="primary" href={`#${PortfolioSection.Projects}`}>
            {t("cta")}
            <LuArrowRight size={18} aria-hidden />
          </Button>
          <SocialMedia allSecondary />
        </div>
      </div>
      <div className={styles.visual}>
        <NextImage
          className={styles.photo}
          src={photo}
          alt={t("photoAlt")}
          width={380}
          height={475}
          sizes="(max-width: 720px) 100vw, 380px"
          priority
        />
        {current ? (
          <p className={styles.now}>
            <span className={styles.nowDot} aria-hidden="true" />
            <span className={styles.nowLabel}>{t("now")}</span>
            <span>{t("at", { role: current.role, company: current.company })}</span>
          </p>
        ) : null}
      </div>
    </Section>
  );
};
export default HeroBanner;
