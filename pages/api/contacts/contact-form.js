import sgMail from "@sendgrid/mail";

export default async function handler(req, res) {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const message = {
      to: "samsil@umich.edu",
      from: "support@marchraiseapp.com",
      subject: `New Form Submission from ${req.body.name}`,
      text: `Name: ${req.body.name}, Email: ${req.body.email}, Message: ${req.body.message}`,
    };
    await sgMail.send(message);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false });
  }
}
