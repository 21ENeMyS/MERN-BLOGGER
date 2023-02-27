const nodemailer = require("nodemailer");

exports.sendWithNodemailer = (req, res, emailData) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.APP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  return transporter
    .sendMail(emailData)
    .then((info) => {
      console.log(`message sent : ${info.response}`);
      return json({ message: true });
    })
    .catch((err) => {
      return console.log(`problem something sending : ${err}`);
    });
};
