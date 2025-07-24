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

import { useDeletePost } from '@/src/hooks/post.hook';
import { useUser } from '@/src/context/user.provider';
import { toast } from 'sonner';
import { useGetSingleUser } from '@/src/hooks/auth.hook';

const MyFollowers = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    data: myData,
    isLoading: myDataLoading,
    isSuccess: isMyDataSuccess,
  } = useGetSingleUser(user?._id as string);

  const { mutate: deletePost, isPending } = useDeletePost();
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);
  // useEffect(() => {
  //     getAllGardeningPosts();
  //     // eslint-disable-next-line
  // //   }
  // },[])

  if (myDataLoading && !isMyDataSuccess) {
    return <div>Loading...</div>;
  }

  const handleDeletePost = () => {
    if (deleteModalId) {
      deletePost(deleteModalId, {
        onSuccess: (res) => {
          if (res.success) {
            queryClient.invalidateQueries({ queryKey: ['POST'] });
            toast.success('Post deleted successfully');
            onClose();
          }
        },
        onError: (error) => {
          toast.error('Failed to delete post');
          onClose();
        },
      });
      //   if (isSuccess) {
    }
  };
  const handleDeleteModalOpen = (id: string) => {
    setDeleteModalId(id);
    onOpen();
  };

  return (
    <div className="w-full">
      <div className="md:my-">
        <h1 className="text-2xl font-medium md:pl-6 md:my-3">All Followers</h1>
      </div>
      <Table aria-label="Example static collection table" className="w-full">
        <TableHeader>
          <TableColumn>IMAGE</TableColumn>
          <TableColumn>NAME </TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {!myDataLoading &&
            myData?.data?.followers?.map((item: any) => (
              <TableRow key={item?._id}>
                <TableCell>
                  <img alt="" className="size-12" src={item?.profilePhoto} />
                </TableCell>
                <TableCell>{item?.name}</TableCell>
                <TableCell>{item?.email}</TableCell>

                <TableCell>
                  <Button
                    size="sm"
                    color="danger"
                    variant="bordered"
                    onClick={() => handleDeleteModalOpen(item._id)}
                    className="ml-4"
                  >
                    Remove
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
                Unfollow user
              </ModalHeader>
              <ModalBody>
                <p>Are you sure want to unfollow this user?</p>
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
    </div>
  );
};

export default MyFollowers;
