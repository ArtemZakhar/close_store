import nodemailer from 'nodemailer';

const transportOptions = {
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_PASSWORD,
  },
};

export async function sendVerificationEmail(email: string, token: string) {
  const transport = nodemailer.createTransport(transportOptions);

  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: email,
    subject: `Підтвердіть свою електронну поштую`,
    text: `Для підтвердження електронної адреси перейдіть, будь ласка, за посиланням: ${process.env.BASE_URL}finish-registration/?token=${token}`,
  };

  transport.sendMail(mailOptions);
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

  transport.sendMail(mailOptions);
}
