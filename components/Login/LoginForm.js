import * as React from "react";
import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Box,
  Flex,
  IconButton,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
  Link,
  Alert,
  AlertIcon,
  AlertDescription,
  Text,
} from "@chakra-ui/react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { useAuth } from "@/lib/auth";
import NextLink from "next/link";

const LoginForm = React.forwardRef((props, ref) => {
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = React.useRef(null);
  const mergeRef = useMergeRefs(inputRef, ref);

  const { signin, errorMessage } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = ({ email, password }) => {
    signin({ email, password });
  };

  const onClickReveal = () => {
    onToggle();
    const input = inputRef.current;

    if (input) {
      input.focus({
        preventScroll: true,
      });
      const length = input.value.length * 2;
      requestAnimationFrame(() => {
        input.setSelectionRange(length, length);
      });
    }
  };

  return (
    <chakra.form onSubmit={handleSubmit(onSubmit)} {...props}>
      <Stack spacing="4">
        {errorMessage && (
          <Alert status="error">
            <AlertIcon />
            <AlertDescription>{errorMessage.message}</AlertDescription>
          </Alert>
        )}
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
        <FormControl id="password">
          <Flex justify="space-between">
            <FormLabel>Password</FormLabel>
            <NextLink href="/forgot-password">
              <Box
                as={Link}
                color="blue.600"
                fontWeight="semibold"
                fontSize="sm"
              >
                Forgot Password?
              </Box>
            </NextLink>
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
              autoComplete="current-password"
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
          Sign in
        </Button>
      </Stack>
    </chakra.form>
  );
});

LoginForm.displayName = "LoginForm";

export default LoginForm;
