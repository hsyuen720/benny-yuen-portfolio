import clsx from "clsx";
import NextImage from "next/image";
import { useTranslations } from "next-intl";

import HairlineFigure from "~/components/hairlineFigure";
import { AppTranslation } from "~/settings/i18n";
import type { IStackRow } from "~/types/data";
import type { Project } from "~/utils/normalize";

import * as styles from "./styles.css";

export type ProjectCardProps = {
  project: Project;
  size: "large" | "small";
};

const isRow = (item: string | IStackRow): item is IStackRow => typeof item === "object";

export const StatusBadge = ({ status }: { status: string }) =>
  status === "live" ? null : <span className={styles.badge}>{status}</span>;

const ProjectCard = (props: ProjectCardProps) => {
  const { project, size } = props;
  const { title, summary, stack, code, demo, image, status } = project;
  const t = useTranslations(`${AppTranslation.Portfolio}.projects`);
  const isLarge = size === "large";

  // Large cards show label/value rows; plain strings collapse into one "Stack" row
  const rows: IStackRow[] = stack.every(isRow)
    ? stack
    : [{ label: t("stack"), value: stack.map((s) => (isRow(s) ? s.value : s)).join(", ") }];

  return (
    <article className={clsx(styles.card, isLarge ? styles.large : styles.small)}>
      <div className={styles.media}>
        {image ? (
          <NextImage
            className={styles.image}
            src={image}
            alt=""
            fill
            sizes="(max-width: 720px) 100vw, 560px"
          />
        ) : (
          <HairlineFigure className={styles.figure} figure="Exploded" label={title} />
        )}
      </div>
      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{title}</h3>
          <StatusBadge status={status} />
        </div>
        <p className={styles.summary}>{summary}</p>
        {isLarge ? (
          stack.length > 0 ? (
            <dl className={styles.rows}>
              {rows.map((row, i) => (
                <div key={i} className={styles.row}>
                  <dt className={styles.rowLabel}>{row.label}</dt>
                  <dd className={styles.rowValue}>{row.value}</dd>
                </div>
              ))}
            </dl>
          ) : null
        ) : (
          <p className={styles.stackLine}>{rows.map((r) => r.value).join(", ")}</p>
        )}
        <div className={styles.links}>
          {code ? (
            <a href={code} target="_blank" rel="noopener noreferrer">
              {isLarge && code.includes("github.com") ? t("viewOnGithub") : t("code")}
            </a>
          ) : null}
          {demo ? (
            <a href={demo} target="_blank" rel="noopener noreferrer">
              {t("demo")}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
};
export default ProjectCard;
