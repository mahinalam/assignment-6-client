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
import { IBlog, IPost } from '@/src/types';
import { useDeleteBlog, useGetAllBlogs } from '@/src/hooks/blog.hook';
import { toast } from 'sonner';
import DeleteModal from '@/src/components/modal/DeleteModal';
import moment from 'moment';
import PaginationHelper from '@/src/components/sharred/paginationHelper';
import ManagePostsSkeleton from '@/src/components/loading-skeleton/ManagePostsSkeleton';
import DashboardContainer from '@/src/components/DashboardContainer';

const ManageBlogs = () => {
  const [page, setPage] = useState(1);
  const limit = 5;
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading } = useGetAllBlogs({ page, limit });
  const { mutate: deleteBlog, isPending, isSuccess } = useDeleteBlog();
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalOpenChange,
  } = useDisclosure();

  if (isLoading) {
    return <ManagePostsSkeleton />;
  }

  const totalProducts = data?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalProducts / limit);

  const handleDeleteModalOpen = (id: string) => {
    setDeleteModalId(id);
    onDeleteModalOpen();
  };

  // delete blog fn
  const handleDeleteBlog = async () => {
    const id = toast.loading('Deleting blog...');
    if (deleteModalId) {
      await deleteBlog(deleteModalId, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['BLOG'] });
          toast.success('Successfully deleted blog.', { id });
        },
        onError: () => {
          toast.error('Failed to deleted blog.', { id });
        },
      });
    }
  };
  return (
    <DashboardContainer>
      <div className="md:my-">
        <h1 className="text-2xl font-medium pt-6 pb-5 lg:pt-8 mt-4">
          All Blogs
        </h1>
      </div>
      <Table aria-label="Example static collection table" className="w-full">
        <TableHeader>
          <TableColumn>BLOG</TableColumn>
          <TableColumn>BLOG BY</TableColumn>
          <TableColumn>CATEGORY</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>CREATED DATE</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {!isLoading &&
            data?.data?.data?.map((item: IBlog) => (
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
                <TableCell>{item?.author?.name}</TableCell>
                <TableCell>{item?.category?.name}</TableCell>
                <TableCell>{item?.status}</TableCell>
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
        title="Delete Blog"
        subTitle="Are you sure want to delete this blog?"
        isOpen={isDeleteModalOpen}
        onOpenChange={onDeleteModalOpenChange}
        handleDeleteProduct={handleDeleteBlog}
      />
    </DashboardContainer>
  );
};

export default ManageBlogs;
