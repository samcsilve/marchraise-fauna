import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useAuth } from "@/lib/auth";
import { useMutation } from "@apollo/client";
import { CAMPAIGN_BY_ID, CREATE_UPDATE } from "graphql/queries";

const UpdateModal = ({ mutate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { user } = useAuth();

  const Router = useRouter();
  const { id } = Router.query;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef();
  const finalRef = useRef();

  const [createUpdate] = useMutation(CREATE_UPDATE, {
    onCompleted: () => {
      onClose();
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const variables = {
      campaign: id,
      user: user && user.id,
      title,
      content,
      createdAt: new Date(Date.now()),
    };

    createUpdate({
      variables,
      refetchQueries: [CAMPAIGN_BY_ID]
    });
  };
  return (
    <>
      <Button onClick={onOpen} colorScheme="blue" leftIcon={<FaPlus />}>
        Update
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Your Supporters</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your update a title"
                  ref={initialRef}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Content</FormLabel>
                <Textarea
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share your news"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" colorScheme="blue" ml={3}>
                Post Update
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateModal;
