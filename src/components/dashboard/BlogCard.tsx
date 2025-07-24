'use client';
import { IBlog, IPost } from '@/src/types';
import { FiEdit3 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import React, { useState } from 'react';
import Link from 'next/link';
import DeleteModal from '../modal/DeleteModal';
import { useDisclosure } from '@nextui-org/modal';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import EditProductModal from '../modal/EditPostModal';
import { useDeleteBlog, useUpdateBlog } from '@/src/hooks/blog.hook';
import moment from 'moment';

const BlogCard = ({ post }: { post: IBlog }) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const { _id, images, title, content, author, status, createdAt } = post;
  const { mutate } = useDeleteBlog();
  const { mutate: updatePost } = useUpdateBlog();
  const queryClient = useQueryClient();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalChange,
  } = useDisclosure();

  const {
    isOpen: isEditModalOPen,
    onOpen: onEditMOdalOPen,
    onOpenChange: onEditModalOPenChange,
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
  const handleEditModalOPen = () => {
    onEditMOdalOPen();
  };

  // delete post
  const handleDeletePost = () => {
    const id = toast.loading('Deleting blog...');
    if (_id) {
      mutate(_id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['BLOG'] });
          toast.success('Blog deleted successfully', { id });
        },
        onError: (error) => {
          toast.error(error?.message || 'Failed to delete blog!', { id });
        },
      });
    }
  };

  // update blog
  const handleUpdateBlog = (data: Partial<IPost>) => {
    const id = toast.loading('Updating blog...');
    const formData = new FormData();
    const postData = {
      blogId: _id,
      ...data,
    };
    formData.append('data', JSON.stringify(postData));
    if (imageFiles.length > 0) {
      for (const image of imageFiles) {
        formData.append('itemImages', image);
      }
    }

    updatePost(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['BLOG'] });
        toast.success('Blog updated successfully', { id });
        onEditModalOPenChange();
      },
      onError: (error) => {
        toast.error(error?.message || 'Failed to update blog!', { id });
      },
    });
  };

  return (
    <>
      <div className="group border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white max-w-xl mx-auto hover:scale-[1.01]">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <img
              src={author?.profilePhoto || '/default-avatar.png'}
              alt={author?.name || 'author'}
              className="w-10 h-10 rounded-full object-cover border"
            />
            <div className="text-sm">
              <p className="font-semibold text-gray-800">{author?.name}</p>
              <p className="text-gray-500 text-xs">
                {moment(createdAt).fromNow()}
              </p>
              <p
                className={`text-xs font-medium ${
                  status === 'approved' ? 'text-primary' : 'text-red-600'
                } `}
              >
                {status}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => handleEditModalOPen()}
              className="px-2 py-1 text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
            >
              <FiEdit3 className="text-lg" />
              Edit
            </button>
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
          <Link href={`/blogs/${_id}`}>
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
        <Link href={`/blogs/${_id}`}>
          <div className="p-4 space-y-2">
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            <div
              className="text-sm text-gray-600 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </Link>
      </div>
      {isDeleteModalOpen && (
        <DeleteModal
          handleDeleteProduct={handleDeletePost}
          isOpen={isDeleteModalOpen}
          subTitle="Are you sure want to delete this blog?"
          title={`Delete ${title}`}
          onOpenChange={onDeleteModalChange}
        />
      )}
      {isEditModalOPen && (
        <EditProductModal
          isOpen={isEditModalOPen}
          onOpenChange={onEditModalOPenChange}
          handleUpdateProduct={handleUpdateBlog}
          editProductImages={images}
          defaultValue={post}
          handleDeleteNewProductImages={handleDeleteImage}
          imageFiles={imageFiles}
          setImageFiles={setImageFiles}
          modalBtn="Update Blog"
          modalTitle="Update Blog"
        />
      )}
    </>
  );
};

export default BlogCard;
