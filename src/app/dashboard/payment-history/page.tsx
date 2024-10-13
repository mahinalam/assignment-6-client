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

import { useDeleteUser, useGetAllUsers } from "@/src/hooks/auth.hook";

const ManagePaymentHistory = () => {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading } = useGetAllUsers();

  console.log(data?.data);
  const { mutate: deleteUser, isPending, isSuccess } = useDeleteUser();
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  // useEffect(() => {
  //     getAllGardeningPosts();
  //     // eslint-disable-next-line
  // //   }
  // },[])

  if (isLoading) {
    return <div>Loading...</div>;
  }
  //   console.log(isSuccess);
  const handleDeleteUser = () => {
    if (deleteModalId) {
      deleteUser(deleteModalId);
      onClose(); //   }
    }
  };
  const handleDeleteModalOpen = (id: string) => {
    setDeleteModalId(id);
    onOpen();
  };

  return (
    <>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>EMAIL </TableColumn>
          <TableColumn>MOBILE NUMBER</TableColumn>
          <TableColumn>PROFILE PHOTO</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {!isLoading &&
            data?.data?.map((item: any) => (
              <TableRow key={item?._id}>
                <TableCell>{item?.name}</TableCell>
                <TableCell>{item?.email}</TableCell>
                <TableCell>{item?.mobileNumber}</TableCell>
                <TableCell>
                  <img alt="" className="size-12" src={item?.profilePhoto} />
                </TableCell>

                <TableCell>{item?.status}</TableCell>
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
                Delete User
              </ModalHeader>
              <ModalBody>
                <p>Are you sure want to delete this post?</p>
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
    </>
  );
};

export default ManagePaymentHistory;
