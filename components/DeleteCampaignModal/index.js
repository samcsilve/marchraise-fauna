import {
    Box,
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
import { DELETE_CAMPAIGN, USER_CAMPAIGNS } from "graphql/queries";
import { useRouter } from "next/router";

const DeleteCampaignModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef();
  const finalRef = useRef();
  const Router = useRouter();
  const { id } = Router.query;
  const [deleteCampaign] = useMutation(DELETE_CAMPAIGN, {
    onCompleted: () => {
      onClose();
      Router.push("/my-campaigns");
    },
  });
  const handleDelete = async () => {
    deleteCampaign({
      variables: {
        id,
      },
      refetchQueries: [USER_CAMPAIGNS],
    });
  };
  return (
    <>
      <Box ml={4} onClick={onOpen} cursor="pointer" textAlign="center">
        <IconButton colorScheme="red" icon={<FaTrash />} />
        <Text
          mt={4}
          textDecoration="underline"
          fontWeight="bold"
          onClick={onOpen}
        >
          Delete
        </Text>
      </Box>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Remove Campaign</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <Text>
              Are you sure you want to delete this campaign? This cannot be
              reversed.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              onClick={handleDelete}
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

export default DeleteCampaignModal;
