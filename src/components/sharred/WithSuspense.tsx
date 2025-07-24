// src/components/WithSuspense.tsx
'use client';

import { Suspense, ReactNode } from 'react';
import SkeletonLoading from '../UI/SkeletonLoading';

const WithSuspense = ({ children }: { children: ReactNode }) => {
  return <Suspense fallback={<SkeletonLoading />}>{children}</Suspense>;
};

export default WithSuspense;
