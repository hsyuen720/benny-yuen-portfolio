import Image, { StaticImageData } from "next/image";
import type { IconType } from "react-icons";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

import Button from "~/components/button";
import TypingWords from "~/components/typingWords";
import Section from "~/layouts/section";
import { PortfolioSection } from "~/settings/constants";

import bg from "./bg.png";
import styles from "./styles.module.scss";

export type HeroBannerProps = {
  image: StaticImageData | string;
  greeting: string;
  introduction: {
    prefix: string;
    words: string[];
  };
  briefDescription: string;
  socialMedia: {
    icon: IconType;
    url: string;
  }[];
};

const HeroBanner = () => {
  return (
    <Section id={PortfolioSection.HeroBanner} className={styles.container}>
      <Image
        className={styles.background}
        alt="bg"
        src={bg}
        loading="eager"
        fill
        priority
        draggable={false}
      />
      <h2 className={styles.greeting}>HELLO👋. I am Benny!</h2>
      <h1 className={styles.introduction}>
        I am a <TypingWords words={["Frontend Developer!", "Mobile Developer!"]} />
      </h1>
      <p className={styles.briefDescription}>
        I am passionate to create creating responsive and engaging web/mobile applications.
      </p>
      <div className={styles.socialMedia}>
        <Button icon={FaGithub} />
        <Button icon={FaLinkedin} />
        <Button icon={FaEnvelope} />
      </div>
    </Section>
  );
};
export default HeroBanner;
