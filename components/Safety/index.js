import { Box, Heading, SimpleGrid, Flex } from "@chakra-ui/react";
import React from "react";
import {
  FcDoughnutChart,
  FcMultipleDevices,
  FcPrivacy,
  FcTimeline,
} from "react-icons/fc";
import { Feature } from "./Feature";

const Safety = () => {
  return (
    <>
      <Box as="section" py="16">
        <Box
          maxW={{ base: "xl", md: "5xl" }}
          mx="auto"
          px={{ base: "6", md: "8" }}
        >
          <SimpleGrid columns={{ base: 1, md: 2 }} spacingX="10" spacingY="14">
            <Feature title="Secure from the stepoff" icon={<FcPrivacy />}>
              MarchRaise integrates with Stripe to process payments. Stripe's
              enterprise-level security coupled with our tech stack keep your
              information safe, while allowing your supporters to donate to your
              campaign quickly and easily.
            </Feature>
            <Feature title="Daily payouts" icon={<FcTimeline />}>
              MarchRaise will automatically deposit each day's balance into your
              bank account as soon as the charge clears. Of course, this is done
              without any fees.
            </Feature>
            <Feature title="No platform fees" icon={<FcDoughnutChart />}>
              MarchRaise does not take a platform fee out of your campaign.
              Instead, donors are asked to tip the platform via a sliding scale
              at checkout.
            </Feature>
            <Feature
              title="Support for multiple devices"
              icon={<FcMultipleDevices />}
            >
              MarchRaise is fully responsive on mobile devices, increasing your
              campaign's reach to users on the go.
            </Feature>
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
};

export default Safety;