"use client";

import { useState } from "react";

import Button from "~/components/button";
import type { Project } from "~/utils/normalize";

import * as styles from "./styles.css";

const INITIAL_ROWS = 5;

export type MoreProjectsProps = {
  projects: Project[];
  labels: { title: string; showAll: string; code: string; live: string };
};

const stackText = (stack: Project["stack"]) =>
  stack.map((s) => (typeof s === "string" ? s : s.value)).join(", ");

const MoreProjects = (props: MoreProjectsProps) => {
  const { projects, labels } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const visible = isExpanded ? projects : projects.slice(0, INITIAL_ROWS);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{labels.title}</h3>
      <ul id="more-projects">
        {visible.map((project) => (
          <li key={project.id} className={styles.row}>
            <span className={styles.name}>{project.title}</span>
            <span>
              {project.summary}{" "}
              {project.stack.length > 0 ? (
                <span className={styles.stack}>{stackText(project.stack)}</span>
              ) : null}
            </span>
            <span className={styles.links}>
              {project.code ? (
                <a href={project.code} target="_blank" rel="noopener noreferrer">
                  {labels.code}
                </a>
              ) : null}
              {project.demo ? (
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  {labels.live}
                </a>
              ) : null}
            </span>
          </li>
        ))}
      </ul>
      {!isExpanded && projects.length > INITIAL_ROWS ? (
        <div className={styles.footer}>
          <Button
            className={styles.showAll}
            aria-controls="more-projects"
            aria-expanded={false}
            onClick={() => setIsExpanded(true)}
          >
            {labels.showAll}
          </Button>
        </div>
      ) : null}
    </div>
  );
};
export default MoreProjects;
