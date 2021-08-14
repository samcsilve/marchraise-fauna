import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import DeleteMemberModal from "../DeleteMemberModal";

const Team = ({ data }) => {
  return (
    <>
      {data.findCampaignByID.members.data.map((member) => {
        return (
          <Box
            key={member._id}
            _before={{ display: "table", content: '""' }}
            _after={{
              clear: "both",
              display: "table",
              content: '""',
            }}
            _notLast={{
              borderBottom: "1px solid",
              borderBottomColor: "#e2e3e2",
            }}
            px={0}
            pt="1rem"
            width="auto"
          >
            <Box
              _before={{
                display: "table",
                content: '""',
              }}
              _after={{
                clear: "both",
                display: "table",
                content: '""',
              }}
              maxWidth="none"
              mx="-.5rem"
            >
              <Box
                marginLeft="0"
                borderBottom="none"
                wordBreak="break-word"
                lineHeight="1.375"
                position="relative"
                width="91.6667%"
                float="left"
                px=".5rem"
                mb={6}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box display="flex" alignItems="center">
                    <Heading fontSize="1rem">{member.user.name}</Heading>
                  </Box>
                  <Box>
                    <DeleteMemberModal member={member} />
                  </Box>
                </Box>
                <Box mt={3}>
                  <Heading fontSize="1.25rem">${member.amountRaised}</Heading>
                </Box>
              </Box>
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default Team;
