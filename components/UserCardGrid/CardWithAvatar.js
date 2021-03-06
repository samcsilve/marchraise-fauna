import { Avatar, Box, Flex } from "@chakra-ui/react";
import * as React from "react";

export const CardWithAvatar = (props) => {
  const { children, avatarProps, ...rest } = props;
  return (
    <Flex
      direction="column"
      alignItems="center"
      rounded="md"
      padding={[4, 8]}
      position="relative"
      bg="white"
      shadow={{
        md: "base",
      }}
      {...rest}
    >
      <Box
        position="absolute"
        inset="0"
        height="20"
        bg="blue.600"
        roundedTop="inherit"
      />
      <Avatar size="xl" {...avatarProps} />
      {children}
    </Flex>
  );
};
