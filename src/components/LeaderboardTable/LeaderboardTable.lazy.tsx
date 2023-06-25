import React, { lazy, Suspense } from 'react';

const LazyLeaderboardTable = lazy(() => import('./LeaderboardTable'));

const LeaderboardTable = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyLeaderboardTable {...props} />
  </Suspense>
);

export default LeaderboardTable;
