'use client';
import React from 'react';

import { useGetAllPosts } from '@/src/hooks/post.hook';
import Container from '@/src/components/Container';
import moment from 'moment';
import RecentPost from '@/src/components/posts/RecentPost';
import { useGetAllBlogs, useGetSingleBlog } from '@/src/hooks/blog.hook';
import Link from 'next/link';
import { IBlog } from '@/src/types';
import SingleBlogCard from '../SingleBlogCard';
import BlogRightSection from '../BlogRightSection';
import PostDetailsLoading from '@/src/components/loading-skeleton/PostDetailsSkeleton';
import BlogsDetailsLoading from '@/src/components/loading-skeleton/BlogsDetailsSkeleton';
const BlogDetails = ({ params }: { params: { blogId: string } }) => {
  const { data: singleBlog, isLoading } = useGetSingleBlog(params?.blogId);

  const { data: recentBlogs, isLoading: recentBlogLoading } = useGetAllBlogs({
    page: 1,
    limit: 5,
  });

  if (isLoading) {
    return <BlogsDetailsLoading />;
  }

  const filterRecentBlogs = recentBlogs?.data?.data?.filter(
    (post: IBlog) => post?._id !== params.blogId
  );

  const author = singleBlog?.data?.author;
  return (
    <>
      <div className="lg:w-[90%] mt-[110px] lg:mt-0  flex gap-8 w-full mx-auto ">
        <div className="lg:w-9/12">
          <Link className="flex items-center" href={`/profile/${author?._id}`}>
            <div>
              <img
                alt=""
                className="size-[40px] rounded-full mr-2"
                src={author?.profilePhoto}
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                {' '}
                <p className="font-bold mr-1 text-medium">{author?.name}</p>
                {author?.isVerified === true && (
                  <div>
                    <svg
                      className="size-4"
                      fill="#1DA1F2"
                      stroke="white"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="12" cy="12" fill="#1DA1F2" r="10" />
                      <path
                        d="M9 12.75 11.25 15 15 9.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <p>{moment(singleBlog?.data?.createdAt).fromNow()}</p>
            </div>

            {/* <p className="ml-2 font-extralight ">1d</p> */}
          </Link>
          <div className="">
            <section className="">
              {/* Images Section */}
              {singleBlog?.data?.images?.length > 0 && (
                <div className="grid grid-cols-2 gap-2 lg:gap-4 mt-6">
                  {singleBlog.data.images.map(
                    (image: string, index: number) => (
                      <div key={index} className="w-full h-[300px]">
                        <img
                          src={image}
                          alt=""
                          className="h-full w-full object-cover rounded-lg "
                        />
                      </div>
                    )
                  )}
                </div>
              )}

              {/* Post Content */}
              <div
                className="post-content mt-6 text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: singleBlog?.data?.content }}
              />
            </section>
          </div>
        </div>
        <div className="lg:w-3/12 hidden lg:block">
          <BlogRightSection />
        </div>
      </div>
      {/* recent blogs for small screen */}
      <div className="lg:hidden block">
        <p className="py-5 pt-10 font-bold text-xl">Recent Blogs</p>
        <div className="grid grid-cols-1">
          {filterRecentBlogs?.map((post: IBlog) => (
            <SingleBlogCard key={post?._id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
