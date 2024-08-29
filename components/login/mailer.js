import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-password'
  }
});

async function sendPasswordResetEmail(email, resetLink) {
  try {
    await transporter.sendMail({
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Сброс пароля',
      html: `<p>Для сброса пароля перейдите по ссылке: <a href="${resetLink}">${resetLink}</a></p>` // HTML содержимое письма
    });
  } catch (error) {
    console.error('Ошибка отправки письма:', error);
  }
}

module.exports = {
  sendPasswordResetEmail
};
