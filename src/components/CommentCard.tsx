// /* eslint-disable jsx-a11y/no-static-element-interactions */
// /* eslint-disable prettier/prettier */
// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";
// import moment from "moment";

// const CommentCard = ({ comment }: any) => {
//   const { content, user, createdAt, post } = comment;

//   console.log(comment);
//   const router = useRouter();

//   return (
//     // eslint-disable-next-line jsx-a11y/click-events-have-key-events
//     <div
//       className="cursor-pointer"
//       onClick={() => router.push(`/profile/${user?._id}`)}
//     >
//       <div className="">
//         <div className="my-5">
//           <div className="flex  gap-5">
//             <div>
//               <img
//                 alt=""
//                 className="size-[50px] rounded-full"
//                 src={user?.profilePhoto}
//               />
//             </div>
//             <div>
//               <div className="flex flex-col">
//                 <div className="flex gap-2">
//                   <p className="font-semibold">{user?.name}</p>
//                   <p className="font-light">{content}</p>
//                 </div>
//                 <p className="font-extralight">
//                   {createdAt ? moment(createdAt).format("MMMM D YYYY") : ""}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CommentCard;

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import moment from "moment";
import { IoIosMore } from "react-icons/io";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const CommentCard = ({ comment }: any) => {
  const { content, user, createdAt } = comment;
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
                  {createdAt ? moment(createdAt).format("MMMM D YYYY") : ""}
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
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="text-center space-y-3">
                <button
                  className="text-red-500 font-semibold "
                  onClick={() => {
                    // implement delete
                    onClose();
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
