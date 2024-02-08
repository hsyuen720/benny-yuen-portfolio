import Image from "next/image";

import Browser from "~/components/browser";
import Section from "~/components/section";
import SectionTitle from "~/components/sectionTitle";
import { PortfolioSections } from "~/settings/constants";

import image from "./benny.jpeg";
import styles from "./styles.module.scss";
const About = () => {
  return (
    <Section id={PortfolioSections.About} className={styles.about}>
      <SectionTitle title="About" description="I am fine" />
      <Browser contentClassName={styles.content} title="Benny Yuen| Frontend Developer">
        <Image src={image} alt="Benny Yuen" width={300} height={500} />
        <div>
          <p>
            I am a front-end developer currently based in Hong Kong. I graduated from HKUST with a
            Bachelor s degree in Computer Engineering. HKUST is a great place where I have developed
            a passion for developing high-quality applications. Hence, I wish to work with my
            interest and make beautiful, user-friendly applications for my target audience. It is
            how my web development journey starts.
          </p>
          <span>ss</span>
          <span>ss</span>
          <span>ss</span>
        </div>
      </Browser>
    </Section>
  );
};
export default About;
