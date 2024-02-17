import clsx from "clsx";

import Label from "~/components/label";

import styles from "./styles.module.scss";

export type SectionTitleProps = {
  title?: string;
  description?: string;
  isDark?: boolean;
  isSeparatorShown?: boolean;
};

const Heading = (props: SectionTitleProps) => {
  const { title, description, isDark, isSeparatorShown } = props;
  return (
    <div className={clsx(styles.sectionTitle, { [styles.isDark]: isDark })}>
      {description ? <Label className={styles.description} tag="span" title={description} /> : null}
      <Label className={styles.title} tag="h2" title={title} />
      {isSeparatorShown ? <div className={styles.separator} /> : null}
    </div>
  );
};
export default Heading;
