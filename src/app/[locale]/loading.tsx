import Skeleton from "~/components/skeleton";
import * as navbarStyles from "~/modules/navbar/styles.css";
import * as sectionStyles from "~/modules/section/styles.css";

const Loading = () => (
  <>
    <header className={navbarStyles.header}>
      <div className={navbarStyles.nav}>
        <Skeleton width="7em" height="1.25em" />
      </div>
    </header>
    <div className={sectionStyles.inner}>
      <Skeleton width="min(100%, 480px)" height="96px" />
    </div>
  </>
);

export default Loading;
