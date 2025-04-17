/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { Button } from "@nextui-org/button";
import { zodResolver } from "@hookform/resolvers/zod";

import GTForm from "@/src/components/form/GTForm";
import GTInput from "@/src/components/form/GTInput";
import GTQuill from "@/src/components/form/GTQuill";
import GTSelect from "@/src/components/form/GTSelect";
import { useUser } from "@/src/context/user.provider";
import { useCreatePost } from "@/src/hooks/post.hook";
import { useGetAllCategories } from "@/src/hooks/category.hook";
import { createPostSchema } from "@/src/schemas/post.schema";

interface FormValues {
  title: string;
  content: string;
  category: string;
  images: File[];
}

export default function CreatePost() {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const queryClient = useQueryClient();

  const {
    mutate: handleCreatePost,
    isPending: createPostPending,
    isSuccess,
  } = useCreatePost();

  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetAllCategories();

  const { user } = useUser();

  if (categoriesLoading) {
    return <p>Loading ...</p>;
  }

  const categories = categoriesData?.data.map((category: any) => ({
    key: category?._id,
    label: category.name,
  }));

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const formData = new FormData();
    const postData = {
      user: user?._id,
      title: data.title,
      content: data.content,
      category: data.category,
    };

    console.log(postData);

    formData.append("data", JSON.stringify(postData));
    for (let image of imageFiles) {
      formData.append("itemImages", image);
    }

    handleCreatePost(formData);
    queryClient.invalidateQueries({ queryKey: ["POST"] });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setImageFiles((prev) => [...prev, file]);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="md:max-w-[600px] w-full mx-auto">
      <GTForm onSubmit={onSubmit}>
        {/* Title Field */}

        <div>
          <label className="font-bold mb-3" htmlFor="title">
            Title
          </label>
          <div className="py-3">
            <GTInput id="title" label="Title" name="title" type="text" />
          </div>
        </div>
        {/* <GTInput name="title" label="Title" required /> */}

        {/* Content Field */}
        <div>
          <label className="font-bold mb-3" htmlFor="category">
            Category
          </label>
          <div className="py-3">
            <GTSelect label="Category" name="category" options={categories} />
          </div>
        </div>
        <div className="py-3">
          <GTQuill
            label="Content"
            name="content"
            placeholder="Write your content here..."
          />
        </div>
        <div className="min-w-fit flex-1 mt-12">
          <label
            className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200  shadow-sm transition-all duration-100 hover:border-default-400"
            htmlFor="image"
          >
            <span className="font-medium"> Upload image</span>
          </label>
          <input
            multiple
            className="hidden"
            id="image"
            type="file"
            onChange={(e) => handleImageChange(e)}
          />
        </div>
        {imagePreviews.length > 0 && (
          <div className="flex gap-5 my-5 flex-wrap">
            {imagePreviews.map((imageDataUrl) => (
              <div
                key={imageDataUrl}
                className="relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2"
              >
                <img
                  alt="item"
                  className="h-full w-full object-cover object-center rounded-md"
                  src={imageDataUrl}
                />
              </div>
            ))}
          </div>
        )}
        <Button
          fullWidth
          className=" border-[1px] bg-transparent hover:border-white hover:text-white hover:bg-green-600 
         border-white bg-green-600 mt-5"
          isLoading={createPostPending}
          size="lg"
          spinner={
            <svg
              className="animate-spin h-5 w-5 text-current"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                fill="currentColor"
              />
            </svg>
          }
          type="submit"
        >
          Create Post
        </Button>
      </GTForm>
    </div>
  );
}
