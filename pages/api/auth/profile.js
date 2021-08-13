import faunadb from "faunadb";
import { parseCookies } from "nookies";

export default async function handler(req, res) {
  const parsedCookies = parseCookies({ req });

  if (parsedCookies.faunaToken) {
    const faunaClient = new faunadb.Client({
      secret: parsedCookies.faunaToken,
      domain: "db.us.fauna.com",
    });
    const q = faunadb.query;

    const userRef = await faunaClient.query(q.CurrentIdentity());

    if (userRef) {
      const { data: user } = await faunaClient.query(
        q.Get(q.Ref(q.Collection("User"), userRef.id))
      );
      const returnedUser = { id: userRef.id, name: user.name, email: user.email };
      res.status(200).json(returnedUser);
    } else {
      res.end();
    }
  } else {
    res.end();
  }
}
