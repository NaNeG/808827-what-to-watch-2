import { UserState } from '../../types/app-state.type';
import AuthStatus from '../../types/auth-status.enum';
import { checkAuth, login, logout } from '../action';
import { userReducer } from './auth-reducer';

describe('Auth-reducer', () => {
  let state: UserState;

  beforeEach(() => {
    state = {
      authorizationStatus: AuthStatus.NoAuth,
      avatar: null,
    };
  });

  describe('checkAuth test', () => {
    it('should update authorizationStatus to "AUTH" if checkAuth fulfilled', () => {
      expect(
        userReducer.reducer(state, {
          type: checkAuth.fulfilled.type,
          payload: {
            avatarUrl: 'avatarUrl',
            email: 'email',
            id: 1,
            name: 'name',
            token: 'token',
          },
        })
      ).toMatchObject({
        authorizationStatus: AuthStatus.Authorized,
        avatar: 'avatarUrl',
      });
    });

    it('should update authorizationStatus to "NO_AUTH" if checkAuth rejected', () => {
      expect(
        userReducer.reducer(state, { type: checkAuth.rejected.type })
      ).toMatchObject({ authorizationStatus: AuthStatus.NoAuth });
    });
  });

  describe('login test', () => {
    it('should update authorizationStatus to "AUTH" if login fulfilled', () => {
      expect(
        userReducer.reducer(state, { type: login.fulfilled.type, payload: {
          avatarUrl: 'avatarUrl',
          email: 'email',
          id: 1,
          name: 'name',
          token: 'token',
        }, })
      ).toMatchObject({ authorizationStatus: AuthStatus.Authorized });
    });

    it('should update authorizationStatus to "NO_AUTH" if login rejected', () => {
      expect(
        userReducer.reducer(state, { type: login.rejected.type })
      ).toMatchObject({ authorizationStatus: AuthStatus.NoAuth });
    });
  });

  describe('logout test', () => {
    it('should update authorizationStatus to "NO_AUTH" if logout fulfilled', () => {
      expect(
        userReducer.reducer(state, { type: logout.fulfilled.type })
      ).toMatchObject({ authorizationStatus: AuthStatus.NoAuth });
    });
  });
});
