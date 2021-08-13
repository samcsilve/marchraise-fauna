import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  SlideFade,
  Spacer,
  Stack,
  Text,
  useBoolean,
  useColorModeValue as mode,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FaPlus, FaSign, FaSignOutAlt, FaUser } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

const UserMenu = () => {
  const [show, { toggle }] = useBoolean(false);

  const { user, logout } = useAuth();
  return (
    <>
      <Box zIndex="1">
        <Box
          maxW="7xl"
          px={{
            base: "4",
            md: "6",
            lg: "8",
          }}
        >
          <HStack
            as="button"
            fontWeight="semibold"
            color={mode("gray.600", "gray.400")}
            onClick={() => toggle()}
          >
            <Avatar size="sm" name={user.name} email={user.email} />
          </HStack>
          <Box
            as={SlideFade}
            in={show}
            display={show ? "block" : "none"}
            pos="absolute"
            top="20"
            right="4"
            bg={mode("white", "gray.700")}
            pt="2"
            maxW="lg"
            rounded="lg"
            overflow="hidden"
            shadow="lg"
          >
            <Box height="200px" width="300px" mx={2}>
              <Stack pb={4} height="100%">
                <Link href="/new-campaign">
                  <Flex
                    onClick={() => (show ? toggle() : null)}
                    cursor={show ? "pointer" : "auto"}
                    borderRadius="xl"
                    p={4}
                    justifyContent="space-between"
                    alignItems="center"
                    _hover={{ bg: "gray.100" }}
                  >
                    <Heading fontSize="1.1rem">New Campaign</Heading>
                    <FaPlus />
                  </Flex>
                </Link>
                <Link href="/my-campaigns">
                  <Flex
                    onClick={() => toggle()}
                    cursor="pointer"
                    borderRadius="xl"
                    p={4}
                    justifyContent="space-between"
                    alignItems="center"
                    _hover={{ bg: "gray.100" }}
                  >
                    <Heading fontSize="1.1rem">My Campaigns</Heading>
                    <FaUser />
                  </Flex>
                </Link>
                <Spacer />
                <Divider />
                <Flex
                  cursor="pointer"
                  borderRadius="xl"
                  p={4}
                  justifyContent="space-between"
                  alignItems="center"
                  _hover={{ bg: "gray.100" }}
                  onClick={() => {
                    logout();
                    toggle();
                  }}
                >
                  <Heading fontSize="1.1rem">Log Out</Heading>
                  <FaSignOutAlt />
                </Flex>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserMenu;
