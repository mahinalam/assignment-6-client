/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

import GTForm from "@/src/components/form/GTForm";
import GTInput from "@/src/components/form/GTInput";
import { useUser } from "@/src/context/user.provider";
import { useUserRegistration } from "@/src/hooks/auth.hook";
import registerValidationSchema from "@/src/schemas/register.schema";

export default function RegisterPage() {
  const { mutate: handleUserRegistration, isPending } = useUserRegistration();
  const [imageFiles, setImageFiles] = useState<File | null>(null);
  const [imagePreviews, setImagePreviews] = useState<any>(null);
  const { setIsLoading: userLoading } = useUser();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();

    const userData = {
      ...data,
    };

    formData.append("data", JSON.stringify(userData));
    formData.append("profileImage", imageFiles as File);
    handleUserRegistration(formData);
    userLoading(true);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setImageFiles(file);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // setImagePreviews((prev) => [...prev, reader.result as string]);
        setImagePreviews(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex md:h-[calc(100vh-100px)] h-[calc(100vh-200px)] flex-col items-center justify-center">
      <h3 className="my-2 text-xl font-bold">Register with GreenHaven</h3>
      <p className="mb-4"> Your Sanctuary for Gardening Wisdom and Growth</p>
      <div className="md:w-[35%] w-[80%]">
        <GTForm
          resolver={zodResolver(registerValidationSchema)}
          onSubmit={onSubmit}
        >
          <div className="py-3">
            <GTInput label="Name" name="name" size="sm" />
          </div>
          <div className="py-3">
            <GTInput label="Email" name="email" size="sm" />
          </div>

          <div className="py-3">
            <GTInput
              label="Password"
              name="password"
              size="sm"
              type="password"
            />
          </div>
          <div className="py-3">
            <GTInput label="Mobile Number" name="mobileNumber" size="sm" />
          </div>
          <div className="py-3">
            <GTInput label="Address" name="address" size="sm" type="text" />
          </div>
          <div className="min-w-fit flex-1">
            <label
              className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
              htmlFor="image"
            >
              <span className=""> Upload image</span>
            </label>
            <input
              multiple
              className="hidden"
              id="image"
              type="file"
              onChange={(e) => handleImageChange(e)}
            />
          </div>
          {imagePreviews && (
            <div className="flex gap-5 my-5 flex-wrap">
              <div
                key={imagePreviews}
                className="relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2"
              >
                <img
                  alt="item"
                  className="h-full w-full object-cover object-center rounded-md"
                  src={imagePreviews}
                />
              </div>
            </div>
          )}
          <Button
            className="my-3 w-full rounded-md bg-default-900 text-default"
            isLoading={isPending}
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
            Registration
          </Button>
        </GTForm>
        <div className="text-center">
          Already have an account ? <Link href={"/login"}>Login</Link>
        </div>
      </div>
    </div>
  );
}
