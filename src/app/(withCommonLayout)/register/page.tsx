'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import GTForm from '@/src/components/form/GTForm';
import GTInput from '@/src/components/form/GTInput';
import { useUser } from '@/src/context/user.provider';
import { useUserRegistration } from '@/src/hooks/auth.hook';
import registerValidationSchema from '@/src/schemas/register.schema';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

export default function RegisterPage() {
  const { mutate: handleUserRegistration, isPending } = useUserRegistration();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { setIsLoading: userLoading } = useUser();
  const [isHaveProfileImage, setHaveProfileImage] = useState(true);
  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!imageFile) {
      setHaveProfileImage(false);
      return;
    }

    const id = toast.loading('Registering your account, please wait...');
    const formData = new FormData();

    const userData = {
      ...data,
    };
    formData.append('data', JSON.stringify(userData));
    formData.append('profileImage', imageFile as File);
    handleUserRegistration(formData, {
      onSuccess: () => {
        toast.success('Registration successful! Welcome GreenHaven 🎉', { id });
        queryClient.invalidateQueries({ queryKey: ['USER'] });
      },
      onError: () => {
        toast.error(
          'Registration failed. Please check your information and try again.',
          { id }
        );
      },
    });
    userLoading(true);
  };

  return (
    <div className="flex  flex-col items-center justify-center">
      <h3 className="my-2 text-xl font-bold">Register with GreenHaven</h3>
      <p className="mb-4 text-sm">
        Your Sanctuary for Gardening Wisdom and Growth
      </p>
      <div className="lg:w-[40%] w-full">
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
            <p className=" font-bold mb-3">Upload Image</p>
            <label
              aria-label="Upload Your Files"
              className={
                'flex cursor-pointer hover:bg-athens-gray-50/10 items-center gap-3 rounded border border-dashed border-athens-gray-200 bg-white p-3 transition-all'
              }
              htmlFor="image"
            >
              <div className="flex size-16 items-center justify-center rounded-full bg-athens-gray-50">
                <svg
                  className="lucide lucide-folder-open-dot size-5 text-athens-gray-500"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2" />
                  <circle cx="14" cy="15" r="1" />
                </svg>
              </div>
              <div>
                <h5 className="font-semibold text-athens-gray-600">
                  Upload Profile Picture
                </h5>
                <small className="text-sm text-athens-gray-400">
                  Click to browse JPG,JPEG or PNG formats.
                </small>
              </div>
            </label>
            <input
              className="w-full  hidden mt-1 lg:mb-8 rounded-md border border-input bg-transparent py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm  h-12 items-center px-4 text-athens-gray-950 outline-none !ring-0 focus:ring-0"
              id="image"
              name="image"
              placeholder="Jhon Deo"
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImageFile(file);
                }
              }}
            />
            {imageFile && (
              <div className="relative flex items-center gap-2 rounded-md border border-athens-gray-200 bg-white p-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-athens-gray-100">
                  <svg
                    className="lucide lucide-image size-4 text-athens-gray-800"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect height="18" rx="2" ry="2" width="18" x="3" y="3" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                </div>
                <div>
                  <h6 className="!text-sm">{imageFile?.name}</h6>
                  <p className="!text-xs !text-athens-gray-500">{`${
                    imageFile ? Number(imageFile?.size) / 1000 : 0.0
                  } KB`}</p>
                </div>
                <div className="absolute inset-y-0 right-3 flex items-center">
                  <button onClick={() => setImageFile(null)}>
                    <svg
                      className="lucide lucide-trash2 size-4 text-athens-gray-500 transition-all hover:text-athens-gray-800"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      <line x1="10" x2="10" y1="11" y2="17" />
                      <line x1="14" x2="14" y1="11" y2="17" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
          {!isHaveProfileImage && (
            <p className="text-xs font-medium text-[#F31260]">
              Please upload an profile picture.
            </p>
          )}
          <Button
            className="my-3 w-full rounded-md bg-primary text-white"
            size="lg"
            type="submit"
          >
            Register
          </Button>
        </GTForm>
        <div className="text-center">
          Already have an account ? <Link href={'/login'}>Login</Link>
        </div>
      </div>
    </div>
  );
}
