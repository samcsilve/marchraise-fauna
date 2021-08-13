import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Button,
  Box,
} from "@chakra-ui/react";
import Link from "next/link";
import StripeButton from "./StripeButton";
import { useAuth } from "@/lib/auth";

const StripeModal = ({ isOnboarded }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();

  useEffect(() => {
    if (!isOnboarded) {
      onOpen();
    }
  }, []);
  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        motionPreset="none"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Payment Info Required</ModalHeader>
          <ModalBody>
            <Text>
              Please connect your MarchRaise account with Stripe, our payment
              provider, in order to receive payouts from your campaign.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Link href="/my-campaigns">
              <Button colorScheme="blue" mr={3}>
                Back
              </Button>
            </Link>
            <Box
              onClick={() => {
                fetch("/api/auth/create-stripe-account", {
                  method: "GET",
                })
                  .then((res) => res.json())
                  .then((data) => {
                    window.location.href = data.url;
                  });
              }}
            >
              <StripeButton />
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StripeModal;
