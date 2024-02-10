import Image from "next/image";
import { useTranslations } from "next-intl";

import Browser from "~/components/browser";
import Button from "~/components/button";
import Heading from "~/components/heading";
import Section from "~/layouts/section";
import { AppTranslation, PortfolioSection } from "~/settings/constants";

import image from "./benny.jpeg";
import styles from "./styles.module.scss";

const About = () => {
  const t = useTranslations(AppTranslation.Portfolio);
  return (
    <Section id={PortfolioSection.About} className={styles.about}>
      <Heading title="About" description="A bit about me" />
      <Browser className={styles.browser} title={t("title")}>
        <Image className={styles.photo} src={image} alt="Benny Yuen" width={300} height={500} />
        <div className={styles.content}>
          <p className={styles.introduction}>
            {"<h1>"}I am a front-end developer currently based in Hong Kong. I graduated from HKUST
            with a Bachelor s degree in Computer Engineering. HKUST is a great place where I have
            developed a passion for developing high-quality applications. Hence, I wish to work with
            my interest and make beautiful, user-friendly applications for my target audience. It is
            how my web development journey starts.{"</h1>"}
          </p>
          <div>
            <span>#React</span>
            <span>#React Native</span>
            <span>#NextJS</span>
            <span>#Remix</span>
          </div>
          <div>
            <Button>Resume</Button>
          </div>
        </div>
      </Browser>
    </Section>
  );
};
export default About;
