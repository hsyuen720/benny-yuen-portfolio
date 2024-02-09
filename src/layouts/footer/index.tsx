import Label from "~/components/label";

import styles from "./styles.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <Label className={styles.label} title="© 2021 Benny Yuen. All rights reserved." />
    </div>
  );
};
export default Footer;
