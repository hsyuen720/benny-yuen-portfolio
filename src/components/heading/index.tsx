import type { IconType } from "react-icons";

import Label from "~/components/label";

import styles from "./styles.module.scss";

export type SectionTitleProps = {
  title?: string;
  description?: string;
};

const Heading = (props: SectionTitleProps) => {
  const { title, description } = props;
  return (
    <div className={styles.sectionTitle}>
      {description ? <Label className={styles.description} tag="span" title={description} /> : null}
      <Label className={styles.title} tag="h2" title={title} />
    </div>
  );
};
export default Heading;
