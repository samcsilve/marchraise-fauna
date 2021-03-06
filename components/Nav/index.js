import { Box, Button, Center, Spacer } from "@chakra-ui/react";
import * as React from "react";
import { useAuth } from "@/lib/auth";

import { Navbar } from "./Navbar";
import { NavLink } from "./NavLink";
import { UserProfile } from "./UserProfile";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "../Logo";

export const Nav = () => {
  const Router = useRouter();
  const { user } = useAuth();

  return (
    <Box boxShadow="md" bg="gray.50">
      <Navbar>
        <Navbar.Brand>
          <Center marginEnd="10">
            <Link href={user ? "/my-campaigns" : "/"}>
              <Box cursor="pointer">
                <Logo h="6" />
              </Box>
            </Link>
          </Center>
        </Navbar.Brand>
        <Navbar.Links>
          <Link href="/about">
            <Box>
              <NavLink isActive={Router.pathname === "/about"}>About</NavLink>
            </Box>
          </Link>
          <Link href="/explore">
            <Box>
              <NavLink isActive={Router.pathname === "/explore"}>
                Explore
              </NavLink>
            </Box>
          </Link>
          <Link href="/help">
            <Box>
              <NavLink isActive={Router.pathname === "/help"}>Help</NavLink>
            </Box>
          </Link>{" "}
        </Navbar.Links>
        {user && (
          <Navbar.UserProfile>
            <UserProfile name={user.name} email={user.email} />
          </Navbar.UserProfile>
        )}
        {!user && <Navbar.AuthLinks></Navbar.AuthLinks>}
      </Navbar>
    </Box>
  );
};
