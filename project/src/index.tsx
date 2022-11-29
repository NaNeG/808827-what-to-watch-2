import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import ErrorMessage from './components/error-message/error-message';
import { store } from './store';
import { checkAuth, fetchFilms, fetchPromoFilm } from './store/action';
import { userReducer } from './store/auth-reducer';
import { filmReducer } from './store/film-reducer';
import { mainReducer } from './store/main-reducer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(checkAuth());
console.log('ger');
store.dispatch(fetchFilms());
store.dispatch(fetchPromoFilm());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage/>
      <App />
    </Provider>
  </React.StrictMode>
);
