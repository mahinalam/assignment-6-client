import { Skeleton } from '@nextui-org/react';
import DashboardContainer from '../DashboardContainer';

const ManageUsersSkeleton = () => {
  return (
    <DashboardContainer>
      {/* Top Gardeners Title */}
      <Skeleton className="h-6 w-48 mb-6 rounded-lg" />

      {/* Top Gardeners Table */}
      <div className="w-full mb-10">
        <div className="grid grid-cols-5 gap-4 mb-4">
          {[...Array(5)].map((_, idx) => (
            <Skeleton key={idx} className="h-4 w-full rounded" />
          ))}
        </div>
        {[...Array(3)].map((_, idx) => (
          <div
            key={idx}
            className="grid grid-cols-5 gap-4 items-center mb-4 py-3 border-b border-gray-200"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-3 w-24 rounded" />
                <Skeleton className="h-3 w-32 rounded" />
              </div>
            </div>
            <Skeleton className="h-4 w-20 rounded" />
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-6 rounded" />
          </div>
        ))}
      </div>

      {/* All Users Title */}
      <Skeleton className="h-6 w-36 mb-6 rounded-lg" />

      {/* All Users Table */}
      <div className="w-full">
        <div className="grid grid-cols-5 gap-4 mb-4">
          {[...Array(5)].map((_, idx) => (
            <Skeleton key={idx} className="h-4 w-full rounded" />
          ))}
        </div>
        {[...Array(5)].map((_, idx) => (
          <div
            key={idx}
            className="grid grid-cols-5 gap-4 items-center mb-4 py-3 border-b border-gray-200"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-3 w-24 rounded" />
                <Skeleton className="h-3 w-32 rounded" />
              </div>
            </div>
            <Skeleton className="h-4 w-20 rounded" />
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-6 rounded" />
          </div>
        ))}
      </div>
    </DashboardContainer>
  );
};

export default ManageUsersSkeleton;
