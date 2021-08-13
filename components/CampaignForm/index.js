import { Box, Stack, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { CampaignFields } from "./CampaignFields";

const CampaignForm = ({ data, token }) => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.800")}
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
