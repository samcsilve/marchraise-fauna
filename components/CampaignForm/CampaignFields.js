import {
  HStack,
  Button,
  FormControl,
  FormLabel,
  Select,
  Switch,
  Text,
  Stack,
  StackDivider,
  Input,
  SimpleGrid,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Textarea,
  Flex,
  Icon,
  chakra,
  VisuallyHidden,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import { Card } from "./Card";
import { FieldGroup } from "./FieldGroup";
import { HeadingGroup } from "./HeadingGroup";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import firebase from "../../lib/firebase";
import { useAuth } from "@/lib/auth";
import { EDIT_CAMPAIGN, NEW_CAMPAIGN } from "graphql/queries";
import { useMutation } from "@apollo/client";

export const CampaignFields = ({ data, token }) => {
  const [campaignType, setCampaignType] = useState(
    data ? data.campaignType : "Individual"
  );
  const [category, setCategory] = useState(data ? data.category : "Drum Corps");
  const [groupName, setGroupName] = useState(
    data && data.groupName ? data.groupName : ""
  );
  const [title, setTitle] = useState(data ? data.title : "Title");
  const [goal, setGoal] = useState(data ? data.goal : 1200);
  const [story, setStory] = useState(data ? data.story : "Story");
  const [status, setStatus] = useState(data ? data.status : true);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState("");

  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const { user } = useAuth();
  const Router = useRouter();

  const [newCampaign] = useMutation(NEW_CAMPAIGN, {
    onCompleted: () => {
      Router.push("/my-campaigns");
    },
  });

  const [updateCampaign] = useMutation(EDIT_CAMPAIGN, {
    onCompleted: () => {
      Router.push("/my-campaigns");
    },
  });

  const storage = firebase.storage().ref();

  const uploadImage = async (file) => {
    const fileRef = storage.child(`/${uuidv4()}`);
    await fileRef.put(file);
    const fileUrl = await fileRef.getDownloadURL();
    return fileUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    newCampaign({
      variables: {
        user: user && user.id,
        campaignType,
        groupName: campaignType === "Group" ? groupName : null,
        title,
        story,
        category,
        goal,
        status,
        image: await uploadImage(file),
        amountRaised: 0,
        createdAt: new Date(Date.now()),
      },
    });
  };

  const firebaseStorage = firebase.storage();

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (file) {
        const fileRef = firebaseStorage.refFromURL(data.image);
        await fileRef.delete();
      }
      updateCampaign({
        variables: {
          id: Router.query.id,
          campaignType,
          amountRaised: data.amountRaised,
          groupName: campaignType === "Group" ? groupName : null,
          category,
          title,
          goal: parseInt(goal),
          story,
          status,
          createdAt: data.createdAt,
          image: file ? await uploadImage(file) : data.image,
        },
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Something went wrong",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack as="section" spacing="6">
      {data && (
        <HeadingGroup
          title="Edit Campaign"
          description="Edit your campaign data"
        />
      )}
      {!data && (
        <HeadingGroup
          title="New Campaign"
          description="Enter your campaign data"
        />
      )}
      <form onSubmit={data ? handleEdit : handleSubmit}>
        <Card>
          <Stack divider={<StackDivider />} spacing="6">
            {!data && (
              <FormControl id="campaign-type">
                <FormLabel fontSize="sm">Campaign Type</FormLabel>
                <Select
                  value={campaignType}
                  onChange={(e) => setCampaignType(e.target.value)}
                  size="sm"
                  maxW="2xs"
                >
                  <option>Individual</option>
                  <option>Group</option>
                </Select>
              </FormControl>
            )}

            {campaignType === "Group" && (
              <FieldGroup
                title="Group Name"
                description="The name of your group"
              >
                <InputGroup size="sm">
                  <Input
                    value={groupName}
                    placeholder="Enter the name of your group"
                    onChange={(e) => setGroupName(e.target.value)}
                  />
                </InputGroup>
              </FieldGroup>
            )}

            <FormControl id="category">
              <FormLabel fontSize="sm">Category</FormLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                size="sm"
                maxW="2xs"
              >
                <option>Drum Corps</option>
                <option>Winter Guard</option>
                <option>Indoor Percussion</option>
                <option>Marching Band</option>
                <option>Group Fundraiser</option>
              </Select>
            </FormControl>

            <FieldGroup title="Title" description="Your campaign title">
              <InputGroup size="sm">
                <Input
                  value={title}
                  placeholder="Enter campaign title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </InputGroup>
            </FieldGroup>

            <FieldGroup
              title="Fundraising Goal"
              description="Keep in mind that transaction fees, including credit and debit charges, are deducted from each donation."
            >
              <SimpleGrid>
                <FormControl>
                  <InputGroup size="sm">
                    <InputLeftAddon
                      bg="gray.50"
                      color="gray.500"
                      rounded="md"
                    >$</InputLeftAddon>
                    <Input
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      name="goal"
                      id="goal"
                      type="number"
                      placeholder="Enter goal amount"
                      focusBorderColor="brand.400"
                      rounded="md"
                      width={["full", "150px"]}
                    />
                    <InputRightAddon
                      children="USD"
                      bg="gray.50"
                      color='gray.500'
                      rounded="md"
                    />
                  </InputGroup>
                </FormControl>
              </SimpleGrid>
            </FieldGroup>

            <FieldGroup title="Story" description="Share your story">
              <FormControl id="bio">
                <Textarea
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  rows={5}
                />
              </FormControl>
            </FieldGroup>

            <FieldGroup title="Status" description="">
              <FormControl display="flex" alignItems="center">
                <FormLabel flex="1" fontSize="sm" mb="0">
                  Publish Campaign?
                </FormLabel>
                <Switch
                  defaultChecked={true}
                  isChecked={status}
                  onChange={() => setStatus(!status)}
                />
              </FormControl>
            </FieldGroup>

            <FieldGroup
              title="Photo"
              description="Upload a photo for your campaign"
            >
              <FormControl>
                <FormLabel fontSize="sm" fontWeight="md" color="gray.700">
                  Campaign Photo
                </FormLabel>
                <Flex
                  mt={1}
                  justify="center"
                  px={6}
                  pt={5}
                  pb={6}
                  borderWidth={2}
                  borderColor="gray.300"
                  borderStyle="dashed"
                  rounded="md"
                >
                  <Stack spacing={1} textAlign="center">
                    <Icon
                      mx="auto"
                      boxSize={12}
                      color="gray.400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Icon>
                    <Flex
                      fontSize="sm"
                      color="gray.600"
                      alignItems="baseline"
                    >
                      <chakra.label
                        fontWeight="bold"
                        htmlFor="file-upload"
                        cursor="pointer"
                        rounded="md"
                        fontSize="md"
                        color="brand.600"
                        pos="relative"
                        _hover={{
                          textDecoration: "underline",
                          color: "brand.400",
                        }}
                      >
                        <span>Upload a file</span>
                        <VisuallyHidden>
                          {data && (
                            <input
                              onChange={(e) => {
                                setFile(e.target.files[0]);
                                setFileName(e.target.files[0].name);
                              }}
                              id="file-upload"
                              name="image"
                              type="file"
                            />
                          )}
                          {!data && (
                            <input
                              required
                              onChange={(e) => {
                                setFile(e.target.files[0]);
                                setFileName(e.target.files[0].name);
                              }}
                              id="file-upload"
                              name="image"
                              type="file"
                            />
                          )}
                        </VisuallyHidden>
                      </chakra.label>
                      <Text pl={1}>or drag and drop</Text>
                    </Flex>
                    <Text
                      fontSize="xs"
                      color="gray.500"
                    >
                      PNG, JPG, GIF up to 10MB
                    </Text>
                  </Stack>
                </Flex>
                <Text>{fileName && fileName}</Text>
              </FormControl>
            </FieldGroup>

            <FieldGroup>
              <HStack width="full">
                <Link href="/my-campaigns">
                  <Button ml="auto" variant="outline">
                    Cancel
                  </Button>
                </Link>
                <Button isLoading={loading} type="submit" colorScheme="blue">
                  Save
                </Button>
              </HStack>
            </FieldGroup>
          </Stack>
        </Card>
      </form>
    </Stack>
  );
};
