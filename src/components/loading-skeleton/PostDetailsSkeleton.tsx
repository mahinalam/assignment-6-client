'use client';
import React from 'react';

const PostDetailsLoading = () => {
  return (
    <>
      <div className="lg:w-[80%] w-full mx-auto flex gap-0 lg:gap-8 animate-pulse">
        <div className="lg:w-9/12 w-full">
          {/* User info header skeleton */}
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-full bg-gray-300 w-10 h-10"></div>
            <div className="flex flex-col gap-2">
              <div className="bg-gray-300 rounded w-32 h-4"></div>
              <div className="bg-gray-300 rounded w-24 h-3"></div>
            </div>
          </div>

          {/* Images grid skeleton */}
          <div className="grid grid-cols-2 gap-2 lg:gap-4 mt-6">
            <div className="w-full h-[300px] bg-gray-300 rounded-lg"></div>
            <div className="w-full h-[300px] bg-gray-300 rounded-lg"></div>
            <div className="w-full h-[300px] bg-gray-300 rounded-lg"></div>
            <div className="w-full h-[300px] bg-gray-300 rounded-lg"></div>
          </div>

          {/* Post content skeleton */}
          <div className="mt-6 space-y-3">
            <div className="bg-gray-300 rounded h-6 w-3/4"></div>
            <div className="bg-gray-300 rounded h-6 w-full"></div>
            <div className="bg-gray-300 rounded h-6 w-5/6"></div>
            <div className="bg-gray-300 rounded h-6 w-2/3"></div>
            <div className="bg-gray-300 rounded h-6 w-4/6"></div>
          </div>

          {/* Interaction buttons skeleton */}
          <div className="flex items-center gap-10 mt-6">
            <div className="bg-gray-300 rounded w-10 h-10"></div>
            <div className="bg-gray-300 rounded w-10 h-10"></div>
            <div className="bg-gray-300 rounded w-10 h-10"></div>
          </div>

          {/* Comment input skeleton */}
          <div className="relative mt-6">
            <div className="bg-gray-300 rounded h-12 w-full"></div>
            <div className="absolute bottom-3 right-10 bg-gray-400 rounded w-12 h-6"></div>
          </div>
        </div>

        {/* Right section skeleton */}
        <div className="lg:w-3/12 hidden lg:block">
          <div className="space-y-4">
            <div className="bg-gray-300 rounded h-10 w-full"></div>
            <div className="bg-gray-300 rounded h-10 w-full"></div>
            <div className="bg-gray-300 rounded h-10 w-full"></div>
            <div className="bg-gray-300 rounded h-10 w-full"></div>
            <div className="bg-gray-300 rounded h-10 w-full"></div>
          </div>
        </div>
      </div>

      {/* Recent posts section skeleton */}
      <div className="lg:hidden block mt-10 px-4">
        <div className="bg-gray-300 rounded h-8 w-36 mb-5"></div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-300 rounded h-24 w-full animate-pulse"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default PostDetailsLoading;
