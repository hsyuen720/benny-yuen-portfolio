import Browser from "~/components/browser";
import Section from "~/components/section";
import { PortfolioSections } from "~/settings/constants";

const About = () => {
  return (
    <Section id={PortfolioSections.About}>
      <h3>About</h3>
      <Browser>lolll</Browser>
    </Section>
  );
};
export default About;
