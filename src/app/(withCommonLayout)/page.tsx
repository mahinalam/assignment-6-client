"use client";

import React, { useEffect } from "react";

import Container from "@/src/components/Container";
import { useGetAllPosts } from "@/src/hooks/post.hook";
import Loading from "@/src/components/UI/Loading";
import PostList from "@/src/components/home/PostList";
import { useUser } from "@/src/context/user.provider";

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
    <PostList initialPosts={postsData?.data} />
  );
};

export default Home;
