import {store} from '../store';
import {setError} from '../store/action';
import {clearError} from '../store/action';

export const processErrorHandle = (message: string): void => {
  store.dispatch(setError(message));
  store.dispatch(clearError());
};
