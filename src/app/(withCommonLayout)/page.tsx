'use client';
import Home from '@/src/components/home/Home';
import HomePageFullSkeleton from '@/src/components/loading-skeleton/HomeSkeleton';
import React, { Suspense } from 'react';

const HomePage = () => {
  return (
    <Suspense fallback={<HomePageFullSkeleton />}>
      <Home />
    </Suspense>
  );
};

export default HomePage;
