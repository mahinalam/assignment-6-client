"use client";

import React from "react";

import Container from "@/src/components/Container";
import PostCard from "@/src/components/home/PostCard";
import { useGetAllPosts } from "@/src/hooks/post.hook";
import Loading from "@/src/components/UI/Loading";
import PostList from "@/src/components/home/PostList";

const INITIAL_NUMBER_OF_POSTS = 10;

const Home = () => {
  const { data: postsData, isLoading } = useGetAllPosts(
    0,
    INITIAL_NUMBER_OF_POSTS
  );
  // const { data } = await getAllGardeningPosts();
  // const { data: postsData, isLoading } = useGetAllPosts();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <PostList initialPosts={postsData?.data} />
    </Container>
  );
};

export default Home;
