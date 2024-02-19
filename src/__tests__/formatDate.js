import { formatDate } from '../formatDate';

describe('formatDate', () => {
  it('should format the date correctly with default parameters', () => {
    const formattedDate = formatDate('2022-12-25');
    expect(formattedDate).toBe('25/12/2022');
  });

  it('should format the date correctly with custom locale', () => {
    const formattedDate = formatDate('2022-12-25', 'en-US');
    expect(formattedDate).toBe('12/25/2022');
  });

  it('should format the date correctly with custom options', () => {
    const formattedDate = formatDate('2022-12-25', 'fr-FR', { weekday: 'long' });
    expect(formattedDate).toBe('dimanche');
  });

  it('should return an empty string if the date is empty', () => {
    const formattedDate = formatDate('');
    expect(formattedDate).toBe('');
  });
});