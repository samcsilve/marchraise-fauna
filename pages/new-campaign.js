import React from "react";
import nookies, { parseCookies } from "nookies";
import Stripe from "stripe";
import faunadb from "faunadb";
import Head from "next/head";
import StripeModal from "../components/StripeModal";
import CampaignForm from "../components/CampaignForm";

export async function getServerSideProps(ctx) {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
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
    if (user.data.stripeId) {
      const account = await stripe.accounts.retrieve(user.data.stripeId);
      if (account.charges_enabled) {
        return { props: { isOnboarded: true, faunaToken } };
      } else {
        return { props: { isOnboarded: false, faunaToken } };
      }
    } else {
      return { props: { isOnboarded: false, faunaToken } };
    }
  }
}

const NewCampaign = ({ isOnboarded, faunaToken }) => {
  return (
    <>
      <Head>
        <title>New Campaign</title>
      </Head>
      <StripeModal isOnboarded={isOnboarded} />
      <CampaignForm isOnboarded={isOnboarded} token={faunaToken} />
    </>
  );
};

export default NewCampaign;
