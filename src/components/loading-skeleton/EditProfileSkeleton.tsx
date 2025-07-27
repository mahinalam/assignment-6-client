'use client';

import { Skeleton } from '@nextui-org/react';
import Container from '../Container';

const EditProfileSkeleton = () => {
  return (
    <Container>
      <div className="lg:mt-[106px] mt-0">
        {/* Header */}
        <Skeleton className="h-8  w-56 mb-6 mx-auto md:mx-0 rounded-lg" />

        {/* Profile Card */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-gray-100 p-6 rounded-3xl shadow mb-8">
          <div className="flex items-center gap-4">
            <Skeleton className="w-20 h-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-40 rounded-md" />
              <Skeleton className="h-3 w-32 rounded-md" />
            </div>
          </div>
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20 rounded-md" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20 rounded-md" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-28 rounded-md" />
            <Skeleton className="h-20 w-full rounded-lg" />
          </div>
        </div>

        {/* Image Upload Preview Skeleton */}
        <div className="space-y-3 mb-6">
          <Skeleton className="h-4 w-36 rounded-md" />
          <Skeleton className="h-16 w-full rounded-lg" />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Skeleton className="h-12 w-36 rounded-xl" />
        </div>
      </div>
    </Container>
  );
};

export default EditProfileSkeleton;
