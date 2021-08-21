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

const HowItWorks = () => {
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
                      Congratulations on finding a campaign you want to support!
                      Now, to donate to this project, follow the easy steps
                      below:
                    </Text>
                    <OrderedList mb="1rem">
                      <ListItem>
                        Go to the project you&apos;d like to support and click the
                        blue “Donate” button on the page.
                      </ListItem>
                      <ListItem>
                        On the Donate page, you will have a chance to enter the
                        amount you would like to donate and choose the amount of
                        your platform tip.
                      </ListItem>
                      <ListItem>
                        Click the continue button to be redirected to the
                        campaign&apos;s checkout page.
                      </ListItem>
                      <ListItem>
                        Here you&apos;ll be prompted to enter your payment details.
                        To complete your donation, click the blue &quot;Pay&quot; button
                        and you&apos;ll be all set!
                      </ListItem>
                    </OrderedList>
                    <Text mb="1rem">
                      You should receive a confirmation email to confirm that
                      you have donated to the campaign you chose.
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

export default HowItWorks;
