import { DateTime } from "luxon";
import { getTranslations } from "next-intl/server";

import Label from "~/components/label";
import SocialMedia from "~/modules/socialMedia";
import { AppTranslation } from "~/settings/i18n";

import * as styles from "./styles.css";

const Footer = async () => {
  const t = await getTranslations();
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
