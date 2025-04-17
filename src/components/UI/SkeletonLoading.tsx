// // import { Card, Skeleton } from "@nextui-org/react";

// // export default function SkeletonLoading() {
// //   return (
// //     <Card className="w-[80%] mx-auto h-auto space-y-5 p-4" radius="lg">
// //       <Skeleton className="rounded-lg">
// //         <div className="h-[200px] rounded-lg bg-default-300"></div>
// //       </Skeleton>
// //       <div className="space-y-3">
// //         <Skeleton className="w-3/5 rounded-lg">
// //           <div className="h-5 w-3/5 rounded-lg bg-default-200"></div>
// //         </Skeleton>
// //         <Skeleton className="w-4/5 rounded-lg">
// //           <div className="h-5 w-4/5 rounded-lg bg-default-200"></div>
// //         </Skeleton>
// //         <Skeleton className="w-2/5 rounded-lg">
// //           <div className="h-5 w-2/5 rounded-lg bg-default-300"></div>
// //         </Skeleton>
// //       </div>
// //     </Card>
// //   );
// // }

// import { Card, Skeleton } from "@nextui-org/react";

// export default function SkeletonLoading() {
//   return (
//     // <div className="w-full h-screen flex justify-center items-center bg-default-100">
//     <Card className="w-[90%] max-w-lg mx-auto space-y-5 p-6">
//       <Skeleton className="w-full rounded-lg h-[200px]" />
//       <div className="space-y-3">
//         <Skeleton className="w-3/5 rounded-lg h-5" />
//         <Skeleton className="w-4/5 rounded-lg h-5" />
//         <Skeleton className="w-2/5 rounded-lg h-5" />
//       </div>
//     </Card>
//     // </div>
//   );
// }

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
