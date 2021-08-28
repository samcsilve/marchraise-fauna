import {
  Box,
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
import { FaEnvelope, FaPlus } from "react-icons/fa";
import { useAuth } from "@/lib/auth";
import { useMutation } from "@apollo/client";
import {
  CAMPAIGN_BY_ID,
  CREATE_CONTACT,
  CREATE_UPDATE,
  GET_CONTACTS,
} from "graphql/queries";

const ContactsModal = () => {
  const [contacts, setContacts] = useState([{ name: "", email: "" }]);
  const addContactField = () => {
    setContacts([...contacts, { name: "", email: "" }]);
  };

  const { user } = useAuth();

  const Router = useRouter();
  const { id } = Router.query;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef();
  const finalRef = useRef();

  const [createContact] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      onClose();
      setContacts([{ name: "", email: "" }]);
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    contacts.map((contact) => {
      const variables = {
        campaign: id,
        user: user && user.id,
        name: contact.name,
        email: contact.email,
        status: false,
      };
      if (contact.name && contact.email) {
        fetch("/api/contacts/send?type=individual", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contact, userId: user.id, campaignId: id }),
        });
        createContact({
          variables,
          refetchQueries: [CAMPAIGN_BY_ID, GET_CONTACTS],
        });
      }
    });
  };
  return (
    <>
      <Box ml={4} onClick={onOpen} cursor="pointer" textAlign="center">
        <IconButton
          colorScheme="blue"
          variant="outline"
          icon={<FaEnvelope />}
        />
        <Text
          mt={4}
          textDecoration="underline"
          fontWeight="bold"
          onClick={onOpen}
        >
          Contacts
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
          <ModalHeader>Invite Supporters By Email</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody pb={6}>
              {contacts.map((val, index) => {
                return (
                  <Box mb={4} key={index} display="flex" alignItems="center">
                    <Input
                      autoComplete="name"
                      onChange={(e) => {
                        contacts[index].name = e.target.value;
                      }}
                      placeholder="Name"
                      type="text"
                      mr={2}
                    />
                    <Input
                      autoComplete="email"
                      onChange={(e) => {
                        contacts[index].email = e.target.value;
                      }}
                      placeholder="Email"
                      type="email"
                      ml={2}
                      mr={index === 0 ? 12 : 0}
                    />
                    <Button
                      display={index > 0 ? "block" : "none"}
                      _focus={{ outline: "none" }}
                      ml={2}
                      colorScheme="red"
                      variant="ghost"
                      onClick={() => {
                        if (index > 0) {
                          setContacts(
                            contacts.filter((contact, idx) => idx !== index)
                          );
                        }
                      }}
                    >
                      X
                    </Button>
                  </Box>
                );
              })}
              <Button
                _focus={{ outline: "none" }}
                onClick={addContactField}
                mt={4}
                leftIcon={<FaPlus />}
              >
                Add Another Contact
              </Button>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                leftIcon={<FaPlus />}
                type="submit"
                colorScheme="blue"
                ml={3}
              >
                Add Contact
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ContactsModal;
