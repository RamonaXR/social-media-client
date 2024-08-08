import { logout } from './logout';
import { remove } from '../../storage';

jest.mock('../../storage', () => ({
  remove: jest.fn(),
}));

describe('logout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('The logout function clears the token from browser storage', () => {
    logout();

    expect(remove).toHaveBeenCalledWith('token');
  });
});
