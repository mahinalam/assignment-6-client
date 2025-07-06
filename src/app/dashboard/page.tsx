"use client";
import Container from "@/src/components/Container";
import PostCard from "@/src/components/dashboard/PostCard";
import { useUser } from "@/src/context/user.provider";
import { useGetUserPost } from "@/src/hooks/post.hook";
import { IPost } from "@/src/types";
import React from "react";

const DashboardPage = () => {
  return <h1>This is dashboard home</h1>;
};

export default DashboardPage;
