'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@/src/context/user.provider';
import { IPost } from '@/src/types';
import { useGetSingleUser } from '@/src/hooks/auth.hook';
import SuggesstedCard from '@/src/components/sharred/SuggesstedCard';
import { useGetAllBlogs } from '@/src/hooks/blog.hook';
import { LuUserRound } from 'react-icons/lu';
import BlogRightSectionSkeleton from '@/src/components/loading-skeleton/BlogRightSectionSkeleton';

const BlogRightSection = () => {
  const { user, setIsLoading } = useUser();
  const { data: currentUserInfo } = useGetSingleUser(user?._id as string);
  const [page, setPage] = useState(1);
  const limit = 5;

  const {
    data: blogsData,
    isLoading,
    isSuccess,
  } = useGetAllBlogs({ page, limit });

  if (isLoading) {
    return <BlogRightSectionSkeleton />;
  }

  return (
    <div className="relative cursor-pointer lg:pt-24 pt-0">
      {/* profile image section */}
      <Link
        href={
          user?.role === 'USER'
            ? `/profile/${user?._id}`
            : '/profile/edit-profile'
        }
        className="inline-flex gap-2 items-center cursor-pointer"
      >
        <div className="">
          {currentUserInfo?.data?.profilePhoto ? (
            <img
              alt=""
              className="size-[40px] rounded-full mr-2"
              src={currentUserInfo?.data?.profilePhoto}
            />
          ) : (
            <LuUserRound size={40} />
          )}
        </div>
        <div>
          <p className="lg:text-sm">{currentUserInfo?.data?.email}</p>
          <p className="text-subTitle ">{currentUserInfo?.data?.name}</p>
        </div>
      </Link>

      {/* suggessted people */}
      <div>
        <p className="lg:text-lg w-[80%] border-b-4 border-b-border text-subTitle lg:mt-8 mb-5 pb-2">
          Recent Blogs
        </p>
        {!isLoading &&
          isSuccess &&
          blogsData?.data?.data?.slice(0, 5)?.map((post: IPost) => (
            <Link href={`/blogs/${post._id}`} key={post._id}>
              <SuggesstedCard title={post.title} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default BlogRightSection;
