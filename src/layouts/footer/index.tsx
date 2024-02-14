import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

import Button from "~/components/button";
import Label from "~/components/label";

import styles from "./styles.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Label className={styles.label} title={"hello"} />
      <div className={styles.socialMedia}>
        <Button icon={FaGithub} />
        <Button icon={FaLinkedin} />
        <Button icon={FaEnvelope} />
      </div>
    </footer>
  );
};
export default Footer;
