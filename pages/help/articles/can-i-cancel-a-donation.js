import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Link,
  ListItem,
  OrderedList,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

const CanICancel = () => {
  return (
    <Box mt="4rem">
      <Box px="1rem" mx="auto">
        <Box
          justifyContent="center"
          display="flex"
          flexWrap="wrap"
          flexDirection="row"
        >
          <Box
            width="83.33333%"
            flexBasis="auto"
            flex="0 0 auto"
            minHeight="0"
            minWidth="0"
          >
            <Box display="block">
              <Breadcrumb margin="0 0 1.5rem 0">
                <BreadcrumbItem>
                  <NextLink href="/help">
                    <BreadcrumbLink>Help Center</BreadcrumbLink>
                  </NextLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                  <BreadcrumbLink>Supporter Questions</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink>How Do I Donate?</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Box>

            <Box display="block" mb="6rem">
              <Box
                flexDirection="row"
                mt="0"
                alignItems="flex-start"
                display="flex"
                flexWrap="wrap"
                justifyContent="space-between"
                mb={0}
              >
                <Heading
                  flexBasis="100%"
                  fontSize="2rem"
                  lineHeight="3rem"
                  fontWeight="900"
                  mt={0}
                  mb="1rem"
                >
                  How Do I Donate?
                </Heading>
              </Box>

              <Box maxWidth="100%">
                <Box lineHeight="1.6" margin={0} wordBreak="break-word">
                  <Box fontSize="1rem" fontWeight="400">
                    <Text mb="1rem">
                      Once a donation is made, it cannot be cancelled. One of
                      the features of MarchRaise is our rolling payout system
                      which pays out funds to campaign organizers daily. This
                      ensures campaign organizers receive funds in a more timely
                      fashion than other platforms.
                    </Text>
                    <Text mb="1rem">
                      Please contact support at{" "}
                      <Link color="blue.400" href="mailto:support@marchraiseapp.com">
                        support@marchraiseapp.com
                      </Link>{" "}
                      for further assistance.
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CanICancel;
