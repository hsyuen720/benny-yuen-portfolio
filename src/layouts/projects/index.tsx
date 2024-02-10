import clsx from "clsx";
import Image from "next/image";

import Heading from "~/components/heading";
import Section from "~/layouts/section";
import { PortfolioSection } from "~/settings/constants";

import styles from "./styles.module.scss";
import testImage from "../about/benny.jpeg";

const projects = [
  {
    year: "2024",
    name: "Personal Website Version 2",
    description: "My personal portfolio",
    techStack: ["React", "NextJS", "TypeScript", "Sass"],
    link: "",
    github: "",
    photo: "",
  },
  {
    year: "2022",
    name: "HKID Generator",
    description: "xxxx",
    techStack: ["React", "NextJS", "TypeScript", "Sass"],
    link: "",
    github: "",
    photo: "",
  },
];

const Projects = () => {
  return (
    <Section id={PortfolioSection.Projects} className={styles.projects}>
      <Heading title="Projects" description="I am fine" />
      <div className={styles.content}>
        {projects.map((project, index) => (
          <div key={index} className={clsx(styles.projectItem, { [styles.isReverse]: index % 2 })}>
            <Image
              className={styles.image}
              src={testImage}
              alt={project.name}
              width={300}
              height={200}
            />
            <div className={styles.detail}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div>
                {project.techStack.map((tech, index) => (
                  <span key={index}>{tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
export default Projects;
