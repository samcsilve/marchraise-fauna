import { CAMPAIGN_BY_ID } from "@/graphql/queries";
import {
  ApolloClient,
  from,
  gql,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import React, { useState } from "react";
import {
  Button,
  Grid,
  Box,
  Text,
  Heading,
  Flex,
  UnorderedList,
  ListItem,
  FormLabel,
  Input,
  FormControl,
  Select,
  Switch,
} from "@chakra-ui/react";
import { BsChevronLeft } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import Link from "next/link";
import { RiHeartsLine, RiSecurePaymentFill } from "react-icons/ri";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { FaIdBadge } from "react-icons/fa";
import getStripe from "@/utils/getStripe";
import Head from "next/head";

export async function getServerSideProps({ query }) {
  const authMiddleware = setContext(async (req, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${process.env.FAUNA_SECRET}`,
      },
    };
  });

  const httpLink = new HttpLink({
    uri: "https://graphql.us.fauna.com/graphql",
  });

  const apolloClient = new ApolloClient({
    ssrMode: true,
    link: from([authMiddleware, httpLink]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            campaigns: {
              merge: false,
            },
            users: {
              merge: false,
            },
            members: {
              merge: false,
            },
          },
        },
      },
    }),
  });
  const { data } = await apolloClient.query({
    query: gql`
      query findCampaignByID($id: ID!) {
        findCampaignByID(id: $id) {
          _id
          title
          amountRaised
          goal
          image
          story
          campaignType
          createdAt
          groupName
          category
          user {
            _id
            name
          }
        }
      }
    `,
    variables: { id: query.id },
  });
  return {
    props: { data },
  };
}

const Donate = ({ data }) => {
  const [donation, setDonation] = useState(0);
  const [tip, setTip] = useState(0);
  const [total, setTotal] = useState(0);
  const [tipPercent, setTipPercent] = useState(12.5);
  const [anon, setAnon] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckoutSession = async (e, formData) => {
    e.preventDefault();
    if (donation <= 5) {
      setError("Donation amount must be greater than $5.00");
      return;
    }
    const res = await fetch("/api/payment/create-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        campaignType: formData.findCampaignByID.campaignType,
        donation,
        tip,
        user: formData.findCampaignByID.user._id,
        id: formData.findCampaignByID._id,
        anonymous: anon,
      }),
    });
    const data = await res.json();
    const stripe = await getStripe();
    stripe.redirectToCheckout({ sessionId: data.id });
  };
  return (
    <>
      <Head>
        <title>{data.findCampaignByID.title}</title>
      </Head>
      <Grid
        my={4}
        display="grid"
        gridGap={["0", "0", "1.5rem 2rem"]}
        gridTemplateAreas={["'main sidebar'", "'. main main sidebar .'"]}
        gridTemplateColumns={["1fr", "1fr", "1fr 4fr 4fr 4fr 1fr"]}
        gridTemplateRows="auto"
      >
        <Box gridArea="main">
          <Box
            bg="gray.50"
            borderRadius="xl"
            boxShadow="2xl"
            pt="2rem"
            pr="3rem"
            pb="3rem"
            pl="3rem"
          >
            <Link href={`/campaign/${data.findCampaignByID._id}`}>
              <Button
                pl=".5rem"
                minHeight="2rem"
                py=".25rem"
                fontSize=".875rem"
                lineHeight={1.4}
                justifyContent="center"
                textAlign="center"
                pr="1rem"
                alignItems="center"
                cursor="pointer"
                display="inline-flex"
                textDecoration="none"
                color="#fff"
                bg="#635bff"
                _hover={{ bg: "#0a2540" }}
                _active={{
                  transform: "scale(0.95)",
                }}
                _focus={{ outline: "none" }}
                variant="solid"
              >
                <Box
                  marginRight=".25em"
                  display="inline-block"
                  maxHeight="1.1875em"
                  maxWidth="1.1875em"
                  verticalAlign="text-top"
                >
                  <BsChevronLeft size={20} />
                </Box>
                Return to Fundraiser
              </Button>
            </Link>
            <Box my="1.5rem" borderTop="1px solid" borderColor="gray.300"></Box>
            <Box>
              <Box
                alignItems="center"
                display={["block", "flex"]}
                mx={["-1rem", "0"]}
                my="1.5rem"
              >
                <Box
                  marginRight="1rem"
                  width="8.25rem"
                  marginBottom={["1rem", "0"]}
                >
                  <Box
                    bgImage={`url(${data.findCampaignByID.image})`}
                    borderRadius="2px"
                    pt="66.66%"
                    bgRepeat="no-repeat"
                    bgSize="cover"
                    transition="padding-top .1s ease-in"
                    width="100%"
                  />
                </Box>
                <Box>
                  <Text
                    fontWeight="400"
                    fontSize="1rem"
                    lineHeight={6}
                    my={2}
                    display="block"
                  >
                    You&apos;re supporting{" "}
                    <strong>{data.findCampaignByID.title}</strong>
                  </Text>
                  <Text
                    fontWeight="400"
                    fontSize=".875rem"
                    lineHeight={4}
                    my={0}
                    display="block"
                    color="gray.600"
                  >
                    Your donation will benefit{" "}
                    <strong>
                      {data.findCampaignByID.campaignType === "Group"
                        ? data.findCampaignByID.groupName
                        : data.findCampaignByID.user.name}
                    </strong>
                  </Text>
                </Box>
              </Box>
              <Box my="1.5rem" borderTop="1px solid" borderColor="gray.300" />
              <Box as="form" onSubmit={(e) => handleCheckoutSession(e, data)}>
                <Box mb="1.5rem">
                  <Box>
                    <FormLabel
                      htmlFor="checkout-donation"
                      fontSize=".875rem"
                      fontWeight="900"
                      letterSpacing="0.02em"
                      lineHeight={5}
                      marginBottom=".5rem"
                      textTransform="uppercase"
                      paddingBottom=".5rem"
                      cursor="pointer"
                      display="block"
                    >
                      Enter your donation
                    </FormLabel>
                    <Box
                      fontWeight="900"
                      py="0.5rem"
                      px="0.75rem"
                      width="100%"
                      bg="gray.200"
                      borderRadius="md"
                      cursor="text"
                      display="inline-flex"
                      alignItems="center"
                    >
                      <Box
                        textAlign="center"
                        flexShrink={0}
                        pr={["0rem", ".5rem"]}
                      >
                        <span style={{ display: "block", fontSize: "1.5rem" }}>
                          $
                        </span>
                        <span
                          style={{
                            color: "gray.700",
                            display: "block",
                            fontSize: ".875rem",
                            fontWeight: "900",
                            textTransform: "uppercase",
                          }}
                        >
                          USD
                        </span>
                      </Box>
                      <Input
                        onChange={(e) => {
                          setDonation(+e.target.value);
                          setTip(
                            +e.target.value * (tipPercent / 100).toFixed(2)
                          );
                          setTotal(
                            +e.target.value +
                              +e.target.value * (tipPercent / 100).toFixed(2)
                          );
                        }}
                        type="number"
                        id="checkout-donation"
                        inputMode="numeric"
                        maxLength="5"
                        name="donationAmount"
                        border="none"
                        outline="none"
                        _focus={{ outline: "none" }}
                        fontSize={["1.5rem", "2.5rem"]}
                        fontWeight="900"
                        color="#000"
                        p={0}
                        textAlign="right"
                        borderRadius="md"
                        display="block"
                        width="100%"
                        minWidth={0}
                        fontFamily="inherit"
                        lineHeight="inherit"
                        height="100%"
                        autoComplete="off"
                      />
                      <Text fontSize={["1.5rem", "2.5rem"]}>.00</Text>
                    </Box>
                  </Box>
                  {error && (
                    <Box
                      mt=".5rem"
                      color="red.500"
                      display="flex"
                      alignItems="center"
                    >
                      <Box mr=".25em">
                        <BiErrorCircle size={20} />
                      </Box>
                      <span>{error}</span>
                    </Box>
                  )}
                </Box>
                <Box>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="anonymous" mb="0">
                      Anonymous?
                    </FormLabel>
                    <Switch
                      id="anonymous"
                      isChecked={anon}
                      onChange={() => setAnon(!anon)}
                    />
                  </FormControl>
                </Box>
                <Box my="1.5rem" borderTop="1px solid" borderColor="gray.300" />
                <Box mb="1.5rem">
                  <FormControl
                    as="fieldset"
                    border="none"
                    margin={0}
                    padding={0}
                    display="block"
                    margin-inline-start="2px"
                    margin-inline-end="2px"
                    padding-block-start="0.35em"
                    padding-inline-start="0.75em"
                    padding-inline-end="0.75em"
                    padding-block-end="0.625em"
                    min-inline-size="min-content"
                  >
                    <FormLabel
                      fontSize=".875rem"
                      lineHeight="1.23"
                      textTransform="uppercase"
                      display="block"
                      fontWeight="900"
                      letterSpacing="0.02em"
                      marginBottom="1rem"
                      padding="0"
                      width="100%"
                    >
                      Tip MarchRaise
                    </FormLabel>
                    <Box
                      as="span"
                      mb="1.5rem"
                      display="block"
                      fontSize=".875rem"
                      lineHeight="1.4"
                    >
                      MarchRaise has a 0% platform fee for organizers and relies
                      on the generosity of donors like you to operate our
                      service.
                    </Box>
                    <UnorderedList
                      alignItems="center"
                      display="flex"
                      listStyleType="none"
                      marginBottom="0"
                      marginTop="0"
                      paddingLeft={0}
                      marginLeft="0"
                    >
                      <ListItem>
                        <Box mr="1rem" width="10.75rem">
                          <Box>
                            <Box position="relative">
                              <Select
                                onChange={(e) => {
                                  setTip(
                                    donation *
                                      (+e.target.value / 100).toFixed(2)
                                  );
                                  setTotal(
                                    donation +
                                      donation *
                                        (+e.target.value / 100).toFixed(2)
                                  );
                                  setTipPercent(+e.target.value);
                                }}
                                value={tipPercent}
                                appearance="none"
                                border="1px solid"
                                borderColor="gray.300"
                                borderRadius=".25rem"
                                cursor="pointer"
                                display="block"
                                width="100%"
                                fontFamily="inherit"
                                fontSize="16px"
                                lineHeight="inherit"
                              >
                                <option value={7.5}>7.5%</option>
                                <option value={10}>10%</option>
                                <option defaultValue value={12.5}>
                                  12.5%
                                </option>
                                <option value={15}>15%</option>
                              </Select>
                            </Box>
                          </Box>
                        </Box>
                      </ListItem>
                    </UnorderedList>
                  </FormControl>
                </Box>
                <Button
                  type="submit"
                  color="white"
                  bg="#635bff"
                  border="2px solid"
                  borderColor="#635bff"
                  _hover={{
                    bg: "none",
                    border: "2px solid",
                    borderColor: "#635bff",
                    color: "#635bff",
                  }}
                  _active={{
                    transform: "scale(0.95)",
                  }}
                  _focus={{ outline: "none" }}
                  variant="solid"
                >
                  Continue
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          display={["none", "none", "block", "block", "block"]}
          as="aside"
          gridArea="sidebar"
        >
          <Box
            bg="gray.50"
            borderRadius="xl"
            boxShadow="2xl"
            padding="2rem 1.5rem"
          >
            <Heading
              as="h2"
              fontSize=".875rem"
              lineHeight="1.23"
              mt="0"
              mb="1rem"
              textTransform="uppercase"
              display="block"
              fontWeight="900"
              letterSpacing="0.02em"
            >
              Your Donation
            </Heading>
            <Box as="dl" margin="0">
              <Box as="dt" float="left">
                Your donation
              </Box>
              <Box
                as="dd"
                marginBottom=".5rem"
                marginLeft="0"
                textAlign="right"
              >
                ${donation.toFixed(2)}
              </Box>

              <Box as="dt" float="left">
                MarchRaise tip
              </Box>
              <Box
                as="dd"
                marginBottom=".5rem"
                marginLeft="0"
                textAlign="right"
              >
                ${tip.toFixed(2)}
              </Box>
              <Box
                as="dt"
                borderTop="1px solid"
                borderColor="transparent"
                marginTop=".25rem"
                paddingTop="1rem"
                float="left"
              >
                Total due today
              </Box>
            </Box>
            <Box
              as="dd"
              borderTop="1px solid"
              borderColor="gray.300"
              mb="0"
              mt=".75rem"
              paddingTop="1rem"
              ml="0"
              textAlign="right"
            >
              ${total.toFixed(2)}
            </Box>
          </Box>
          <Box mt="2rem" px="1.5rem">
            <Heading
              as="h2"
              fontSize=".875rem"
              lineHeight="1.23"
              textTransform="uppercase"
              display="block"
              fontWeight="900"
              letterSpacing="0.02em"
              mb="1rem"
            >
              {data.findCampaignByID.title}
            </Heading>
            <Box mb="1rem" display="flex" alignItems="center">
              <Box
                marginRight="1rem"
                my="0"
                pl="0"
                display="flex"
                flexShrink="0"
                position="relative"
              >
                <Flex
                  flexShrink={0}
                  borderRadius="full"
                  justifyContent="center"
                  alignItems="center"
                  height="2.5rem"
                  position="relative"
                  width="2.5rem"
                  bg="#C0BDFF"
                  color="#635bff"
                >
                  <RiHeartsLine size={24} />
                </Flex>
              </Box>
              <Box>
                <Box overflowWrap="break-word" wordBreak="break-word">
                  {data.findCampaignByID.campaignType === "Group"
                    ? data.findCampaignByID.groupName
                    : data.findCampaignByID.user.name}
                </Box>
                <Box>
                  <span style={{ fontSize: ".875rem", lineHeight: "1.4" }}>
                    Organizer
                  </span>
                </Box>
              </Box>
            </Box>
            <Box my="1.5rem" borderTop="1px solid" borderColor="gray.300"></Box>
            <Heading
              as="h2"
              fontSize=".875rem"
              lineHeight="1.23"
              textTransform="uppercase"
              display="block"
              fontWeight="900"
              letterSpacing="0.02em"
              marginBottom="1rem"
              marginTop="0"
            >
              We protect your donation
            </Heading>
            <UnorderedList
              listStyleType="none"
              my="0"
              paddingLeft={0}
              alignItems="center"
              display="flex"
              ml={0}
            >
              <ListItem
                display="flex"
                alignItems="center"
                paddingLeft={0}
                marginLeft={0}
              >
                <AiFillSafetyCertificate size={24} />
                <Text>SSL</Text>
              </ListItem>
              <ListItem
                display="flex"
                alignItems="center"
                paddingLeft={0}
                marginLeft={2}
              >
                <RiSecurePaymentFill size={24} />
                <Text>PCI</Text>
              </ListItem>
              <ListItem
                display="flex"
                alignItems="center"
                paddingLeft={0}
                marginLeft={2}
              >
                <FaIdBadge size={24} />
                <Text fontSize="14px" lineHeight="0.9" marginLeft={1}>
                  GDPR Compliant
                </Text>
              </ListItem>
            </UnorderedList>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default Donate;
