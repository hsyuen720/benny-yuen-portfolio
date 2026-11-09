import NextImage from "next/image";
import { getTranslations } from "next-intl/server";

import HairlineFigure from "~/components/hairlineFigure";
import SocialMedia from "~/modules/socialMedia";
import { AppCollection, PortfolioSection } from "~/settings/constants";
import { AppTranslation } from "~/settings/i18n";
import type { IHomeContent } from "~/types/data";
import getDocument from "~/utils/getDocument";
import getStorageUrl from "~/utils/getStorageUrl";

import * as styles from "./styles.css";
import Section from "../section";

const HeroBanner = async () => {
  const [t, ct, content] = await Promise.all([
    getTranslations(`${AppTranslation.Portfolio}.heroBanner`),
    getTranslations(AppTranslation.Common),
    getDocument<IHomeContent>(AppCollection.Content, "home"),
  ]);
  const photo = await getStorageUrl(t("photoPath"));

  return (
    <Section id={PortfolioSection.HeroBanner} className={styles.band} innerClassName={styles.inner}>
      <div aria-hidden="true" className={styles.terrain}>
        <HairlineFigure figure="Terrain" label="" />
      </div>
      <div className={styles.content}>
        <h1 className={styles.name}>{ct("author")}</h1>
        <p className={styles.intro}>{content?.intro || t("intro")}</p>
        <SocialMedia className={styles.links} />
      </div>
      <div className={styles.photoFrame}>
        <NextImage
          className={styles.photo}
          src={photo}
          alt={t("photoAlt")}
          width={360}
          height={450}
          sizes="(max-width: 720px) 100vw, 360px"
          priority
        />
      </div>
    </Section>
  );
};
export default HeroBanner;
