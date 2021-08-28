import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";

function ViewUpdatesModal({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        onClick={onOpen}
        display="flex"
        alignItems="center"
        color="#333"
        border="1px solid transparent"
        borderRadius=".25rem"
        padding=".25rem .5rem"
        backgroundColor="transparent"
        textDecoration="underline"
        fontWeight="bold"
        _hover={{ cursor: "pointer" }}
      >
        See Updates
      </Box>

      <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Updates</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflow="scroll" maxHeight="md">
            <Box>
              {data.map((update) => {
                return (
                  <Box
                    pt={4}
                    key={update._id}
                    borderBottom="1px solid"
                    borderBottomColor="#d8d8d8"
                    pb={8}
                  >
                    <Box display="flex" alignItems="center">
                      <Heading
                        fontSize="1.375rem"
                        display="block"
                        fontWeight="900"
                      >
                        {update.title}
                      </Heading>
                      <Text fontSize="0.9rem" ml={4}>
                        {dayjs(update.createdAt).format("MMMM DD, YYYY")}
                      </Text>
                    </Box>
                    <Text mt={8}>{update.content}</Text>
                  </Box>
                );
              })}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ViewUpdatesModal;
