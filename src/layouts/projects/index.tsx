import clsx from "clsx";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { FaCode, FaLink, FaVial } from "react-icons/fa";

import Button from "~/components/button";
import Heading from "~/components/heading";
import Label from "~/components/label";
import Section from "~/layouts/section";
import { PortfolioSection } from "~/settings/constants";
import { AppTranslation } from "~/settings/i18n";

import styles from "./styles.module.scss";
import testImage from "../about/benny.jpeg";

const projects = [
  {
    year: "2024",
    name: "Personal Website Version 2",
    description:
      "It is my portfolio website that I develop with NextJS and Firebase. All content in this application stored in the firebase can be modified using a built-in UI. The primary reason I chose such frameworks is I can build the application in a short time.",
    technologies: ["React", "NextJS", "TypeScript", "Sass"],
    url: "https://www.google.com",
    repository: "https://www.google.com",
    photo: testImage,
  },
  {
    year: "2022",
    name: "HKID Generator",
    description: "xxxx",
    technologies: ["React", "NextJS", "TypeScript", "Sass"],
    url: "https://www.google.com",
    repository: "https://www.google.com",
    photo: testImage,
  },
];

const Projects = () => {
  const t = useTranslations(`${AppTranslation.Portfolio}.projects`);
  return (
    <Section isLight id={PortfolioSection.Projects} className={styles.projects}>
      <Heading isDark title={t("title")} description={t("subtitle")} />
      <div className={styles.content}>
        {projects.map((project, index) => {
          const { photo, name, description, technologies, url, repository } = project;
          return (
            <div className={styles.project} key={index}>
              {photo ? (
                <Image
                  className={styles.photo}
                  src={project.photo}
                  alt="Project Image"
                  fill
                  sizes="18em"
                  quality={100}
                  priority
                />
              ) : null}
              <div className={styles.detail}>
                <Label className={styles.name} tag="h3" icon={FaVial} title={name} />
                <p className={styles.description}>{description}</p>
                <div className={styles.footer}>
                  <div className={styles.technologies}>
                    {technologies.map((technology, index) => (
                      <span key={index}>#{technology}</span>
                    ))}
                  </div>
                  <div className={styles.links}>
                    {repository ? (
                      <Button tag="a" icon={FaCode} href={repository} target="_blank" />
                    ) : null}
                    {url ? <Button tag="a" icon={FaLink} href={url} target="_blank" /> : null}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};
export default Projects;
