import {
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  Img,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import Logo from "@/components/Logo";
import { SignupForm } from "./SignupForm";
import { UnderlineLink } from "./UnderlineLink";
import Link from 'next/link'

const Signup = () => {
  return (
    <Flex
      direction={{
        base: "column",
        md: "row",
      }}
      overflow="hidden"
      minH="100vh"
      height="100%"
      bg={mode("gray.50", "inherit")}
    >
      <Box
        overflowY="auto"
        flex="1"
        py={{
          base: "10",
          md: "12",
        }}
        px={{
          base: "6",
          md: "10",
        }}
      >
        <Box maxW="sm" mx="auto">
          <Logo
            mb={{
              base: "14",
              md: "16",
            }}
            w="auto"
            h="7"
            mx="auto"
          />
          <Box
            textAlign="center"
            mb={{
              base: "10",
              md: "12",
            }}
          >
            <Heading
              as="h1"
              size="xl"
              fontWeight="extrabold"
              letterSpacing="tight"
            >
              Sign up for an account
            </Heading>
            <Text
              mt="3"
              color={mode("gray.600", "gray.400")}
              fontWeight="medium"
            >
              Have an account?{" "}
              <UnderlineLink href="/login">Log in here</UnderlineLink>
            </Text>
          </Box>
          <SignupForm />
        </Box>
      </Box>

      <Box
        display={{
          base: "none",
          lg: "block",
        }}
        maxH="100vh"
        overflow="hidden"
        flex="1"
        bg="blue.600"
        color="white"
        px="20"
        pt="20"
      >
        <Text
          mt="6"
          fontWeight="extrabold"
          fontSize={{
            base: "2xl",
            lg: "3xl",
          }}
          maxW="sm"
          letterSpacing="tight"
          lineHeight="normal"
        >
          Fundraise with MarchRaise
        </Text>
        <Text mt="5" maxW="md" fontSize="lg">
          MarchRaise is the data-driven fundraising platform for individuals
          that helps you simplify, plan, secure, and get the most out of your
          campaign, all with no platform fees.
        </Text>
        <HStack
          as="a"
          href="#"
          justify="center"
          display="inline-flex"
          minW="2xs"
          py="3"
          px="2"
          mt="5"
          fontWeight="semibold"
          border="2px solid white"
          rounded="lg"
          transition="all 0.2s"
          _hover={{
            bg: "whiteAlpha.200",
          }}
        >
          <Link href="/help" passHref>
            <Flex alignItems="center">
              <Box mr={2}>Learn more</Box>
              <HiOutlineExternalLink />
            </Flex>
          </Link>
        </HStack>
        <Box mt="10" position="relative">
          <Img alt="App screenshot" src="/hero-img-dark.png" />
        </Box>
      </Box>
    </Flex>
  );
};

export default Signup;
