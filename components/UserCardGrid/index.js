import {
  Box,
  Divider,
  Grid,
  Heading,
  Text,
  
} from "@chakra-ui/react";
import Link from "next/link";
import * as React from "react";
import { CardWithAvatar } from "./CardWithAvatar";
import { UserInfo } from "./UserInfo";

const UserCardGrid = ({ data }) => {
  console.log(data)
  return (
    <Box
      bg="gray.100"
      px={{
        base: "6",
        md: "8",
      }}
      py="12"
      mt={6}
    >
      <Box
        as="section"
        maxW={{
          base: "xs",
          md: "3xl",
        }}
        mx="auto"
      >
        <Grid
          templateColumns="repeat(2, 1fr)"
          height="400px"
          overflowY="scroll"
          gap={6}
        >
          {data.map((member) => {
            return (
              <Link key={member._id} href={`/group/${member._id}`}>
                <Box cursor="pointer">
                  <CardWithAvatar
                    key={member._id}
                    avatarProps={{
                      name: member.user.name,
                    }}
                  >
                    <UserInfo mt="3" name={member.user.name} />
                    <Divider />
                    <Box mt={4}>
                      <Text>Amount Raised: </Text>
                      <Heading fontSize="1.2rem" textAlign="center">
                        ${member.amountRaised}
                      </Heading>
                    </Box>
                  </CardWithAvatar>
                </Box>
              </Link>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default UserCardGrid;
