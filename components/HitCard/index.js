import React from "react";
import {
  chakra,
  Box,
  Link,
  Progress,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Image from "next/image";

const HitCard = ({ campaign }) => {
  return (
    <NextLink href={`/campaign/${campaign._id}`}>
      <Box
        cursor="pointer"
        mx="auto"
        rounded="lg"
        shadow="md"
        bg="gray.50"
        width="100%"
        maxW="2xl"
        position="relative"
        height="600px"
      >
        <Image
          roundedTop="lg"
          layout="fill"
          fit="cover"
          src={campaign.image}
          alt={campaign.title}
        />

        <Box p={6}>
          <Box>
            <chakra.span
              fontSize="xs"
              textTransform="uppercase"
              color="brand.600"
            >
              {campaign.category}
            </chakra.span>
            <NextLink href={`/campaign/${campaign._id}`}>
              <Link
                display="block"
                color="gray.800"
                fontWeight="bold"
                fontSize="2xl"
                mt={2}
                _focus={{ outline: "none" }}
                _hover={{ textDecor: "underline" }}
                href="#"
              >
                {campaign.title}
              </Link>
            </NextLink>
            <chakra.p
              mt={2}
              fontSize="sm"
              color="gray.600"
            >
              {campaign.story.substring(0, 250)}...
            </chakra.p>
          </Box>

          <Box position="absolute" bottom="10px" width="100%" mt={4}>
            <Progress
              value={(campaign.amountRaised / campaign.goal) * 100}
              max="100"
              gridRow="2/3"
              my={4}
              appearance="none"
              border="none"
              borderRadius="md"
              display="block"
              height={1}
              width="80%"
              bg="gray.300"
            />
            <Text
              fontSize="1.2rem"
              gridRow="1/2"
              mb={3}
              mt={1}
              display="block"
              fontWeight="900"
            >
              ${campaign.amountRaised}{" "}
              <span
                style={{
                  fontWeight: "400",
                  fontSize: "1rem",
                }}
              >
                raised of ${campaign.goal} goal
              </span>
            </Text>
          </Box>
        </Box>
      </Box>
    </NextLink>
  );
};

export default HitCard;
