"use client";
import { IWishlistItem } from "@/src/types";
import { AiOutlineDelete } from "react-icons/ai";
import React, { useState } from "react";
import Link from "next/link";
import DeleteModal from "../modal/DeleteModal";
import { useDisclosure } from "@nextui-org/modal";
import { useDeleteSavedPost } from "@/src/hooks/post.hook";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";
import { FaRegCommentDots } from "react-icons/fa";

const WishlistCard = ({ post }: { post: IWishlistItem }) => {
  console.log("post", post);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const { _id, images, title, content } = post?.post;
  const { mutate } = useDeleteSavedPost();
  const queryClient = useQueryClient();

  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalChange,
  } = useDisclosure();

  const handleDeleteImage = (deletedImage: any) => {
    const updatedImage = imageFiles.filter(
      (image) => image.name !== deletedImage.name
    );
    setImageFiles(updatedImage);
  };

  const handleDeleteModalOpen = () => {
    onDeleteModalOpen();
  };

  // delete post
  const handleDeletePost = () => {
    const id = toast.loading("Deleting saved post...");
    if (post?._id) {
      mutate(post?._id, {
        onSuccess: () => {
          ("");
          queryClient.invalidateQueries({ queryKey: ["WISHLIST"] });
          toast.success("Saved post deleted successfully", { id });
        },
        onError: (error) => {
          console.log("err", error);
          toast.error(error?.message || "Failed to delete saved post!", { id });
        },
      });
    }
  };

  return (
    <>
      <div className="group border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white max-w-xl mx-auto hover:scale-[1.01]">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <img
              src={post?.user?.profilePhoto || "/default-avatar.png"}
              alt={post?.user?.name || "User"}
              className="w-10 h-10 rounded-full object-cover border"
            />
            <div className="text-sm">
              <p className="font-semibold text-gray-800">{post?.user?.name}</p>
              <p className="text-gray-500 text-xs">10 months ago</p>
              <p className="text-green-600 text-xs font-medium">Published</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => handleDeleteModalOpen()}
              className="px-2 py-1 text-red-500 hover:text-red-700 flex items-center gap-1 text-sm"
            >
              <AiOutlineDelete className="text-lg" />
              Delete
            </button>
          </div>
        </div>

        {/* Image */}
        {images?.length > 0 && (
          <Link href={`/posts/${_id}`}>
            <div className="w-full h-[250px] md:h-[300px] overflow-hidden">
              <img
                src={images[0]}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </Link>
        )}

        {/* Content */}
        <Link href={`/posts/${_id}`}>
          <div className="p-4 space-y-2">
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            <div
              className="text-sm text-gray-600 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </Link>
        {/* Footer with Like, Dislike, and Comment */}

        <div className="px-4 pb-4 mt-2">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <SlLike size={20} />
                <span className="text-lg">1</span>
              </div>
              <div className="flex items-center pl-4 gap-2">
                <SlDislike size={20} />
                <span className="text-lg">1</span>
              </div>
            </div>
            <div className="flex items-center pl-4 gap-2">
              <FaRegCommentDots size={20} />
              <span className="text-lg">1</span>
            </div>
          </div>
        </div>
      </div>
      <DeleteModal
        handleDeleteProduct={handleDeletePost}
        isOpen={isDeleteModalOpen}
        subTitle="Are you sure want to delete this post?"
        title={`Delete ${title}`}
        onOpenChange={onDeleteModalChange}
      />
    </>
  );
};

export default WishlistCard;
