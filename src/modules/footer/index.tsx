import { useTranslations } from "next-intl";

import Label from "~/components/label";
import { AppTranslation } from "~/settings/i18n";

import styles from "./styles.module.scss";

import SocialMedia from "~/modules/socialMedia";

const Footer = () => {
  const t = useTranslations();
  return (
    <footer className={styles.footer}>
      <Label
        className={styles.label}
        title={t(`${AppTranslation.Portfolio}.footer.copyright`, {
          year: 2024,
          name: t(`${AppTranslation.Common}.author`),
        })}
      />
      <SocialMedia />
    </footer>
  );
};
export default Footer;
