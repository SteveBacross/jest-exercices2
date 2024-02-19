import { STATUS_HTTP, STATUS_API, STATUS_HTTP_MESSAGES, setResponseError} from '../setResponseError';

describe('setResponseError function', () => {
  const responseWithWarning = {
    response: {
      status: STATUS_API.WARNING,
      anomaly: {
        label: 'Custom Warning',
        detail: 'Custom warning detail',
      },
    },
  };

  const responseWithError = {
    response: {
      status: STATUS_API.ERROR,
      anomaly: {
        label: 'Custom Error',
        detail: 'Custom error detail',
      },
    },
  };

  const responseWithUnknownStatus = {
    response: {
      status: 600,
    },
  };

  it('returns response with warning when status starts with STATUS_API.WARNING', () => {
    const result = setResponseError(responseWithWarning);
    expect(result).toEqual({
      ...responseWithWarning.response.anomaly,
      type: 'danger',
      iconName: 'alert',
    });
  });

  it('returns response with error when status starts with STATUS_API.ERROR', () => {
    const result = setResponseError(responseWithError);
    expect(result).toEqual(responseWithError.response.anomaly);
  });

  it('returns empty object when status is not in STATUS_API.WARNING or STATUS_API.ERROR', () => {
    const result = setResponseError(responseWithUnknownStatus);
    expect(result).toEqual({});
  });
});
