'use client';
import Container from '@/src/components/Container';
import PostCard from '@/src/components/dashboard/PostCard';
import DashboardContainer from '@/src/components/DashboardContainer';
import DashboardPostsPageSkeleton from '@/src/components/loading-skeleton/DashboardPostsPageSkeleton';
import UserDashboardSkeleton from '@/src/components/loading-skeleton/UserDashboardSkeleton';
import CreatePostModal from '@/src/components/modal/CreatePostModal';
import PaginationHelper from '@/src/components/sharred/paginationHelper';
import { useUser } from '@/src/context/user.provider';
import { useGetAllCategories } from '@/src/hooks/category.hook';
import { useCreatePost, useGetAllPosts } from '@/src/hooks/post.hook';
import { IPost } from '@/src/types';
import { useDisclosure } from '@nextui-org/modal';
import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'sonner';

const AllPosts = () => {
  const { user } = useUser();
  const [page, setPage] = useState(1);
  const limit = 5;
  const { data, isLoading } = useGetAllPosts({ user: user?._id, page, limit });
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

  if (isLoading || categoriesLoading) {
    return <DashboardPostsPageSkeleton />;
  }

  const categories = categoriesData?.data.data?.map((category: any) => ({
    key: category?._id,
    label: category.name,
  }));

  const postTypeOption = [
    { key: 'general', label: 'General' },
    { key: 'premium', label: 'premium' },
  ];

  const totalProducts = data?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalProducts / limit);

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
    const id = toast.loading('Creating post...');
    const formData = new FormData();
    const postData = {
      user: user!._id,
      title: data.title,
      content: data.content,
      category: data.category,
      isPremium: data?.type !== 'general',
    };
    formData.append('data', JSON.stringify(postData));

    if (createPostImageFiles.length > 0) {
      for (const image of createPostImageFiles) {
        formData.append('itemImages', image);
      }
    }
    createPost(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['POST'] });
        toast.success('Post created successfully', { id });
        onCreatePostModalOpenChange();
      },
      onError: (error) => {
        toast.error(error?.message || 'Failed to update post!', { id });
      },
    });
  };

  return (
    <DashboardContainer>
      <div className="lg:mb-6 flex justify-between items-center">
        <p className="text-2xl font-bold pt-6 pb-5 lg:pt-8 mt-4">All Posts</p>
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
        {data?.data?.data?.map((post: IPost, index: number) => (
          <PostCard key={index} post={post} />
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
        postTypeOption={postTypeOption}
        submitName="Create Post"
      />
    </DashboardContainer>
  );
};

export default AllPosts;
