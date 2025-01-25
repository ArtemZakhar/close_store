import nodemailer from 'nodemailer';

const transportOptions = {
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_PASSWORD,
  },
  logger: true,
  debug: true,
};

export async function sendVerificationEmail(email: string, token: string) {
  const transport = nodemailer.createTransport(transportOptions);
  const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/finish-registration/?token=${token}`;

  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: email,
    subject: `Підтвердіть свою електронну поштую`,
    text: `Для підтвердження електронної адреси перейдіть, будь ласка, за посиланням: ${verificationLink}`,
    html: `Для підтвердження електронної адреси перейдіть, будь ласка, за посиланням: <a href="${verificationLink}" target="_blank">Завершити реєстрацію</a>`,
  };

  console.log({ transportOptions, mailOptions });

  try {
    await transport.sendMail(mailOptions);
  } catch (e) {
    console.log(e);
  }
}

export async function sendPasswordReminder({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  const transport = nodemailer.createTransport(transportOptions);

  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: email,
    subject: `Створіть новий пароль`,
    text: `Для створення нового паролю перейдіть, будь ласка, за посиланням: ${process.env.BASE_URL}new-password/?token=${token}`,
  };

  try {
    await transport.sendMail(mailOptions);
  } catch (e) {
    console.log(e);
  }
}
