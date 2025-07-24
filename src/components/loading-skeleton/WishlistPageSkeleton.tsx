'use client';

import React from 'react';
import { Skeleton } from '@nextui-org/skeleton';
import DashboardContainer from '../DashboardContainer';

const WishlistPageSkeleton = () => {
  return (
    <DashboardContainer>
      {/* Heading and Create button */}
      <div className="lg:mb-6 flex justify-between items-center">
        <Skeleton className="h-8 w-40 rounded-md mt-8" />
      </div>

      {/* Grid of post skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="border p-4 rounded-lg shadow-sm flex flex-col gap-3"
          >
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4 rounded-md" />
            <Skeleton className="h-4 w-1/2 rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-8 w-24 rounded-md mt-2" />
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-center mt-6 gap-2">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-8 w-8 rounded-md" />
        ))}
      </div>
    </DashboardContainer>
  );
};

export default WishlistPageSkeleton;
