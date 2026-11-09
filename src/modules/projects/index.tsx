import { getTranslations } from "next-intl/server";

import Heading from "~/components/heading";
import { AppCollection, PortfolioSection } from "~/settings/constants";
import { AppTranslation } from "~/settings/i18n";
import type { IProject } from "~/types/data";
import getCollection from "~/utils/getCollection";
import { sortProjects, toProject } from "~/utils/normalize";

import MoreProjects from "./moreProjects";
import ProjectCard from "./projectCard";
import * as styles from "./styles.css";
import Section from "../section";

const MAX_FEATURED = 2;

const Projects = async () => {
  const [t, docs] = await Promise.all([
    getTranslations(`${AppTranslation.Portfolio}.projects`),
    // No orderBy: Firestore drops documents that lack the ordered field; we sort below
    getCollection<IProject>(AppCollection.Projects),
  ]);
  const projects = sortProjects(docs.map(toProject));
  const featured = projects.filter((p) => p.featured).slice(0, MAX_FEATURED);
  const others = projects.filter((p) => !featured.includes(p));

  return (
    <Section id={PortfolioSection.Projects} innerClassName={styles.inner}>
      <div className={styles.header}>
        <Heading title={t("title")} />
        <p className={styles.subtitle}>{t("subtitle")}</p>
      </div>
      {featured.map((project, index) => (
        <ProjectCard key={project.id} project={project} size={index === 0 ? "large" : "small"} />
      ))}
      {others.length > 0 ? (
        <MoreProjects
          projects={others}
          labels={{
            title: t("more"),
            showAll: t("showAll"),
            code: t("code"),
            live: t("live"),
          }}
        />
      ) : null}
    </Section>
  );
};
export default Projects;
