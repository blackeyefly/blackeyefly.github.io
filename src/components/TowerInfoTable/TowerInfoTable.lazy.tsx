import React, { lazy, Suspense } from 'react';

const LazyTowerInfoTable = lazy(() => import('./TowerInfoTable'));

const TowerInfoTable = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTowerInfoTable towers={[]} {...props} />
  </Suspense>
);

export default TowerInfoTable;
