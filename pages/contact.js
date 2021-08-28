import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  StackDivider,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/contacts/contact-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      toast({
        title: "Your message was sent successfully",
        description: "Be on the lookout for a response within 24 hours",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <Box
      px={{
        base: "4",
        md: "10",
      }}
      py="16"
      maxWidth="3xl"
      mx="auto"
    >
      <form id="contact-form" onSubmit={handleSubmit}>
        <Stack spacing="4" divider={<StackDivider />}>
          <Heading size="lg" as="h1" paddingBottom="4">
            Contact Us
          </Heading>

          <VStack width="full" spacing="6">
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                type="text"
                maxLength={255}
              />
            </FormControl>

            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                type="email"
              />
            </FormControl>

            <FormControl id="message">
              <FormLabel>Message</FormLabel>
              <Textarea onChange={(e) => setMessage(e.target.value)} rows={5} />
              <FormHelperText>Leave your message here.</FormHelperText>
            </FormControl>
          </VStack>
        </Stack>
        <HStack mt={8} width="full">
          <Button mx="auto" type="submit" colorScheme="blue">
            Submit
          </Button>
        </HStack>
      </form>
    </Box>
  );
};

export default Contact;
