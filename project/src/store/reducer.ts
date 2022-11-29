import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './auth-reducer';
import { filmReducer } from './film-reducer';
import { mainReducer } from './main-reducer';


const rootReducer = combineReducers({
  filmReducer: filmReducer.reducer,
  mainReducer: mainReducer.reducer,
  userReducer: userReducer.reducer
});

export { rootReducer };
