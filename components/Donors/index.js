import { CAMPAIGN_DONORS } from "@/graphql/queries";
import { useAuth } from "@/lib/auth";
import { useQuery } from "@apollo/client";
import { Avatar, Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Donors = () => {
  const Router = useRouter();
  const { id } = Router.query;

  const [cursor, setCursor] = useState(null);

  const { loading, error, data } = useQuery(CAMPAIGN_DONORS, {
    variables: { id, cursor },
  });

  if (loading) {
    return (
      <Box mt={4} display="flex" justifyContent="center">
        <Spinner />
      </Box>
    );
  }

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
                    Donor
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
                    Amount
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
                    Date
                  </Text>
                </Box>
              </Box>
            </Box>

            <Box>
              <Box>
                <Box>
                  {data &&
                    data.campaignDonors.data.map((donor) => {
                      return (
                        <Box
                          key={donor._id}
                          borderBottom="1px solid"
                          borderBottomColor="#e4e4e4"
                          padding="1rem 0"
                        >
                          <Flex alignItems="center">
                            <Avatar
                              bg="#000"
                              color="#fff"
                              name={donor.name}
                              size="sm"
                            />
                            <Box flexGrow="1">
                              <Box width="50%" float="left" px=".5rem">
                                <Box display="flex" alignItems="center">
                                  <Text fontWeight="900">{donor.name}</Text>
                                </Box>
                              </Box>

                              <Box
                                float="right"
                                wordBreak="break-all"
                                width="50%"
                                px=".5rem"
                              >
                                <Box px={0} width="33.3333%" float="left">
                                  ${donor.amount / 100}
                                </Box>
                                <Box px={0} width="33.3333%" float="left">
                                  {donor.createdAt}
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

          <Box mt={4} display="flex" justifyContent="center">
            <Button
              onClick={() => setCursor(data && data.campaignDonors.before)}
              isDisabled={data && !data.campaignDonors.before}
              mx={2}
            >
              Prev
            </Button>
            <Button
              onClick={() => setCursor(data && data.campaignDonors.after)}
              isDisabled={data && !data.campaignDonors.after}
              mx={2}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Donors;
