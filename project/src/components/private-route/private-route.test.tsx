import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AuthStatus from '../../types/auth-status.enum';
import PrivateRoute from './private-route';

const mockStore = configureMockStore();
const initialEntries = ['/'];

describe('Component: PrivateRoute', () => {
  beforeEach(() => {
    initialEntries.push('/private');
  });

  it('should render component for public route, when user not authorized', () => {
    const store = mockStore({
      userReducer: { authorizationStatus: AuthStatus.NoAuth, avatar: null },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route
              path={'/login'}
              element={<h1>Public Route</h1>}
            />
            <Route
              path='/private'
              element={
                <PrivateRoute >
                  <h1>Private Route</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Public Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const store = mockStore({
      userReducer: { authorizationStatus: AuthStatus.Authorized, avatar: null },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route
              path={'/login'}
              element={<h1>Public Route</h1>}
            />
            <Route
              path='/private'
              element={
                <PrivateRoute >
                  <h1>Private Route</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
  });
});
