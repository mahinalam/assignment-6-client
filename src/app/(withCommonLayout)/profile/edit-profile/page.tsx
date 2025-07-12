/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prettier/prettier */
"use client";

import React, { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import GTForm from "@/src/components/form/GTForm";
import GTInput from "@/src/components/form/GTInput";
import { useUser } from "@/src/context/user.provider";
import Container from "@/src/components/Container";
import { useUpdateMyProfile } from "@/src/hooks/auth.hook";

const EditProfile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { user, setIsLoading: userLoading } = useUser();

  const { mutate: updateMyProfile, isPending: updateMyProfilePending } =
    useUpdateMyProfile();

  console.log("user", user);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: any) => {
    const file = e.target.files![0];

    // setImageFiles(files);
    // setImageFiles((prev) => [...prev, file]);
    if (file) {
      setImageFile(file);
      onClose();
      router.push(`/profile/${user!._id}`);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    formData.append("data", JSON.stringify(data));
    formData.append("profilePhoto", imageFile as File);

    updateMyProfile(formData, {
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: ["USER"] });
        toast.success("Profile updated successfully.");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <Container>
      <h1 className="mb-3 font-bold text-xl">Edit Profile</h1>
      <GTForm onSubmit={onSubmit}>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-[#EFEFEF] rounded-3xl">
            <div className="flex items-center gap-4">
              <div>
                <img
                  alt=""
                  className="size-[80px] rounded-full"
                  src={user?.profilePhoto}
                />
              </div>
              <div>
                <div>
                  <p>{user?.email}</p>
                  <p>{user?.name}</p>
                </div>
              </div>
            </div>
            <div>
              <span
                className=" bg-blue-500 hover:bg-blue-600  text-white px-3 py-2 rounded-md"
                onClick={onOpen}
              >
                Change Photo
              </span>
            </div>
          </div>

          <div>
            <label className="font-bold mb-3" htmlFor="name">
              Name
            </label>
            <div className="py-3">
              <GTInput id="name" label="Name" name="name" type="text" />
            </div>
          </div>
          <div>
            <label className="font-bold mb-3" htmlFor="mobileNumber">
              Mobile Number
            </label>
            <div className="py-3">
              <GTInput
                id="mobileNumber"
                label="Mobile Number"
                name="mobileNumber"
                type="text"
              />
            </div>
          </div>
          <div>
            <label className="font-bold mb-3" htmlFor="address">
              Address
            </label>
            <div className="py-3">
              <GTInput id="address" label="Address" name="address" />
            </div>
          </div>
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="text-white bg-blue-500 px-20 py-3 rounded-xl"
          >
            Submit
          </button>
          {/* <button
            type="submit"
            className="text-black hover:text-white bg-[#E3BE21] py-4 px-20 text-xl md:mx-0 mx-auto block"
          >
            Submit
          </button> */}
        </div>
      </GTForm>
      <Modal isOpen={isOpen} size="xl" onClose={onClose}>
        {/* Marked: Modal starts */}
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Change profile picture.
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to change your current profile picture?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary">
                  <div>
                    <label htmlFor="photo">
                      <span onClick={onOpen}>Change Photo</span>
                    </label>
                    <input
                      className="hidden"
                      id="photo"
                      name="photo"
                      type="file"
                      onChange={(e) => handleImageChange(e)}
                    />
                  </div>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>{" "}
    </Container>
  );
};

export default EditProfile;
