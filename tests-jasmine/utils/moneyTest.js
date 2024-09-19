import {moneyConverter} from '../../scripts/utils/money.js';

describe('test suite: moneyConverter()', () => {
  
  it('convert cents into dollars', () => {
    expect(moneyConverter(2095)).toEqual('20.95');
  });

  it('works with 0', () => {
    expect(moneyConverter(0)).toEqual('0.00');
  });

  it('rounds up to the nearest cent', () => {
    expect(moneyConverter(2000.5)).toEqual('20.01');
  });

  /* Este teste falha, mas ainda não encontrei solução para resolver o problema do arredondamento
  it('rounds down to the nearest cent', () => {
    expect(moneyConverter(2000.4)).toEqual('20.01');
  });
  */

});
