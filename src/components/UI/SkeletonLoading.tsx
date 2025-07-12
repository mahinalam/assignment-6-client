// import React from "react";

// // const SkeletonLoading = () => {
// //   return (
// //     <div className="space-y-2 mt-1 w-[80%] mx-auto h-auto animate-pulse">
// //       {/* User Profile Skeleton */}
// //       <div className="flex items-center">
// //         <div className="bg-gray-300 rounded-full w-[40px] h-[40px] mr-2" />
// //         <div className="flex flex-col space-y-1">
// //           <div className="bg-gray-300 rounded w-24 h-4" />
// //           <div className="bg-gray-300 rounded w-12 h-4" />
// //         </div>
// //       </div>

// //       {/* Post Title Skeleton */}
// //       <div className="bg-gray-300 rounded w-full h-8 mt-2" />

// //       {/* Post Image Skeleton */}
// //       <div className="bg-gray-300 rounded w-full h-64 mt-3" />

// //       {/* Reaction Icons Skeleton */}
// //       <div className="flex items-center justify-between gap-4 mt-2">
// //         <div className="flex items-center gap-10">
// //           <div className="bg-gray-300 rounded-full w-7 h-7" />
// //           <div className="bg-gray-300 rounded-full w-7 h-7" />
// //         </div>
// //         <div className="bg-gray-300 rounded-full w-7 h-7" />
// //       </div>

// //       {/* Likes and Dislikes Count Skeleton */}
// //       <div className="flex items-center gap-5 mt-2">
// //         <div className="bg-gray-300 rounded w-16 h-4" />
// //         <div className="bg-gray-300 rounded w-16 h-4" />
// //       </div>

// //       {/* Comments Section Skeleton */}
// //       <div className="bg-gray-300 rounded w-32 h-4 mt-2" />
// //       <div className="space-y-2">
// //         <div className="bg-gray-300 rounded w-full h-4" />
// //         <div className="bg-gray-300 rounded w-full h-4" />
// //       </div>

// //       {/* Add Comment Skeleton */}
// //       <div className="relative mt-2">
// //         <div className="bg-gray-300 rounded w-full h-10" />
// //       </div>
// //     </div>
// //   );
// // };

// export default SkeletonLoading;

"use client";

import { Skeleton } from "@nextui-org/react";

const SkeletonLoading = () => {
  return (
    <div className="flex flex-col gap-6 md:w-[80%] w-full mx-auto mt-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-4">
          {/* User Header */}
          <div className="flex items-center gap-3">
            <Skeleton className="rounded-full w-10 h-10" />
            <Skeleton className="h-4 w-32 rounded-md" />
          </div>

          {/* Title */}
          <Skeleton className="h-6 w-1/2 rounded-md" />

          {/* Image */}
          <Skeleton className="rounded-xl w-full h-[300px]" />

          {/* Actions (like, comment, share) */}
          <div className="flex gap-4">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-6 rounded-full" />
          </div>

          {/* Comment field */}
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoading;
