import React from "react";
import { CAMPAIGN_BY_ID, FIND_GROUP_MEMBER_BY_ID } from "@/graphql/queries";
import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
import {
  Button,
  Grid,
  Box,
  Text,
  Heading,
  Image,
  Flex,
  Progress,
  UnorderedList,
  ListItem,
  Divider,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FaDonate, FaTag, FaUserFriends } from "react-icons/fa";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { setContext } from "@apollo/client/link/context";
import { CardWithAvatar } from "@/components/UserCardGrid/CardWithAvatar";
import { UserInfo } from "@/components/UserCardGrid/UserInfo";
import { BiDonateHeart } from "react-icons/bi";
import { GrLineChart } from "react-icons/gr";
import { RiHeartsLine } from "react-icons/ri";
import DonorModal from "@/components/DonorModal";
import MobileGroupMemberPage from "@/components/MobileGroupMemberPage";

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
    query: FIND_GROUP_MEMBER_BY_ID,
    variables: { id: query.id },
  });
  return {
    props: { data },
  };
}
const MemberPage = ({ data }) => {
  dayjs.extend(relativeTime);

  return (
    <>
      <Box display={["none", "none", "block"]} height="100%">
        <Box
          marginTop="2rem"
          maxWidth={["48rem", "60rem", "60rem", "60rem", "72rem"]}
          margin="0 auto"
          px="1rem"
        >
          <Box
            display="grid"
            gridGap="1.5rem 2rem"
            gridTemplateAreas="'header header header header header'
        'collage collage collage sidebar sidebar'
        '. description description sidebar sidebar'
        '. content content sidebar sidebar'
        '. reportbutton reportbutton sidebar sidebar'
        '. valueprops valueprops valueprops .'"
            gridTemplateColumns="1fr 4fr 4fr 4fr 1fr"
            gridTemplateRows="auto"
          >
            <Box
              gridArea="collage"
              paddingTop="56.25%"
              borderRadius=".25rem"
              display="block"
              height="100%"
              overflow="hidden"
              position="relative"
              width="100%"
            >
              <Box
                bgImage={`url(${data.findGroupMemberByID.campaign.image})`}
                position="absolute"
                top="0"
                backgroundPosition="50%"
                bgRepeat="no-repeat"
                bgSize="cover"
                height="100%"
                width="100%"
                maxHeight="100%"
                maxWidth="100%"
              />
            </Box>

            <Box marginTop="1rem" gridArea="header" mb="-.25rem">
              <Heading display="block" fontWeight="900" marginTop="0">
                {data.findGroupMemberByID.campaign.title}
              </Heading>
            </Box>

            <Box position="relative" gridArea="sidebar">
              <Box
                position="sticky"
                top="1rem"
                bg="#fff"
                borderRadius=".25rem"
                boxShadow="0 0.3125rem 1rem -0.1875rem rgb(0 0 0 / 20%)"
                pb="1.5rem"
              >
                <Box>
                  <CardWithAvatar
                    avatarProps={{
                      name: data.findGroupMemberByID.user.name,
                    }}
                  >
                    <UserInfo name={data.findGroupMemberByID.user.name} />
                    <Divider />
                    <Box mt={4}>
                      <Text>Amount Raised: </Text>
                      <Heading fontSize="1.2rem" textAlign="center">
                        ${data.findGroupMemberByID.amountRaised}
                      </Heading>
                    </Box>
                  </CardWithAvatar>
                </Box>
                <Box px="1.5rem">
                  <Box display="grid">
                    <Text
                      fontSize="1.5rem"
                      gridRow="1/2"
                      mb={3}
                      mt={1}
                      display="block"
                      fontWeight="900"
                    >
                      ${data.findGroupMemberByID.campaign.amountRaised}{" "}
                      <span
                        style={{
                          fontWeight: "400",
                          fontSize: ".875rem",
                          lineHeight: "1.21",
                        }}
                      >
                        raised of ${data.findGroupMemberByID.campaign.goal} goal
                      </span>
                    </Text>
                  </Box>
                  <Progress
                    value={
                      (data.findGroupMemberByID.campaign.amountRaised /
                        data.findGroupMemberByID.campaign.goal) *
                      100
                    }
                    max="100"
                    gridRow="2/3"
                    mb={0}
                    appearance="none"
                    border="none"
                    borderRadius="md"
                    display="block"
                    height={1}
                    width="100%"
                    bg="blue.100"
                  />
                  <Box>
                    <NextLink
                      href={`/group/${data.findGroupMemberByID._id}/donate`}
                    >
                      <Button
                        _focus={{ outline: "none" }}
                        my="1rem"
                        mx="auto"
                        padding=".5rem"
                        color="#fff"
                        bgColor="blue.500"
                        _hover={{ bgColor: "blue.400" }}
                        fontWeight="900"
                        letterSpacing=".02em"
                        position="relative"
                        width="100%"
                        minHeight="3rem"
                        border="1px solid transparent"
                        borderRadius=".25rem"
                        boxSizing="border-box"
                        fontSize="1rem"
                        lineHeight="1.2"
                        textDecoration="none"
                        leftIcon={<FaDonate />}
                      >
                        Donate
                      </Button>
                    </NextLink>
                  </Box>
                </Box>

                <Box>
                  <Box px="1.5rem">
                    <Box>
                      <Box>
                        <Box
                          pb={6}
                          borderBottom="1px solid"
                          borderColor="gray.300"
                        >
                          <Flex alignItems="center" color="#635bff">
                            <Flex
                              flexShrink={0}
                              borderRadius="full"
                              justifyContent="center"
                              alignItems="center"
                              height="2.5rem"
                              position="relative"
                              width="2.5rem"
                              mr={4}
                              bg="#C0BDFF"
                              color="#635bff"
                            >
                              <GrLineChart size={24} />
                            </Flex>
                            <strong style={{ fontWeight: "900" }}>
                              {data.findGroupMemberByID.donors.data.length}{" "}
                              {data.findGroupMemberByID.donors.data.length === 1
                                ? "person has donated"
                                : "people have donated"}
                            </strong>
                          </Flex>
                        </Box>
                      </Box>
                      <UnorderedList
                        marginTop="1rem"
                        listStyleType="none"
                        mb={0}
                        paddingLeft={0}
                      >
                        {data.findGroupMemberByID.donors.data.map(
                          (donor, index) => {
                            if (index < 3) {
                              return (
                                <ListItem
                                  key={index}
                                  _notLast={{ pb: ".75rem" }}
                                >
                                  <Box textDecoration="none">
                                    <Box alignItems="flex-start" display="flex">
                                      <Flex
                                        flexShrink={0}
                                        borderRadius="full"
                                        justifyContent="center"
                                        alignItems="center"
                                        height="2.5rem"
                                        position="relative"
                                        width="2.5rem"
                                        mr={4}
                                        bg="#C0BDFF"
                                        color="#635bff"
                                      >
                                        <RiHeartsLine size={24} />
                                      </Flex>
                                      <Box>
                                        <Box
                                          fontWeight="700"
                                          overflowWrap="break-word"
                                          wordBreak="break-word"
                                        >
                                          {donor.name}
                                        </Box>
                                        <Box>${donor.amount / 100}</Box>
                                      </Box>
                                    </Box>
                                  </Box>
                                </ListItem>
                              );
                            }
                          }
                        )}
                      </UnorderedList>
                      <Box mt={4}>
                        <DonorModal
                          donors={data.findGroupMemberByID.donors.data}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box
              position="relative"
              mb="1.5rem"
              pb="1.5rem"
              gridArea="description"
            >
              <Box>
                <Box alignItems="center" display="flex">
                  <UnorderedList
                    mr="1rem"
                    listStyleType="none"
                    my={0}
                    pl={0}
                    display="flex"
                    flexShrink={0}
                    position="relative"
                  >
                    <ListItem zIndex={0} display="list-item">
                      <FaUserFriends size={24} />
                    </ListItem>
                  </UnorderedList>
                  <Box>
                    {data.findGroupMemberByID.campaign.campaignType === "Group"
                      ? data.findGroupMemberByID.campaign.groupName
                      : data.findGroupMemberByID.campaign.user.name}{" "}
                    is organizing this fundraiser.
                  </Box>
                </Box>
              </Box>
              <Box my={0} borderTop="1px solid #c8c8c8" />
              <UnorderedList
                fontSize="1rem"
                py="1rem"
                listStyleType="none"
                my={0}
                pl={0}
                display="flex"
                flexWrap="wrap"
              >
                <ListItem display="flex" alignItems="center" mr="1rem">
                  <Box>
                    Created{" "}
                    {dayjs(
                      data.findGroupMemberByID.campaign.createdAt
                    ).fromNow()}
                  </Box>
                </ListItem>
                <ListItem
                  alignItems="center"
                  display="flex"
                  mr="1rem"
                  _before={{
                    borderColor: "#767676",
                    borderLeft: "1px solid",
                    content: "''",
                    fontSize: "1.143em",
                    height: "1em",
                    color: "#c8c8c8",
                    display: "inline-block",
                    mr: "1rem",
                  }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    color="#333"
                    border="1px solid transparent"
                    borderRadius=".25rem"
                    padding=".25rem .5rem"
                    backgroundColor="transparent"
                    textDecoration="none"
                  >
                    <Box
                      mr="0.25em"
                      display="inline-block"
                      flexShrink="0"
                      maxH="1.1875em"
                      maxWidth="1.1875em"
                      verticalAlign="text-top"
                    >
                      <FaTag size={16} />
                    </Box>
                    {data.findGroupMemberByID.campaign.category}
                  </Box>
                </ListItem>
              </UnorderedList>
              <Box my={0} borderTop="1px solid #c8c8c8" />
              <Box>
                <Box
                  maxHeight="inherit"
                  overflow="hidden"
                  overflowWrap="break-word"
                  position="relative"
                  wordBreak="break-word"
                  marginTop="1.5rem"
                >
                  {data.findGroupMemberByID.campaign.story}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <MobileGroupMemberPage data={data.findGroupMemberByID} />
    </>
  );
};

export default MemberPage;
