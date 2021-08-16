import { HStack, Icon, Text, VStack } from "@chakra-ui/react";
import * as React from "react";
import { HiBadgeCheck } from "react-icons/hi";

export const UserInfo = (props) => {
  const { name, bio, isVerified, ...stackProps } = props;
  return (
    <VStack spacing="1" flex="1" {...stackProps}>
      <HStack height="50px">
        <Text fontWeight="bold" fontSize="1rem">
          {name}
        </Text>
        {isVerified && (
          <Icon
            as={HiBadgeCheck}
            color="blue.300"
            verticalAlign="text-bottom"
          />
        )}
      </HStack>
      <Text fontSize="sm" textAlign="center" noOfLines={2} color="gray.600">
        {bio}
      </Text>
    </VStack>
  );
};
