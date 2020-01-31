import FootballTeem from '../../services/footbal-teem'
const expect = require('chai').expect;
describe('routes : games', () => {
  it('split players on two teems', () => {
    let footballTeem = new FootballTeem(11);
    expect([6, 5]).to.eql(footballTeem.splitOnTeems());
    footballTeem = new FootballTeem(10);
    expect([5, 5]).to.eql(footballTeem.splitOnTeems());
    footballTeem = new FootballTeem(21);
    expect([11, 10]).to.eql(footballTeem.splitOnTeems());
  });
});
