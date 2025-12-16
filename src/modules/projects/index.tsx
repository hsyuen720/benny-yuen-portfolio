import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { FaCode, FaLink, FaVial } from "react-icons/fa";

import Button from "~/components/button";
import Hashtag from "~/components/hashtag";
import Heading from "~/components/heading";
import Label from "~/components/label";
import { AppCollection, PortfolioSection } from "~/settings/constants";
import { AppTranslation } from "~/settings/i18n";
import type { IProject } from "~/types/data";
import getCollection from "~/utils/getCollection";
import getFormat from "~/utils/getFormat";

import * as styles from "./styles.css";
import Section from "../section";

const Projects = async () => {
  const format = await getFormat();

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

          // Use GitHub OG image as fallback when no photo but has repository URL
          const getGitHubOgImage = (repoUrl: string) => {
            const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
            if (match) {
              const [, owner, repo] = match;
              return `https://opengraph.githubassets.com/1/${owner}/${repo.replace(/\.git$/, "")}`;
            }
            return null;
          };

          const imageUrl = photo || (repository ? getGitHubOgImage(repository) : null);

          return (
            <div className={styles.project} key={index}>
              {imageUrl ? (
                <Image
                  className={styles.photo}
                  src={imageUrl}
                  alt="Project Image"
                  fill
                  sizes="18em"
                  loading="lazy"
                />
              ) : null}
              <div className={styles.detail}>
                <Label className={styles.name} tag="h3" icon={FaVial} title={format(name)} />
                <p className={styles.projectDescription}>{format(description)}</p>
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
