import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useAuth } from "@/lib/auth";
import { useMutation } from "@apollo/client";
import { CAMPAIGN_BY_ID, DELETE_UPDATE } from "graphql/queries";

const DeleteUpdateModal = ({ mutate, update }) => {
  const { user } = useAuth();

  const Router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef();
  const finalRef = useRef();

  const [deleteUpdate] = useMutation(DELETE_UPDATE, {
    onCompleted: () => {
      onClose();
    },
  });

  const handleDelete = async (id) => {
    deleteUpdate({
      variables: {
        id: id,
      },
      refetchQueries: [CAMPAIGN_BY_ID]
    });
  };
  return (
    <>
      <IconButton icon={<FaTrash />} onClick={onOpen} />

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete this update</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <Text>
              Are you sure you want to delete this update? This cannot be
              reversed.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              onClick={() => {
                handleDelete(update._id);
                mutate();
                onClose();
              }}
              type="submit"
              colorScheme="red"
              ml={3}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteUpdateModal;
