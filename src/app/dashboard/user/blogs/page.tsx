"use client";
import Container from "@/src/components/Container";
import BlogCard from "@/src/components/dashboard/BlogCard";
import PostCard from "@/src/components/dashboard/PostCard";
import CreatePostModal from "@/src/components/modal/CreatePostModal";
import { useUser } from "@/src/context/user.provider";
import { useCreateBlog, useGetUserBlogs } from "@/src/hooks/blog.hook";
import { useGetAllCategories } from "@/src/hooks/category.hook";
import { useGetUserPost } from "@/src/hooks/post.hook";
import { IPost } from "@/src/types";
import { useDisclosure } from "@nextui-org/modal";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";

const Blogs = () => {
  const { user } = useUser();
  const { data, isLoading } = useGetUserBlogs();
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetAllCategories();
  const [createPostImageFiles, setCreatePostImageFiles] = useState<File[]>([]);

  const {
    isOpen: isCreatePostModalOPen,
    onOpen: onCreatePostModalOpen,
    onOpenChange: onCreatePostModalOpenChange,
  } = useDisclosure();

  const { mutate: createBlog } = useCreateBlog();
  const queryClient = useQueryClient();

  if (isLoading || categoriesLoading) {
    return <p>Loading</p>;
  }

  const categories = categoriesData?.data.map((category: any) => ({
    key: category?._id,
    label: category.name,
  }));

  const hanldeDeleteCreatePostImage = (deletedImage: any) => {
    console.log({ deletedImage });
    const updatedImage = createPostImageFiles.filter(
      (image) => image.name !== deletedImage
    );
    setCreatePostImageFiles(updatedImage);
  };

  const handleCreateModalOpen = () => {
    onCreatePostModalOpen();
  };

  // create post
  const handleCreatePost = (data: Record<string, unknown>) => {
    const id = toast.loading("Creating blog...");
    const formData = new FormData();
    const postData = {
      author: user!._id,
      title: data.title,
      content: data.content,
      category: data.category,
    };
    console.log({ postData });
    formData.append("data", JSON.stringify(postData));

    if (createPostImageFiles.length > 0) {
      for (let image of createPostImageFiles) {
        formData.append("itemImages", image);
      }
    }
    createBlog(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["BLOG"] });
        toast.success("Blog created successfully", { id });
        onCreatePostModalOpenChange();
      },
      onError: (error) => {
        console.log({ error });
        toast.error(error?.message || "Failed to create blog!", { id });
      },
    });
  };
  return (
    <div>
      <div className="lg:mb-6 w-full flex justify-between items-center">
        <p className="lg:text-2xl font-bold ">All Blogs</p>
        <div className=" ">
          <button
            className="bg-primary text-sm text-white font-bold px-3 py-2 rounded-md "
            onClick={handleCreateModalOpen}
          >
            Create New +
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3  mx-auto gap-4">
        {data?.data?.map((post: IPost) => (
          <BlogCard post={post} />
        ))}
      </div>
      <CreatePostModal
        isOpen={isCreatePostModalOPen}
        onOpenChange={onCreatePostModalOpenChange}
        handleCreateProduct={handleCreatePost}
        handleDeleteNewProductImages={hanldeDeleteCreatePostImage}
        imageFiles={createPostImageFiles}
        setImageFiles={setCreatePostImageFiles}
        categories={categories}
        submitName="Create Blog"
      />
    </div>
  );
};

export default Blogs;
