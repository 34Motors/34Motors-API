import Mailgen from "mailgen";
import { AppError } from "../errors";
import { IEmailRequest } from "../interfaces/mail.inteface";
import { createTransport } from "nodemailer";

async function sendEmail({ to, subject, text }: IEmailRequest) {
  const transporter = createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "a8f9fcb5492e17",
      pass: "cc9c08a21f5b71",
    },
  });

  await transporter
    .sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      html: text,
    })
    .then(() => {
      console.log("Email enviado com sucesso");
    })
    .catch((err: any) => {
      console.log(err);
      throw new AppError(
        "Ocorreu um erro ao enviar o email, tente novamente mais tarde",
        500
      );
    });
}

async function resetPasswordTemplate(
  userName: string,
  userEmail: string,
  resetToken: string
) {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "34Motors",
      link: process.env.APP_URL!,
    },
  });

  const email = {
    body: {
      name: userName,
      intro:
        "Você recebeu esse email porque recebemos uma solicitação de redefinição de senha para sua conta",
      action: {
        instructions: "Clique no botão abaixo para redefinir sua senha:",
        button: {
          color: "#DC4D2F",
          text: "Redefinir senha",
          link: `${process.env.APP_URL}/resetPassword/${resetToken}`,
        },
      },
      outro:
        "Se você não solicitou uma redefinição de senha, nenhuma ação é necessária.",
    },
  };

  const emailBody = mailGenerator.generate(email);
  const emailTemplate = {
    to: userEmail,
    subject: "Redefinição de senha",
    text: emailBody,
  };

  return emailTemplate;
}

export { sendEmail, resetPasswordTemplate };
