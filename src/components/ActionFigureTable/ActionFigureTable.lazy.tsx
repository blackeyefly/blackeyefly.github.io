import React, { lazy, Suspense } from 'react';

const LazyActionFigureTable = lazy(() => import('./ActionFigureTable'));

const ActionFigureTable = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyActionFigureTable {...props} />
  </Suspense>
);

export default ActionFigureTable;
