'use client';
import WishlistCard from '@/src/components/dashboard/WishlistCard';
import DashboardContainer from '@/src/components/DashboardContainer';
import DashboardPostsPageSkeleton from '@/src/components/loading-skeleton/DashboardPostsPageSkeleton';
import WishlistPageSkeleton from '@/src/components/loading-skeleton/WishlistPageSkeleton';
import PaginationHelper from '@/src/components/sharred/paginationHelper';
import { useUser } from '@/src/context/user.provider';
import { useGetUserSavedPosts } from '@/src/hooks/post.hook';
import { IWishlistItem } from '@/src/types';
import React, { useState } from 'react';

const Wishlist = () => {
  const { user } = useUser();
  const [page, setPage] = useState(1);
  const limit = 5;
  const { data, isLoading } = useGetUserSavedPosts({
    user: user?._id,
    page,
    limit,
  });

  if (isLoading) {
    return <WishlistPageSkeleton />;
  }
  const totalProducts = data?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalProducts / limit);
  return (
    <DashboardContainer>
      <div>
        <p className="text-2xl pt-6 pb-5 lg:pt-8 mt-4 font-bold ">
          Saved Posts
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3  mx-auto gap-4">
        {data?.data?.data?.map((wishlistItem: IWishlistItem, index: number) => {
          return <WishlistCard key={index} post={wishlistItem} />;
        })}
      </div>
      <PaginationHelper page={page} setPage={setPage} totalPages={totalPages} />
    </DashboardContainer>
  );
};

export default Wishlist;
