import nookies from "nookies";
import faunadb, {
  Equals,
  If,
  Index,
  Lambda,
  Let,
  Match,
  Paginate,
  Var,
  Get,
  Map,
  Ref,
  Collection,
} from "faunadb";
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
        Lambda(
          Let(
            {
              match: Match(
                Index("campaign_members_by_campaign"),
                Ref(Collection("Campaign"), req.body.id)
              ),
              page: If(
                Equals(req.body.before, null),
                If(
                  Equals(req.body.after, null),
                  Paginate(Var("match"), { size: 1 }),
                  Paginate(Var("match"), {
                    after: req.body.after,
                    size: 1,
                  })
                ),
                Paginate(Var("match"), {
                  before: req.body.before,
                  size: 1,
                })
              ),
            },
            Map(Var("page"), Lambda("x", Get(Var("x"))))
          )
        )
      );
      res.status(200).json(data);
    } else {
      return res.status(400).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
}
