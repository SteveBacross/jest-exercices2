import setConfirmClassModifier from '../setConfirmClassModifier';

describe('setConfirmClassModifier', () => {
  test('should return the correct class modifier', () => {
    expect(setConfirmClassModifier(false)).toBe('confirm success');
    expect(setConfirmClassModifier(true)).toBe('confirm disabled');
    expect(setConfirmClassModifier(false, 'custom')).toBe('custom success');
    expect(setConfirmClassModifier(true, 'custom')).toBe('custom disabled');
  });
});