'use client';

import { Skeleton } from '@nextui-org/skeleton';
import { Card, CardBody } from '@nextui-org/react';
import DashboardContainer from '../DashboardContainer';

const UserDashboardSkeleton = () => {
  return (
    <DashboardContainer>
      {/* Overview Title */}
      <div className="mt-4 pt-6 lg:pt-8">
        <Skeleton className="w-40 h-6 rounded-lg mb-4" />
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Card key={idx} className="w-full h-[100px]">
            <CardBody className="flex gap-4 items-center justify-between">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="flex flex-col gap-2 w-full">
                <Skeleton className="w-1/2 h-4 rounded-lg" />
                <Skeleton className="w-1/3 h-4 rounded-lg" />
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Recent Posts Title */}
      <div className="pt-6 lg:pt-8">
        <Skeleton className="w-48 h-6 rounded-lg mb-4" />
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-5 gap-4 px-2 py-2 font-medium text-sm text-gray-500">
        <Skeleton className="h-5 w-full rounded" />
        <Skeleton className="h-5 w-full rounded" />
        <Skeleton className="h-5 w-full rounded" />
        <Skeleton className="h-5 w-full rounded" />
        <Skeleton className="h-5 w-full rounded" />
      </div>

      {/* Table Rows */}
      <div className="space-y-4 mt-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-5 items-center gap-4 px-2 py-3 border rounded-md"
          >
            {/* USER */}
            <div className="flex items-center gap-2">
              <Skeleton className="size-10 rounded-full" />
              <Skeleton className="h-4 w-24 rounded" />
            </div>

            {/* POST */}
            <div className="flex items-center gap-2">
              <Skeleton className="size-10 rounded-full" />
              <Skeleton className="h-4 w-20 rounded" />
            </div>

            {/* CATEGORY */}
            <Skeleton className="h-4 w-16 rounded" />

            {/* STATUS */}
            <Skeleton className="h-4 w-20 rounded" />

            {/* CONTENT TYPE */}
            <Skeleton className="h-4 w-20 rounded" />
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="w-8 h-8 rounded-full" />
        ))}
      </div>
    </DashboardContainer>
  );
};

export default UserDashboardSkeleton;
