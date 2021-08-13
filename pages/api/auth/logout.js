import faunadb from "faunadb";
import nookies from "nookies";

export default async function profile(req, res) {
  const { faunaToken: token } = nookies.get({ req });

  const faunaClient = new faunadb.Client({
    secret: token,
    domain: "db.us.fauna.com",
  });
  const q = faunadb.query;

  if (!token) return res.status(200).end();

  try {
    await faunaClient.query(q.Logout(false));
    nookies.destroy({ res }, "faunaToken", {
      maxAge: -1,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(error.requestResult.statusCode).send(error.message);
  }
}
