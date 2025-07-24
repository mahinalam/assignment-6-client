'use client';

import React from 'react';
import { Skeleton } from '@nextui-org/react';

const HomePageFullSkeleton = () => {
  return (
    <div className="mt-[110px]  lg:mt-0 px-4 lg:px-0">
      {/* Category Buttons */}
      <div className="inline-flex flex-wrap gap-4 mb-6 lg:w-9/12 lg:pl-28">
        {Array.from({ length: 6 }).map((_, idx) => (
          <Skeleton key={idx} className="h-10 w-[80px] rounded-full" />
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Posts Section */}
        <div className="w-full lg:w-9/12 space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="p-4 rounded-xl shadow-md border space-y-4 w-full"
            >
              <Skeleton className="h-6 w-1/3 rounded-md" />
              <Skeleton className="h-[300px] w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4 rounded-md" />
              <Skeleton className="h-4 w-1/2 rounded-md" />
              <div className="flex gap-4">
                <Skeleton className="h-8 w-24 rounded-md" />
                <Skeleton className="h-8 w-16 rounded-md" />
              </div>
            </div>
          ))}

          {/* Load More Button */}
          <div className="text-center">
            <Skeleton className="h-10 w-[150px] mx-auto rounded-md" />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-3/12 space-y-6">
          {/* Profile Skeleton */}
          <div className="flex gap-4 items-center">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="w-28 h-3 rounded-md" />
              <Skeleton className="w-24 h-3 rounded-md" />
            </div>
          </div>

          {/* Section title */}
          <div>
            <Skeleton className="h-5 w-32 rounded-md mt-4" />
          </div>

          {/* Suggested posts skeleton list */}
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx}>
                <Skeleton className="h-5 w-5/6 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageFullSkeleton;
