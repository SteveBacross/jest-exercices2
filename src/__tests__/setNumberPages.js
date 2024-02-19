import { setNumberPages } from '../setNumberPages';

describe('setNumberPages', () => {
    it('should return 1 when total and max are not provided', () => {
        expect(setNumberPages({})).toBe(1);
    });

    it('should return 1 when max is greater than or equal to total', () => {
        expect(setNumberPages({ total: 10, max: 10 })).toBe(1);
        expect(setNumberPages({ total: 10, max: 20 })).toBe(1);
    });

    it('should return the correct number of pages when max is less than total', () => {
        expect(setNumberPages({ total: 10, max: 5 })).toBe(1);
        expect(setNumberPages({ total: 10, max: 3 })).toBe(3);
        expect(setNumberPages({ total: 10, max: 2 })).toBe(4);
    });
});