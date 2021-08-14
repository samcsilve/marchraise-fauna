import { BellIcon, UnlockIcon } from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  HStack,
  Text,
  useBoolean,
  Box,
  SlideFade,
  
  Button,
} from "@chakra-ui/react";
import * as React from "react";
import { FaPlus, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "@/lib/auth";

import UserMenu from "./UserMenu";

export const UserProfile = (props) => {
  const { name, email, avatarUrl } = props;

  const { logout } = useAuth();

  const [show, { toggle }] = useBoolean(false);
  return (
    <>
      <Flex
        order={{
          base: 2,
          md: 1,
        }}
      >
        <IconButton
          isRound
          size="sm"
          fontSize="xl"
          aria-label="Show notification"
          variant="ghost"
          color="current"
          icon={<BellIcon />}
        />
      </Flex>
      <HStack
        spacing={3}
        order={{
          base: 1,
          md: 2,
        }}
        flex="1"
      >
        <UserMenu show={show} />
        <Flex
          direction="column"
          display={{
            base: "flex",
            md: "none",
          }}
        >
          <Text fontWeight="bold" lineHeight="shorter">
            {name}
          </Text>
          <Text fontSize="sm" lineHeight="shorter" opacity={0.7}>
            {email}
          </Text>
        </Flex>
      </HStack>
    </>
  );
};
