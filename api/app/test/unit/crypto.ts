const expect = require('chai').expect;
import {encrypt, decrypt} from '../../services/crypto';

describe('routes : games', () => {
  it('crypto successfully', () => {
    const email = 'test@test.ua';
    expect(decrypt(encrypt(email))).to.equal(email);
  });
});
