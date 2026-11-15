"use client";

import { ReactNode, useState } from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
} from "@nextui-org/react";

import { LuPlus } from "react-icons/lu";

export default function CreateEmployee({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onPress={() => setIsOpen(true)}
        color="primary"
        isIconOnly
      >
        <LuPlus size={20} />
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        className="bg-orange-400"
        size="2xl"
      >
        <ModalContent>
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}