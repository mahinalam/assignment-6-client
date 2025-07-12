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

  console.log("posdata:", postsData);
  return (
    // <Container>
    <div className="flex">
      <div className=" w-full lg:w-9/12">
        <PostList initialPosts={postsData?.data} />
      </div>
      <div className="lg:w-3/12 hidden lg:block">
        <RightSection />
      </div>
    </div>
  );
};

export default Home;
