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
  Pagination,
} from '@nextui-org/react';
import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useDeletePost, useGetAllPosts } from '@/src/hooks/post.hook';
import { IBlog, IPayment, IPost } from '@/src/types';
import { useGetAllBlogs } from '@/src/hooks/blog.hook';
import { useDeletePayment, useGetAllPayments } from '@/src/hooks/payment.hook';
import { LuUserRound } from 'react-icons/lu';
import DeleteModal from '@/src/components/modal/DeleteModal';
import { toast } from 'sonner';
import moment from 'moment';
import PaginationHelper from '@/src/components/sharred/paginationHelper';
import PaymentSkeleton from '@/src/components/loading-skeleton/ManagePaymentSkeleton';
import DashboardContainer from '@/src/components/DashboardContainer';

const ManagePayments = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading } = useGetAllPayments({ page, limit });

  const { mutate: deletePost, isPending, isSuccess } = useDeletePost();
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);
  const { mutate: deletePayment } = useDeletePayment();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalOpenChange,
  } = useDisclosure();

  if (isLoading) {
    return <PaymentSkeleton />;
  }
  // pagination
  const totalProducts = data?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalProducts / 5);

  const handleDeleteModalOpen = (id: string) => {
    setDeleteModalId(id);
    onDeleteModalOpen();
  };

  // delet payment fn
  const handleDeletePayment = async () => {
    const id = toast.loading('Deleting payment...');
    if (deleteModalId) {
      await deletePayment(deleteModalId, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['PAYMENT'] });
          toast.success('Successfully deleted payment.', { id });
        },
        onError: () => {
          toast.error('Failed to deleted payment.', { id });
        },
      });
    }
  };

  return (
    <DashboardContainer>
      <div className="md:my-">
        <h1 className="text-2xl font-medium pt-6 pb-5 lg:pt-8 mt-4">
          All Payments
        </h1>
      </div>
      <Table aria-label="Example static collection table" className="w-full">
        <TableHeader>
          <TableColumn>USER</TableColumn>
          <TableColumn>TRANSACTION ID</TableColumn>
          <TableColumn>TOTAL PRICE</TableColumn>
          <TableColumn>CURRENCY</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>TRANSACTION DATE</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {!isLoading &&
            data?.data?.data?.map((item: IPayment) => (
              <TableRow key={item?._id}>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {item?.userId?.profilePhoto ? (
                      <>
                        <img
                          src={item.userId.profilePhoto}
                          alt="Profile"
                          className="size-[40px] rounded-full object-cover"
                        />
                      </>
                    ) : (
                      <>
                        <LuUserRound size={40} className="text-gray-500" />
                      </>
                    )}
                    <p>{item?.userId?.email}</p>
                  </div>
                </TableCell>
                <TableCell>{item?.transactionId}</TableCell>
                <TableCell>{item?.totalPrice}</TableCell>
                <TableCell>{item?.currency}</TableCell>
                <TableCell>{item?.paymentStatus}</TableCell>
                <TableCell>
                  {' '}
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
        title="Delete Payment"
        subTitle="Are you sure want to delete this payment?"
        isOpen={isDeleteModalOpen}
        onOpenChange={onDeleteModalOpenChange}
        handleDeleteProduct={handleDeletePayment}
      />
    </DashboardContainer>
  );
};

export default ManagePayments;
