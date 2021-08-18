import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { CAMPAIGN_BY_ID, DELETE_CONTACT, GET_CONTACTS } from "graphql/queries";
import { useRouter } from "next/router";

const DeleteContactModal = ({ contact }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef();
  const finalRef = useRef();
  const Router = useRouter();
  const [deleteContact] = useMutation(DELETE_CONTACT, {
    onCompleted: () => {
      onClose();
    },
  });
  const handleDelete = async (id) => {
    deleteContact({
      variables: {
        id: id,
      },
      refetchQueries: [GET_CONTACTS],
    });
  };
  return (
    <>
      <IconButton colorScheme='red' icon={<FaTrash />} onClick={onOpen} />

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Remove Contact</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <Text>
              Are you sure you want to remove <strong>{contact.name}</strong>{" "}
              from your contacts list? This cannot be reversed.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              onClick={() => {
                handleDelete(contact._id);
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

export default DeleteContactModal;
