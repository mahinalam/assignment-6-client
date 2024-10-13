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

import { useDeletePost, useGetAllPosts } from "@/src/hooks/post.hook";

const ManagePosts = () => {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading } = useGetAllPosts();
  const { mutate: deletePost, isPending, isSuccess } = useDeletePost();
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  // useEffect(() => {
  //     getAllGardeningPosts();
  //     // eslint-disable-next-line
  // //   }
  // },[])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleDeletePost = () => {
    if (deleteModalId) {
      deletePost(deleteModalId);
      //   if (isSuccess) {
      queryClient.invalidateQueries({ queryKey: ["POST"] });
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
          <TableColumn>TITLE</TableColumn>
          <TableColumn>IMAGE </TableColumn>
          <TableColumn>POST BY</TableColumn>
          <TableColumn>CATEGORY</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {!isLoading &&
            data?.data?.map((item: any) => (
              <TableRow key={item?._id}>
                <TableCell>{item?.title}</TableCell>
                <TableCell>
                  <img alt="" className="size-12" src={item?.images[0]} />
                </TableCell>
                <TableCell>{item?.user?.name}</TableCell>
                <TableCell>{item?.category?.name}</TableCell>
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
                Delete Post
              </ModalHeader>
              <ModalBody>
                <p>Are you sure want to delete this post?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  No
                </Button>
                <Button color="primary" onClick={handleDeletePost}>
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

export default ManagePosts;
