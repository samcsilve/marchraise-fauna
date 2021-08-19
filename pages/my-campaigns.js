import React from "react";
import { useQuery } from "@apollo/client";
import { USER_CAMPAIGNS } from "graphql/queries";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useAuth } from "@/lib/auth";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import JoinCampaignModal from "../components/JoinCampaignModal";
import faunadb from "faunadb";
import nookies from "nookies";

export async function getServerSideProps({ req, res }) {
  const cookies = nookies.get({ req });

  if (cookies.faunaToken) {
    const faunaClient = new faunadb.Client({
      secret: cookies.faunaToken,
      domain: "db.us.fauna.com",
    });
    const q = faunadb.query;

    const userRef = await faunaClient.query(q.CurrentIdentity());

    if (!userRef) {
      return {
        redirect: {
          destination: `/login`,
          permanent: false,
        },
      };
    } else {
      return { props: {} };
    }
  } else {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }
}

const MyCampaigns = () => {
  dayjs.extend(relativeTime);
  const { user } = useAuth();

  const { loading, error, data } = useQuery(USER_CAMPAIGNS, {
    variables: { id: user && user.id },
  });

  if (loading) {
    return (
      <Box
        height="90vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner />
      </Box>
    );
  }
  return (
    <Box px={8} width="100%" height="100%">
      <Box pb=".5rem">
        <Box>
          <Box
            pt="2rem"
            fontWeight="900"
            maxWidth={["60rem", "72rem"]}
            width="100%"
            px=".5rem"
            mx="auto"
          >
            <Box>
              <Box
                display="flex"
                alignItems={["flex-start", "center"]}
                flexDirection={["column", "row"]}
                justifyContent="space-between"
                overflow="auto"
              >
                <Heading
                  mb=".3125rem"
                  fontSize="1.375rem"
                  fontWeight="900"
                  lineHeight="2.5rem"
                  mt={0}
                >
                  Your Campaigns
                </Heading>
                <Flex flexDirection={["column", "row"]}>
                  <Box mb={[2, 0]} mr={[0, 2]}>
                    <Link href="/new-campaign">
                      <Box>
                        <Button
                          _focus={{ outline: "none" }}
                          colorScheme="blue"
                          variant="solid"
                          textDecoration="none"
                          mx="auto"
                          maxWidth="22.5rem"
                          cursor="pointer"
                          fontSize="1rem"
                          padding=".6875rem"
                          color="#fff"
                          leftIcon={<FaPlus />}
                          width={["100%", "auto"]}
                        >
                          New Campaign
                        </Button>
                      </Box>
                    </Link>
                  </Box>
                  <Box>
                    <JoinCampaignModal />
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box my="1rem">
        <Box
          px=".5rem"
          pb=".5rem"
          display={["block", "flex"]}
          justifyContent={["space-between", "flex-start"]}
          flexWrap="wrap"
          maxWidth={["60rem", "72rem"]}
          mx="auto"
        >
          {data &&
            data.findUserByID.campaigns.data.map((campaign) => {
              return (
                <Box
                  mt={[4, 0]}
                  key={campaign._id}
                  px={0}
                  mx={["auto", "0.5rem", "0.5rem"]}
                  width={["100%", "46%", "30%"]}
                >
                  <Box
                    boxShadow="xl"
                    transition="0.3s"
                    _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
                    borderRadius="lg"
                  >
                    <Link href={`/campaign/${campaign._id}`}>
                      <Box
                        cursor="pointer"
                        display="flex"
                        flexGrow="1"
                        flexDirection="column"
                      >
                        <Box
                          alignSelf="flex-start"
                          height="10.4375rem"
                          width="100%"
                        >
                          <Box
                            height="100%"
                            width="100%"
                            alignItems="center"
                            borderTopLeftRadius="lg"
                            borderTopRightRadius="lg"
                            display="flex"
                            bg="gray.50"
                            overflow="hidden"
                          >
                            <Image objectFit="fill" src={campaign.image} />
                          </Box>
                        </Box>

                        <Box
                          borderBottom="1px solid"
                          borderBottomColor="#ddd"
                          flexDirection="column"
                          flex="1 0 auto"
                          py="1rem"
                          px="1.5rem"
                        >
                          <Heading
                            color="#000"
                            wordBreak="break-word"
                            lineHeight="1.5"
                            fontSize="1rem"
                            fontWeight="900"
                            marginBottom=".5rem"
                          >
                            {campaign.title}
                          </Heading>

                          <Box color="#000" fontSize="1rem">
                            You have raised:{" "}
                            <strong>${campaign.amountRaised}</strong>
                          </Box>

                          <Box color="#666" fontSize=".875rem">
                            {dayjs(campaign.createdAt).fromNow()}
                          </Box>
                        </Box>

                        <Link href={`/campaign/${campaign._id}/manage`}>
                          <Box
                            cursor="pointer"
                            alignItems="center"
                            display="flex"
                            flexDir="row"
                            fontWeight="600"
                            justifyContent="center"
                            padding="1rem"
                            width="100%"
                            textAlign="center"
                            transition="0.5s"
                            _hover={{ color: "#808080" }}
                          >
                            Manage
                          </Box>
                        </Link>
                      </Box>
                    </Link>
                  </Box>
                </Box>
              );
            })}
        </Box>
      </Box>

      {data && data.findUserByID.groups.data.length > 0 && (
        <>
          <Box pb="1rem">
            <Box>
              <Box
                pt="2rem"
                fontWeight="900"
                maxWidth={["60rem", "72rem"]}
                width="100%"
                px=".5rem"
                mx="auto"
              >
                <Box>
                  <Box
                    display="flex"
                    alignItems={["flex-start", "center"]}
                    flexDirection={["column", "row"]}
                    justifyContent="space-between"
                    overflow="auto"
                  >
                    <Heading
                      mb=".3125rem"
                      fontSize="1.375rem"
                      fontWeight="900"
                      lineHeight="2.5rem"
                      mt={0}
                    >
                      Groups You Are a Member Of
                    </Heading>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box my="1rem">
            <Box
              px=".5rem"
              pb=".5rem"
              display={["block", "flex"]}
              justifyContent={["space-between", "flex-start"]}
              flexWrap="wrap"
              maxWidth={["60rem", "72rem"]}
              mx="auto"
            >
              {data &&
                data.findUserByID.groups.data.map((item) => {
                  return (
                    <Box
                      key={item._id}
                      px={0}
                      mx={["auto", "0.5rem", "0.5rem"]}
                      width={["100%", "46%", "30%"]}
                    >
                      <Box
                        boxShadow="xl"
                        transition="0.3s"
                        _hover={{
                          transform: "scale(1.05)",
                          transition: "0.3s",
                        }}
                        borderRadius="lg"
                      >
                        <Link
                          href={`/group/${item._id}`}
                        >
                          <Box
                            cursor="pointer"
                            display="flex"
                            flexGrow="1"
                            flexDirection="column"
                          >
                            <Box
                              alignSelf="flex-start"
                              height="10.4375rem"
                              width="100%"
                            >
                              <Box
                                height="100%"
                                width="100%"
                                alignItems="center"
                                borderTopLeftRadius="lg"
                                borderTopRightRadius="lg"
                                display="flex"
                                bg="gray.50"
                                overflow="hidden"
                              >
                                <Image src={item.campaign.image} />
                              </Box>
                            </Box>
                            <Box
                              borderBottom="1px solid"
                              borderBottomColor="#ddd"
                              flexDirection="column"
                              flex="1 0 auto"
                              py="1rem"
                              px="1.5rem"
                            >
                              <Heading
                                color="#000"
                                wordBreak="break-word"
                                lineHeight="1.5"
                                fontSize="1rem"
                                fontWeight="900"
                                marginBottom=".5rem"
                              >
                                {item.campaign.title}
                              </Heading>
                              <Box color="#000" fontSize="1rem">
                                You have raised:{" "}
                                <strong>${item.amountRaised}</strong>
                              </Box>
                              <Box pb={2} color="#000" fontSize="1rem">
                                Total Raised:{" "}
                                <strong>${item.campaign.amountRaised}</strong>
                              </Box>
                              <Box color="#666" fontSize=".875rem">
                                {dayjs(item.campaign.createdAt).fromNow()}
                              </Box>
                            </Box>
                            <Link href={`/group/${item._id}/manage`}>
                              <Box
                                cursor="pointer"
                                alignItems="center"
                                display="flex"
                                flexDir="row"
                                fontWeight="600"
                                justifyContent="center"
                                padding="1rem"
                                width="100%"
                                textAlign="center"
                                transition="0.5s"
                                _hover={{ color: "#808080" }}
                              >
                                Manage
                              </Box>
                            </Link>
                          </Box>
                        </Link>
                      </Box>
                    </Box>
                  );
                })}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default MyCampaigns;
