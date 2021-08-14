import { buffer } from "micro";
import Cors from "micro-cors";
import Stripe from "stripe";
import faunadb from "faunadb";
import dayjs from "dayjs";

const faunaClient = new faunadb.Client({
  secret: process.env.FAUNA_SECRET,
  domain: "db.us.fauna.com",
});
const q = faunadb.query;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const webhookHandler = async (req, res) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        webhookSecret
      );
    } catch (error) {
      console.log("Error messages: " + error.message);
      res.status(400).send(`Webhook Error: ${error.message}`);
      return;
    }

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      await stripe.customers.update(paymentIntent.customer, {
        name: paymentIntent.charges.data[0].billing_details.name,
      });
    } else if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object;
    } else if (event.type === "charge.succeeded") {
      const charge = event.data.object;
    } else if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      session.metadata.anonymous === "true"
        ? (session.metadata.anonymous = true)
        : (session.metadata.anonymous = false);
      const customer = await stripe.customers.retrieve(session.customer);
      const retrievedSession = await stripe.checkout.sessions.retrieve(
        session.id,
        {
          expand: ["customer", "line_items"],
        }
      );
      console.log(session.metadata);
      try {
        if (session.metadata.campaignType === "Individual") {
          const data = await faunaClient.query(
            q.Get(q.Ref(q.Collection("Campaign"), session.metadata.campaignId))
          );

          const editData = await faunaClient.query(
            q.Update(q.Ref(q.Collection("Campaign"), data.ref.id), {
              data: {
                amountRaised:
                  data.data.amountRaised +
                  retrievedSession.line_items.data[1].amount_total / 100,
              },
            })
          );

          console.log(editData);

          const user = await faunaClient.query(
            q.Get(q.Ref(q.Collection("User"), session.metadata.userId))
          );

          const donorAdd = await faunaClient.query(
            q.Create(q.Collection("Donor"), {
              data: {
                name:
                  session.metadata.anonymous === true
                    ? "Anonymous"
                    : customer.name,
                amount: retrievedSession.line_items.data[1].amount_total,
                campaign: data.ref,
                user: user.ref,
                date: dayjs().format("MM/DD/YYYY"),
              },
            })
          );

          console.log(donorAdd);
        } else {
          const data = await faunaClient.query(
            q.Get(q.Ref(q.Collection("Campaign"), session.metadata.campaignId))
          );

          console.log("data ", data);

          const editData = await faunaClient.query(
            q.Update(q.Ref(q.Collection("Campaign"), data.ref.id), {
              data: {
                amountRaised:
                  data.data.amountRaised +
                  retrievedSession.line_items.data[1].amount_total / 100,
              },
            })
          );

          console.log("editData ", editData);

          if (session.metadata.memberId) {
            const user = await faunaClient.query(
              q.Get(q.Ref(q.Collection("User"), session.metadata.userId))
            );
            console.log(user);
            const memberData = await faunaClient.query(
              q.Get(q.Match(q.Index("find_group_member"), [data.ref, user.ref]))
            );

            console.log("memberData ", memberData);

            const editGroupUser = await faunaClient.query(
              q.Update(q.Ref(q.Collection("GroupMember"), memberData.ref.id), {
                data: {
                  amountRaised:
                    memberData.data.amountRaised +
                    retrievedSession.line_items.data[1].amount_total / 100,
                },
              })
            );

            console.log("editGroupUser ", editGroupUser);

            const donorAdd = await faunaClient.query(
              q.Create(q.Collection("Donor"), {
                data: {
                  name:
                    session.metadata.anonymous === true
                      ? "Anonymous"
                      : customer.name,
                  amount: retrievedSession.line_items.data[1].amount_total,
                  campaign: data.ref,
                  groupMember: memberData.ref,
                  createdAt: dayjs().format("MM/DD/YYYY"),
                },
              })
            );
            console.log(donorAdd);
          } else {
            const user = await faunaClient.query(
              q.Get(q.Ref(q.Collection("User"), session.metadata.userId))
            );
            console.log(user);

            const donorAdd = await faunaClient.query(
              q.Create(q.Collection("Donor"), {
                data: {
                  name:
                    session.metadata.anonymous === true
                      ? "Anonymous"
                      : customer.name,
                  amount: retrievedSession.line_items.data[1].amount_total,
                  campaign: data.ref,
                  user: user.ref,
                  createdAt: dayjs().format("MM/DD/YYYY"),
                },
              })
            );
            console.log(donorAdd);
          }
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }
    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default cors(webhookHandler);
