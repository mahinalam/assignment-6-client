'use client';
import BlogCard from '@/src/components/dashboard/BlogCard';
import DashboardContainer from '@/src/components/DashboardContainer';
import DashboardPostsPageSkeleton from '@/src/components/loading-skeleton/DashboardPostsPageSkeleton';
import CreatePostModal from '@/src/components/modal/CreatePostModal';
import PaginationHelper from '@/src/components/sharred/paginationHelper';
import { useUser } from '@/src/context/user.provider';
import { useCreateBlog, useGetAllBlogs } from '@/src/hooks/blog.hook';
import { useGetAllCategories } from '@/src/hooks/category.hook';
import { IPost } from '@/src/types';
import { useDisclosure } from '@nextui-org/modal';
import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'sonner';

const Blogs = () => {
  const { user } = useUser();
  const [page, setPage] = useState(1);
  const limit = 5;
  const { data, isLoading } = useGetAllBlogs({
    author: user?._id,
    page,
    limit,
  });
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
    return <DashboardPostsPageSkeleton />;
  }

  const totalProducts = data?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalProducts / limit);

  const categories = categoriesData?.data.data?.map((category: any) => ({
    key: category?._id,
    label: category.name,
  }));

  const hanldeDeleteCreatePostImage = (deletedImage: any) => {
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
    const id = toast.loading('Creating blog...');
    const formData = new FormData();
    const postData = {
      author: user!._id,
      title: data.title,
      content: data.content,
      category: data.category,
    };
    formData.append('data', JSON.stringify(postData));

    if (createPostImageFiles.length > 0) {
      for (const image of createPostImageFiles) {
        formData.append('itemImages', image);
      }
    }
    createBlog(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['BLOG'] });
        toast.success('Blog created successfully', { id });
        onCreatePostModalOpenChange();
      },
      onError: (error) => {
        toast.error(error?.message || 'Failed to create blog!', { id });
      },
    });
  };
  return (
    <DashboardContainer>
      <div className="lg:mb-6 w-full flex justify-between items-center">
        <p className="text-2xl font-bold pt-6 pb-5 lg:pt-8 mt-4">All Blogs</p>
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
        {data?.data?.data?.map((post: IPost, index: number) => (
          <BlogCard key={index} post={post as any} />
        ))}
      </div>
      <PaginationHelper page={page} setPage={setPage} totalPages={totalPages} />
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
    </DashboardContainer>
  );
};

export default Blogs;
