import { gql } from "@apollo/client";

export const NEW_CAMPAIGN = gql`
  mutation createCampaign(
    $user: ID!
    $campaignType: String!
    $amountRaised: Int!
    $image: String!
    $goal: Int!
    $groupName: String
    $status: Boolean!
    $story: String!
    $createdAt: String!
    $category: String!
    $title: String!
  ) {
    createCampaign(
      data: {
        user: { connect: $user }
        campaignType: $campaignType
        amountRaised: $amountRaised
        image: $image
        goal: $goal
        groupName: $groupName
        status: $status
        story: $story
        createdAt: $createdAt
        category: $category
        title: $title
      }
    ) {
      _id
    }
  }
`;

export const DELETE_CAMPAIGN = gql`
  mutation deleteCampaign($id: ID!) {
    deleteCampaign(id: $id) {
      _id
    }
  }
`;

export const CREATE_MEMBER = gql`
  mutation createGroupMember($user: ID!, $campaign: ID!, $amountRaised: Int!) {
    createGroupMember(
      data: {
        user: { connect: $user }
        campaign: { connect: $campaign }
        amountRaised: $amountRaised
      }
    ) {
      _id
    }
  }
`;

export const USER_CAMPAIGNS = gql`
  query findUserByID($id: ID!) {
    findUserByID(id: $id) {
      _id
      name
      campaigns {
        data {
          _id
          title
          category
          campaignType
          groupName
          amountRaised
          image
          goal
          status
          story
          createdAt
        }
      }
      groups {
        data {
          _id
          amountRaised
          campaign {
            _id
            title
            amountRaised
            image
            createdAt
          }
        }
      }
    }
  }
`;

export const CAMPAIGN_BY_ID = gql`
  query findCampaignByID($id: ID!) {
    findCampaignByID(id: $id) {
      _id
      title
      amountRaised
      goal
      image
      story
      campaignType
      createdAt
      groupName
      category
      user {
        _id
        name
      }
      donors {
        data {
          _id
          name
          amount
          createdAt
        }
      }
      updates {
        data {
          _id
          title
          content
          createdAt
          user {
            name
          }
        }
      }
      members {
        data {
          _id
          user {
            _id
            name
          }
          amountRaised
          donors {
            data {
              _id
            }
          }
          contacts {
            data {
              _id
            }
          }
        }
      }
    }
  }
`;

export const CREATE_UPDATE = gql`
  mutation createUpdate(
    $user: ID!
    $campaign: ID!
    $title: String!
    $content: String!
    $createdAt: String!
  ) {
    createUpdate(
      data: {
        user: { connect: $user }
        campaign: { connect: $campaign }
        title: $title
        content: $content
        createdAt: $createdAt
      }
    ) {
      _id
      title
      content
      createdAt
      campaign {
        _id
      }
    }
  }
`;

export const DELETE_UPDATE = gql`
  mutation deleteUpdate($id: ID!) {
    deleteUpdate(id: $id) {
      _id
    }
  }
`;

export const DELETE_MEMBER = gql`
  mutation deleteGroupMember($id: ID!) {
    deleteGroupMember(id: $id) {
      _id
    }
  }
`;

export const FIND_CAMPAIGN_TO_EDIT = gql`
  query findCampaignByID($id: ID!) {
    findCampaignByID(id: $id) {
      _id
      title
      amountRaised
      goal
      image
      story
      campaignType
      createdAt
      status
      category
      groupName
      user {
        _id
        name
      }
    }
  }
`;

export const EDIT_CAMPAIGN = gql`
  mutation updateCampaign(
    $id: ID!
    $campaignType: String!
    $amountRaised: Int!
    $image: String!
    $goal: Int!
    $groupName: String
    $status: Boolean!
    $story: String!
    $category: String!
    $title: String!
    $createdAt: String!
  ) {
    updateCampaign(
      id: $id
      data: {
        campaignType: $campaignType
        amountRaised: $amountRaised
        image: $image
        goal: $goal
        groupName: $groupName
        status: $status
        story: $story
        category: $category
        title: $title
        createdAt: $createdAt
      }
    ) {
      _id
    }
  }
`;

