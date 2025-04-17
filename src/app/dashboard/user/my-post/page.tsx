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

import {
  useDeletePost,
  useGetUserPost,
  useUpdatePost,
} from "@/src/hooks/post.hook";
import { useUser } from "@/src/context/user.provider";
import { toast } from "sonner";
import GTForm from "@/src/components/form/GTForm";
import GTInput from "@/src/components/form/GTInput";
import GTQuill from "@/src/components/form/GTQuill";
import moment from "moment";

const MyPosts = () => {
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);
  const [updateModalData, setUpdateModalData] = useState<any>("");
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isUpdateModalOpen,
    onOpen: onUpdateOpen,
    onClose: onUpdateClose,
  } = useDisclosure();

  const {
    data: userPostInfo,
    isLoading: userPostInfoLoading,
    isSuccess: userPostInfoSuccess,
  } = useGetUserPost(user?._id as string);
  const { mutate: deletePost, isPending } = useDeletePost();

  const { mutate: updatePost, isPending: updatePostPending } = useUpdatePost();

  if (userPostInfoLoading || !userPostInfoSuccess) {
    return <div>Loading...</div>;
  }
  console.log("deleteModalId", deleteModalId);

  const updateModalOpen = (item: Record<string, unknown>) => {
    onUpdateOpen();
    setUpdateModalData(item as any);
  };

  // update post
  const handleUpdatePost = (item: Record<string, unknown>) => {
    console.log(item);
  };

  const onSubmit = (data: any) => {
    const updatedData = {
      title: data.title,
      content: data?.content ? data?.content : updateModalData?.content,
    };
    console.log({
      postId: updateModalData?._id,
      data: updatedData,
    });
    updatePost(
      {
        postId: updateModalData?._id,
        data: updatedData,
      },
      {
        onSuccess: (res) => {
          if (res.success) {
            queryClient.invalidateQueries({ queryKey: ["POST"] });
            toast.success("Post updated successfully");
            onUpdateClose();
          }
        },
        onError: (error) => {
          toast.error("Failed to update post");
          onUpdateClose();
        },
      }
    );
  };

  const handleDeletePost = () => {
    if (deleteModalId) {
      deletePost(deleteModalId, {
        onSuccess: (res) => {
          if (res.success) {
            queryClient.invalidateQueries({ queryKey: ["POST"] });
            toast.success("Post deleted successfully");
            onClose();
          }
        },
        onError: (error) => {
          toast.error("Failed to delete post");
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
        <h1 className="text-2xl font-medium md:pl-6 md:my-3">My Posts</h1>
      </div>
      <Table aria-label="Example static collection table" className="w-full">
        <TableHeader>
          <TableColumn>TITLE</TableColumn>
          <TableColumn>POST AT </TableColumn>
          <TableColumn>IMAGE</TableColumn>
          <TableColumn> TOTAL LIKES</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {!userPostInfoLoading &&
            userPostInfo?.data?.map((item: any) => (
              <TableRow key={item?._id}>
                <TableCell>{item?.title}</TableCell>
                <TableCell>
                  {item?.createdAt
                    ? moment(item.createdAt).format("MMMM D YYYY")
                    : ""}
                </TableCell>
                <TableCell>
                  <img alt="" className="size-12" src={item?.images[0]} />
                </TableCell>

                <TableCell>{item?.upVotes?.length}</TableCell>
                <TableCell>
                  <Button onClick={() => updateModalOpen(item)}>Update</Button>
                  <Button
                    onClick={() => handleDeleteModalOpen(item._id)}
                    className="ml-4"
                  >
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
      <Modal isOpen={isUpdateModalOpen} size="xl" onClose={onUpdateClose}>
        {/* Marked: Modal starts */}
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update Post
              </ModalHeader>
              <ModalBody>
                <GTForm
                  onSubmit={onSubmit}
                  defaultValues={{
                    title: updateModalData.title,
                  }}
                >
                  {/* Title Field */}

                  <div>
                    <label className="font-bold mb-3" htmlFor="title">
                      Title
                    </label>
                    <div className="py-3">
                      <GTInput
                        id="title"
                        label="Title"
                        name="title"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="py-3 mb-6">
                    <GTQuill
                      label="Content"
                      name="content"
                      placeholder="Write your content here..."
                    />
                  </div>
                  <Button
                    fullWidth
                    className=" border-[1px] bg-transparent hover:border-white hover:text-white hover:bg-green-600
         border-green-600 text-green-600 mt-5"
                    // isLoading={createPostPending}
                    size="lg"
                    spinner={
                      <svg
                        className="animate-spin h-5 w-5 text-current"
                        fill="none"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          fill="currentColor"
                        />
                      </svg>
                    }
                    type="submit"
                  >
                    Update Post
                  </Button>
                </GTForm>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default MyPosts;
