import { useRouter } from "next/router";
import React, { forwardRef, useRef } from "react";
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
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useDisclosure,
  useMergeRefs,
} from "@chakra-ui/react";
import { Card } from "@/components/Login/Card";
import { Logo } from "@/components/Login/Logo";
import { useForm } from "react-hook-form";
import { HiEye, HiEyeOff } from "react-icons/hi";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";

export async function getServerSideProps({ query }) {
  const { token } = query;
  return { props: { token } };
}

const ChangePassword = forwardRef((props, ref) => {
  const Router = useRouter();
  const { data: user, mutate: mutateUser } = useSWR(
    "/api/auth/profile",
    fetcher
  );
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = useRef(null);
  const mergeRef = useMergeRefs(inputRef, ref);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async ({ password }) => {
    const res = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: props.token, password }),
    });
    if (res.ok) {
      mutateUser();
      Router.push("/my-campaigns");
    }
  };

  const onClickReveal = () => {
    onToggle();
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
          Change Your Password
        </Heading>

        <Card>
          <chakra.form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="4">
              <FormControl id="password">
                <Flex justify="space-between">
                  <FormLabel>New Password</FormLabel>
                </Flex>
                <InputGroup>
                  <InputRightElement>
                    <IconButton
                      bg="transparent !important"
                      variant="ghost"
                      aria-label={isOpen ? "Mask password" : "Reveal password"}
                      icon={isOpen ? <HiEyeOff /> : <HiEye />}
                      onClick={onClickReveal}
                    />
                  </InputRightElement>
                  <Input
                    ref={mergeRef}
                    {...register("password", { required: true })}
                    name="password"
                    type={isOpen ? "text" : "password"}
                    placeholder="New Password"
                    {...props}
                  />
                </InputGroup>
                {errors.password && (
                  <Alert mt={2} status="error">
                    <AlertIcon />
                    <AlertDescription>This field is required.</AlertDescription>
                  </Alert>
                )}
              </FormControl>
              <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
                Change Password
              </Button>
            </Stack>
          </chakra.form>
        </Card>
      </Box>
    </Box>
  );
});

export default ChangePassword;
