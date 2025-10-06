import { Suspense } from "react";
import type { ComponentType } from "react";

import Skeleton from "~/components/skeleton";

import styles from "./styles.module.scss";

interface WithSuspenseOptions {
  fallback?: React.ReactNode;
  skeletonHeight?: string;
  skeletonCount?: number;
  className?: string;
}

const withSuspense = <P extends object>(
  WrappedComponent: ComponentType<P>,
  options?: WithSuspenseOptions,
) => {
  const SuspenseWrapper = (props: P) => {
    const { skeletonHeight = "200px", skeletonCount = 1, className, fallback } = options || {};

    const defaultFallback = (
      <div className={`${styles.loading} ${className || ""}`}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <Skeleton
            key={index}
            height={skeletonHeight}
            variant="rectangular"
            className={styles.skeleton}
          />
        ))}
      </div>
    );

    const finalFallback = fallback || defaultFallback;

    return (
      <Suspense fallback={finalFallback}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  };

  // Set display name for better debugging
  SuspenseWrapper.displayName = `withSuspense(${WrappedComponent.displayName || WrappedComponent.name})`;

  return SuspenseWrapper;
};

export default withSuspense;
