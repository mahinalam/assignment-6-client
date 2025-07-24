'use client';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react';
import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useDeletePost, useGetAllPosts } from '@/src/hooks/post.hook';
import { IPost } from '@/src/types';
import DeleteModal from '@/src/components/modal/DeleteModal';
import { toast } from 'sonner';
import moment from 'moment';
import PaginationHelper from '@/src/components/sharred/paginationHelper';
import ManagePostsSkeleton from '@/src/components/loading-skeleton/ManagePostsSkeleton';
import DashboardContainer from '@/src/components/DashboardContainer';
import ManageBlogsSkeleton from '@/src/components/loading-skeleton/ManagePostsSkeleton';

const ManagePosts = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const limit = 5;
  const { data, isLoading } = useGetAllPosts({
    page,
    limit,
  });
  const { mutate: deletePost, isPending, isSuccess } = useDeletePost();
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalOpenChange,
  } = useDisclosure();

  if (isLoading) {
    return <ManageBlogsSkeleton />;
  }

  const totalProducts = data?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalProducts / limit);

  const handleDeleteModalOpen = (id: string) => {
    setDeleteModalId(id);
    onDeleteModalOpen();
  };

  // delete user fn
  const handleDeletePost = async () => {
    const id = toast.loading('Deleting post...');
    if (deleteModalId) {
      await deletePost(deleteModalId, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['POST'] });
          toast.success('Successfully deleted post.', { id });
        },
        onError: () => {
          toast.error('Failed to deleted post.', { id });
        },
      });
    }
  };

  return (
    <DashboardContainer>
      <div className="md:my-">
        <h1 className="text-2xl font-medium pt-6 pb-5 lg:pt-8 mt-4">
          All Posts
        </h1>
      </div>
      <Table aria-label="Example static collection table" className="w-full">
        <TableHeader>
          <TableColumn>POST</TableColumn>
          <TableColumn>POST BY</TableColumn>
          <TableColumn>CATEGORY</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>POST TYPE</TableColumn>
          <TableColumn>CREATED DATE</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {!isLoading &&
            data?.data?.data?.map((item: IPost) => (
              <TableRow key={item?._id}>
                <TableCell>
                  {' '}
                  <div className="flex w-full items-center gap-1">
                    <img
                      src={item?.images?.[0]}
                      alt="Profile"
                      className="size-[40px] rounded-full object-cover"
                    />
                    <p>
                      {item?.title?.length > 20
                        ? item?.title.slice(0, 20) + '...'
                        : item?.title}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{item?.user?.name}</TableCell>
                <TableCell>{item?.category?.name}</TableCell>
                <TableCell>{item?.status}</TableCell>
                <TableCell>{item?.isPremium ? 'Premium' : 'General'}</TableCell>
                <TableCell>
                  {moment(item.createdAt).format('D MMM YYYY')}
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    onClick={() => handleDeleteModalOpen(item._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <PaginationHelper page={page} setPage={setPage} totalPages={totalPages} />
      <DeleteModal
        title="Delete Post"
        subTitle="Are you sure want to delete this post?"
        isOpen={isDeleteModalOpen}
        onOpenChange={onDeleteModalOpenChange}
        handleDeleteProduct={handleDeletePost}
      />
    </DashboardContainer>
  );
};

export default ManagePosts;
