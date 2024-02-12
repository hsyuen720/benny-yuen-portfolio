import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

import Button from "~/components/button";
import Image from "~/components/image";
import TypingWords from "~/components/typingWords";
import Section from "~/layouts/section";
import { PortfolioSection } from "~/settings/constants";

import profile from "./profile.jpeg";
import styles from "./styles.module.scss";

const HeroBanner = () => {
  return (
    <Section id={PortfolioSection.HeroBanner} className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.greeting}>HELLO👋. I am Benny!</h2>
        <h1 className={styles.introduction}>
          I am a <TypingWords words={["Frontend Developer!", "Mobile Developer!"]} />
        </h1>
        <p className={styles.briefDescription}>
          I am passionate about building web and mobile applications that are user-friendly and
          accessible.
        </p>
        <div className={styles.socialMedia}>
          <Button icon={FaGithub} />
          <Button icon={FaLinkedin} />
          <Button icon={FaEnvelope} />
        </div>
      </div>
      <Image
        className={styles.profile}
        src={profile}
        alt="Benny's profile picture"
        width={350}
        height={350}
      />
    </Section>
  );
};
export default HeroBanner;
