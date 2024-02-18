import clsx from "clsx";

import styles from "./styles.module.scss";

export type ToggleProps = {
  className?: string;
  isOpen: boolean;
  onClick: () => void;
};

const Toggle = (props: ToggleProps) => {
  const { className, isOpen, onClick } = props;
  return (
    <button
      className={clsx(styles.container, className)}
      aria-controls="navbar-menu"
      aria-expanded={isOpen}
      onClick={onClick}
    >
      <svg className={styles.hamburger} viewBox="0 0 100 100">
        {Array.from({ length: 3 }).map((_, index) => (
          <rect
            className={styles.line}
            key={index}
            width={80}
            height={10}
            x={10}
            y={25 + 20 * index}
            rx={5}
          />
        ))}
      </svg>
    </button>
  );
};
export default Toggle;
