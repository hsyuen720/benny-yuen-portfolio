import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { FaCode, FaLink, FaVial } from "react-icons/fa";

import Button from "~/components/button";
import Hashtag from "~/components/hashtag";
import Heading from "~/components/heading";
import Label from "~/components/label";
import useFormat from "~/hooks/useFormat";
import { AppCollection, PortfolioSection } from "~/settings/constants";
import { AppTranslation } from "~/settings/i18n";
import { IProject } from "~/types/data";
import getCollection from "~/utils/getCollection";

import styles from "./styles.module.scss";
import Section from "../section";

const Projects = async () => {
  const format = useFormat();

  const t = await getTranslations(`${AppTranslation.Portfolio}.projects`);
  const projects = await getCollection<IProject>(AppCollection.Projects, {
    orderBy: "date",
    order: "desc",
  });
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
                  src={photo}
                  alt="Project Image"
                  fill
                  sizes="18em"
                  priority
                />
              ) : null}
              <div className={styles.detail}>
                <Label className={styles.name} tag="h3" icon={FaVial} title={format(name)} />
                <p className={styles.description}>{format(description)}</p>
                <div className={styles.footer}>
                  <div className={styles.technologies}>
                    {technologies.map((technology, index) => (
                      <Hashtag key={index}>#{technology}</Hashtag>
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
