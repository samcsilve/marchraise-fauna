import { Box, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

export const Feature = ({ title, children, icon }) => {
  return (
    <Stack spacing="6" direction={{ base: "column", md: "row" }}>
      <Box fontSize="6xl">{icon}</Box>
      <Stack spacing="1">
        <Text fontWeight="extrabold" fontSize="lg">
          {title}
        </Text>
        <Box color={useColorModeValue("gray.600", "gray.400")}>{children}</Box>
      </Stack>
    </Stack>
  );
};
