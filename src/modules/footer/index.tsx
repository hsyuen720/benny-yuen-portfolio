import { DateTime } from "luxon";
import { useTranslations } from "next-intl";

import Label from "~/components/label";
import SocialMedia from "~/modules/socialMedia";
import { AppTranslation } from "~/settings/i18n";

import styles from "./styles.module.scss";

const Footer = () => {
  const t = useTranslations();
  return (
    <footer className={styles.footer}>
      <Label
        className={styles.label}
        title={t(`${AppTranslation.Portfolio}.footer.copyright`, {
          year: DateTime.now().year,
          name: t(`${AppTranslation.Common}.author`),
        })}
      />
      <SocialMedia />
    </footer>
  );
};
export default Footer;
