'use client';

import React from 'react';
import { Skeleton } from '@nextui-org/react';

const BlogRightSectionSkeleton = () => {
  return (
    <div className="relative cursor-pointer lg:pt-24 pt-0 space-y-6">
      {/* User profile skeleton */}
      <div className="flex gap-2 items-center">
        <Skeleton className="size-[40px] rounded-full" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-3 w-24 rounded-md" />
          <Skeleton className="h-3 w-16 rounded-md" />
        </div>
      </div>

      {/* Recent Blogs Header */}
      <Skeleton className="h-5 w-40 rounded-md" />

      {/* Recent Blogs List */}
      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx}>
            <Skeleton className="h-4 w-56 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogRightSectionSkeleton;
