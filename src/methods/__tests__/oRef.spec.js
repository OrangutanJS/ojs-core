import { expect, describe, it } from 'vitest';
import { oRef } from '../oRef';

describe('oRef', () => {
  it('should have set _isofragment property to true value', () => {
    // when
    const oRefElement = oRef();

    // then
    expect(oRefElement._isoref).toBe(true);
  });

  it('should not be possible to edit _isofragment property', () => {
    // given
    const oRefElement = oRef();

    // when
    const editIsORefProperty = () => {
      oRefElement._isoref = false;
    };

    // then
    expect(editIsORefProperty).toThrowError(/Cannot assign to read only property/);
  });
});
