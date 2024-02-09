import Heading from "~/components/heading";
import ExperienceItem from "~/layouts/experience/experienceItem";
import Section from "~/layouts/section";
import { PortfolioSections } from "~/settings/constants";

import styles from "./styles.module.scss";

const experiences = [
  {
    company: "Melco Resorts & Entertainment",
    positions: ["Software Engineer"],
    fromDate: "2024-03-04",
    toDate: null,
    descriptions: ["I am fine", "I am fine", "I am fine"],
  },
  {
    company: "Amplify Health",
    positions: ["Frontend Engineer"],
    fromDate: "2022-11-11",
    toDate: "2024-03-01",
    descriptions: ["I am fine", "I am fine", "I am fine"],
  },
  {
    company: "Fujifilm Business Innovation Hong Kong Limited",
    positions: ["Analyst Programmer", "Programmer"],
    fromDate: "2019-07-01",
    toDate: "2022-11-11",
    descriptions: ["I am fine", "I am fine", "I am fine"],
  },
];

const Experience = () => {
  return (
    <Section id={PortfolioSections.Experience} className={styles.experience}>
      <Heading title="Experience" description="I started for journey for 5 years 🤓" />
      <div>
        {experiences.map((experience, index) => (
          <ExperienceItem key={index} {...experience} />
        ))}
      </div>
    </Section>
  );
};
export default Experience;
