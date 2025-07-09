"use client";

import { Modal, ModalContent, ModalBody, Button } from "@nextui-org/react";
import GTInput from "../form/GTInput";
import GTForm from "../form/GTForm";
import GTSelect from "../form/GTSelect";
import GTQuill from "../form/GTQuill";
import { useUser } from "@/src/context/user.provider";
import { useIsUserVerified } from "@/src/hooks/payment.hook";

interface IProps {
  isOpen: any;
  onOpenChange: any;
  imageFiles: any;
  setImageFiles: any;
  handleCreateProduct: any;
  handleDeleteNewProductImages: any;
  categories: any;
  postTypeOption?: any;
  submitName: string;
}

export default function CreatePostModal({
  isOpen,
  onOpenChange,
  imageFiles,
  setImageFiles,
  handleCreateProduct,
  handleDeleteNewProductImages,
  categories,
  postTypeOption,
  submitName,
}: IProps) {
  // const categories = categoriesData?.data.map((category: any) => ({
  //   key: category?._id,
  //   label: category.name,
  // }));

  const { user } = useUser();
  console.log({ user });

  const { data } = useIsUserVerified();
  console.log("res", data);

  // const categoriesOption =

  return (
    <>
      <Modal
        className=""
        isOpen={isOpen}
        size="3xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalBody>
                <div className=" w-full mx-auto">
                  <div>
                    <h1 className="font-semibold lg:text-2xl lg:my-10">
                      {submitName}
                    </h1>
                  </div>
                  <GTForm onSubmit={handleCreateProduct}>
                    {/* Title Field */}

                    {data?.success && (
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
                    )}
                    {postTypeOption?.length > 0 && (
                      <div>
                        <label className="font-bold mb-3" htmlFor="category">
                          Type
                        </label>
                        <div className="py-3">
                          <GTSelect
                            label="Type"
                            name="type"
                            options={postTypeOption}
                          />
                        </div>
                      </div>
                    )}

                    {/* <GTInput name="title" label="Title" required /> */}

                    {/* Content Field */}
                    <div>
                      <label className="font-bold mb-3" htmlFor="category">
                        Category
                      </label>
                      <div className="py-3">
                        <GTSelect
                          label="Category"
                          name="category"
                          options={categories}
                        />
                      </div>
                    </div>
                    <div className="py-3">
                      <GTQuill
                        label="Content"
                        name="content"
                        placeholder="Write your content here..."
                      />
                    </div>
                    <div>
                      <p className=" mt-10 font-bold mb-3">Upload Image</p>
                      <label
                        aria-label="Upload Your Files"
                        className={`flex cursor-pointer hover:bg-athens-gray-50/10 items-center gap-3 rounded border border-dashed border-athens-gray-200 bg-white p-3 transition-all`}
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
                        className="w-full  hidden mt-1 lg:mb-8 rounded-md border border-input bg-transparent py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm  h-12 items-center px-4 text-athens-gray-950 outline-none !ring-0 focus:ring-0"
                        id="image"
                        name="image"
                        placeholder="Jhon Deo"
                        type="file"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setImageFiles((prevImages: any) => [
                              ...prevImages,
                              file,
                            ]);
                          }
                        }}
                      />
                      {imageFiles.map((imageFile: any) => (
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
                              onClick={() =>
                                handleDeleteNewProductImages(imageFile.name)
                              }
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
                      ))}
                    </div>
                    <Button
                      fullWidth
                      className=" border-[1px] bg-transparent hover:border-white hover:text-white hover:bg-green-600 
         border-white bg-green-600 mt-5"
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
                      {submitName}
                    </Button>
                  </GTForm>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
