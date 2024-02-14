import Browser from "~/components/browser";
import Heading from "~/components/heading";
import Image from "~/components/image";
import Label from "~/components/label";
import Section from "~/layouts/section";
import { PortfolioSection } from "~/settings/constants";

import image from "./benny.jpeg";
import styles from "./styles.module.scss";

const About = () => {
  return (
    <Section isLight id={PortfolioSection.About} className={styles.about}>
      <Heading isDark title="About" description="A bit about me" />
      <Browser isDark className={styles.browser} title={"Benny Yuen"}>
        <Image className={styles.photo} src={image} alt="Benny Yuen" width={300} height={300} />
        <div className={styles.content}>
          <Heading isDark title="Who am I" />
          <p>
            I am an experienced frontend developer with a strong passion for creating responsive and
            engaging web/mobile applications. I take pride in my work ethic, problem solving skills,
            and attention to detail. My main focus is on building interactive application that
            empower others by allowing them to engage with their own content and share it with
            others through various forms of technology.
          </p>
          <div className={styles.hashtag}>
            {[
              "Frontend Development",
              "Mobile Development",
              "React",
              "React Native",
              "NextJS",
              "Remix",
            ].map((item) => (
              <Label key={item} title={`#${item}`} />
            ))}
          </div>
        </div>
      </Browser>
    </Section>
  );
};
export default About;
