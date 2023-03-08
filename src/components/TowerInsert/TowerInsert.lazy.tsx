import React, { lazy, Suspense } from 'react';

const LazyTowerInsert = lazy(() => import('./TowerInsert'));

const TowerInsert = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTowerInsert {...props} />
  </Suspense>
);

export default TowerInsert;
