import manageConfig from '../manageConfig';

describe('manageConfig function', () => {
  const fetchAuthConfig = {
    headers: {
      Authorization: 'Bearer token',
    },
    otherOption: 'value',
  };

  it('returns the original fetchAuthConfig object if apiName is API_URL.BASE', () => {
    const result = manageConfig('base', fetchAuthConfig);
    expect(result).toEqual(fetchAuthConfig);
  });

  it('returns fetchAuthConfig without headers if apiName is not API_URL.BASE', () => {
    const result = manageConfig('github', fetchAuthConfig);
    expect(result).toEqual({ otherOption: 'value' });
  });
});
