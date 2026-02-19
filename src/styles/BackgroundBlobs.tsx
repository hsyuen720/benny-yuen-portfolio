import * as styles from "./background.css";

const BackgroundBlobs = () => {
  return (
    <div className={styles.backgroundContainer} aria-hidden="true">
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.blob3} />
    </div>
  );
};

export default BackgroundBlobs;
