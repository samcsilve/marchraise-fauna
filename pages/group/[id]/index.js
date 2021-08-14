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
  console.log(data);
  return {
    props: { data },
  };
}
const MemberPage = ({ data }) => {
  console.log(data);
  return (
    <>
      <Grid
        bg="gray.50"
        px={12}
        templateColumns={["1fr", "1fr 1fr 1fr", "1fr 4fr 4fr 4fr 1fr"]}
        gap={6}
        templateAreas={[
          "'collage' 'header' 'sidebar' 'description' 'content'",
          "'header header header' 'collage collage sidebar' 'description description sidebar' 'content content sidebar'",
          "'header header header header header' 'collage collage collage sidebar sidebar' '. description description sidebar sidebar' '. content content sidebar sidebar'",
        ]}
      >
        {/* Image */}
        <Box gridArea="collage">
          <Box
            pt="56.25%"
            borderRadius="md"
            display="block"
            height="100%"
            overflow="hidden"
            position="relative"
            width="100%"
          >
            <Box
              bgImage={`url(${data.findGroupMemberByID.campaign.image})`}
              position="absolute"
              top={0}
              bgPosition="50%"
              bgRepeat="no-repeat"
              bgSize="cover"
              height="100%"
              width="100%"
              maxHeight="100%"
              maxWidth="100%"
            />
          </Box>
        </Box>

        {/* Heading */}
        <Box mt={["0", "1em"]} gridArea="header" mb="-.25rem">
          <Heading my={0} fontSize="2.5rem" display="block">
            {data.findGroupMemberByID.campaign.title}
          </Heading>
        </Box>

        {/* Sidebar */}
        <Box pb={12} position="relative" gridArea="sidebar">
          <Box
            position="sticky"
            top="5rem"
            bg="gray.50"
            borderRadius="xl"
            boxShadow="xl"
            pb="1.5rem"
          >
            <Box mb={4}>
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
                  bg="gray.300"
                />
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
              <NextLink href={`/group/${data.findGroupMemberByID._id}/donate`}>
                <Box>
                  <Button
                    mt="1rem"
                    fontSize={16}
                    py=".8125rem"
                    position="relative"
                    mb="1rem"
                    fontWeight="900"
                    mx="auto"
                    maxWidth="22.5rem"
                    display="flex"
                    width="100%"
                    minHeight="2.5rem"
                    justifyContent="center"
                    px="1rem"
                    textAlign="center"
                    alignItems="center"
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
                    <Box left=".5rem" top=".5rem" position="absolute">
                      <BiDonateHeart size={24} />
                    </Box>
                    Donate
                  </Button>
                </Box>
              </NextLink>
            </Box>

            {/* Show for large */}
            <Box>
              <Box px="1.5rem">
                <Box>
                  <Box>
                    <Box pb={6} borderBottom="1px solid" borderColor="gray.300">
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
                            <ListItem key={index} _notLast={{ pb: ".75rem" }}>
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
                  {/* <Box mt={4}>
                    <DonorModal donors={campaign.donors} />
                  </Box> */}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Description */}
        <Box mb="1.5rem" pb="3rem" position="relative" gridArea="description">
          <Box
            _before={{
              top: "-210px",
              height: "100%",
              left: "76%",
              minHeight: "210px",
              position: "absolute",
              transform: "translateX(-50vw)",
              zIndex: "-10",
            }}
          >
            <Box>
              <Box alignItems="center" display="flex" mb="1.5rem">
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
                  <Text>
                    <strong>{data.findGroupMemberByID.user.name}</strong> who is
                    a member of{" "}
                    <strong>
                      {data.findGroupMemberByID.campaign.groupName}
                    </strong>{" "}
                    will benefit from this fundraiser
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box my={0} borderTop="1px solid" borderColor="gray.300" />
            <Box mt="1.5rem" mb={12}>
              {data.findGroupMemberByID.campaign.story}
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default MemberPage;
