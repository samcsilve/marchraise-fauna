import React from "react";
import Safety from "@/components/Safety";
import Head from "next/head";
import {
  chakra,
  Box,
  useColorModeValue,
  Stack,
  Text,
  Icon,
  Button,
  Heading,
  ListItem,
  UnorderedList,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { MdExplore } from "react-icons/md";
import Link from "next/link";
import Footer from "@/components/Footer";
import Image from "next/image";

const index = () => {
  return (
    <>
      <Head>
        <title>MarchRaise</title>
      </Head>
      <>
        <Box px={8} py={24} mx="auto">
          <Box
            w={{ base: "full", md: 11 / 12, xl: 9 / 12 }}
            mx="auto"
            textAlign={{ base: "left", md: "center" }}
          >
            <chakra.h1
              mb={6}
              fontSize={{ base: "4xl", md: "6xl" }}
              fontWeight="bold"
              lineHeight="none"
              letterSpacing={{ base: "normal", md: "tight" }}
              color={useColorModeValue("gray.900", "gray.100")}
            >
              Take the{" "}
              <Text
                display={{ base: "block", lg: "inline" }}
                w="full"
                bgClip="text"
                bgGradient="linear(to-r, #114FF5, #00D5E0)"
                fontWeight="extrabold"
              >
                next step
              </Text>{" "}
              in funding your marching career.
            </chakra.h1>
            <chakra.p
              px={{ base: 0, lg: 24 }}
              mb={6}
              fontSize={{ base: "lg", md: "xl" }}
              color={useColorModeValue("gray.600", "gray.300")}
            >
              MarchRaise is the data-driven fundraising platform for individuals
              that helps you simplify, plan, secure, and get the most out of
              your campaign, all with no platform fees.
            </chakra.p>
            <Stack
              direction={{ base: "column", sm: "row" }}
              mb={{ base: 4, md: 8 }}
              spacing={2}
              justifyContent={{ sm: "left", md: "center" }}
            >
              <Link href="/login">
                <Button
                  size="lg"
                  color={useColorModeValue("white", "black")}
                  bg={useColorModeValue("#635bff", "#02bcf5")}
                  border="2px solid"
                  borderColor={useColorModeValue("#635bff", "#02bcf5")}
                  _hover={{
                    bg: "none",
                    border: "2px solid",
                    borderColor: useColorModeValue("#635bff", "#02bcf5"),
                    color: useColorModeValue("#635bff", "#02bcf5"),
                  }}
                  _active={{
                    transform: "scale(0.95)",
                  }}
                  _focus={{ outline: "none" }}
                  variant="solid"
                >
                  Get Started
                  <Icon
                    boxSize={4}
                    ml={1}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </Icon>
                </Button>
              </Link>
              <Link href="/explore">
                <Button
                  size="lg"
                  color={useColorModeValue("black", "white")}
                  bg={useColorModeValue("#02bcf5", "#635bff")}
                  border="2px solid"
                  borderColor={useColorModeValue("#02bcf5", "#635bff")}
                  _hover={{
                    bg: "none",
                    border: "2px solid",
                    borderColor: useColorModeValue("#02bcf5", "#635bff"),
                    color: useColorModeValue("#02bcf5", "#635bff"),
                  }}
                  _active={{
                    transform: "scale(0.95)",
                  }}
                  _focus={{ outline: "none" }}
                  variant="solid"
                >
                  Explore
                  <MdExplore style={{ marginLeft: "5px" }} />
                </Button>
              </Link>
            </Stack>
          </Box>
          <Box
            w={{ base: "full", md: 10 / 12 }}
            mx="auto"
            mt={20}
            textAlign="center"
          >
            <Image
              width="2556px"
              height="1286px"
              unoptimized={true}
              src={useColorModeValue(
                "/hero-img-dark.png",
                "/hero-img-light.png"
              )}
              alt="MarchRaise home page"
            />
          </Box>
        </Box>
        <Box
          bg={useColorModeValue("gray.100", "gray.900")}
          padding={["2rem 1rem", "4rem 1rem"]}
          position="relative"
          margin="0"
        >
          <Box px="1rem" maxW="72rem" mx="auto">
            <Box
              display="flex"
              justifyContent="center"
              flexDirection="row"
              flexWrap="wrap"
            >
              <Box w="83.3%" flexBasis="auto">
                <Heading
                  textAlign="center"
                  lineHeight="3rem"
                  fontSize="2.5rem"
                  fontWeight={900}
                  marginBottom="1rem"
                >
                  How MarchRaise Works
                </Heading>
                <Heading
                  textAlign="center"
                  lineHeight="2rem"
                  fontSize="1.5rem"
                  marginBottom="1rem"
                  fontWeight={400}
                >
                  <span
                    style={{
                      fontSize: "1.5rem",
                      lineHeight: "2rem",
                      fontWeight: "300",
                    }}
                  >
                    MarchRaise is the best place to fundraise, whether you are
                    an individual, group, or organization.
                  </span>
                </Heading>
              </Box>
            </Box>
          </Box>

          <Box
            px={["1rem", "0"]}
            maxW="72rem"
            w={["100%", "100%", "50rem", "60rem"]}
            margin="2rem auto"
          >
            <Box
              justifyContent="center"
              display="flex"
              flexFlow="row wrap"
              width="100%"
            >
              <Box
                flex="0 0 auto"
                minHeight="0"
                minWidth="0"
                width={["83.3%", "100%"]}
                margin="0"
                flexBasis="auto"
                width="100%"
              >
                <Box
                  display={["block", "block", "flex"]}
                  margin="0"
                  padding="0"
                  width="100%"
                >
                  <Box
                    px={[".625rem", ".9375rem"]}
                    mb="2rem"
                    flex="0 0 auto"
                    minHeight="0"
                    minWidth="0"
                    width={["100%", "100%", "33.33333%"]}
                    flexBasis="auto"
                  >
                    <Box mb="1rem" lineHeight="1.5">
                      <Text
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        border="1px solid"
                        borderColor={useColorModeValue("#635bff", "#02bcf5")}
                        borderRadius="50%"
                        color={useColorModeValue("#635bff", "#02bcf5")}
                        height="2.5rem"
                        position="relative"
                        width="2.5rem"
                      >
                        1
                      </Text>
                    </Box>
                    <Heading
                      fontWeight="900"
                      lineHeight="1.5rem"
                      fontSize="1.125rem"
                      marginBottom="1rem"
                    >
                      <Text
                        fontSize="1.5rem"
                        lineHeight="2rem"
                        fontWeight="300"
                      >
                        Start your fundraiser
                      </Text>
                    </Heading>
                    <UnorderedList
                      marginLeft="1.25rem"
                      listStyleType="disc"
                      marginBottom="1rem"
                      listStylePosition="outside"
                      lineHeight="1.5"
                    >
                      <ListItem marginBottom="0.5rem">
                        Set specific goals
                      </ListItem>
                      <ListItem marginBottom="0.5rem">
                        Tell a compelling story
                      </ListItem>
                      <ListItem marginBottom="0.5rem">
                        Add a descriptive photo
                      </ListItem>
                    </UnorderedList>
                  </Box>

                  <Box
                    px={[".625rem", ".9375rem"]}
                    mb="2rem"
                    flex="0 0 auto"
                    minHeight="0"
                    minWidth="0"
                    width={["100%", "33.33333%"]}
                    flexBasis="auto"
                  >
                    <Box mb="1rem" lineHeight="1.5">
                      <Text
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        border="1px solid"
                        borderColor={useColorModeValue("#635bff", "#02bcf5")}
                        borderRadius="50%"
                        color={useColorModeValue("#635bff", "#02bcf5")}
                        height="2.5rem"
                        position="relative"
                        width="2.5rem"
                      >
                        2
                      </Text>
                    </Box>
                    <Heading
                      fontWeight="900"
                      lineHeight="1.5rem"
                      fontSize="1.125rem"
                      marginBottom="1rem"
                    >
                      <Text
                        fontSize="1.5rem"
                        lineHeight="2rem"
                        fontWeight="300"
                      >
                        Share with Friends
                      </Text>
                    </Heading>
                    <UnorderedList
                      marginLeft="1.25rem"
                      listStyleType="disc"
                      marginBottom="1rem"
                      listStylePosition="outside"
                      lineHeight="1.5"
                    >
                      <ListItem marginBottom="0.5rem">Send Emails</ListItem>
                      <ListItem marginBottom="0.5rem">
                        Send text messages
                      </ListItem>
                      <ListItem marginBottom="0.5rem">
                        Share on social media
                      </ListItem>
                    </UnorderedList>
                  </Box>

                  <Box
                    px={[".625rem", ".9375rem"]}
                    mb="2rem"
                    flex="0 0 auto"
                    minHeight="0"
                    minWidth="0"
                    width={["100%", "33.333%"]}
                    flexBasis="auto"
                  >
                    <Box mb="1rem" lineHeight="1.5">
                      <Text
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        border="1px solid"
                        borderColor={useColorModeValue("#635bff", "#02bcf5")}
                        borderRadius="50%"
                        color={useColorModeValue("#635bff", "#02bcf5")}
                        height="2.5rem"
                        position="relative"
                        width="2.5rem"
                      >
                        3
                      </Text>
                    </Box>
                    <Heading
                      fontWeight="900"
                      lineHeight="1.5rem"
                      fontSize="1.125rem"
                      marginBottom="1rem"
                    >
                      <Text
                        fontSize="1.5rem"
                        lineHeight="2rem"
                        fontWeight="300"
                      >
                        Manage Donations
                      </Text>
                    </Heading>
                    <UnorderedList
                      marginLeft="1.25rem"
                      listStyleType="disc"
                      marginBottom="1rem"
                      listStylePosition="outside"
                      lineHeight="1.5"
                    >
                      <ListItem marginBottom="0.5rem">
                        Accept donations
                      </ListItem>
                      <ListItem marginBottom="0.5rem">Thank donors</ListItem>
                      <ListItem marginBottom="0.5rem">
                        Confirm deposited funds in bank account or on debit card
                      </ListItem>
                    </UnorderedList>
                  </Box>
                </Box>
                <Box textAlign="center">
                  <Link href="/login">
                    <Button
                      size="lg"
                      color={useColorModeValue("white", "black")}
                      bg={useColorModeValue("#635bff", "#02bcf5")}
                      border="2px solid"
                      borderColor={useColorModeValue("#635bff", "#02bcf5")}
                      _hover={{
                        bg: "none",
                        border: "2px solid",
                        borderColor: useColorModeValue("#635bff", "#02bcf5"),
                        color: useColorModeValue("#635bff", "#02bcf5"),
                      }}
                      _active={{
                        transform: "scale(0.95)",
                      }}
                      _focus={{ outline: "none" }}
                      variant="solid"
                    >
                      Start a Campaign
                      <Icon
                        boxSize={4}
                        ml={1}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </Icon>
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Safety />
        <Box
          bg={useColorModeValue("gray.100", "gray.900")}
          display="flex"
          justifyContent="center"
          w="100%"
          py={10}
          px={8}
        >
          <Box w="40rem">
            <Heading
              lineHeight="2.5rem"
              fontSize="2rem"
              fontWeight={900}
              marginBottom="1rem"
            >
              Frequently Asked Questions
            </Heading>

            <Accordion allowToggle>
              <AccordionItem py={4}>
                <h2>
                  <AccordionButton _focus={{ outline: "none" }}>
                    <Box fontWeight={600} flex="1" textAlign="left">
                      How much of each donation do you keep?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel
                  color={useColorModeValue("gray.600", "gray.400")}
                  pb={4}
                >
                  MarchRaise does not deduct any money from your donations for
                  ourselves to keep. We believe that every dollar should go to
                  the campaign organizer, not our pockets. Instead, donors are
                  able to leave a small tip to support the platform during
                  checkout. Just like any other online payment, our payment
                  processor does charge 2.9% plus $0.30 per transaction. You
                  will notice that this small amount will be deducted from each
                  donation.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem py={4}>
                <h2>
                  <AccordionButton _focus={{ outline: "none" }}>
                    <Box fontWeight={600} flex="1" textAlign="left">
                      Why is there a fee on each transaction?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel
                  color={useColorModeValue("gray.600", "gray.400")}
                  pb={4}
                >
                  In order to comply with regulatory standards and to ensure the
                  highest level of security, MarchRaise has chosen to use{" "}
                  <a
                    style={{ textDecoration: "underline" }}
                    href="https://stripe.com"
                    about="_blank"
                  >
                    Stripe
                  </a>{" "}
                  to process our platform's payments. In order to utilize
                  Stripe's services, this fee must be passed on to donors and
                  campaign owners.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem py={4}>
                <h2>
                  <AccordionButton _focus={{ outline: "none" }}>
                    <Box fontWeight={600} flex="1" textAlign="left">
                      What kind of user data do you collect?{" "}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel
                  color={useColorModeValue("gray.600", "gray.400")}
                  pb={4}
                >
                  MarchRaise is committed to being extremely open and
                  transparent regarding how data is processed and stored on our
                  platform. We rely on strict data minimization practices to
                  ensure that only highly necessary data is processed and saved.
                  This data must meet strict, privacy focused requirements.
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </Box>
        <Footer />
      </>
    </>
  );
};

export default index;
