'use client';

import {
  Skeleton,
  Card,
  CardHeader,
  CardBody,
  Avatar,
} from '@nextui-org/react';

export default function TopGardenersSkeleton() {
  return (
    <main className="min-h-screen bg-[#f7fefc] dark:bg-gray-950 py-16 px-6 lg:px-20 mt-[106px] lg:mt-0">
      {/* Header Section Skeleton */}
      <section className="text-center max-w-3xl mx-auto mb-14">
        <Skeleton className="h-10 w-3/4 mx-auto mb-4 rounded-md" />
        <Skeleton className="h-5 w-2/3 mx-auto rounded-md" />
      </section>

      {/* 3 Loading Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card
            key={index}
            className="shadow-md border border-gray-200 dark:border-gray-800"
          >
            <CardHeader className="flex items-center gap-4">
              <Skeleton className="rounded-full w-14 h-14" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-32 rounded-md" />
                <Skeleton className="h-3 w-24 rounded-md" />
              </div>
            </CardHeader>
            <CardBody className="px-6 pb-6 pt-2">
              <Skeleton className="h-8 w-24 rounded-full" />
            </CardBody>
          </Card>
        ))}
      </section>

      {/* Call-to-Action Section */}
      <section className="mt-24 text-center max-w-2xl mx-auto">
        <Skeleton className="h-6 w-3/4 mx-auto rounded-md mb-3" />
        <Skeleton className="h-4 w-2/3 mx-auto rounded-md mb-4" />
        <Skeleton className="h-10 w-40 mx-auto rounded-full" />
      </section>
    </main>
  );
}
