import clsx from "clsx";

import Button from "~/components/button";
import { IconSetting } from "~/modules/socialMedia/setting";
import { AppCollection } from "~/settings/constants";
import type { ISocialMedia } from "~/types/data";
import getCollection from "~/utils/getCollection";

import * as styles from "./styles.css";

export type SocialMediaProps = {
  className?: string;
};

const SocialMedia = async (props: SocialMediaProps) => {
  const { className } = props;
  const data = await getCollection<ISocialMedia>(AppCollection.SocialMedia, {
    orderBy: "order",
    order: "asc",
  });
  return (
    <div className={clsx(styles.container, className)}>
      {data.map((item) => (
        <Button
          key={item.id}
          tag="a"
          href={item.id === "email" ? `mailto:${item.value}` : item.value}
          icon={IconSetting[item.id]}
        />
      ))}
    </div>
  );
};
export default SocialMedia;
