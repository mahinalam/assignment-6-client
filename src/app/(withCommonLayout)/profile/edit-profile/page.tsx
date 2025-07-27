'use client';

import React, { useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useDisclosure } from '@nextui-org/react';
import Container from '@/src/components/Container';
import GTForm from '@/src/components/form/GTForm';
import GTInput from '@/src/components/form/GTInput';
import { useUser } from '@/src/context/user.provider';
import { useGetSingleUser, useUpdateMyProfile } from '@/src/hooks/auth.hook';
import EditProfileSkeleton from '@/src/components/loading-skeleton/EditProfileSkeleton';

const EditProfile = () => {
  const { user } = useUser();
  const { data: currentUserInfo, isLoading } = useGetSingleUser(
    user?._id as string
  );
  const [isSubmitButtonOpen, setIsSubmitButtonOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | undefined>();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: updateMyProfile, isPending: updateMyProfilePending } =
    useUpdateMyProfile(user?._id as string);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const id = toast.loading('Updating profile...');
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    if (imageFile) formData.append('profilePhoto', imageFile);

    updateMyProfile(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['USER', user?._id] });
        toast.success('Profile updated successfully.', { id });
        setImageFile(undefined);
        setIsSubmitButtonOpen(false);
      },
      onError: (error) => toast.error(error.message, { id }),
    });
  };

  if (isLoading) return <EditProfileSkeleton />;

  return (
    <Container>
      <div className="mt-[106px] lg:mt-0">
        <h1 className="mb-6 lg:text-2xl  text-xl font-bold lg:text-start text-center">
          Edit Your Profile
        </h1>
        <GTForm onSubmit={onSubmit}>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-gray-100 p-6 rounded-3xl shadow">
              <div className="flex items-center gap-4">
                <img
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                  src={
                    currentUserInfo?.data?.profilePhoto || '/default-avatar.png'
                  }
                />
                <div className="text-sm sm:text-base">
                  <p className="font-semibold">{currentUserInfo?.data?.name}</p>
                  <p className="text-gray-500">
                    {currentUserInfo?.data?.email}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSubmitButtonOpen(true)}
                className="bg-primary hover:bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Edit Profile
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block font-medium mb-1">
                  Name
                </label>
                <GTInput
                  defaultValue={currentUserInfo?.data?.name}
                  id="name"
                  name="name"
                  type="text"
                  size="lg"
                  disabled={!isSubmitButtonOpen}
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-medium mb-1">
                  Email
                </label>
                <GTInput
                  defaultValue={currentUserInfo?.data?.email}
                  id="email"
                  name="email"
                  type="email"
                  readonly
                  size="lg"
                  disabled
                />
              </div>
              <div>
                <label
                  htmlFor="mobileNumber"
                  className="block font-medium mb-1"
                >
                  Mobile Number
                </label>
                <GTInput
                  defaultValue={currentUserInfo?.data?.mobileNumber}
                  id="mobileNumber"
                  name="mobileNumber"
                  type="text"
                  size="lg"
                  disabled={!isSubmitButtonOpen}
                />
              </div>
              <div>
                <p className="font-bold  text-sm mb-3">Upload Image</p>
                <label
                  aria-label="Upload Your Files"
                  className={
                    'flex cursor-pointer items-center gap-3 rounded border border-dashed border-athens-gray-200 bg-white p-3 transition-all'
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
                      Upload Your Files
                    </h5>
                    <small className="text-sm text-athens-gray-400">
                      Click to browse JPG,JPEG or PNG formats.
                    </small>
                  </div>
                </label>
                <input
                  disabled={!isSubmitButtonOpen}
                  className="w-full  hidden mt-1 lg:mb-8 rounded-md border border-input bg-transparent py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm  h-12 items-center px-4 text-athens-gray-950 outline-none !ring-0 focus:ring-0"
                  id="image"
                  name="image"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (file) {
                      setImageFile(file);
                    }
                  }}
                />

                {imageFile && (
                  <div className="mb-2 relative flex items-center gap-2 rounded-md border border-athens-gray-200 bg-white p-3">
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
                        <rect
                          height="18"
                          rx="2"
                          ry="2"
                          width="18"
                          x="3"
                          y="3"
                        />
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
                      <button
                        type="button"
                        onClick={() => setImageFile(undefined)}
                      >
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
            </div>

            <div className="text-end">
              <button
                type="submit"
                disabled={!isSubmitButtonOpen}
                className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-green-700 disabled:opacity-50"
              >
                Submit
              </button>
            </div>
          </div>
        </GTForm>
      </div>
    </Container>
  );
};

export default EditProfile;
