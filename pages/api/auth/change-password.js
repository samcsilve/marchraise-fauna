import redis from "@/lib/redis";
import nookies, { setCookie } from "nookies";
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
    const { token, password } = req.body;

    const userId = await redis.get("forget-password:" + token);
    if (!userId) {
      return res.status(200).json({ message: "Token expired" });
    }
    const user = await serverClient.query(
      q.Get(q.Ref(q.Collection("User"), userId))
    );
    if (!user) {
      return res.status(200).json({ message: "User not found" });
    }
    const updatedUser = await serverClient.query(
      q.Update(q.Ref(q.Collection("User"), userId), {
        credentials: { password },
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

    redis.del("forget-password:" + token)

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
}
