import { CAMPAIGN_BY_ID, CAMPAIGN_MEMBERS } from "@/graphql/queries";
import { useAuth } from "@/lib/auth";
import { useQuery } from "@apollo/client";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DeleteMemberModal from "../DeleteMemberModal";
import NextLink from 'next/link'

const Team = ({ data }) => {
  const { user } = useAuth();
  return (
    <>
      <Box>
        <Box zIndex={30} mb="4rem">
          <Box>
            <Box
              borderBottom="1px solid"
              borderBottomColor="#e4e4e4"
              padding="1rem 0"
              fontSize=".875rem"
            >
              <Box display="flex" alignItems="center">
                <Box width="50%" pl={0} float="left" pr=".5rem">
                  <Text color="#333" fontWeight="900" fontSize=".875rem">
                    Team Members
                  </Text>
                </Box>
                <Box float="right" wordBreak="break-all" width="50%" px=".5rem">
                  <Text
                    fontSize="1rem"
                    px={0}
                    borderRadius="4px"
                    textAlign="left"
                    width="33.33%"
                    float="left"
                    textTransform="none"
                    overflow="visible"
                  >
                    Raised
                  </Text>
                  <Text
                    fontSize="1rem"
                    px={0}
                    borderRadius="4px"
                    textAlign="left"
                    width="33.33%"
                    float="left"
                    textTransform="none"
                    overflow="visible"
                  >
                    Donations
                  </Text>
                  <Text
                    fontSize="1rem"
                    px={0}
                    borderRadius="4px"
                    textAlign="left"
                    width="33.33%"
                    float="left"
                    textTransform="none"
                    overflow="visible"
                  ></Text>
                </Box>
              </Box>
            </Box>

            <Box>
              <Box>
                <Box>
                  {data.findCampaignByID.members.data.map((member) => {
                    return (
                      <Box
                        key={member._id}
                        borderBottom="1px solid"
                        borderBottomColor="#e4e4e4"
                        padding="1rem 0"
                      >
                        <Flex alignItems="center">
                          <Avatar
                            bg="#000"
                            color="#fff"
                            variant="outline"
                            name={member.user.name}
                            size="sm"
                          />
                          <Box flexGrow="1">
                            <Box width="50%" float="left" px=".5rem">
                              <Box alignItems="center" display="flex">
                                <NextLink href={`/group/${member._id}`}>
                                <Link fontWeight="900" marginRight=".5rem">
                                  {member.user.name}
                                </Link>
                                </NextLink>
                              </Box>
                            </Box>

                            <Box
                              float="right"
                              wordBreak="break-all"
                              width="50%"
                              px=".5rem"
                            >
                              <Box px={0} width="33.3333%" float="left">
                                ${member.amountRaised}
                              </Box>
                              <Box px={0} width="33.3333%" float="left">
                                {member.donors.data.length}
                              </Box>
                              <Box px={0} width="33.3333%" float="left">
                                {member.donors.data.length}
                              </Box>
                            </Box>
                          </Box>
                        </Flex>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Team;
