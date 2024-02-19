import { setPagination } from '../setPagination';
import { setCurrentPage } from '../setCurrentPage';
import { setNumberPages } from '../setNumberPages';

// Mock setCurrentPage and setNumberPages functions
jest.mock('../setCurrentPage');
jest.mock('../setNumberPages');

describe('setPagination function', () => {
  beforeEach(() => {
    setCurrentPage.mockClear();
    setNumberPages.mockClear();
  });

  it('should return pagination object with correct values', () => {
    const total = 10;
    const skip = 2;
    const max = 5;
    const currentPage = 1;
    const numberPages = 3;

    setCurrentPage.mockReturnValue(currentPage);
    setNumberPages.mockReturnValue(numberPages);

    const pagination = setPagination({ total, skip, max });

    expect(pagination.total).toBe(total);
    expect(pagination.numberItems).toBe(max);
    expect(setCurrentPage).toHaveBeenCalledWith({ max, skip });
    expect(setNumberPages).toHaveBeenCalledWith({ total, max });
    expect(pagination.currentPage).toBe(currentPage);
    expect(pagination.numberPages).toBe(numberPages);
  });
});
