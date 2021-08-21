import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Image,
  Link,
  ListItem,
  OrderedList,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

const StartAProject = () => {
  return (
    <Box mt="4rem">
      <Box px="1rem" mx="auto">
        <Box
          justifyContent="center"
          display="flex"
          flexWrap="wrap"
          flexDirection="row"
        >
          <Box
            width="83.33333%"
            flexBasis="auto"
            flex="0 0 auto"
            minHeight="0"
            minWidth="0"
          >
            <Box display="block">
              <Breadcrumb margin="0 0 1.5rem 0">
                <BreadcrumbItem>
                  <NextLink href="/help">
                    <BreadcrumbLink>Help Center</BreadcrumbLink>
                  </NextLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                  <BreadcrumbLink>Supporter Questions</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink>Start a Project</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Box>

            <Box display="block" mb="6rem">
              <Box
                flexDirection="row"
                mt="0"
                alignItems="flex-start"
                display="flex"
                flexWrap="wrap"
                justifyContent="space-between"
                mb={0}
              >
                <Heading
                  flexBasis="100%"
                  fontSize="2rem"
                  lineHeight="3rem"
                  fontWeight="900"
                  mt={0}
                  mb="1rem"
                >
                  Starting Your MarchRaise Campaign
                </Heading>
              </Box>

              <Box maxWidth="100%">
                <Box lineHeight="1.6" margin={0} wordBreak="break-word">
                  <Box fontSize="1rem" fontWeight="400">
                    <Text mb="1rem">
                      When you click “Get Started”, you will automatically be
                      prompted to sign in or log in to your MarchRaise account.
                      If you already have a MarchRaise account, please use the
                      option of signing up. Otherwise, you can enter your name,
                      email address, and a password to create a new account!
                    </Text>
                    <Image mb="1rem" src="/tutorial/1get-started.png" />
                    <Image mb="1rem" src="/tutorial/2sign-up.png" />
                    <Heading
                      fontSize="1.5rem"
                      lineHeight="2.rem"
                      fontWeight="900"
                      my="1rem"
                    >
                      Creating your campaign
                    </Heading>
                    <Text mb="1rem">
                      When you sign into your MarchRaise account, you will see
                      your Dashboard. Click <strong>New Campaign</strong> in the
                      upper right corner.
                    </Text>
                    <Image mb="1rem" src="/tutorial/3dashboard.png" />
                    <Text mb="1rem">
                      If you are new to MarchRaise, you will see the following
                      window. Pay special attention to the{" "}
                      <strong>Business Type</strong> input in the form. If you
                      have a non-profit tax id, select Non-Profit. If you do not
                      have a tax id, select Individual. This does not impact
                      your campaign type that you will choose on the MarchRaise
                      form.
                    </Text>
                    <Image mb="1rem" src="/tutorial/4stripe.png" />
                    <Text mb="1rem">
                      Click <strong>Connect with Stripe</strong> to enter your
                      payment details. Once you have entered this information,
                      you will be able to proceed with creating your campaign.
                    </Text>

                    <OrderedList mt="2rem">
                      <ListItem
                        fontSize="1.25rem"
                        lineHeight="2.rem"
                        fontWeight="900"
                        my="1rem"
                      >
                        Choose your campaign type
                      </ListItem>
                      <Text my="1rem">
                        Individual campaigns are for one single account. Other
                        MarchRaise users will not be able to join your campaign
                        as members.
                      </Text>
                      <Text my="1rem">
                        Group campaigns will allow members of a group to sign up
                        for the campaign with a passcode that MarchRaise will
                        provide.
                      </Text>
                      <ListItem
                        fontSize="1.25rem"
                        lineHeight="2.rem"
                        fontWeight="900"
                        my="1rem"
                      >
                        Choose your category
                      </ListItem>
                      <Text my="1rem">
                        Choosing a category is a way to help us keep campaigns
                        organized and allow supporters to find campaigns they
                        wish to donate to.
                      </Text>
                      <ListItem
                        fontSize="1.25rem"
                        lineHeight="2.rem"
                        fontWeight="900"
                        my="1rem"
                      >
                        Create a Title
                      </ListItem>
                      <Text my="1rem">
                        This is your chance to stand out. Create a title that is
                        specific to your cause, using names or a call to action.
                        For example,{" "}
                        <strong>Help Kelly March Her Dream Corps</strong> has
                        more impact than <strong>kelly likes band</strong>.
                      </Text>
                      <ListItem
                        fontSize="1.25rem"
                        lineHeight="2.rem"
                        fontWeight="900"
                        my="1rem"
                      >
                        Choose a goal amount
                      </ListItem>
                      <Text my="1rem">
                        Your goal is important and you’ll want to make sure it’s
                        attainable. It’s always a good idea to reflect on how
                        much you’re looking to raise, but you have the option to
                        edit this later if you find the goal is too low or too
                        high. Additionally, your fundraiser won&apos;t automatically
                        end if you reach your goal.
                      </Text>
                      <Text my="1rem">
                        You should also keep the payment processing fees in mind
                        when you&apos;re setting your goal. There is no cost to an
                        organizer to create a MarchRaise, but a 3% fee (which
                        covers debit and credit charges) per donation applies.
                        Beneficiaries receive all funds raised minus the
                        transaction fees so if you&apos;re fundraising for a very
                        specific amount of funds, considering transaction fees
                        when setting your goal will be important.
                      </Text>
                      <ListItem
                        fontSize="1.25rem"
                        lineHeight="2.rem"
                        fontWeight="900"
                        my="1rem"
                      >
                        Write your story
                      </ListItem>
                      <Text my="1rem">
                        A great story will be open and descriptive, and include
                        a bit about who you are, what you&apos;re raising funds for,
                        and how the money will be spent. If you&apos;re raising money
                        for someone else (the beneficiary), it&apos;s a good idea to
                        share how you know them!
                      </Text>
                    </OrderedList>
                    <Heading
                      fontSize="1.5rem"
                      lineHeight="2.rem"
                      fontWeight="900"
                      my="1rem"
                    >
                      Sharing Your Campaign
                    </Heading>
                    <Text mb="1rem">
                      At this point your fundraiser can start receiving
                      donations. However, no one will see your fundraiser until
                      you start to share it!
                    </Text>
                    <Text mb="1rem">
                      Remember, sharing is the key part to getting donations on
                      MarchRaise. If you aren’t sharing your fundraiser with
                      your friends and family, then it’s likely not going to get
                      donations. Using your personal network can help get you
                      closer to your goal.
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StartAProject;
