import Section from "~/components/section";
import SectionTitle from "~/components/sectionTitle";
import { PortfolioSections } from "~/settings/constants";

const Projects = () => {
  return (
    <Section id={PortfolioSections.Projects}>
      <SectionTitle title="Projects" description="I am fine" />
    </Section>
  );
};
export default Projects;
