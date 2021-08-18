import { Box, Heading, Text, Image } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

export default function About() {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <Box bg="gray.100" paddingTop={["2rem", "4rem"]} position="relative">
        <Box px={["0", "1rem"]} maxWidth={["48rem", "72rem"]} margin="0 auto">
          <Box display="flex" justifyContent="center" flexFlow="row wrap">
            <Box
              width={["100%", "83.3%"]}
              flexBasis="auto"
              flex="0 0 auto"
              minHeight="0"
              minWidth="0"
            >
              <Heading
                textAlign="center"
                lineHeight="2rem"
                fontSize="1.5rem"
                mt="0"
                mb="1rem"
                fontWeight="400"
              >
                <Text fontSize="2rem" fontWeight="900" lineHeight="2.5rem">
                  About MarchRaise
                </Text>
              </Heading>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        padding="2rem 1rem"
        position="relative"
        bg="gray.100"
        textAlign="center"
      >
        <Box px={["0", "1rem"]} maxWidth={["48rem", "72rem"]} margin="0 auto">
          <Box
            alignItems="center"
            justifyContent="center"
            display="flex"
            flexFlow="row wrap"
          >
            <Box
              width="100%"
              px={["0", "1rem"]}
              display="block"
              position="relative"
            >
              <Image
                borderRadius={20}
                mx="auto"
                maxWidth={["90%", "70%"]}
                height="auto"
                src="https://static.wixstatic.com/media/e64e8d_c95dab122b1d4b1c997a00bcac07f772~mv2_d_2048_1221_s_2.jpg/v1/fill/w_1000,h_596,al_c,q_90,usm_0.66_1.00_0.01/e64e8d_c95dab122b1d4b1c997a00bcac07f772~mv2_d_2048_1221_s_2.jpg"
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box width="100%" py={["2rem", "4rem"]} px={["2rem", "6rem"]}>
        <Text lineHeight="2.5rem" fontSize="1.2rem">
          Inside of each of us remains that kid perched high in the bleachers at
          their first live drum corps show. Driven by a jolt of inspiration from
          sitting inside the circle of your favorite hornline, the magnificent
          display of precision from your favorite battery in the lot, or the
          artistry of the color guard you dream of performing in. Our goal at
          MarchRaise is to turn idle dreams into action, so that the next
          generation can be inspired on a warm summer night by none other than
          you.
        </Text>
        <Box my="4rem" />
        <Text lineHeight="2.5rem" fontSize="1.2rem">
          When fundraising works for everybody, we are able to fully take
          advantage of the giving power of community. The marching arts has
          already shown its ability to create spaces on the internet, where the
          creativity of individuals and origanizations comes together to support
          causes that matter. Through MarchRaise, members of the marching arts
          communities now have the tools to share their campaign throught our
          community, less the useless noise of some of the other big-tech
          platforms out there. MarchRaise is transforming the way performers
          fund their dreams. Are you ready to step off?
        </Text>
      </Box>

      <Box bg="gray.100" paddingTop={["2rem", "4rem"]} position="relative">
        <Box px={["0", "1rem"]} maxWidth={["48rem", "72rem"]} margin="0 auto">
          <Box display="flex" justifyContent="center" flexFlow="row wrap">
            <Box
              width={["100%", "83.3%"]}
              flexBasis="auto"
              flex="0 0 auto"
              minHeight="0"
              minWidth="0"
            >
              <Heading
                textAlign="center"
                lineHeight="2rem"
                fontSize="1.5rem"
                mt="0"
                mb="1rem"
                fontWeight="400"
              >
                <Text fontSize="2rem" fontWeight="900" lineHeight="2.5rem">
                  Our Team
                </Text>
                <Text mt="2rem" fontSize="1.3rem" fontWeight="500">
                  More bios coming soon...
                </Text>
              </Heading>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box padding="2rem 1rem" position="relative" bg="gray.100">
        <Box
          alignItems="center"
          justifyContent="center"
          display={["block", "flex"]}
        >
          <Box maxWidth={[null, "50%"]} px={["0", "3rem"]} py="1rem">
            <Image borderRadius={20} mx="auto" height="auto" src="/sam.jpeg" />
          </Box>

          <Box
            maxWidth={[null, "50%"]}
            px={["2rem", "1rem"]}
            py={["1rem", "0"]}
          >
            <Box textAlign="center" display="block">
              <Heading fontSize="1.6rem">Sam Silverman</Heading>
              <Heading mt="0.5rem" fontWeight="400" fontSize="1.2rem">
                Lead Developer
              </Heading>
            </Box>
            <Box my={10}>
              <Text fontSize="1rem">
                Sam Silverman is the lead developer handling development and
                maintenance of the platform on both sides of the stack. As a
                developer, He brings enterprise-level applications to life for a
                variety of small to medium businesses in the Tulsa area.
              </Text>
              <Box my="1rem" />
              <Text>
                Sam&apos;s primary position and life&apos;s passion lies in his
                work as an Assistant Band Director with Jenks Public Schools in
                Jenks, Oklahoma. At Jenks, Sam team teaches the middle school
                and high school bands alongside the rest of the highly skilled
                band staff. Additionally, Sam serves on the instructional staff
                of two-time DCI Open Class bronze medalist Gold Drum and Bugle
                Corps.
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
