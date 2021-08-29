import faunadb from "faunadb";
import nookies, { parseCookies, setCookie } from "nookies";

export default async function handler(req, res) {
  const parsedCookies = parseCookies({ req });
  try {
    const faunaClient = new faunadb.Client({
      secret: parsedCookies.faunaToken,
      domain: "db.us.fauna.com",
    });
    const serverClient = new faunadb.Client({
      secret: process.env.FAUNA_SECRET,
      domain: "db.us.fauna.com",
    });
    const q = faunadb.query;
    const { name, email, password } = req.body;
    console.log("called");

    const userRef = await faunaClient.query(q.CurrentIdentity());
    const updatedUser = await serverClient.query(
      q.Update(q.Ref(q.Collection("User"), userRef.id), {
        credentials: { password },
        data: { name, email },
      })
    );

    if (updatedUser) {
      nookies.destroy({ res }, "faunaToken", {
        maxAge: -1,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
    }

    const auth = await serverClient.query(
      q.Login(
        q.Match(q.Index("users_by_email"), q.Casefold(updatedUser.data.email)),
        {
          password,
        }
      )
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

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
}
