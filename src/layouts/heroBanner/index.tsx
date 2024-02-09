import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

import Button from "~/components/button";
import TypingWords from "~/components/typingWords";
import Section from "~/layouts/section";
import { PortfolioSections } from "~/settings/constants";

import styles from "./styles.module.scss";

const HeroBanner = () => {
  return (
    <Section id={PortfolioSections.HeroBanner} className={styles.container}>
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
