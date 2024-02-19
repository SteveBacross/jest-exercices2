import { buildResponse } from '../buildResponse';

describe('buildResponse', () => {
  const mockResponse = {
    status: 200,
    json: jest.fn(() => Promise.resolve({ data: 'mock data' })),
    text: jest.fn(() => Promise.resolve('mock text')),
    blob: jest.fn(() => Promise.resolve('mock blob')),
  };

  const mockConfig = {
    blob: true,
    text: false,
  };

  const mockComputeDataErrorFn = jest.fn(() => Promise.resolve('mock error'));

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error when status starts with ERROR', async () => {
    mockResponse.status = 'ERROR_500';

    await expect(buildResponse(mockResponse, mockConfig, mockComputeDataErrorFn)).rejects.toEqual('mock error');
    expect(mockComputeDataErrorFn).toHaveBeenCalledWith(mockResponse);
  });

  it('should throw an error when status starts with WARNING', async () => {
    mockResponse.status = 'WARNING_400';

    await expect(buildResponse(mockResponse, mockConfig, mockComputeDataErrorFn)).rejects.toEqual('mock error');
    expect(mockComputeDataErrorFn).toHaveBeenCalledWith(mockResponse);
  });

  it('should return a blob when config.blob is true', async () => {
    mockResponse.status = 'SUCCESS_200';

    const result = await buildResponse(mockResponse, mockConfig, mockComputeDataErrorFn);

    expect(result).toEqual('mock blob');
    expect(mockResponse.blob).toHaveBeenCalled();
  });

  it('should return text when config.text is true', async () => {
    mockResponse.status = 'SUCCESS_200';
    mockConfig.blob = false;
    mockConfig.text = true;

    const result = await buildResponse(mockResponse, mockConfig, mockComputeDataErrorFn);

    expect(result).toEqual('mock text');
    expect(mockResponse.text).toHaveBeenCalled();
  });

  it('should return JSON data when neither config.blob nor config.text is true', async () => {
    mockResponse.status = 'SUCCESS_200';
    mockConfig.blob = false;
    mockConfig.text = false;

    const result = await buildResponse(mockResponse, mockConfig, mockComputeDataErrorFn);

    expect(result).toEqual({ data: 'mock data', statusHttp: 'SUCCESS_200' });
    expect(mockResponse.json).toHaveBeenCalled();
  });

  it('should return statusHttp when status does not match any case', async () => {
    mockResponse.status = 'UNKNOWN_STATUS';

    const result = await buildResponse(mockResponse, mockConfig, mockComputeDataErrorFn);

    expect(result).toEqual({ statusHttp: 'UNKNOWN_STATUS' });
  });
});