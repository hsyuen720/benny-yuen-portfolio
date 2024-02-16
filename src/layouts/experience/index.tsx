import clsx from "clsx";
import { DateTime } from "luxon";
import { useTranslations } from "next-intl";
import { Fragment } from "react";
import { FaBusinessTime, FaCodeBranch, FaSuitcase } from "react-icons/fa";

import Hashtag from "~/components/hashtag";
import Heading from "~/components/heading";
import Label from "~/components/label";
import Section from "~/layouts/section";
import { PortfolioSection } from "~/settings/constants";
import { AppTranslation } from "~/settings/i18n";

import styles from "./styles.module.scss";

const experiences = [
  {
    company: "Amplify Health",
    positions: ["Frontend Engineer"],
    fromDate: "2022-11-11",
    toDate: "2024-03-01",
    descriptions: [
      "Implementing new features on AIA Vitality Indonesia Mobile Application",
      "Optimising app performance such as reducing the number of API calls, and preventing unnecessary rerendering",
      "Implementing a CI/CD pipeline using Detox, Fastlane in Azure Pipeline to enhance product quality and reduce product delivery time.",
    ],
    technologies: ["React", "TypeScript", "GraphQL", "Node.js", "AWS"],
  },
  {
    company: "Fujifilm Business Innovation Hong Kong Limited",
    positions: ["Analyst Programmer", "Programmer"],
    fromDate: "2019-07-01",
    toDate: "2022-11-11",
    descriptions: [
      "I am fine",
      "I am fine",
      "I am an experienced frontend developer with a strong passion for creating responsive and engaging web/mobile applications. I take pride in my work ethic, problem solving skills, and attention to detail. My main focus is on building interactive application that empower others by allowing them to engage with their own content and share it with others through various forms of technology.",
    ],
    technologies: ["React", "TypeScript", "GraphQL", "Node.js", "AWS"],
  },
];

const Experience = () => {
  const t = useTranslations(`${AppTranslation.Portfolio}.experience`);
  return (
    <Section id={PortfolioSection.Experience} className={styles.experience}>
      <Heading isSeparatorShown title={t("title")} description={t("subtitle")} />
      <div className={styles.timeline}>
        {experiences.map((experience, index) => {
          const { company, positions, fromDate, toDate, descriptions, technologies } = experience;
          const intlOption: Intl.DateTimeFormatOptions = { year: "numeric", month: "short" };
          const from = DateTime.fromISO(fromDate).toLocaleString(intlOption);
          const to = toDate ? DateTime.fromISO(toDate).toLocaleString(intlOption) : "Present";
          return (
            <div key={index} className={styles.item}>
              <Label className={styles.period} icon={FaBusinessTime} title={`${from} - ${to}`} />
              <div className={styles.separator}>
                <div className={clsx(styles.top, styles.line)} />
                <div className={styles.dot} />
                <div className={clsx(styles.bottom, styles.line)} />
              </div>
              <div className={styles.detail}>
                <Label icon={FaCodeBranch} className={styles.positions}>
                  {positions.map((position, index) => (
                    <Fragment key={position}>
                      <span className={styles.position}>{position}</span>
                      {index !== positions.length - 1 && <span> | </span>}
                    </Fragment>
                  ))}
                </Label>
                <Label className={styles.company} icon={FaSuitcase} title={company} />
                <ul className={styles.descriptions}>
                  {descriptions.map((description, index) => (
                    <li key={index} className={styles.description}>
                      {description}
                    </li>
                  ))}
                </ul>
                <span className={styles.technologies}>
                  {technologies.map((technology, index) => (
                    <Hashtag key={technology}>#{technology}</Hashtag>
                  ))}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};
export default Experience;
