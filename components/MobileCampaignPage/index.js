import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  ListItem,
  Progress,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import NextLink from "next/link";
import React from "react";
import { FaDonate, FaTag, FaUserCircle } from "react-icons/fa";
import UserCardGrid from "../UserCardGrid";

const MobileCampaignPage = ({ data }) => {
  dayjs.extend(relativeTime);

  return (
    <Box display={["block", "block", "none"]} height="100%">
      <Box margin="0 auto" maxWidth="48rem" px="1rem">
        <Box
          display="grid"
          gridGap="1rem"
          gridTemplateAreas="'collage' 'header' 'sidebar' 'description' 'content'"
          gridTemplateColumns="1fr"
          gridTemplateRows="auto"
        >
          <Box mx="-1rem" gridArea="collage">
            <Box
              pt="56.25%"
              borderRadius=".25rem"
              display="block"
              height="100%"
              overflow="hidden"
              position="relative"
            >
              <Box
                backgroundImage={`url(${data.image})`}
                position="absolute"
                top="0"
                bgPosition="50%"
                bgRepeat="no-repeat"
                bgSize="cover"
                height="100%"
                width="100%"
                maxHeight="100%"
                maxWidth="100%"
              ></Box>
            </Box>
          </Box>

          <Box gridArea="header" marginBottom="-.25rem" marginTop=".75rem">
            <Heading
              fontSize="1.375rem"
              lineHeight="1.33"
              my={0}
              display="block"
              fontWeight="900"
            >
              {data.title}
            </Heading>
          </Box>

          <Box gridArea="sidebar">
            <Box as="aside">
              <Box>
                <Box display="grid">
                  <Progress
                    value={(data.amountRaised / data.goal) * 100}
                    max="100"
                    height=".25rem"
                    width="100%"
                    borderRadius=".125rem"
                    mb=".5rem"
                  />
                  <Heading
                    mb=".75rem"
                    lineHeight=".8"
                    mt=".25rem"
                    fontSize="1.375rem"
                    display="block"
                    fontWeight="900"
                  >
                    ${data.amountRaised}
                    <Text
                      ml={2}
                      display="inline"
                      fontWeight="400"
                      color="#767676"
                      fontSize=".875rem"
                      lineHeight="1.21"
                    >
                      raised of ${data.goal} goal
                    </Text>
                  </Heading>
                </Box>

                <Box>
                  <NextLink href={`/campaign/${data._id}/donate`} passHref>
                    <Button
                      my="1rem"
                      mx="auto"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      padding=".5rem"
                      boxShadow="0 2px 6px rgb(0 0 0 / 10%)"
                      width="100%"
                      textAlign="center"
                      colorScheme="blue"
                      leftIcon={<FaDonate />}
                    >
                      Donate
                    </Button>
                  </NextLink>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box gridArea="description" mb="2rem">
            <Box>
              <Box display="flex" alignItems="center">
                <UnorderedList
                  mr="1rem"
                  listStyleType="none"
                  my={0}
                  pl={0}
                  display="flex"
                  flexShrink={0}
                  position="relative"
                >
                  <ListItem zIndex={0} display="list-item">
                    <FaUserCircle size={24} />
                  </ListItem>
                </UnorderedList>
                <Box>
                  {" "}
                  {data.campaignType === "Group"
                    ? data.groupName
                    : data.user.name}{" "}
                  is organizing this fundraiser.
                </Box>
              </Box>
            </Box>
            <Box my={1} borderTop="1px solid #c8c8c8" />
            <UnorderedList
              fontSize="1rem"
              py="1rem"
              listStyleType="none"
              my={0}
              pl={0}
              display="flex"
              flexWrap="wrap"
            >
              <ListItem alignItems="center" display="flex" mr="1rem">
                <Box>Created {dayjs(data.createdAt).fromNow()}</Box>
              </ListItem>
              <ListItem
                alignItems="center"
                display="flex"
                mr="1rem"
                _before={{
                  borderColor: "#767676",
                  borderLeft: "1px solid",
                  content: "''",
                  fontSize: "1.143em",
                  height: "1em",
                  color: "#c8c8c8",
                  display: "inline-block",
                  mr: "1rem",
                }}
              >
                <Flex
                  alignItems="center"
                  color="#333"
                  border="1px solid transparent"
                  borderRadius=".25rem"
                  padding=".25rem .5rem"
                  backgroundColor="transparent"
                  cursor="pointer"
                  textDecoration="none"
                >
                  <FaTag />
                  <Text ml={1}>{data.category}</Text>
                </Flex>
              </ListItem>
            </UnorderedList>
            <Box my={1} borderTop="1px solid #c8c8c8" />
            <Box
              overflow="hidden"
              overflowWrap="break-word"
              position="relative"
              wordBreak="break-word"
              mt="1.5rem"
            >
              <Text lineHeight="1.5" mb="1rem" mt="0">
                {data.story}
              </Text>
            </Box>

            {data.members.data.length > 0 && (
              <Box
                position="relative"
                mb="1.5rem"
                pb="1.5rem"
                gridArea="content"
              >
                <Box>
                  <UserCardGrid data={data.members.data} />
                </Box>
              </Box>
            )}
          </Box>

          <Box gridArea="content">
            <Box>
              <Box
                borderTop="none"
                mb="3rem"
                pt=".5rem"
                bgColor="gray.50"
                borderRadius=".25rem"
                padding="1rem"
              >
                <Heading fontSize="1rem" mb={2}>
                  Campaign Stats
                </Heading>
                <Box fontWeight="900">{data.donors.data.length}</Box>
                <Box fontWeight="400">
                  {" "}
                  {data.donors.data.length === 1 ? "donor" : "donors"}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MobileCampaignPage;
