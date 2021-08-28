import { GET_CONTACTS, UPDATE_CONTACT } from "@/graphql/queries";
import { useAuth } from "@/lib/auth";
import { useMutation, useQuery } from "@apollo/client";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Spinner,
  Text,
  Badge,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  IconButton,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import DeleteContactModal from "../DeleteContactModal";

const ContactsList = () => {
  const [cursor, setCursor] = useState(null);

  const Router = useRouter();
  const { id } = Router.query;
  const { user } = useAuth();

  const { loading, error, data } = useQuery(GET_CONTACTS, {
    variables: { id, cursor },
  });

  if (loading) {
    return (
      <Box mt={8} display="flex" justifyContent="center">
        <Spinner />
      </Box>
    );
  }

  return (
    <>
      <Box as="section" py={[2, "12"]}>
        <Box
          maxW={{
            base: "xl",
            md: "7xl",
          }}
          mx="auto"
          px={{
            base: "6",
            md: "8",
          }}
        >
          <Box overflowX="auto">
            <Heading size="lg" mb="6">
              Contact
            </Heading>
            <Table my="8" borderWidth="1px" fontSize="sm">
              <Thead bg="gray.50">
                <Tr>
                  <Th  whiteSpace="nowrap" scope="col">
                    Name
                  </Th>
                  <Th
                    textAlign="center"
   
                    whiteSpace="nowrap"
                    scope="col"
                  >
                    Email
                  </Th>
                  <Th  />
                </Tr>
              </Thead>
              <Tbody>
                {data.campaignContacts.data.map((contact) => {
                  return (
                    <Tr key={contact._id}>
                      <Td
                        fontWeight="bold"
                        fontSize="1.15rem"
                        whiteSpace="nowrap"
                      >
                        {contact.name}
                      </Td>
                      <Td textAlign="center" whiteSpace="nowrap">
                        {contact.email}
                      </Td>
                      <Td display="flex">
                        <DeleteContactModal contact={contact} />
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
            <Box mt={4} display="flex" justifyContent="center">
              <Button
                onClick={() => setCursor(data && data.campaignContacts.before)}
                isDisabled={data && !data.campaignContacts.before}
                mx={2}
              >
                Prev
              </Button>
              <Button
                onClick={() => setCursor(data && data.campaignContacts.after)}
                isDisabled={data && !data.campaignContacts.after}
                mx={2}
              >
                Next
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ContactsList;
