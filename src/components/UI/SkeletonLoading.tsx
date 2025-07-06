import React from "react";

const SkeletonLoading = () => {
  return (
    <div className="space-y-2 mt-1 w-[80%] mx-auto h-auto animate-pulse">
      {/* User Profile Skeleton */}
      <div className="flex items-center">
        <div className="bg-gray-300 rounded-full w-[40px] h-[40px] mr-2" />
        <div className="flex flex-col space-y-1">
          <div className="bg-gray-300 rounded w-24 h-4" />
          <div className="bg-gray-300 rounded w-12 h-4" />
        </div>
      </div>

      {/* Post Title Skeleton */}
      <div className="bg-gray-300 rounded w-full h-8 mt-2" />

      {/* Post Image Skeleton */}
      <div className="bg-gray-300 rounded w-full h-64 mt-3" />

      {/* Reaction Icons Skeleton */}
      <div className="flex items-center justify-between gap-4 mt-2">
        <div className="flex items-center gap-10">
          <div className="bg-gray-300 rounded-full w-7 h-7" />
          <div className="bg-gray-300 rounded-full w-7 h-7" />
        </div>
        <div className="bg-gray-300 rounded-full w-7 h-7" />
      </div>

      {/* Likes and Dislikes Count Skeleton */}
      <div className="flex items-center gap-5 mt-2">
        <div className="bg-gray-300 rounded w-16 h-4" />
        <div className="bg-gray-300 rounded w-16 h-4" />
      </div>

      {/* Comments Section Skeleton */}
      <div className="bg-gray-300 rounded w-32 h-4 mt-2" />
      <div className="space-y-2">
        <div className="bg-gray-300 rounded w-full h-4" />
        <div className="bg-gray-300 rounded w-full h-4" />
      </div>

      {/* Add Comment Skeleton */}
      <div className="relative mt-2">
        <div className="bg-gray-300 rounded w-full h-10" />
      </div>
    </div>
  );
};

export default SkeletonLoading;
