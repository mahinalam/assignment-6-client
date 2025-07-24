'use client';

import React from 'react';
import { Skeleton, Input } from '@nextui-org/react';
import { CiSearch } from 'react-icons/ci';

const LeftSectionSkeleton = () => {
  return (
    <div className="border-r-2 fixed p-5 inset-0 w-2/12 space-y-4">
      {/* Search Input Skeleton */}
      <Input
        isDisabled
        type="text"
        placeholder="Search posts..."
        className="rounded mb-3 w-full ml-auto"
        size="lg"
        startContent={<CiSearch size={20} />}
      />

      {/* Logo Skeleton */}
      <div className="py-7">
        <Skeleton className="h-5 w-3/4 rounded-md" />
      </div>

      {/* Nav Links Skeleton */}
      {Array.from({ length: 6 }).map((_, idx) => (
        <div key={idx} className="flex items-center gap-4 py-2 px-1">
          <Skeleton className="h-6 w-6 rounded-md" />
          <Skeleton className="h-4 w-3/4 rounded-md" />
        </div>
      ))}

      {/* Avatar and User Dropdown Skeleton */}
      <div className="flex items-center gap-3 mt-6 px-1">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-1">
          <Skeleton className="h-4 w-2/3 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default LeftSectionSkeleton;
