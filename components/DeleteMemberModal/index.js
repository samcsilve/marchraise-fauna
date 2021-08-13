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
import { DELETE_MEMBER } from "graphql/queries";
import { useRouter } from "next/router";

const DeleteMemberModal = ({ member }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef();
  const finalRef = useRef();
  const Router = useRouter();
  const handleDelete = async (id) => {
    const res = await fetch("/api/hello", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ campaign: Router.query.id, member: id }),
    });
    if (res.ok) {
      Router.replace(Router.asPath)
    }
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
          <ModalHeader>Remove Member</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <Text>
              Are you sure you want to remove{" "}
              <strong>{member.user.name}</strong> from this campaign? This
              cannot be reversed.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              onClick={() => {
                handleDelete(member._id);
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

export default DeleteMemberModal;
