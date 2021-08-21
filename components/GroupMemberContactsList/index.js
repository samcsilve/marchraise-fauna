import {
  GET_CONTACTS,
  GET_GROUP_MEMBER_CONTACTS,
  UPDATE_CONTACT,
  UPDATE_GROUP_MEMBER_CONTACT,
} from "@/graphql/queries";
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
import DeleteGroupMemberContactModal from "../DeleteGroupMemberContactModal";

const GroupMemberContactsList = () => {
  const [cursor, setCursor] = useState(null);

  const Router = useRouter();
  const { id } = Router.query;
  const { user } = useAuth();

  const { loading, error, data } = useQuery(GET_GROUP_MEMBER_CONTACTS, {
    variables: { id, cursor },
  });

  const [updateContact] = useMutation(UPDATE_GROUP_MEMBER_CONTACT);

  const sendEmail = async (contact) => {

    const res = await fetch("/api/contacts/send?type=" + "group", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contact, userId: user.id, groupMemberId: id }),
    });
    if (res.ok) {
      updateContact({
        variables: {
          id: contact._id,
          name: contact.name,
          email: contact.email,
          groupMember: id,
          status: true,
          user: user.id,
        },
        refetchQueries: [GET_GROUP_MEMBER_CONTACTS],
      });
    }
  };

  if (loading) {
    return (
      <Box mt={8} display="flex" justifyContent="center">
        <Spinner />
      </Box>
    );
  }

  return (
    <>
      <Box as="section" py={[0, 12]}>
        <Box
          maxW={{
            base: "xl",
            md: "7xl",
          }}
          mx="auto"
          px={{
            base: 0,
            md: 8,
          }}
        >
          <Box overflowX="auto">
            <Heading display={['none', 'block']} size="lg" mb="6">
              Contact
            </Heading>
            <Table my={[4, 8]} borderWidth="1px" fontSize="sm">
              <Thead bg="gray.50">
                <Tr>
                  <Th width="60%" whiteSpace="nowrap" scope="col">
                    Name
                  </Th>
                  <Th
                    textAlign="center"
                    width="25%"
                    whiteSpace="nowrap"
                    scope="col"
                  >
                    Status
                  </Th>
                  <Th width="25%" />
                </Tr>
              </Thead>
              <Tbody>
                {data.groupMemberContacts.data.map((contact) => {
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
                        {contact.status === true ? (
                          <Badge colorScheme="green">Contacted</Badge>
                        ) : (
                          <Badge colorScheme="red">Not Contacted</Badge>
                        )}
                      </Td>
                      <Td display="flex">
                        <IconButton
                          _focus={{ outline: "none" }}
                          icon={<FaEnvelope />}
                          mr={4}
                          onClick={() => sendEmail(contact)}
                        />
                        <DeleteGroupMemberContactModal contact={contact} />
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
            <Box mt={4} display="flex" justifyContent="center">
              <Button
                onClick={() =>
                  setCursor(data && data.groupMemberContacts.before)
                }
                isDisabled={data && !data.groupMemberContacts.before}
                mx={2}
              >
                Prev
              </Button>
              <Button
                onClick={() =>
                  setCursor(data && data.groupMemberContacts.after)
                }
                isDisabled={data && !data.groupMemberContacts.after}
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

export default GroupMemberContactsList;
