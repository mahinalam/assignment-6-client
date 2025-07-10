"use client";

import React, { useEffect } from "react";

import Container from "@/src/components/Container";
import { useGetAllPosts } from "@/src/hooks/post.hook";
import Loading from "@/src/components/UI/Loading";
import PostList from "@/src/components/home/PostList";
import { useUser } from "@/src/context/user.provider";
import RightSection from "@/src/components/sharred/RightSection";

const INITIAL_NUMBER_OF_POSTS = 10;

const Home = () => {
  const { data: postsData, isLoading } = useGetAllPosts(
    0,
    INITIAL_NUMBER_OF_POSTS
  );

  const { user } = useUser();
  if (!user) {
  }

  // const { data } = await getAllGardeningPosts();
  // const { data: postsData, isLoading } = useGetAllPosts();

  // if (isLoading) {
  //   return <Loading />;
  // }
  // console.log("API:", process.env.NEXT_PUBLIC_BASE_API);
  console.log("posdata:", postsData);
  return (
    // <Container>
    <div className="flex">
      <div className="lg:w-9/12 w-full">
        <PostList initialPosts={postsData?.data} />
      </div>

      <div className="lg:w-3/12 lg:block hidden">
        <RightSection />
      </div>
    </div>
  );
};

export default Home;
