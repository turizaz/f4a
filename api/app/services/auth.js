import {encrypt, decrypt} from './crypto';
import {confirmEmail as confirmEmailQuery} from '../db/queries/users';
/**
 * @param {string} email
 * @param {object} mailer
 */
export function sendConfirmationEmail(email, mailer) {
  console.log(encrypt(email))
  console.log("EMAILLLLLLLLL", decrypt(encrypt(email)))
  //
  // mailer.sendMail({
  //   from: '"Football for everyone 👻" <f4econtacts@gmail.com>',
  //   to: email,
  //   subject: 'Confirm email account ✔',
  //   text: 'Confirm your email account?',
  //   html: `<b>To confirm your account </b><a href="${process.env.HOST}/auth/confirm-email/${encrypt(email)}">Click here</a>`,
  // });
}

/**
 * Confirm email function
 * @param {string} hash
 * @return {string}
 */
export async function confirmEmail(hash) {
  const email = decrypt(hash);
  return await confirmEmailQuery(email);
}
