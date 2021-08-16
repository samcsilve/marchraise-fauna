import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  ListItem,
  OrderedList,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const GoalAmount = () => {
  return (
    <Box mt="4rem">
      <Box width="60rem" px="1rem" mx="auto">
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
                  <Link href="/help">
                    <BreadcrumbLink>Help Center</BreadcrumbLink>
                  </Link>
                </BreadcrumbItem>

                <BreadcrumbItem>
                  <BreadcrumbLink>Basics</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink>Setting Your Goal</BreadcrumbLink>
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
                  Setting Your Goal
                </Heading>
              </Box>

              <Box maxWidth="100%">
                <Box lineHeight="1.6" margin={0} wordBreak="break-word">
                  <Box fontSize="1rem" fontWeight="400">
                    <Text mb="1rem">
                      We built MarchRaise knowing that it can sometimes be
                      difficult to know exactly how much money you will need to
                      reach your campaign&apos;s goal. With that in mind, we
                      built the platform so that you can change your goal at any
                      time. It is also not required that you reach your goal.
                      Your money is deposited into your bank account as it rolls
                      in.
                    </Text>
                    <Text mb="1rem">
                      One important thing to keep in mind is that there will be
                      a transaction fee (2.9% + $0.30 per donation) applied to
                      each donation. These fees include debit and credit charges
                      and help to ensure your funds are processed securely. To
                      account for these fees, we suggest making your fundraising
                      goal slightly higher than the actual amount that you need.
                    </Text>
                    <Text mb="1rem">
                      <strong>For Example</strong>
                    </Text>
                    <Text mb="1rem">
                      Mary Mellophone needs exactly $500 to pay off the
                      remainder of her drum corps tour fees. If Mary&apos;s
                      fundraiser receives 20 donations of $25 each, then Mary
                      will have $479.50 deposited into her bank account, i.e.,
                      $500 less transaction fees. But, if the fundraiser
                      receives one additional donation of $25, Mary will be able
                      to withdraw $503, i.e., $525 less transaction fees. Mary
                      should consider setting the fundraising goal at $525 to
                      account for the applicable transaction fees.
                    </Text>
                    <Heading
                      fontSize="1.5rem"
                      lineHeight="2.rem"
                      fontWeight="900"
                    >
                      Edit Your Goal
                    </Heading>
                    <Text mb="1rem">
                      You will be able to change your goal amount at any time.
                      Follow these steps from within your MarchRaise account:
                    </Text>
                    <OrderedList
                      ml="1.25rem"
                      mb="1rem"
                      listStylePosition="outside"
                    >
                      <ListItem>
                        Click the avatar that displays your initials in the
                        upper right corner and select &quot;My Campaigns&quot;
                      </ListItem>
                      <ListItem>
                        Select the campaign you would like to edit and click
                        &quot;Manage&quot;
                      </ListItem>
                      <ListItem>
                        Choose the &quot;Edit and Settings&quot; button under your
                        fundraiser title. (On your mobile device, simply select
                        the gray &quot;Edit&quot; button)
                      </ListItem>
                      <ListItem>Change your goal amount in the &quot;Fundraising Goal&quot; field of the form and select &quot;Save&quot;</ListItem>
                    </OrderedList>
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

export default GoalAmount;
