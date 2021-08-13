import { ButtonGroup, IconButton } from "@chakra-ui/react";
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export const SocialMediaLinks = (props) => (
  <ButtonGroup variant="ghost" color="gray.600" {...props}>
    <IconButton
      as="a"
      href="https://www.instagram.com/marchraise/"
      aria-label="Instagram"
      icon={<FaInstagram fontSize="20px" />}
    />
    <IconButton
      as="a"
      href="https://www.facebook.com/marchraise-104436931756749/"
      aria-label="GitHub"
      icon={<FaFacebook fontSize="20px" />}
    />
    <IconButton
      as="a"
      href="https://twitter.com/MarchRaise"
      aria-label="Twitter"
      icon={<FaTwitter fontSize="20px" />}
    />
  </ButtonGroup>
);
