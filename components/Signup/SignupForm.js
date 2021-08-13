import { useAuth } from "@/lib/auth";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  LightMode,
  Stack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { useForm } from "react-hook-form";

export const SignupForm = () => {
  const { signup, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async ({ name, email, password }) => {
    signup({name, email, password});
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="-px">
          {error && (
            <Alert my={2} status="error">
              <AlertIcon />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <FormControl id="name">
            <FormLabel srOnly>Name</FormLabel>
            <Input
              size="lg"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Name"
              bg={mode("white", "gray.700")}
              fontSize="md"
              roundedBottom="0"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <Alert status="error">
                <AlertIcon />
                <AlertDescription>
                  {errors.name?.type === "required" && "Name is required"}
                </AlertDescription>
              </Alert>
            )}
          </FormControl>
          <FormControl id="email-address">
            <FormLabel srOnly>Email address</FormLabel>
            <Input
              size="lg"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email address"
              bg={mode("white", "gray.700")}
              fontSize="md"
              roundedTop="0"
              roundedBottom="0"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <Alert status="error">
                <AlertIcon />
                <AlertDescription>
                  {errors.email?.type === "required" && "Email is required"}
                </AlertDescription>
              </Alert>
            )}
          </FormControl>
          <FormControl id="password">
            <FormLabel srOnly>Password</FormLabel>
            <Input
              name="password"
              type="password"
              autoComplete="current-password"
              size="lg"
              bg={mode("white", "gray.700")}
              fontSize="md"
              roundedTop="0"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <Alert status="error">
                <AlertIcon />
                <AlertDescription>
                  {errors.password?.type === "required" &&
                    "Password is required"}
                </AlertDescription>
              </Alert>
            )}
          </FormControl>
        </Stack>
        <LightMode>
          <Button
            size="lg"
            type="submit"
            mt="8"
            w="full"
            colorScheme="blue"
            fontSize="md"
            fontWeight="bold"
          >
            Sign up
          </Button>
        </LightMode>
      </form>
    </>
  );
};
