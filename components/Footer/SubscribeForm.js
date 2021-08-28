import { Button, chakra, Input, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { FooterHeading } from "./FooterHeading";
import { useForm } from "@formspree/react";

export const SubscribeForm = (props) => {
  const [state, handleSubmit] = useForm("mayayrlv");
  if (state.succeeded) {
    return <p>Thanks for joining!</p>;
  }
  return (
    <chakra.form {...props} onSubmit={handleSubmit}>
      <Stack spacing="4">
        <FooterHeading>Subscribe to our newsletter</FooterHeading>
        <Text>
          Get notified when we add new functionality or we have exciting news
          for you.
        </Text>
        <Stack spacing="4" direction={{ base: "column", md: "row" }}>
          <Input
            bg="white"
            placeholder="Enter your email"
            id="email"
            type="email"
            name="email"
            required
            focusBorderColor="blue.500"
            _placeholder={{
              opacity: 1,
              color: "gray.500"
            }}
          />
          <Button
            type="submit"
            colorScheme="blue"
            flexShrink={0}
            width={{ base: "full", md: "auto" }}
            disabled={state.submitting}
          >
            Subscribe
          </Button>
        </Stack>
      </Stack>
    </chakra.form>
  );
};
