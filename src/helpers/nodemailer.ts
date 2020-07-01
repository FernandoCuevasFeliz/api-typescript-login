import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';
import { SendEmailI } from '../interfaces/sendEmail';
import { UserI } from '../interfaces/user';
import {
  htmlEmailConfirm,
  htmlEmailResetPassword,
  htmlEmailSignUp,
} from './emails/messages';

import { generatelink } from './emails/emailToken';

const sendEmail = async (message: SendEmailI) => {
  //   const testAccount = nodemailer.createTestAccount();
  const transporter: Transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465
    auth: {
      user: process.env.USER_MAILER,
      pass: process.env.PASS_MAILER,
    },
  });

  const sendOptions: SendMailOptions = {
    from: process.env.FROM_MAILER,
    to: message.to_mailer,
    subject: message.subject_mailer,
    html: message.html,
  };

  const info = await transporter.sendMail(sendOptions);
  return info;
};

export const typeMessage = (
  type: string,
  user: UserI,
  link: string
): SendEmailI => {
  let message: SendEmailI;
  if (type === 'confirmAccount') {
    let mayuculas = user.displayName?.split(' ');
    let dis = '';
    mayuculas?.forEach((letra) => {
      letra = letra[0].toUpperCase() + letra.slice(1);
      dis = dis + ' ' + letra;
    });
    user.displayName = dis;
    message = {
      to_mailer: user.email,
      subject_mailer: 'Confirm Account',
      html: htmlEmailConfirm(user, link),
    };
  } else if (type === 'resetPass') {
    message = {
      to_mailer: user.email,
      subject_mailer: 'Reset Password',
      html: htmlEmailResetPassword(user, link),
    };
  } else if (type === 'signup') {
    message = {
      to_mailer: user.email,
      subject_mailer: 'SignUp',
      html: htmlEmailSignUp(user, link),
    };
  }
  return message;
};

export default sendEmail;
