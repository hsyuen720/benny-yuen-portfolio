import clsx from "clsx";
import NextImage, { type ImageProps } from "next/image";

import * as styles from "./styles.css";

const Image = (props: ImageProps) => {
  const { className, width, height, placeholder, draggable = false, ...rest } = props;
  return (
    <div
      className={clsx(styles.container, className)}
      style={{ minWidth: width, minHeight: height }}
    >
      {/* TODO: the issue of rendering image when using fill */}
      <NextImage
        {...rest}
        className={styles.image}
        width={width}
        height={height}
        placeholder={placeholder}
        draggable={draggable}
      />
    </div>
  );
};
export default Image;
