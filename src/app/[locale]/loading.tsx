import clsx from "clsx";

import Skeleton from "~/components/skeleton";
import * as heroBannerStyles from "~/modules/heroBanner/styles.css";
import * as navbarStyles from "~/modules/navbar/styles.css";
import * as sectionStyles from "~/modules/section/styles.css";

const Loading = () => {
  return (
    <>
      {/* Navbar skeleton - using actual navbar classes */}
      <header className={navbarStyles.navbar}>
        <Skeleton className={navbarStyles.logo} width="5em" height="2.5em" />
        <div className={navbarStyles.menu}>
          <Skeleton className={navbarStyles.menuItem} width="4em" height="1.25em" />
          <Skeleton className={navbarStyles.menuItem} width="4em" height="1.25em" />
          <Skeleton className={navbarStyles.menuItem} width="4em" height="1.25em" />
        </div>
      </header>

      {/* Hero banner skeleton - using actual hero classes with section wrapper */}
      <section className={clsx(sectionStyles.section, heroBannerStyles.container)}>
        <div className={heroBannerStyles.content}>
          <Skeleton className={heroBannerStyles.greeting} width="8em" height="1.25em" />
          <Skeleton className={heroBannerStyles.introduction} width="15em" height="2em" />
          <Skeleton className={heroBannerStyles.briefDescription} width="12em" height="1.25em" />
          <div className={heroBannerStyles.socialMedia}>
            <Skeleton width="2.5em" height="2.5em" variant="circular" />
          </div>
        </div>
        <Skeleton
          className={heroBannerStyles.profile}
          width="350px"
          height="350px"
          variant="circular"
        />
      </section>
    </>
  );
};

export default Loading;
