'use client';

import { Modal, ModalContent, ModalBody, Button } from '@nextui-org/react';
import GTInput from '../form/GTInput';
import GTForm from '../form/GTForm';
import GTSelect from '../form/GTSelect';
import GTQuill from '../form/GTQuill';

interface IProps {
  isOpen: any;
  onOpenChange: any;
  handleCreateProduct: any;
  submitName: string;
}

export default function CreateCategoryModal({
  isOpen,
  onOpenChange,
  handleCreateProduct,
  submitName,
}: IProps) {
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

                    <div>
                      <label className="font-bold mb-3" htmlFor="title">
                        Name
                      </label>
                      <div className="py-3">
                        <GTInput
                          id="name"
                          label="name"
                          name="name"
                          type="text"
                        />
                      </div>
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
