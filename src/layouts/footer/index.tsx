import { useTranslations } from "next-intl";

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
    </footer>
  );
};
export default Footer;
