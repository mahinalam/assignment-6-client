// components/profile/ProfileSkeleton.tsx
import React from 'react';

const ProfileSkeleton = () => {
  return (
    <div className="lg:w-[70%] w-full mx-auto animate-pulse">
      {/* Profile Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-start md:gap-10 items-center">
        {/* Image */}
        <div className="flex justify-center">
          <div className="w-24 h-24 md:w-36 md:h-36 rounded-full bg-gray-300" />
        </div>

        {/* Info */}
        <div className="flex-1 mt-4 md:mt-0 w-full space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:gap-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="h-5 w-24 bg-gray-300 rounded" />
              <div className="w-5 h-5 bg-blue-300 rounded-full" />
            </div>
            <div className="flex justify-center md:justify-start gap-2 mt-2 md:mt-0">
              <div className="h-8 w-20 bg-gray-300 rounded" />
              <div className="h-8 w-20 bg-gray-300 rounded" />
            </div>
          </div>
          <div className="flex justify-center md:justify-start gap-6">
            <div className="h-4 w-16 bg-gray-300 rounded" />
            <div className="h-4 w-20 bg-gray-300 rounded" />
            <div className="h-4 w-20 bg-gray-300 rounded" />
          </div>
          <div className="h-4 w-40 bg-gray-300 rounded mx-auto md:mx-0" />
        </div>
      </div>

      {/* Posts Skeleton */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mt-10">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="w-full aspect-square bg-gray-200 rounded-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileSkeleton;
