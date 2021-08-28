import sgMail from "@sendgrid/mail";
import faunadb from "faunadb";
import { v4 as uuid } from "uuid";
import redis from "@/lib/redis";

export default async function handler(req, res) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const faunaClient = new faunadb.Client({
    secret: process.env.FAUNA_SECRET,
    domain: "db.us.fauna.com",
  });
  const q = faunadb.query;
  const { email } = req.body;

  try {
    const user = await faunaClient.query(
      q.Get(q.Match(q.Index("users_by_email"), email))
    );
    if (user) {
      const token = uuid();

      redis.set("forget-password:" + token, user.ref.id, "ex", 1000 * 60 * 60 * 24);
      const msg = {
        to: user.data.email, // Change to your recipient
        from: "support@marchraiseapp.com", // Change to your verified sender
        subject: "Forgot Password",
        text: "Change your MarchRaise password",
        html: `
              <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
              <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
                  <head>
                   <title>Forgot Password</title>
                  </head>
                  <body>
                    <div>
                    <a href=http://localhost:3000/change-password?token=${token}>Change Password</a>
                    </div>
                  </body>
                </html>
              `,
      };
      await sgMail.send(msg);
      res.status(200).json({ success: true });
    } else {
      res.status(200).json({ success: true });
    }
  } catch (error) {
    console.error(error);
    res.status(200).json({ success: true });
  }
}
