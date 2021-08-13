import faunadb from "faunadb";
import { setCookie } from "nookies";

export default async function signup(req, res) {
  const faunaClient = new faunadb.Client({
    secret: process.env.FAUNA_SECRET,
    domain: "db.us.fauna.com",
  });
  const q = faunadb.query;

  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and Password not provided}" });
  }

  try {
    const auth = await faunaClient.query(
      q.Login(q.Match(q.Index("users_by_email"), q.Casefold(email)), {
        password,
      })
    );

    if (!auth.secret) {
      return res.status(404).json({ message: "Auth secret is missing" });
    }

    setCookie({ res }, "faunaToken", auth.secret, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
}
