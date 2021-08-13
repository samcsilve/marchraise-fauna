import React from "react";
import nookies from "nookies";
import faunadb from "faunadb";
import Head from "next/head";
import CampaignForm from "@/components/CampaignForm";
import { useRouter } from "next/router";
import { useAuth } from "@/lib/auth";
import { useQuery } from "@apollo/client";
import { EDIT_CAMPAIGN, FIND_CAMPAIGN_TO_EDIT } from "@/graphql/queries";
import { Box, Spinner } from "@chakra-ui/react";

export async function getServerSideProps(ctx) {
  const { faunaToken } = nookies.get(ctx);
  const faunaClient = new faunadb.Client({
    secret: faunaToken,
    domain: "db.us.fauna.com",
  });
  const q = faunadb.query;

  const userInfo = await faunaClient.query(q.CurrentIdentity());
  const user = await faunaClient.query(
    q.Get(q.Ref(q.Collection("User"), userInfo.id))
  );
  if (!user) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  } else {
    return { props: { faunaToken } };
  }
}

const EditCampaign = ({ faunaToken }) => {
  const Router = useRouter();
  const { id } = Router.query;
  const { user } = useAuth();

  const { loading, error, data } = useQuery(FIND_CAMPAIGN_TO_EDIT, {
    variables: { id },
  });

  if (loading) {
    return (
      <Box
        height="90vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner />
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>Edit Campaign</title>
      </Head>
      {user && user.id === data.findCampaignByID.user._id && data && (
        <CampaignForm data={data.findCampaignByID} token={faunaToken} />
      )}
    </>
  );
};

export default EditCampaign;
