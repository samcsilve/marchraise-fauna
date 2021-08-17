import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Link,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

const HowItWorks = () => {
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
                  <BreadcrumbLink>Basics</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink>How It Works</BreadcrumbLink>
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
                  How It Works
                </Heading>
              </Box>

              <Box maxWidth="100%">
                <Box lineHeight="1.6" margin={0} wordBreak="break-word">
                  <Box fontSize="1rem" fontWeight="400">
                    <Text mb="1rem">
                      If your fundraiser is already running or you are just
                      getting started, here are some helpful tips and tricks to
                      keep in mind as you fundraise. We&apos;ll outline some
                      MarchRaise specific tips as well as more general
                      information on crowdfunding.
                    </Text>
                    <Heading
                      fontSize="1.5rem"
                      lineHeight="2.rem"
                      fontWeight="900"
                    >
                      What is crowdfunding?
                    </Heading>
                    <Text mb="1rem">
                      It is important to understand that the success of your
                      campaign relies heavily on how well you publicize your
                      efforts. MarchRaise does not seek out donors for your
                      fundraisers.
                    </Text>
                    <Text mb="1rem">
                      In a nutshell, crowdfunding is when communities work
                      together and fund a cause that they care about. We
                      understand that the idea of reaching out to people in your
                      life may feel like a lot. All of us need some assistance
                      at some point to propel ourselves towards our goals.
                    </Text>
                    <Heading
                      fontSize="1.5rem"
                      lineHeight="2.rem"
                      fontWeight="900"
                    >
                      How can I be successful?
                    </Heading>
                    <Text mb="1rem">
                      This should be easy for most of us: What social media
                      platforms do you use? Are you on Facebook, Twitter,
                      Instagram, Snapchat? If you’re an active user of any
                      social media platforms, you have a built-in audience
                      there.
                    </Text>
                    <Heading
                      fontSize="1rem"
                      lineHeight="2.rem"
                      fontWeight="900"
                    >
                      Facebook
                    </Heading>
                    <Text mb="1rem">
                      Facebook is the biggest social media platform out there,
                      with a whopping 1.71 billion users in 2016. Most of us
                      have a Facebook account, and that account is one of the
                      most crucial tools you can use to promote your online
                      fundraiser. Think about it: you have friends, family,
                      acquaintances, coworkers and more gathered together in
                      once place. You can talk to them all at once. This makes
                      it so much easier to promote your fundraiser.
                    </Text>
                    <Heading
                      fontSize="1rem"
                      lineHeight="2.rem"
                      fontWeight="900"
                    >
                      Instagram
                    </Heading>
                    <Text mb="1rem">
                      Instagram: Instagram is a free photo-sharing app that has
                      over 100 million users. You can share photos and captions
                      either publicly or just with the people you allow access.
                      Instagram users see photos in a real-time, chronological
                      feed, with a (usually truncated) caption. Instagram is
                      famous for adding photographic filters to your images
                      (although many users prefer #nofilter).
                    </Text>
                    <Text mb="1rem">
                      You can also share videos up to 60 seconds long.
                    </Text>
                    <Text mb="1rem">
                      Instagram is popular, fun, and easy to use — but it can be
                      a little tricky to use to promote your fundraiser since
                      Instagram is all about photos. So here’s how to stand out
                      on Instagram:
                    </Text>
                    <UnorderedList mb="1rem">
                      <ListItem>
                        <strong>Go public: </strong>Like other social media
                        sites, you’ll want to make sure your account is public
                        so people can find your posts and you can increase your
                        reach on social media. Unlike Facebook, you can’t change
                        the privacy settings of each post, so you will need to
                        make your whole account public.
                      </ListItem>
                      <ListItem>
                        <strong>Link in bio: </strong>You’ll see this a lot in
                        Instagram posts where people want you to see
                        something — it’s because Instagram won’t put hyperlinks
                        in captions. So, if you want to link to your personal
                        fundraiser, add it to your bio on your Instagram page.
                        When you’re posting about your fundraiser, let your
                        followers know that they can find the link there.
                      </ListItem>
                      <ListItem>
                        <strong>Use hashtags: </strong>The easiest way to boost
                        your Instagram post is to use hashtags. Like on Twitter,
                        any word can be turned into a hashtag on Instagram by
                        typing # in front of it.{" "}
                        <Link
                          color="blue.400"
                          href="https://help.instagram.com/351460621611097"
                        >
                          Check out this support article to learn how to use
                          hashtags on Instagram.{" "}
                        </Link>
                        Using a hashtag will add your photo to a feed of other
                        photos that have used that hashtag, which makes it easy
                        for people to view and “like” your photos. You can use
                        30 hashtags in one post on Instagram, so there’s a lot
                        of opportunity to been seen with hashtags. (Just make
                        sure you’re using relevant hashtags!)
                      </ListItem>
                    </UnorderedList>
                    <Text mb="1rem">
                      There are even more social media platforms that the ones
                      we’ve listed. But don’t get overwhelmed — you don’t have
                      to use all of these platforms, or even more than one.
                      Stick to the platforms you’re comfortable with, where you
                      already have an audience, and concentrate on growing
                      connections and using social media to conduct personal
                      outreach about your fundraiser. Those connections are what
                      will make your fundraiser successful because that’s what
                      personal fundraising is all about.
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

export default HowItWorks;
