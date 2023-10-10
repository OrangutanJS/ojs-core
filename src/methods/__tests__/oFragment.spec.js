import { expect, describe, it } from 'vitest';
import { oFragment } from '../oFragment';

describe('oFragment', () => {
  it('should have set _isofragment property to true value', () => {
    // when
    const oFragmentElement = oFragment();

    // then
    expect(oFragmentElement._isofragment).toBe(true);
  });

  it('should not be possible to edit _isofragment property', () => {
    // given
    const oFragmentElement = oFragment();

    // when
    const editIsOFragmentProperty = () => {
      oFragmentElement._isofragment = false;
    };

    // then
    expect(editIsOFragmentProperty).toThrowError(/Cannot assign to read only property/);
  });
});