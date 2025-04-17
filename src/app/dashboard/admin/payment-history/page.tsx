"use client";

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
} from "@nextui-org/react";
import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useDeletePayment, useGetAllPayments } from "@/src/hooks/payment.hook";
import { toast } from "sonner";
import moment from "moment";

const ManagePaymentHistory = () => {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { data, isLoading } = useGetAllUsers();

  // console.log(data?.data);
  const {
    mutate: deletePayment,
    isPending: idPaymentPending,
    isSuccess: paymentSuccess,
  } = useDeletePayment();

  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  const { data: paymentData, isLoading: paymentLoading } = useGetAllPayments();
  console.log("payment data", paymentData);

  if (paymentLoading) {
    return <div>Loading...</div>;
  }
  //   console.log(isSuccess);
  const handleDeleteUser = () => {
    if (deleteModalId) {
      deletePayment(deleteModalId, {
        onSuccess: (res) => {
          if (res?.success) {
            toast.success("Payment deleted successfully.");
            queryClient.invalidateQueries({ queryKey: ["PAYMENT"] });
          }
        },
        onError: (error) => {
          toast.error("Failed to delete payment");
        },
      });
      onClose(); //   }
    }
  };
  const handleDeleteModalOpen = (id: string) => {
    setDeleteModalId(id);
    onOpen();
  };

  return (
    <div className="w-full">
      <div className="md:my-">
        <h1 className="text-2xl font-medium md:pl-6 md:my-3">
          Payment History
        </h1>
      </div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>EMAIL </TableColumn>
          <TableColumn>DATE </TableColumn>
          <TableColumn>TRANS. ID</TableColumn>
          <TableColumn>TOTAL PRICE </TableColumn>
          <TableColumn>CURRENCY</TableColumn>
          <TableColumn>PAYMENT STATUS</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {!paymentLoading &&
            paymentData?.data?.map((item: any) => (
              <TableRow key={item?._id}>
                <TableCell>{item?.userId?.email}</TableCell>
                <TableCell>
                  {" "}
                  {item?.createdAt
                    ? moment(item.createdAt).format("MMMM D YYYY")
                    : ""}
                </TableCell>
                <TableCell>{item?.transactionId}</TableCell>
                <TableCell>{item?.totalPrice}</TableCell>
                <TableCell>{item?.currency}</TableCell>
                <TableCell>
                  <span
                    className={`${item.paymentStatus === "paid" ? "text-green-500" : "text-red-500"} font-bold`}
                  >
                    {item?.paymentStatus}
                  </span>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleDeleteModalOpen(item._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Modal isOpen={isOpen} size="xl" onClose={onClose}>
        {/* Marked: Modal starts */}
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Payment
              </ModalHeader>
              <ModalBody>
                <p>Are you sure want to delete this payment record?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  No
                </Button>
                <Button color="primary" onClick={handleDeleteUser}>
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ManagePaymentHistory;
