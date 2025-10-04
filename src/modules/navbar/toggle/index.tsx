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
      type="button"
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
    >
      <svg
        className={styles.hamburger}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <rect className={styles.line} width={80} height={10} x={10} y={25} rx={5} />
        <rect className={styles.line} width={80} height={10} x={10} y={45} rx={5} />
        <rect className={styles.line} width={80} height={10} x={10} y={65} rx={5} />
      </svg>
    </button>
  );
};
export default Toggle;
