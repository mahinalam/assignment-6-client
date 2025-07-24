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
import { IBlog, ICategory, IPost } from '@/src/types';
import { useGetAllBlogs } from '@/src/hooks/blog.hook';
import {
  useCreateCategory,
  useDeleteCategory,
  useGetAllCategories,
} from '@/src/hooks/category.hook';
import { toast } from 'sonner';
import DeleteModal from '@/src/components/modal/DeleteModal';
import moment from 'moment';
import PaginationHelper from '@/src/components/sharred/paginationHelper';
import CreateCategoryModal from '@/src/components/modal/createCategoryModal';
import ManageCategoriesSkeleton from '@/src/components/loading-skeleton/ManageCategoriesSkeleton';
import DashboardContainer from '@/src/components/DashboardContainer';

const ManageBlogs = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const limit = 5;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading } = useGetAllCategories({ page, limit });
  const { mutate: deletePost, isPending, isSuccess } = useDeletePost();
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);
  const { mutate: deleteCategory } = useDeleteCategory();
  const { mutate: createCategory } = useCreateCategory();

  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalOpenChange,
  } = useDisclosure();

  const {
    isOpen: isCreateCategoryModalOPen,
    onOpen: onCreateCategoryModalOpen,
    onOpenChange: onCreateCategoryModalOpenChange,
  } = useDisclosure();

  if (isLoading) {
    <ManageCategoriesSkeleton />;
  }

  const totalProducts = data?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalProducts / limit);
  // delete modal open
  const handleDeleteModalOpen = (id: string) => {
    setDeleteModalId(id);
    onDeleteModalOpen();
  };

  // category modal open
  const handleCategoryModalOpen = () => {
    onCreateCategoryModalOpen();
  };

  // delete category fn
  const handleDeleteCategory = async () => {
    const id = toast.loading('Deleting category...');
    if (deleteModalId) {
      await deleteCategory(deleteModalId, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['CATEGORY'] });
          toast.success('Successfully deleted category.', { id });
        },
        onError: () => {
          toast.error('Failed to deleted category.', { id });
        },
      });
    }
  };

  const handleCreateCategory = async (data: any) => {
    const id = toast.loading('Creating category...');
    const res = await createCategory(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['CATEGORY'] });
        toast.success('Category created successfully.', { id });
        onCreateCategoryModalOpenChange();
      },
      onError: () => {
        toast.error('Failed to create category', { id });
      },
    });
  };

  return (
    <DashboardContainer>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium pt-6 pb-5 lg:pt-8 mt-4">
          All Categories
        </h1>
        <div className=" ">
          <button
            onClick={() => handleCategoryModalOpen()}
            className="bg-primary text-sm text-white font-bold px-3 py-2 rounded-md "
          >
            Create New +
          </button>
        </div>
      </div>

      <Table aria-label="Example static collection table" className="w-full">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>CREATED DATE</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {!isLoading &&
            data?.data?.data?.map((item: ICategory) => (
              <TableRow key={item?._id}>
                <TableCell>{item?.name}</TableCell>
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
        title="Delete Category"
        subTitle="Are you sure want to delete this category?"
        isOpen={isDeleteModalOpen}
        onOpenChange={onDeleteModalOpenChange}
        handleDeleteProduct={handleDeleteCategory}
      />
      <CreateCategoryModal
        isOpen={isCreateCategoryModalOPen}
        onOpenChange={onCreateCategoryModalOpenChange}
        submitName="Create Category"
        handleCreateProduct={handleCreateCategory}
      />
    </DashboardContainer>
  );
};

export default ManageBlogs;
