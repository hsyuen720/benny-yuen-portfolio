import Section from "~/components/section";
import SectionTitle from "~/components/sectionTitle";
import { PortfolioSections } from "~/settings/constants";

const Experience = () => {
  return (
    <Section id={PortfolioSections.Experience}>
      <SectionTitle title="Experience" description="I am fine" />
    </Section>
  );
};
export default Experience;
