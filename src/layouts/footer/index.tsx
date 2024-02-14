import { useTranslations } from "next-intl";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

import Button from "~/components/button";
import Label from "~/components/label";
import { AppTranslation } from "~/settings/constants";

import styles from "./styles.module.scss";

const Footer = () => {
  const t = useTranslations(AppTranslation.Portfolio);
  return (
    <footer className={styles.footer}>
      <Label
        className={styles.label}
        title={t("footer.copyright", { year: "2024", name: "Benny Yuen" })}
      />
      <div className={styles.socialMedia}>
        <Button icon={FaGithub} />
        <Button icon={FaLinkedin} />
        <Button icon={FaEnvelope} />
      </div>
    </footer>
  );
};
export default Footer;
