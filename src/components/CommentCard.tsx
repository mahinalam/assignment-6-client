'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { IoIosMore } from 'react-icons/io';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { useDeleteComment } from '../hooks/comment.hook';
import { useQueryClient } from '@tanstack/react-query';

const CommentCard = ({ comment }: any) => {
  const { content, user, createdAt, _id } = comment;
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate: deleteCommentMutate } = useDeleteComment();
  const queryClient = useQueryClient();

  // delete comment fn
  const handleDeleteComment = () => {
    deleteCommentMutate(_id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['COMMENTS'] });
      },
    });
  };

  return (
    <>
      <div
        className="relative cursor-pointer group"
        onClick={() => router.push(`/profile/${user?._id}`)}
      >
        <div className="my-5">
          <div className="flex gap-5">
            <img
              alt="profile"
              className="size-[50px] rounded-full"
              src={user?.profilePhoto}
            />
            <div>
              <div className="flex flex-col">
                <div className="flex gap-2">
                  <p className="font-semibold">{user?.name}</p>
                  <p className="font-light">{content}</p>
                </div>
                <p className="text-xs text-gray-400">
                  {moment(createdAt).fromNow()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 dots icon - visible on hover */}
        <div
          onClick={(e) => {
            e.stopPropagation(); // prevent navigation
            onOpen();
          }}
          className="absolute top-2 right-2 text-xl text-gray-600 hover:text-black hidden group-hover:block"
        >
          <IoIosMore />
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="sm" hideCloseButton>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="text-center space-y-3">
                <button
                  className="text-red-500 font-semibold "
                  onClick={() => {
                    handleDeleteComment();
                  }}
                >
                  Delete
                </button>
              </ModalBody>
              <ModalFooter>
                <Button fullWidth onClick={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CommentCard;
