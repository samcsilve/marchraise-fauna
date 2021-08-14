import nookies from "nookies";
import faunadb from "faunadb";
export default async function handler(req, res) {
  const { faunaToken } = nookies.get({ req });
  const faunaClient = new faunadb.Client({
    secret: faunaToken,
    domain: "db.us.fauna.com",
  });
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_SECRET,
    domain: "db.us.fauna.com",
  });
  const q = faunadb.query;
  try {
    const user = await faunaClient.query(q.CurrentIdentity());

    if (user) {
      const data = await serverClient.query(
        q.Map(
          q.Paginate(
            q.Match(
              q.Index("campaign_members_by_campaign"),
              q.Ref(q.Collection("Campaign"), req.query.campaign)
            ),
            {
              size: 1,
              before: [req.body.before],
              after: [req.body.after],
            }
          ),
          q.Lambda("ref", q.Get(q.Var("ref")))
        )
      );
      console.log(data);
    }

    // if (data.user.id !== user.id) {
    //   return res.status(400).json({ message: "Unauthorized" });
    // }

    // const { data: deleted } = await serverClient.query(
    //   q.Delete(q.Ref(q.Collection("GroupMember"), req.body.member))
    // );
    res.status(200).json({ succeeded: true });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
}
