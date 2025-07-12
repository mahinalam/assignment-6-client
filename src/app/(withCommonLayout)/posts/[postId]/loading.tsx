import React from "react";

const Loading = () => {
  return (
    <div className="w-[80%] mx-auto animate-pulse">
      {/* User Info */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-300" />
        <div className="flex flex-col gap-1">
          <div className="w-32 h-4 bg-gray-300 rounded" />
          <div className="w-20 h-3 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Image */}
      <div className="w-full h-[500px] bg-gray-300 rounded-lg mb-6" />

      {/* Post Content */}
      <div className="space-y-3 mb-6">
        <div className="w-full h-4 bg-gray-300 rounded" />
        <div className="w-4/5 h-4 bg-gray-300 rounded" />
        <div className="w-3/5 h-4 bg-gray-300 rounded" />
      </div>

      {/* Reactions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-6">
          <div className="w-6 h-6 bg-gray-300 rounded-full" />
          <div className="w-6 h-6 bg-gray-300 rounded-full" />
          <div className="w-6 h-6 bg-gray-300 rounded-full" />
        </div>
        <div className="w-6 h-6 bg-gray-300 rounded-full" />
      </div>

      {/* View Comments */}
      <div className="w-1/3 h-4 bg-gray-200 rounded mb-4" />

      {/* Comment Preview */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-20 h-4 bg-gray-300 rounded" />
        <div className="w-32 h-4 bg-gray-200 rounded" />
      </div>

      {/* Comment Input */}
      <div className="relative mb-6">
        <div className="w-full h-10 bg-gray-100 rounded-md" />
        <div className="absolute right-5 top-2.5 w-10 h-5 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export default Loading;