export const FIND_GROUP_MEMBER_BY_ID = gql`
  query findGroupMemberByID($id: ID!) {
    findGroupMemberByID(id: $id) {
      _id
      amountRaised
      campaign {
        _id
        title
        category
        image
        amountRaised
        goal
        story
        groupName
        campaignType
        createdAt
        user {
          _id
        }
        updates {
          data {
            _id
            title
            content
            createdAt
            user {
              name
            }
          }
        }
      }
      user {
        _id
        name
      }
      donors {
        data {
          _id
          name
          amount
        }
      }
    }
  }
`;

export const ALL_CAMPAIGNS = gql`
  query allCampaigns($status: Boolean!, $cursor: String) {
    allCampaigns(status: $status, _size: 9, _cursor: $cursor) {
      data {
        _id
        title
        story
        image
        goal
        amountRaised
        user {
          name
        }
      }
      before
      after
    }
  }
`;

export const CAMPAIGN_MEMBERS = gql`
  query campaignMembers($id: ID!, $cursor: String) {
    campaignMembers(id: $id, _size: 6, _cursor: $cursor) {
      data {
        _id
        amountRaised
        user {
          _id
          name
        }
        donors {
          data {
            _id
            name
            amount
            createdAt
          }
        }
        contacts {
          data {
            _id
          }
        }
      }
      before
      after
    }
  }
`;

export const CAMPAIGN_DONORS = gql`
  query campaignDonors($id: ID!, $cursor: String) {
    campaignDonors(id: $id, _size: 6, _cursor: $cursor) {
      data {
        _id
        name
        amount
        createdAt
      }
      before
      after
    }
  }
`;

export const CREATE_CONTACT = gql`
  mutation createContact(
    $name: String!
    $email: String!
    $campaign: ID!
    $status: Boolean!
    $user: ID!
    $createdAt: String!
  ) {
    createContact(
      data: {
        name: $name
        email: $email
        campaign: { connect: $campaign }
        status: $status
        user: { connect: $user }
        createdAt: $createdAt
      }
    ) {
      _id
      name
      email
    }
  }
`;

export const GET_CONTACTS = gql`
  query campaignContacts($id: ID!, $cursor: String) {
    campaignContacts(id: $id, _size: 6, _cursor: $cursor) {
      data {
        _id
        name
        email
        status
        createdAt
      }
      before
      after
    }
  }
`;

export const GET_GROUP_MEMBER_CONTACTS = gql`
  query groupMemberContacts($id: ID!, $cursor: String) {
    groupMemberContacts(id: $id, _size: 6, _cursor: $cursor) {
      data {
        _id
        name
        email
        status
        createdAt
      }
      before
      after
    }
  }
`;

export const DELETE_CONTACT = gql`
  mutation deleteContact($id: ID!) {
    deleteContact(id: $id) {
      _id
    }
  }
`;

export const UPDATE_CONTACT = gql`
  mutation updateContact(
    $id: ID!
    $name: String!
    $email: String!
    $campaign: ID!
    $status: Boolean!
    $user: ID!
  ) {
    updateContact(
      id: $id
      data: {
        name: $name
        email: $email
        campaign: { connect: $campaign }
        status: $status
        user: { connect: $user }
      }
    ) {
      _id
      name
      email
    }
  }
`;

export const UPDATE_GROUP_MEMBER_CONTACT = gql`
  mutation updateContact(
    $id: ID!
    $name: String!
    $email: String!
    $status: Boolean!
    $user: ID!
    $groupMember: ID!
  ) {
    updateContact(
      id: $id
      data: {
        name: $name
        email: $email
        status: $status
        user: { connect: $user }
        groupMember: { connect: $groupMember }
      }
    ) {
      _id
      name
      email
    }
  }
`;

export const CREATE_GROUP_MEMBER_CONTACT = gql`
  mutation createContact(
    $name: String!
    $email: String!
    $groupMember: ID!
    $status: Boolean!
    $user: ID!
    $campaign: ID!
    $createdAt: String!
  ) {
    createContact(
      data: {
        name: $name
        email: $email
        campaign: { connect: $campaign }
        groupMember: { connect: $groupMember }
        status: $status
        user: { connect: $user }
        createdAt: $createdAt
      }
    ) {
      _id
      name
      email
    }
  }
`;
