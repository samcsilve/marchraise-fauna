import HitCard from "@/components/HitCard";
import { ALL_CAMPAIGNS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";

const Explore = () => {
  const [cursor, setCursor] = useState(null);
  const { loading, error, data } = useQuery(ALL_CAMPAIGNS, {
    variables: { status: true, cursor },
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
      <Box
        maxWidth={["48rem", "60rem", "72rem"]}
        my='0px'
        mx='auto'
        px="1rem"
        mt="2rem"
      >
        <Box>
          <Box
            mt={['auto', 'auto']}
            mb={['1rem', '8rem']}
            mr={['auto', 'auto']}
            ml={['auto', 'auto']}
            maxWidth="47rem"
          >
            <Box>
              <Heading
                fontSize="1rem"
                fontWeight="600"
                lineHeight="1.5"
                display="block"
                mb="2rem"
                mt={0}
              >All Campaigns</Heading>
            </Box>
            <Box
              display="grid"
              gridTemplateRows="auto"
              gridTemplateColumns={[
                "repeat(2,minmax(0,1fr))",
                "repeat(3, 1fr)",
              ]}
              mb={['1rem', '4rem']}
              gridGap={["1rem", "1.5rem"]}
            >
              {data &&
                data.allCampaigns.data.map((campaign) => {
                  return (
                    <Link key={campaign._id} href={`/campaign/${campaign._id}`}>
                      <Box
                        borderRadius="0.5rem"
                        boxShadow="0 2px 6px rgb(0, 0, 0, 0.1)"
                        height="294px"
                        transition="box-shadow .3s ease-out, transform .3s ease-out"
                        width={["100%", "236px"]}
                        maxWidth="236px"
                        position="relative"
                        mb="0.5rem"
                        mr="0.5rem"
                        transform="auto"
                        _hover={{ translateY: "-8px" }}
                        cursor="pointer"
                      >
                        <Box
                          borderRadius="0.5rem"
                          height="100%"
                          overflow="hidden"
                        >
                          <Box
                            bgImage={`url(${campaign.image})`}
                            borderBottomLeftRadius={0}
                            borderBottomRightRadius={0}
                            borderTopLeftRadius="0.5rem"
                            borderTopRightRadius="0.5rem"
                            bgSize="cover"
                            overflow="hidden"
                            pt="56.25%"
                            position="relative"
                          />
                          <Box margin="1rem 1rem 0.75rem">
                            <Box
                              maxHeight="3em"
                              overflow="hidden"
                              fontSize="1rem"
                              lineHeight="1.5"
                              fontWeight="400"
                              isTruncated
                            >
                              {campaign.title}
                            </Box>
                            <Box
                              maxHeight="3em"
                              overflow="hidden"
                              fontWeight="400"
                              fontSize="0.875rem"
                              lineHeight="1.75"
                              color="#808080"
                            >
                              <Text>{campaign.user.name}</Text>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Link>
                  );
                })}
            </Box>
          </Box>
        </Box>
      </Box>
      {data && data.allCampaigns.data && (
        <Flex mb={12} justifyContent="center">
          {data && (
            <Button
              disabled={!data.allCampaigns.before}
              mx={4}
              onClick={() => setCursor(data.allCampaigns.before)}
            >
              Prev
            </Button>
          )}
          {data && (
            <Button
              disabled={!data.allCampaigns.after}
              mx={4}
              onClick={() => setCursor(data.allCampaigns.after)}
            >
              Next
            </Button>
          )}
        </Flex>
      )}
    </>
  );
};

export default Explore;
