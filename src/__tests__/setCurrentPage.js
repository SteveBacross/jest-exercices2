import { setCurrentPage } from '../setCurrentPage';

describe('setCurrentPage', () => {
  it('should return 1 when max is 0', () => {
    const result = setCurrentPage({ max: 0, skip: 10 });
    expect(result).toBe(1);
  });

  it('should calculate the correct current page', () => {
    const result = setCurrentPage({ max: 5, skip: 12 });
    expect(result).toBe(3);
  });

  it('should handle decimal values correctly', () => {
    const result = setCurrentPage({ max: 3, skip: 7 });
    expect(result).toBe(3);
  });
});