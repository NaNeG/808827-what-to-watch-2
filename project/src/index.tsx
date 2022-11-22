import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import ErrorMessage from './components/error-message/error-message';
import reviews from './mocks/reviews';
import { store } from './store';
import { checkAuth, fetchFilms } from './store/action';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(checkAuth());
store.dispatch(fetchFilms());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage/>
      <App reviews={reviews} />
    </Provider>
  </React.StrictMode>
);
