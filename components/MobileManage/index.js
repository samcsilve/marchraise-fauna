import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import NextLink from "next/link";
import React from "react";
import { FaEdit } from "react-icons/fa";
import DeleteMemberModal from "../DeleteMemberModal";
import UpdateModal from "../UpdateModal";

const MobileManage = ({ data }) => {
  return (
    <Box height="100%" width="100%">
      <Box top="0">
        <Box
          minHeight="220px"
          padding="0"
          borderBottom="1px solid #ddd"
          boxShadow="none"
          position="relative"
        >
          <Box>
            <Box
              height="100%"
              width="100%"
              position="absolute"
              background="#f8f8f8"
              overflow="hidden"
            >
              <Image
                src={data.findCampaignByID.image}
                transformOrigin="left top"
                verticalAlign="inherit"
                display="inline-block"
                borderStyle="none"
                objectFit="cover"
              />
            </Box>
            <Box
              bgColor="rgba(0, 0, 0, 0.7)"
              position="absolute"
              bottom={0}
              top={0}
              left={0}
              right={0}
            ></Box>
          </Box>
          <Box
            maxWidth="72rem"
            mx="auto"
            _before={{ display: "table", content: "''" }}
            _after={{ clear: "both", display: "table", content: "''" }}
          >
            <Box
              display="block"
              padding={0}
              textAlign="center"
              alignItems="initial"
              mb={0}
              width="100%"
              float="left"
            >
              <Box
                color="#fff"
                padding="2rem 1.5rem"
                position="relative"
                zIndex={1}
                textAlign="left"
                width="100%"
              >
                <Box>
                  <Box
                    justifyContent="space-between"
                    alignItems="center"
                    display="flex"
                  >
                    <Heading
                      fontSize="2rem"
                      lineHeight="1.25"
                      fontWeight="900"
                      my={0}
                    >
                      {data.findCampaignByID.title}
                    </Heading>
                  </Box>
                  <Box my=".5rem">
                    <Box fontSize=".875" fontWeight="600">
                      <NextLink href={`/campaign/${data.findCampaignByID._id}`}>
                        <Link textDecoration="underline">View Campaign</Link>
                      </NextLink>
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <Box
                    bgColor="rgba(0, 185, 100, 0.2)"
                    maxWidth="288px"
                    width="100%"
                    my=".5rem"
                    height=".25rem"
                    borderRadius=".25rem"
                  >
                    <Box
                      bgColor="rgba(0, 185, 100, 1)"
                      maxWidth="288px"
                      my=".5rem"
                      height=".25rem"
                      borderRadius=".25rem"
                      width={`${
                        (data.findCampaignByID.amountRaised /
                          data.findCampaignByID.goal) *
                        100
                      }%`}
                    ></Box>
                  </Box>
                </Box>
                <Box fontSize=".875" fontWeight="400">
                  Amount Raised: ${data.findCampaignByID.amountRaised}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box>
          <Box
            bg="#fff"
            boxShadow="0 1px 1px 0 rgb(0 0 0 / 25%)"
            display="flex"
            justifyContent="center"
            padding=".5rem .25rem"
          >
            <UpdateModal />
            <NextLink href={`/campaign/${data.findCampaignByID._id}/edit`}>
              <Box ml="4">
                <Button leftIcon={<FaEdit />}>Edit</Button>
              </Box>
            </NextLink>
          </Box>
        </Box>

        <Box
          px={0}
          width="100%"
          float="left"
          before={{ display: "table", content: "''" }}
          _after={{ clear: "both", display: "table", content: "''" }}
        >
          <Box
            padding="0 2rem 0 1.5rem"
            paddingBottom="3rem"
            mt="1.5rem"
            bgColor="#fff"
            fontSize="1.0625rem"
          >
            <Accordion allowMultiple>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Donors ({data.findCampaignByID.donors.data.length})
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {data.findCampaignByID.donors.data.map((donor) => {
                    return (
                      <Box
                        key={donor._id}
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
                                <Heading fontSize="1rem">{donor.name}</Heading>
                                <Text ml={3} fontSize="1rem">
                                  {dayjs(donor.createdAt).fromNow()}
                                </Text>
                              </Box>
                            </Box>
                            <Box mt={3}>
                              <Heading fontSize="1.25rem">
                                ${donor.amount}
                              </Heading>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
                </AccordionPanel>
              </AccordionItem>

              {data.findCampaignByID.campaignType === "Group" && (
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Team ({data.findCampaignByID.members.data.length})
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
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
                                  <Heading fontSize="1rem">
                                    {member.user.name}
                                  </Heading>
                                </Box>
                                <Box>
                                  <DeleteMemberModal member={member} />
                                </Box>
                              </Box>
                              <Box mt={3}>
                                <Heading fontSize="1.25rem">
                                  ${member.amountRaised}
                                </Heading>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      );
                    })}
                  </AccordionPanel>
                </AccordionItem>
              )}
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Updates ({data.findCampaignByID.updates.data.length})
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {data.findCampaignByID.updates.data.map((update) => {
                    return (
                      <Box
                        key={update._id}
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
                          >
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <Box display="flex" alignItems="center">
                                <Heading fontSize="1rem">
                                  {update.user.name}
                                </Heading>
                                <Text ml={3} fontSize="0.9rem">
                                  {dayjs(update.createdAt).fromNow()}
                                </Text>
                              </Box>
                            </Box>
                            <Box mt={3}>
                              <Heading fontSize="1.25rem">
                                {update.title}
                              </Heading>
                              <Box>
                                <Text>{update.content}</Text>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MobileManage;
