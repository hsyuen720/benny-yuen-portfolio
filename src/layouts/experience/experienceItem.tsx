import { DateTime } from "luxon";
import { FaClock } from "react-icons/fa";

import Label from "~/components/label";

import styles from "./styles.module.scss";

export type ExperienceItemProps = {
  company: string;
  positions: string[];
  fromDate: string;
  toDate: string | null;
  descriptions: string[];
};

const ExperienceItem = (props: ExperienceItemProps) => {
  const { company, positions, fromDate, toDate, descriptions } = props;

  const dateFormatOptions: Intl.DateTimeFormatOptions = { year: "numeric", month: "short" };

  const startDate = DateTime.fromISO(fromDate);
  const endDate = toDate ? DateTime.fromISO(toDate) : null;

  const formattedStartDate = startDate.isValid
    ? startDate.toLocaleString(dateFormatOptions)
    : "Invalid Date";

  const formattedEndDate = endDate?.isValid
    ? endDate.toLocaleString(dateFormatOptions)
    : endDate
      ? "Invalid Date"
      : "Present";

  return (
    <div className={styles.experienceItem}>
      <Label
        className={styles.period}
        icon={FaClock}
        title={`${formattedStartDate} - ${formattedEndDate}`}
      />
      <div className={styles.positions}>
        {positions.map((position, index) => (
          <Label key={index} className={styles.position}>
            {`${position}${index === 0 ? ` | ${company}` : ""}`}
          </Label>
        ))}
      </div>
      <ul className={styles.descriptions}>
        {descriptions.map((description, index) => (
          <li key={index} className={styles.description}>
            {description}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ExperienceItem;
