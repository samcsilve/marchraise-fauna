import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Checkbox,
  CloseButton,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  StackDivider,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { HiCloudUpload } from "react-icons/hi";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { FieldGroup } from "./FieldGroup";
import { useAuth } from "@/lib/auth";
import Link from "next/link";

export const ProfileForm = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("All fields are required");
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }
    const res = await fetch("/api/auth/update-profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
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
      <form id="settings-form" onSubmit={handleSubmit}>
        <Stack spacing="4" divider={<StackDivider />}>
          <Heading size="lg" as="h1" paddingBottom="4">
            Account Settings
          </Heading>
          {user && (
            <FieldGroup title="Personal Info">
              <VStack width="full" spacing="6">
                {error && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertDescription>{error}</AlertDescription>
                    <CloseButton position="absolute" right="8px" top="8px" />
                  </Alert>
                )}
                <FormControl id="name">
                  <FormLabel>Name</FormLabel>
                  <Input
                    value={name}
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    maxLength={255}
                  />
                </FormControl>

                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>

                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>

                <FormControl id="confirm-password">
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </FormControl>
              </VStack>
            </FieldGroup>
          )}
        </Stack>
        <FieldGroup mt="8">
          <HStack width="full">
            <Link href="/my-campaigns">
              <Box>
                <Button variant="outline">Cancel</Button>
              </Box>
            </Link>
            <Button type="submit" colorScheme="blue">
              Save Changes
            </Button>
          </HStack>
        </FieldGroup>
      </form>
    </Box>
  );
};
