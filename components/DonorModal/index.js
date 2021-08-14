import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  UnorderedList,
  ListItem,
  Box,
  Flex,
} from "@chakra-ui/react";
import { RiHeartsLine } from "react-icons/ri";

const DonorModal = ({ donors }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex justifyContent="center">
        <Button onClick={onOpen}>See Donors</Button>
      </Flex>

      <Modal motionPreset="none" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Donors</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UnorderedList
              marginTop="1rem"
              listStyleType="none"
              mb={0}
              paddingLeft={0}
              maxH="300px"
              overflow="scroll"
            >
              {donors.map((donor, index) => {
                return (
                  <ListItem
                    key={index}
                    _notLast={{ pb: ".75rem" }}
                    borderBottom
                  >
                    <Box textDecoration="none">
                      <Box alignItems="flex-start" display="flex">
                        <Flex
                          flexShrink={0}
                          borderRadius="full"
                          justifyContent="center"
                          alignItems="center"
                          height="2.5rem"
                          position="relative"
                          width="2.5rem"
                          mr={4}
                          bg="#C0BDFF"
                          color="#635bff"
                        >
                          <RiHeartsLine size={24} />
                        </Flex>
                        <Box>
                          <Box
                            fontWeight="700"
                            overflowWrap="break-word"
                            wordBreak="break-word"
                          >
                            {donor.name}
                          </Box>
                          <Box>${donor.amount / 100}</Box>
                        </Box>
                      </Box>
                    </Box>
                  </ListItem>
                );
              })}
            </UnorderedList>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DonorModal;
