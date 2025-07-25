'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';

export default function WishlistModal({
  isOpen,
  onOpenChange,
  handleRemoveCart,
  title,
  subTitle,
  btn1,
  btn2,
}: any) {
  //   console.log(data);
  return (
    <>
      <Modal isOpen={isOpen} size="sm" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <p className="text-[#212121]">{title}</p>
              </ModalHeader>
              <ModalBody>
                <p className="text-[#212121]">{subTitle}</p>
                <ModalFooter>
                  <Button
                    color="default"
                    radius="none"
                    size="sm"
                    variant="bordered"
                    onPress={() => onClose()}
                  >
                    {btn2}
                  </Button>
                  <Button
                    className="bg-[#2abbe8]"
                    color="primary"
                    radius="none"
                    size="sm"
                    type="submit"
                    onClick={() => handleRemoveCart()}
                  >
                    {btn1}
                  </Button>
                </ModalFooter>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
