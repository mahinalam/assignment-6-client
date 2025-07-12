"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Avatar,
  Input,
} from "@nextui-org/react";
import { useState } from "react";
import { FiCopy, FiUsers, FiUser } from "react-icons/fi";
import { toast } from "sonner";

const ShareModal = ({
  isOpen,
  onOpenChange,
  user,
  createSharePost,
  setText,
  text,
  clipBoard,
}: any) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(clipBoard);
    toast.success("Link copied to clipboard!");
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="lg"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Share Post</h3>
            </ModalHeader>

            <ModalBody>
              {/* Top: User Info */}
              <div className="flex items-start gap-4">
                <Avatar src={user?.profilePhoto} size="lg" />
                <div>
                  <h4 className="text-base font-semibold">{user?.name}</h4>
                  <p className="text-sm text-gray-500">Share to Feed</p>
                </div>
              </div>

              {/* Middle: Textarea */}
              <textarea
                rows={4}
                className="w-full mt-4 border border-gray-300 rounded-xl p-3 focus:outline-none resize-none"
                placeholder="Say something about this (optional)"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

              {/* Bottom: Share Options */}
              <div className="flex flex-col mt-4 gap-2">
                <h5 className="text-sm font-medium text-gray-700">Share to</h5>
                <div className="flex gap-4 text-sm text-gray-600">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                  >
                    <FiCopy /> Copy Link
                  </button>
                </div>
              </div>
            </ModalBody>

            {/* Footer: Share Button */}
            <ModalFooter>
              <Button color="secondary" onClick={createSharePost}>
                Share Now
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ShareModal;
