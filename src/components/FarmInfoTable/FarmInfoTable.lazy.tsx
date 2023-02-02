import React, { lazy, Suspense } from 'react';

const LazyFarmInfoTable = lazy(() => import('./FarmInfoTable'));

const FarmInfoTable = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyFarmInfoTable towers={[]} {...props} />
  </Suspense>
);

export default FarmInfoTable;
