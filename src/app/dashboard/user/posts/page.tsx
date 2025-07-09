"use client";
import Container from "@/src/components/Container";
import PostCard from "@/src/components/dashboard/PostCard";
import CreatePostModal from "@/src/components/modal/CreatePostModal";
import { useUser } from "@/src/context/user.provider";
import { useGetAllCategories } from "@/src/hooks/category.hook";
import { useCreatePost, useGetUserPost } from "@/src/hooks/post.hook";
import { IPost } from "@/src/types";
import { useDisclosure } from "@nextui-org/modal";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";

const AllPosts = () => {
  const { user } = useUser();
  const { data, isLoading } = useGetUserPost((user as any)?._id);
  const [createPostImageFiles, setCreatePostImageFiles] = useState<File[]>([]);
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetAllCategories();
  const {
    isOpen: isCreatePostModalOPen,
    onOpen: onCreatePostModalOpen,
    onOpenChange: onCreatePostModalOpenChange,
  } = useDisclosure();

  const { mutate: createPost } = useCreatePost();
  const queryClient = useQueryClient();

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (categoriesLoading) {
    return <p>Loading ...</p>;
  }

  const categories = categoriesData?.data.map((category: any) => ({
    key: category?._id,
    label: category.name,
  }));

  const postTypeOption = [
    { key: "general", label: "General" },
    { key: "premium", label: "premium" },
  ];

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
    const id = toast.loading("Creating post...");
    const formData = new FormData();
    const postData = {
      user: user!._id,
      title: data.title,
      isPremium: data?.type === "premium" ? true : false,
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
    createPost(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["POST"] });
        toast.success("Post created successfully", { id });
        onCreatePostModalOpenChange();
      },
      onError: (error) => {
        console.log({ error });
        toast.error(error?.message || "Failed to update post!", { id });
      },
    });
  };

  return (
    <div>
      <div className="lg:mb-6 flex justify-between items-center">
        <p className="lg:text-2xl font-bold ">All Posts</p>
        <div className=" ">
          <button
            onClick={handleCreateModalOpen}
            className="bg-primary text-sm text-white font-bold px-3 py-2 rounded-md "
            // onClick={handleCreateProductMNodalOpen}
          >
            Create New +
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3  mx-auto gap-4">
        {data?.data?.map((post: IPost) => (
          <PostCard post={post} />
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
        postTypeOption={postTypeOption}
        submitName="Create Post"
      />
    </div>
  );
};

export default AllPosts;
