import React, { isValidElement } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { MobileNavContent } from "./MobileNavContent";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import { useAuth } from "@/lib/auth";

export const Template = (props) => {
  const { user, logout } = useAuth();
  const Router = useRouter();
  const children = React.Children.toArray(props.children).filter(
    isValidElement
  );
  const mobileNav = useDisclosure();

  return (
    <Flex
      py={4}
      px={{
        base: 4,
        md: 6,
        lg: 8,
      }}
      bg="#fff"
      boxShadow="md"
      borderBottomWidth="none"
    >
      {children.find((child) => child.type === Brand)?.props.children}

      <HStack
        spacing={3}
        display={{
          base: "none",
          md: "flex",
        }}
      >
        {children.find((child) => child.type === Links)?.props.children}
      </HStack>
      <Spacer />
      {user && (
        <HStack
          display={{
            base: "none",
            md: "flex",
          }}
          spacing={3}
        >
          {children.find((child) => child.type === UserProfile)?.props.children}
        </HStack>
      )}
      {!user && (
        <HStack
          display={{
            base: "none",
            md: "flex",
          }}
          spacing={3}
        >
          <NextLink href="/signup">
            <Box>
              <Button
                onClick={() => mobileNav.onClose()}
                colorScheme="blue"
                variant="solid"
              >
                Sign Up
              </Button>
            </Box>
          </NextLink>
          <NextLink href="/login">
            <Box>
              <Button
                onClick={() => mobileNav.onClose()}
                colorScheme="blue"
                variant="outline"
              >
                Log In
              </Button>
            </Box>
          </NextLink>
        </HStack>
      )}

      <IconButton
        display={{
          base: "flex",
          md: "none",
        }}
        size="sm"
        aria-label="Open menu"
        fontSize="20px"
        variant="ghost"
        onClick={mobileNav.onOpen}
        icon={<HamburgerIcon />}
      />

      <MobileNavContent isOpen={mobileNav.isOpen} onClose={mobileNav.onClose}>
        <Stack spacing={5}>
          <Flex>
            {children.find((child) => child.type === Brand)?.props.children}
          </Flex>
          <Stack>
            {children.find((child) => child.type === Links)?.props.children}
          </Stack>
          <Divider />
          {user && (
            <Stack spacing={5}>
              <Button
                colorScheme="blue"
                onClick={() => {
                  logout();
                  mobileNav.onClose();
                }}
              >
                Log Out
              </Button>
            </Stack>
          )}
          {!user && (
            <Stack spacing={5}>
              <NextLink href="/signup">
                <Box>
                  <Button
                    onClick={() => mobileNav.onClose()}
                    colorScheme="blue"
                    variant="solid"
                  >
                    Sign Up
                  </Button>
                </Box>
              </NextLink>
              <NextLink href="/login">
                <Box>
                  <Button
                    onClick={() => mobileNav.onClose()}
                    colorScheme="blue"
                    variant="outline"
                  >
                    Log In
                  </Button>
                </Box>
              </NextLink>
            </Stack>
          )}
        </Stack>
      </MobileNavContent>
    </Flex>
  );
};

const Brand = () => null;

const Links = () => null;

const UserProfile = () => null;

const AuthLinks = () => null;

export const Navbar = Object.assign(Template, {
  Brand,
  Links,
  UserProfile,
  AuthLinks,
});
