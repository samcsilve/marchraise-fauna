import {
  Box,
  Flex,
  Heading,
  Link,
  Text,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { helpInfo } from "@/lib/help";
import Head from "next/head";

const Help = () => {
  return (
    <>
      <Head>
        <title>Help</title>
      </Head>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        w="100%"
        my={16}
      >
        <Heading textAlign="center" color="#000" fontSize={56}>
          How can we help you?
        </Heading>
      </Box>
      <Box maxWidth="1160px" margin="0 auto" padding="0 5%">
        <Box marginBottom="10px">
          <Box
            display="flex"
            flexDirection={["column", "column", "column", "row"]}
            justifyContent="space-between"
          >
            {helpInfo.map((topic) => {
              return (
                <Box key={topic.title} flex="1" marginBottom="60px">
                  <Box padding="15px">
                    <Box
                      margin="0"
                      marginBottom="16px"
                      border="1px solid"
                      borderColor="#635bff"
                      borderRadius="xl"
                      color="#635bff"
                      display="flex"
                      flex="1"
                      flexDirection="column"
                      justifyContent="center"
                      maxWidth="100%"
                      textAlign="center"
                      _hover={{ backgroundColor: "none", color: "#635bff" }}
                    >
                      <NextLink href="#">
                        <Link padding="20px 30px">
                          <Heading fontSize={16}>{topic.title}</Heading>
                        </Link>
                      </NextLink>
                    </Box>

                    <UnorderedList listStyleType="none" margin="0" padding="0">
                      {topic.questions.map((question) => {
                        const link1 = question.replace(/ /g, "-");
                        const link2 = link1.replace("?", "");
                        return (
                          <ListItem
                            key={link2}
                            borderBottom="1px solid"
                            borderColor="#ddd"
                            padding="15px 0"
                          >
                            <NextLink
                              href={`/help/articles/${link2.toLowerCase()}`}
                            >
                              <Link>{question}</Link>
                            </NextLink>
                          </ListItem>
                        );
                      })}
                    </UnorderedList>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Help;
