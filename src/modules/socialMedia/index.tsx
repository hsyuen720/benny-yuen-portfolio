import clsx from "clsx";
import { getTranslations } from "next-intl/server";

import Button from "~/components/button";
import { IconSetting } from "~/modules/socialMedia/setting";
import { AppCollection, SocialMedia as SocialMediaId } from "~/settings/constants";
import { AppTranslation } from "~/settings/i18n";
import type { ISocialMedia } from "~/types/data";
import getCollection from "~/utils/getCollection";

import * as styles from "./styles.css";

export type SocialMediaProps = {
  className?: string;
  /** Show the email address as text on the email button (contact section). */
  showEmailAddress?: boolean;
};

const SocialMedia = async (props: SocialMediaProps) => {
  const { className, showEmailAddress } = props;
  const [t, data] = await Promise.all([
    getTranslations(`${AppTranslation.Portfolio}.socialMedia`),
    getCollection<ISocialMedia>(AppCollection.SocialMedia, { orderBy: "order", order: "asc" }),
  ]);
  return (
    <div className={clsx(styles.container, className)}>
      {/* Email leads: it is the primary way to reach Benny */}
      {[...data]
        .sort((a, b) => Number(b.id === SocialMediaId.Email) - Number(a.id === SocialMediaId.Email))
        .map((item) => {
          const isEmail = item.id === SocialMediaId.Email;
          const withText = isEmail && showEmailAddress;
          return (
            <Button
              key={item.id}
              href={isEmail ? `mailto:${item.value}` : item.value}
              variant={isEmail ? "primary" : "secondary"}
              icon={IconSetting[item.id]}
              aria-label={withText ? undefined : t(item.id)}
              title={withText ? undefined : t(item.id)}
              {...(isEmail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
            >
              {withText ? item.value : null}
            </Button>
          );
        })}
    </div>
  );
};
export default SocialMedia;
