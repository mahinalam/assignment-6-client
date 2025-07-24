import { Skeleton } from '@nextui-org/react';

const PostCardSkeleton = () => {
  return (
    <div className="space-y-4 mt-1 md:w-[80%] w-full mx-auto h-auto">
      {/* User Info */}
      <div className="flex items-center gap-3">
        <Skeleton className="rounded-full size-[160px]" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-32 rounded-md" />
          <Skeleton className="h-3 w-20 rounded-md" />
        </div>
      </div>

      {/* Post Title */}
      <Skeleton className="h-6 w-2/3 rounded-md" />

      {/* Post Image */}
      <Skeleton className="h-[400px] w-full rounded-xl" />

      {/* Reactions: Like, Dislike, Share */}
      <div className="flex items-center gap-8 mt-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-3 w-5 rounded-md" />
          </div>
        ))}
      </div>

      {/* Saved Icon */}
      <div className="flex justify-end">
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>

      {/* Comments preview */}
      <Skeleton className="h-4 w-40 rounded-md" />
      <Skeleton className="h-4 w-32 rounded-md" />

      {/* Comment Input */}
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  );
};

export default PostCardSkeleton;
