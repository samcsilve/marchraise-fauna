import { Box } from "@chakra-ui/react";
import * as React from "react";

export const Card = (props) => (
  <Box
    bg="white"
    shadow="base"
    rounded="lg"
    p={{
      base: "4",
      md: "8",
    }}
    {...props}
  />
);
