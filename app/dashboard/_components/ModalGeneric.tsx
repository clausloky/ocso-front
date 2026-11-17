"use client";

import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { ReactNode } from "react";

interface ModalGenericProps {
  children: ReactNode;
  icon: ReactNode;
}

export default function ModalGeneric({
  children,
  icon,
}: ModalGenericProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <Button onPress={onOpen}>
        {icon}
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="bg-orange-400"
      >
        <ModalContent className="w-full">
          {() => (
            <ModalBody>
              {children}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}