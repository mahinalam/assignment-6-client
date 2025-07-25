'use client';

import React, { useEffect, useState } from 'react';

import Container from '@/src/components/Container';
import { useGetAllPosts, useGetAllSharePosts } from '@/src/hooks/post.hook';
import Loading from '@/src/components/UI/Loading';
import RightSection from '@/src/components/sharred/RightSection';
import { ICategory, IPost } from '@/src/types';
import PostCard from '@/src/components/home/PostCard';
import { useSearchParams } from 'next/navigation';
import SkeletonLoading from '@/src/components/UI/SkeletonLoading';
import PostsNotFound from '@/src/components/home/NotFoundPost';
import { Button } from '@nextui-org/button';
import { useGetAllCategories } from '@/src/hooks/category.hook';
import HomePageFullSkeleton from '../loading-skeleton/HomeSkeleton';

const Home = () => {
  const [page, setPage] = useState(1);
  const limit = 5;
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryValue, setCategoryValue] = useState('');
  const [allPosts, setAllPosts] = useState<IPost[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const {
    data: postsData,
    isLoading,
    isFetching,
  } = useGetAllPosts({
    page,
    searchTerm,
    category: categoryValue,
    limit: limit,
  });

  const searchParams = useSearchParams();
  const value = searchParams.get('search');
  const { data: categoriesData } = useGetAllCategories();
  const { data: sharePosts } = useGetAllSharePosts();
  const [postDataLoading, setPostDataLoading] = useState(true);
  useEffect(() => {
    if (value) {
      setSearchTerm(value);
    }
  }, [value]);

  useEffect(() => {
    if (postsData?.data?.data) {
      setPostDataLoading(false);
      if (page === 1) {
        setAllPosts(postsData.data.data);
      } else {
        setAllPosts((prev) => [...prev, ...postsData.data.data]);
      }

      const totalPosts = postsData.data.meta?.total || 0;
      const loadedPosts = (page - 1) * limit + postsData.data.data.length;
      setHasMore(loadedPosts < totalPosts);
    }
  }, [postsData?.data?.data]);

  if (isLoading || postDataLoading) {
    return <HomePageFullSkeleton />;
  }
  const handleCategoryValue = (categoryId: string) => {
    setCategoryValue(categoryId);
  };
  return (
    // <Container>
    <>
      {/* category section */}
      <div className="flex flex-wrap mt-[110px] lg:mt-0 mb-4 gap-4 w-full lg:w-9/12 justify-center">
        <Button
          className={
            !categoryValue
              ? 'bg-primary text-white hover:bg-green-700'
              : 'bg-gray-100 hover:bg-gray-200'
          }
          onClick={() => setCategoryValue('')}
        >
          All
        </Button>
        {categoriesData?.data?.data?.map((item: ICategory, index: number) => (
          <Button
            key={index}
            className={
              categoryValue === item._id
                ? 'bg-primary text-white hover:bg-green-700'
                : 'bg-gray-100 hover:bg-gray-200'
            }
            onClick={() => handleCategoryValue(item._id)}
          >
            {' '}
            {item.name}
          </Button>
        ))}
      </div>
      <div className="flex">
        <div className=" w-full lg:w-9/12">
          {allPosts?.length > 0 ? (
            allPosts?.map((post: IPost) => (
              <PostCard key={post._id} item={post} />
            ))
          ) : (
            <>
              <PostsNotFound />
            </>
          )}
          {hasMore && (
            <div className="text-center my-6">
              <Button
                onClick={() => setPage((prev) => prev + 1)}
                className="bg-primary text-white hover:bg-green-700"
              >
                Load More
              </Button>
            </div>
          )}
        </div>
        <div className="lg:w-3/12 hidden lg:block">
          <RightSection />
        </div>
      </div>
    </>
  );
};

export default Home;
