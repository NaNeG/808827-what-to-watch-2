import { render } from '@testing-library/react';
import App from './app';
import reviews from '../../mocks/reviews';
import { Provider } from 'react-redux';
import { store } from '../../store';
import ErrorMessage from '../error-message/error-message';

test('Renders app-component', () => {
  render(
    <Provider store={store}>
      <ErrorMessage/>
      <App reviews={reviews} />
    </Provider>
  );
});
