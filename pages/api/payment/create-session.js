import faunadb from "faunadb";
import Stripe from "stripe";

export default async function handler(req, res) {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const faunaClient = new faunadb.Client({
    secret: process.env.FAUNA_SECRET,
    domain: "db.us.fauna.com",
  });
  const q = faunadb.query;

  const user = await faunaClient.query(
    q.Get(q.Ref(q.Collection("User"), req.body.user))
  );
  console.log(user)
  const donation = req.body.donation * 100;
  const tip = Math.round(req.body.tip * 100);
  const platformFee = (donation + tip) * 0.03 + tip;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        name: "Platform Tip",
        amount: tip,
        currency: "usd",
        quantity: 1,
      },
      {
        name: req.body.id,
        amount: donation,
        currency: "usd",
        quantity: 1,
      },
    ],
    metadata: {
      memberId: req.body.memberId,
      campaignType: req.body.campaignType,
      campaignId: req.body.id,
      stripeId: user.data.stripeId,
      userId: user.ref.id,
      anonymous: req.body.anonymous,
    },
    payment_intent_data: {
      application_fee_amount: Math.round(platformFee),
      transfer_data: {
        destination: user.data.stripeId,
      },
    },
    success_url:
      req.body.campaignType === "Group"
        ? req.body.memberId
          ? `${process.env.APP_URL}/group/${req.body.memberId}`
          : `${process.env.APP_URL}/campaign/${req.body.id}`
        : `${process.env.APP_URL}/campaign/${req.body.id}`,
    cancel_url:
      req.body.campaign_type === "group"
        ? req.body.memberId
          ? `${process.env.APP_URL}/group/${req.body.memberId}`
          : `${process.env.APP_URL}/campaign/${req.body.id}`
        : `${process.env.APP_URL}/campaign/${req.body.id}`,
  });
  res.json(session);
  try {
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
