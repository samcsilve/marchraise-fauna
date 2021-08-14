import React from "react";
import { useAuth } from "@/lib/auth";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { RiArrowRightUpLine } from "react-icons/ri";
import { useRouter } from "next/router";
import { mutate } from "swr";
import { FaUsers } from "react-icons/fa";
import { CREATE_MEMBER, USER_CAMPAIGNS } from "graphql/queries";
import { useMutation } from "@apollo/client";

const JoinCampaignModal = () => {
  const [joinCode, setJoinCode] = useState("");
  const [loading, setLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const Router = useRouter();
  const [createMember] = useMutation(CREATE_MEMBER, {
    onCompleted: () => {
      onClose();
    },
  });

  const { user } = useAuth();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    createMember({
      variables: {
        user: user && user.id,
        campaign: joinCode,
        amountRaised: 0,
      },
      refetchQueries: [USER_CAMPAIGNS],
    });
    setLoading(false);
  };

  return (
    <>
      <Button
        variant="outline"
        iconSpacing="1"
        leftIcon={<RiArrowRightUpLine fontSize="1.25em" />}
        onClick={onOpen}
      >
        Join Campaign
      </Button>
      <Modal
        closeOnOverlayClick={false}
        motionPreset="none"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>Join Group Campaign</ModalHeader>
            <ModalBody>
              <FormControl>
                <FormLabel>Enter Group Join Code</FormLabel>
                <Input onChange={(e) => setJoinCode(e.target.value)} />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={onClose}
                variant="outline"
                colorScheme="blue"
                mr={3}
              >
                Cancel
              </Button>
              <Button
                leftIcon={<FaUsers />}
                type="submit"
                colorScheme="blue"
                mr={3}
                isLoading={loading}
              >
                Join Group
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default JoinCampaignModal;
