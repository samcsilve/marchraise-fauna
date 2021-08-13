import faunadb from "faunadb";
import Stripe from "stripe";
import nookies from 'nookies'

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const createAccountLink = async (id) => {
  const accountLinks = await stripe.accountLinks.create({
    account: id,
    refresh_url: `${process.env.APP_URL}/my-campaigns`,
    return_url: `${process.env.APP_URL}/new-campaign`,
    type: "account_onboarding",
  });
  return accountLinks.url;
};

export default async function createStripeAccount(req, res) {
  const {faunaToken: token} = nookies.get({ req });

  const faunaClient = new faunadb.Client({
    secret: token,
    domain: "db.us.fauna.com",
  });
  const q = faunadb.query;
  const { ref, data } = await faunaClient.query(q.Get(q.CurrentIdentity()));
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_SECRET,
    domain: "db.us.fauna.com",
  });


  try {
    if (!token) return res.status(400).send("Please log in first");
    if (!data.stripeId) {
      const account = await stripe.accounts.create({
        type: "express",
        email: data.email,
        business_profile: {
          mcc: "5734",
          product_description: "Crowdfunding for the marching arts.",
          support_address: {
            city: "Tulsa",
            country: "US",
            line1: "7224 South Elwood Avenue",
            line2: "Apt. 7305",
            postal_code: "74132",
            state: "OK",
          },
          support_email: "samsilverman252@gmail.com",
          support_phone: "+19494636426",
          support_url: "marchraise.com",
          url: "marchraise.com",
        },
        capabilities: {
          card_payments: {
            requested: true,
          },
          transfers: {
            requested: true,
          },
        },
        settings: {
          payouts: {
            debit_negative_balances: true,
            schedule: {
              delay_days: 14,
              interval: "daily",
            },
          },
        },
      });

      await serverClient.query(
        q.Update(q.Ref(q.Collection("User"), ref.id), {
          data: { stripeId: account.id },
        })
      );
      res.status(200).json({ url: await createAccountLink(account.id) });
    } else {
      res.status(200).json({ url: await createAccountLink(data.stripeId) });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
