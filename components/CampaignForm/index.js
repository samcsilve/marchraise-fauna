import { Box, Stack } from "@chakra-ui/react";
import * as React from "react";
import { CampaignFields } from "./CampaignFields";

const CampaignForm = ({ data, token }) => {
  return (
    <Box
      bg="gray.50"
      px={{
        base: "4",
        md: "16",
      }}
      py={["8","16"]}
    >
      <Box maxW="xl" mx="auto">
        <Stack spacing="12">
          <CampaignFields data={data} token={token} />
        </Stack>
      </Box>
    </Box>
  );
};

export default CampaignForm;
