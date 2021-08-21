import {
  Box,
  Button,
  Heading,
  IconButton,
  Image,
  Link,
  ListItem,
  Spinner,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  FaArrowLeft,
  FaEdit,
  FaEnvelope,
  FaEye,
  FaTrash,
} from "react-icons/fa";
import UpdateModal from "@/components/UpdateModal";
import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import DeleteUpdateModal from "@/components/DeleteUpdateModal";
import { useAuth } from "@/lib/auth";
import { CAMPAIGN_BY_ID, FIND_GROUP_MEMBER_BY_ID } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { mutate } from "swr";
import nookies from "nookies";
import faunadb from "faunadb";
import DeleteMemberModal from "@/components/DeleteMemberModal";
import MobileManage from "@/components/MobileManage";
import Team from "@/components/Team";
import Donors from "@/components/Donors";
import ContactsModal from "@/components/ContactsModal";
import ContactsList from "@/components/IndividualContactsList";
import GroupMemberContactsList from "@/components/GroupMemberContactsList";
import GroupMemberContactsModal from "@/components/GroupMemberContactsModal";
import MobileManageGroup from "@/components/MobileManageGroup";

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

const ManageCampaign = () => {
  dayjs.extend(relativeTime);
  const [selected, setSelected] = useState("donors");
  const Router = useRouter();
  const { id } = Router.query;
  const { user } = useAuth();

  const { loading, error, data } = useQuery(FIND_GROUP_MEMBER_BY_ID, {
    variables: { id },
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
    <>
      {data && user && user.id === data.findGroupMemberByID.user._id && (
        <>
          <Box display={["none", "none", "block"]} top={0}>
            <Box>
              <Box boxShadow="lg" padding="2rem" position="relative">
                <Box
                  maxWidth={["60rem", "72rem"]}
                  mx="auto"
                  _before={{ display: "table", content: '""' }}
                  _after={{ display: "table", clear: "both", content: '""' }}
                >
                  <Box width="100%" float="left" px=".5rem">
                    <Box>
                      <NextLink href="/my-campaigns">
                        <Box>
                          <Button
                            colorScheme="blue"
                            _focus={{ outline: "none" }}
                            variant="outline"
                            leftIcon={<FaArrowLeft />}
                          >
                            Back
                          </Button>
                        </Box>
                      </NextLink>
                    </Box>
                  </Box>
                </Box>

                <Box
                  maxWidth={["60rem", "72rem"]}
                  mx="auto"
                  _before={{ display: "table", content: '""' }}
                  _after={{ display: "table", clear: "both", content: '""' }}
                >
                  <Box
                    pt="1.5rem"
                    alignItems="flex-start"
                    display="flex"
                    mb={0}
                    width="75%"
                    float="left"
                    px=".5rem"
                  >
                    <Box>
                      <Image
                        src={data.findGroupMemberByID.campaign.image}
                        mr={0}
                        maxWidth="176px"
                        maxHeight="126px"
                        border="0 solid transparent"
                        borderRadius=".25rem"
                        display="inline-block"
                        verticalAlign="middle"
                        height="auto"
                      />
                    </Box>

                    <Box
                      ml="1rem"
                      mt={0}
                      pl="2rem"
                      textAlign="left"
                      width="100%"
                    >
                      <Box>
                        <Box justifyContent="space-between">
                          <Heading
                            fontSize="2rem"
                            lineHeight="1.25"
                            fontWeight="900"
                            my={0}
                          >
                            {data.findGroupMemberByID.campaign.title}
                          </Heading>
                        </Box>

                        {/* Header Links */}
                        <Box my=".75rem">
                          <Box fontSize=".875rem" fontWeight="900">
                            <Box display="flex">
                              <NextLink
                                href={`/group/${data.findGroupMemberByID._id}`}
                              >
                                <Link display="flex" alignItems="center">
                                  <FaEye size={20} />
                                  <Text ml={1}>View Campaign</Text>
                                </Link>
                              </NextLink>
                            </Box>

                            {/* Progress Bar */}
                            <Box>
                              <Box
                                bgColor="blue.100"
                                maxWidth="304px"
                                width="100%"
                                my=".5rem"
                                height=".25rem"
                                borderRadius=".25rem"
                              >
                                <Box
                                  bg="blue.500"
                                  width={`${
                                    (data.findGroupMemberByID.campaign
                                      .amountRaised /
                                      data.findGroupMemberByID.campaign.goal) *
                                    100
                                  }%`}
                                  maxWidth="304px"
                                  my=".5rem"
                                  height=".25rem"
                                  borderRadius=".25rem"
                                />
                              </Box>
                            </Box>

                            {/* Amount Raised Text */}
                            <Box fontSize=".875rem" fontWeight="600">
                              You Have Raised: $
                              {data.findGroupMemberByID.amountRaised}
                            </Box>
                            <Box fontSize=".875rem" fontWeight="600">
                              Total Raised: $
                              {data.findGroupMemberByID.campaign.amountRaised}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  {user && user.id === data.findGroupMemberByID.user._id && (
                    <Box
                      display="flex"
                      float="right"
                      pr="1rem"
                      pt="1rem"
                      pl=".5rem"
                    >
                      <GroupMemberContactsModal data={data} />
                    </Box>
                  )}
                </Box>
              </Box>

              {/* Main column */}
              <Box
                pt="1rem"
                pb="3rem"
                mt="0"
                maxWidth={["60rem", "72rem"]}
                mx="auto"
                px={[4, 0]}
                _before={{ display: "table", content: '""' }}
                _after={{ clear: "both", display: "table", content: '""' }}
              >
                <Box px="2rem">
                  <Box
                    maxWidth="none"
                    _before={{ display: "table", content: '""' }}
                    _after={{ clear: "both", display: "table", content: '""' }}
                  >
                    <Box width="100%" float="left" px=".5rem">
                      <Box
                        borderBottom="1px solid"
                        borderBottomColor="#ddd"
                        pl="0"
                        pr="0"
                        pt="1rem"
                        margin="0 auto"
                        ml={0}
                      >
                        <UnorderedList
                          padding={0}
                          margin={0}
                          position="relative"
                          listStyleType="none"
                          lineHeight="1.5"
                        >
                          <ListItem pl={0} display="inline-block">
                            <Button
                              _focus={{ outline: "none" }}
                              borderBottom="3px solid"
                              borderBottomColor={
                                selected === "donors" ? "blue.500" : "#ddd"
                              }
                              borderRadius="0"
                              padding=".5rem 0"
                              marginBottom={0}
                              variant="unstyled"
                              _selected={{ borderBottomColor: "#000" }}
                              onClick={() => setSelected("donors")}
                            >
                              Donors
                            </Button>
                          </ListItem>

                          {data.findGroupMemberByID.campaign.campaignType ===
                            "Individual" && (
                            <ListItem pl="1rem" display="inline-block">
                              <Button
                                onClick={() => setSelected("contacts")}
                                _focus={{ outline: "none" }}
                                borderBottom="3px solid"
                                borderBottomColor={
                                  selected === "contacts" ? "blue.500" : "#ddd"
                                }
                                borderRadius="0"
                                padding=".5rem 0"
                                marginBottom={0}
                                variant="unstyled"
                                _selected={{ borderBottomColor: "#000" }}
                              >
                                Contacts
                              </Button>
                            </ListItem>
                          )}

                          <ListItem pl="1rem" display="inline-block">
                            <Button
                              onClick={() => setSelected("contacts")}
                              _focus={{ outline: "none" }}
                              borderBottom="3px solid"
                              borderBottomColor={
                                selected === "contacts" ? "blue.500" : "#ddd"
                              }
                              borderRadius="0"
                              padding=".5rem 0"
                              marginBottom={0}
                              variant="unstyled"
                              _selected={{ borderBottomColor: "#000" }}
                            >
                              Contacts
                            </Button>
                          </ListItem>
                        </UnorderedList>
                      </Box>

                      <Box>
                        <Box
                          pb="1rem"
                          _before={{ display: "table", content: '""' }}
                          _after={{
                            display: "table",
                            content: '""',
                            clear: "both",
                          }}
                        >
                          {selected === "donors" && <Donors data={data} />}

                          {selected === "contacts" && (
                            <GroupMemberContactsList />
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box display={["block", "block", "none"]}>
            <MobileManageGroup data={data} user={user} />
          </Box>
        </>
      )}
    </>
  );
};

export default ManageCampaign;
