import clsx from "clsx";

import Button from "~/components/button";
import { AppCollection } from "~/settings/constants";
import type { ISocialMedia } from "~/types/data";
import getCollection from "~/utils/getCollection";

import styles from "./styles.module.scss";

import { IconSetting } from "~/modules/socialMedia/setting";

export type SocialMediaProps = {
  className?: string;
};

const SocialMedia = async (props: SocialMediaProps) => {
  const { className } = props;
  const data = ((await getCollection(AppCollection.SocialMedia, {
    orderBy: "order",
    order: "asc",
  })) ?? []) as ISocialMedia[];
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
