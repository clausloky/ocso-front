"use client";

import {
  Button,
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useCallback, useState } from "react";
import { LuPlus } from "react-icons/lu";
import CreateProviderForm from "./CreateProviderForm";

export default function CreateProviderModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [formKey, setFormKey] = useState(0);
  const handleSuccess = useCallback(() => {
    onClose();
    setFormKey((key) => key + 1);
  }, [onClose]);

  return (
    <>
      <Button
        className="w-fit"
        color="primary"
        onPress={onOpen}
        aria-label="Crear proveedor"
      >
        <LuPlus size="20" />
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="bg-orange-400"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader>Crear proveedor</ModalHeader>
              <ModalBody>
                <CreateProviderForm
                  key={formKey}
                  onSuccess={handleSuccess}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
