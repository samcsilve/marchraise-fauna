import HitCard from "@/components/HitCard";
import { ALL_CAMPAIGNS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { Box, Button, Flex, Grid, Spinner, Text } from "@chakra-ui/react";
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
      <Grid
        my={12}
        px={12}
        templateColumns={[
          "repeat(1, 1fr)",
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
        ]}
        gap={10}
      >
        {data &&
          data.allCampaigns.data.map((campaign) => {
            return <HitCard key={campaign._id} campaign={campaign} />;
          })}
      </Grid>
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
