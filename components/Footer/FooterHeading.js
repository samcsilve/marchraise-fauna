import { Heading } from "@chakra-ui/react";
import * as React from "react";

export const FooterHeading = (props) => (
  <Heading
    as="h4"
    color="gray.600"
    fontSize="sm"
    fontWeight="semibold"
    textTransform="uppercase"
    letterSpacing="wider"
    {...props}
  />
);