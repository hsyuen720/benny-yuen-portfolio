import { Suspense as ReactSuspense } from "react";
import type { ComponentType } from "react";

import styles from "./styles.module.scss";

interface WithSuspenseOptions {
  fallback?: React.ReactNode;
}

const withSuspense = <P extends object>(
  WrappedComponent: ComponentType<P>,
  options?: WithSuspenseOptions,
) => {
  const SuspenseWrapper = (props: P) => {
    const defaultFallback = <div className={styles.loading}>Loading...</div>;
    const fallback = options?.fallback || defaultFallback;

    return (
      <ReactSuspense fallback={fallback}>
        <WrappedComponent {...props} />
      </ReactSuspense>
    );
  };

  // Set display name for better debugging
  SuspenseWrapper.displayName = `withSuspense(${WrappedComponent.displayName || WrappedComponent.name || ""})`;

  return SuspenseWrapper;
};

export default withSuspense;
