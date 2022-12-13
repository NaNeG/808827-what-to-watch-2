import { combineReducers } from '@reduxjs/toolkit';
import { ReducerType } from '../const';
import { userReducer } from './auth-reducer';
import { filmReducer } from './film-reducer';
import { mainReducer } from './main-reducer';


const rootReducer = combineReducers({
  [ReducerType.Film]: filmReducer.reducer,
  [ReducerType.Main]: mainReducer.reducer,
  [ReducerType.User]: userReducer.reducer
});

export { rootReducer };
