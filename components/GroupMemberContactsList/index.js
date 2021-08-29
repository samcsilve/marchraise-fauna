import { GET_GROUP_MEMBER_CONTACTS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { Box, Button, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import DeleteGroupMemberContactModal from "../DeleteGroupMemberContactModal";
import dayjs from "dayjs";

const GroupMemberContactsList = () => {
  const [cursor, setCursor] = useState(null);

  const Router = useRouter();
  const { id } = Router.query;

  const { loading, error, data } = useQuery(GET_GROUP_MEMBER_CONTACTS, {
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
      <Box as="section">
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
          <Box py={[0, "1rem"]}>
            <Box>
              <Box
                alignItems="flex-start"
                display={["none", "flex"]}
                padding="1rem 0"
                borderBottom="1px solid"
                borderBottomColor="#e4e4e4"
                pb="0.5rem"
              >
                <Box
                  flexDirection="row"
                  display="flex"
                  flexGrow="1"
                  color="#666"
                  fontSize="0.875rem"
                >
                  <Box width="6rem" mr="2rem">
                    Date Created
                  </Box>
                  <Box width="15rem" mr="2rem">
                    Name
                  </Box>
                  <Box width="15rem" mr="2rem">
                    Email
                  </Box>
                  <Box width="15rem" mr="2rem" />
                </Box>
              </Box>

              <Box margin={["0.5rem", "0"]}>
                <Box>
                  {data.groupMemberContacts.data.map((contact) => {
                    return (
                      <Box
                        key={contact._id}
                        display="flex"
                        alignItems="flex-start"
                        padding="1rem 0"
                        borderBottom="1px solid"
                        borderBottomColor="#e4e4e4"
                      >
                        <Box
                          flexDirection={["column", "row"]}
                          display="flex"
                          flexGrow="1"
                        >
                          <Box width="6rem" mr="2rem" color="#999">
                            {dayjs(contact.createdAt).format("MM/DD/YYYY")}
                          </Box>
                          <Box fontWeight="bold" width="15rem" mr="2rem">
                            {contact.name}
                          </Box>
                          <Box width="15rem" mr="2rem">
                            {contact.email}
                          </Box>
                        </Box>
                        <DeleteGroupMemberContactModal contact={contact} />
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>
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
