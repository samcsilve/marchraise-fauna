import { Box, Text } from "@chakra-ui/react";
import * as React from "react";

export const FieldGroup = (props) => {
  const { title, description, ...boxProps } = props;
  return (
    <Box>
      <Text fontWeight="semibold">{title}</Text>
      {description && (
        <Text color="gray.600" fontSize="sm">
          {description}
        </Text>
      )}
      <Box pt="5" {...boxProps} />
    </Box>
  );
};
