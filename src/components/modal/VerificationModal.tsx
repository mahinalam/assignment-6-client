import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/modal';
import { Button } from '@nextui-org/react';
import React from 'react';

const VerificationModal = ({
  isOpen,
  onOpenChange,
  handleVerifyProfile,
  loading,
}: {
  isOpen: boolean;
  onOpenChange: any;
  handleVerifyProfile: any;
  loading: boolean;
}) => {
  return (
    <div>
      <Modal isOpen={isOpen} size="xl" onOpenChange={onOpenChange}>
        {/* Marked: Modal starts */}
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Verify Profile
              </ModalHeader>
              <ModalBody>
                <p>
                  Verification Required: To proceed, a minimum balance of BDT
                  1000 is needed for account verification. Please ensure you
                  have sufficient funds to continue.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  isLoading={!!loading}
                  color="primary"
                  onClick={handleVerifyProfile}
                >
                  Verify
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default VerificationModal;
