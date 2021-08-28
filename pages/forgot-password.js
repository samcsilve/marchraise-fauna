import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import * as React from "react";
import { Card } from "@/components/Login/Card";
import { Logo } from "@/components/Login/Logo";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async ({ email, password }) => {
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.ok) {
      toast({
        title: "Email sent",
        description: "Check your email for a password reset link",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

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
        <Heading mb={8} textAlign="center" size="xl" fontWeight="extrabold">
          Reset Your Password
        </Heading>

        <Card>
          <chakra.form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="4">
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  {...register("email", { required: true })}
                  name="email"
                  type="email"
                  autoComplete="email"
                />
                {errors.email && (
                  <Alert mt={2} status="error">
                    <AlertIcon />
                    <AlertDescription>This field is required.</AlertDescription>
                  </Alert>
                )}
              </FormControl>
              <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
                Reset Password
              </Button>
            </Stack>
          </chakra.form>
        </Card>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
