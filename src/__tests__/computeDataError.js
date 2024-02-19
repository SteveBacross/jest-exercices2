import { computeDataError } from '../computeDataError';
import { STATUS_HTTP_MESSAGES, setResponseError } from '../setResponseError';

describe('computeDataError', () => {
  const mockResponse = {
    json: jest.fn(),
    status: 404,
  };

  const mockSetResponseErrorFn = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call response.json() and setResponseErrorFn with the correct data', async () => {
    const mockData = { message: 'Not found' };
    mockResponse.json.mockResolvedValue(mockData);

    await computeDataError(mockResponse, mockSetResponseErrorFn);

    expect(mockResponse.json).toHaveBeenCalled();
    expect(mockSetResponseErrorFn).toHaveBeenCalledWith({
      response: { ...mockData, status: mockResponse.status },
    });
  });

  it('should call setResponseErrorFn with the correct error data if response.json() throws an error', async () => {
    const mockError = new Error('Failed to parse JSON');
    mockResponse.json.mockRejectedValue(mockError);

    await computeDataError(mockResponse, mockSetResponseErrorFn);

    expect(mockSetResponseErrorFn).toHaveBeenCalledWith({
      response: {
        anomaly: { label: STATUS_HTTP_MESSAGES[mockResponse.status] },
        status: mockResponse.status,
      },
    });
  });
});