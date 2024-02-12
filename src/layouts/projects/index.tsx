import clsx from "clsx";
import { Fragment } from "react";

import Heading from "~/components/heading";
import Image from "~/components/image";
import Project from "~/layouts/projects/project";
import Section from "~/layouts/section";
import { PortfolioSection } from "~/settings/constants";

import styles from "./styles.module.scss";
import testImage from "../about/benny.jpeg";

const projects = [
  {
    year: "2024",
    name: "Personal Website Version 2",
    description:
      "It is my portfolio website that I develop with NextJS and Firebase. All content in this application stored in the firebase can be modified using a built-in UI. The primary reason I chose such frameworks is I can build the application in a short time.",
    techStack: ["React", "NextJS", "TypeScript", "Sass"],
    url: "",
    repository: "",
    photo: testImage,
  },
  {
    year: "2022",
    name: "HKID Generator",
    description: "xxxx",
    techStack: ["React", "NextJS", "TypeScript", "Sass"],
    url: "",
    repository: "",
    photo: testImage,
  },
];

const Projects = () => {
  return (
    <Section isLight id={PortfolioSection.Projects} className={styles.projects}>
      <Heading isDark title="Projects" description="I am fine" />
      {projects.map((project, index) => (
        <Project {...project} key={index} index={index} />
      ))}
    </Section>
  );
};
export default Projects;
