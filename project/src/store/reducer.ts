import { combineReducers, createReducer } from '@reduxjs/toolkit';
import { DEFAULT_GENRE } from '../const';
import getFilmsByGenre from '../helpers/get-films-by-genre';
import { AppState } from '../types/app-state.type';
import AuthStatus from '../types/auth-status.enum';
import { changeGenre, fillFilms, setAuthStatus, resetShownFilms, setDataIsLoading, showMoreFilms, setError, setAvatar, loadFilm, loadComments, loadSimilar, loadPromo } from './action';
import { userReducer } from './auth-reducer';
import { filmReducer } from './film-reducer';
import { mainReducer } from './main-reducer';


const rootReducer = combineReducers({
  filmReducer: filmReducer.reducer,
  mainReducer: mainReducer.reducer,
  userReducer: userReducer.reducer
})

export { rootReducer };
