import { Box, Link, SimpleGrid, Stack } from "@chakra-ui/react";
import React from "react";
import { FooterHeading } from "./FooterHeading";
import NextLink from "next/link";

export const LinkGrid = (props) => (
  <SimpleGrid columns={2} {...props}>
    <Box minW="130px">
      <FooterHeading mb="4">Product</FooterHeading>
      <Stack>
        <NextLink href="/help">
          <Link>How it works</Link>
        </NextLink>
      </Stack>
    </Box>
    <Box minW="130px">
      <FooterHeading mb="4">Legal</FooterHeading>
      <Stack>
        <Link>Privacy</Link>
        <Link>Terms</Link>
      </Stack>
    </Box>
  </SimpleGrid>
);
