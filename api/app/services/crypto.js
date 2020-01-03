const crypto = require('crypto');

const key = process.env.KEY;
const iv = process.env.IV;

/**
 * @param {string} t
 * @return {string}
 */
export function encrypt(t) {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  cipher.update(t, 'utf-8', 'hex');
  return cipher.final('hex');
}

/**
 * @param {string} t
 * @return {string}
 */
export function decrypt(t) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  decipher.update(t, 'hex', 'utf-8');
  return decipher.final('utf-8');
}
