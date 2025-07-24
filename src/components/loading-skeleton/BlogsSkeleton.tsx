'use client';

import React from 'react';
import { Skeleton } from '@nextui-org/react';

const BlogsPageSkeleton = () => {
  return (
    <div className="mt-[110px] lg:mt-0 flex gap-8">
      {/* Left section */}
      <div className="w-full lg:w-9/12">
        {/* Page Title Skeleton */}
        <div className="flex justify-center mb-4">
          <Skeleton className="h-10 w-1/2 rounded-lg" />
        </div>

        {/* Category Buttons Skeleton */}
        <div className="inline-flex flex-wrap w-full mb-6 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-20 rounded-md" />
          ))}
        </div>

        {/* Blog Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-40 w-full rounded-xl" />
              <Skeleton className="h-5 w-3/4 rounded-md" />
              <Skeleton className="h-4 w-1/2 rounded-md" />
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-center mt-6 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-10 rounded-full" />
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden lg:block lg:w-3/12">
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsPageSkeleton;
