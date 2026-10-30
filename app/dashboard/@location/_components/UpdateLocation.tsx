'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { ReactNode } from 'react';

import { LuPencil } from 'react-icons/lu';

interface UpdateLocationProps {
  children: ReactNode;
}

export default function UpdateLocation({
  children,
}: UpdateLocationProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}><LuPencil color='primary'></LuPencil></Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='bg-orange-400'>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Editar tienda
              </ModalHeader>

              <ModalBody>
                {children}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}