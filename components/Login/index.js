import {
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import { Card } from "./Card";
import LoginForm from "./LoginForm";
import { Logo } from "./Logo";
import { UnderlineLink } from "../Signup/UnderlineLink";

const LoginPage = () => {
  return (
    <Box
      bg="gray.50"
      minH="100vh"
      py="12"
      px={{
        base: "4",
        lg: "8",
      }}
    >
      <Box maxW="md" mx="auto">
        <Logo
          mx="auto"
          h="8"
          mb={{
            base: "10",
            md: "20",
          }}
        />
        <Heading textAlign="center" size="xl" fontWeight="extrabold">
          Sign in to your account
        </Heading>
        <Box mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
          <Text as="span">Don&apos;t have an account?</Text>{" "}
          <UnderlineLink href="/signup">Sign Up</UnderlineLink>
        </Box>
        <Card>
          <LoginForm />
        </Card>
      </Box>
    </Box>
  );
};

export default LoginPage;
