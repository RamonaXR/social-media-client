import { apiPath } from '../constants';
import { headers } from '../headers';
import { login } from './login';
import { save } from '../../storage';

jest.mock('../../storage/', () => ({
  save: jest.fn(),
}));

jest.mock('../headers', () => ({
  headers: jest.fn(() => ({})),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ accessToken: 'accesstoken', profileData: 'resolved data' }),
  }),
);

describe('Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('The login function stores a token when provided with valid credentials', async () => {
    const email = 'test@noroff.com';
    const password = 'testpassword';

    const profile = await login(email, password);

    expect(fetch).toHaveBeenCalledWith(`${apiPath}/social/auth/login`, {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: headers('application/json'),
    });
    expect(save).toHaveBeenCalledWith('token', 'accesstoken');
    expect(save).toHaveBeenCalledWith('profile', { profileData: 'resolved data' });
    expect(profile).toEqual({ profileData: 'resolved data' });
  });
});
