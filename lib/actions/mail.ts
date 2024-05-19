"use server";
var nodemailer = require("nodemailer");
const domain = process.env.NEXT_PUBLIC_URL;

type EmailProps =
  | {
      type: "invite";
      email: string;
      token: string;
    }
  | {
      type: "request";
      email: string;
    }
  | {
      type: "bug";
      email: string;
      subject: string;
      description: string;
    };

export const sendEmail = (props: EmailProps) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  var mail = {
    to: props.email,
    subject: "",
    text: "",
    html: "",
  };

  if (props.type === "invite") {
    const inviteLink = `${domain}/invited?token=${props.token}`;

    mail = {
      to: props.email,
      subject: "Tabula Invite Link.",
      text: `Use this link to create your account: ${inviteLink}`,
      html: `
      <div style="text-align: center; margin-top: 24px">
          <h1>Hello!</h1>
          <p>Sign up with your invited email using the link below.</p>
          <a style="margin-top: 24px; font-size: large">${inviteLink}</a>
      </div>
      `,
    };
  }

  if (props.type === "request") {
    mail = {
      to: process.env.EMAIL_USER!,
      subject: "Tabula Davet Talebi.",
      text: `Bu e-posta adresi Tabula Notlar'a davet kodu istiyor: ${props.email}`,
      html: `
      <div style="text-align: center; margin-top: 24px">
          <h1>Merhaba!</h1>
          <p>Aşağıdaki e-posta adresi Tabula Notlar'a davet kodu istiyor.</p>
          <p>E-posta adresi:</p>
          <p style="margin-top: 24px; font-size: large">${props.email}</p>
      </div>
    `,
    };
  }

  if (props.type === "bug") {
    mail = {
      to: process.env.EMAIL_USER!,
      subject: `Tabula Notlar Hata Bildirimi: ${props.email}`,
      text: `Hata: ${props.subject}`,
      html: `
      <div style="margin-top: 24px">
          <h1>Merhaba!</h1>
          <p>Aşağıdaki hata Tabula Notlar'a bildirilmiştir.</p>
          <p style="margin-top: 24px;">Konu:</p>
          <p style="border: 1px solid red; border-radius: 2px; padding-block: 8px; padding-inline: 4px; font-size: large">${props.subject}</p>
          <p >Açıklama:</p>
          <p style="border: 1px solid red; border-radius: 2px; padding-block: 8px; padding-inline: 4px; font-size: large">${props.description}</p>
      </div>
    `,
    };
  }

  var mailOptions = {
    from: process.env.EMAIL_FROM,
    to: mail.to,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
  };

  transporter.sendMail(mailOptions, function (error: Error, info: any) {
    if (error) {
      throw new Error(error.message);
    } else {
      return true;
    }
  });
};
