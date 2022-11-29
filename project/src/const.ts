export const DEFAULT_GENRE = 'All genres';
export const TIMEOUT_SHOW_ERROR = 2000;

export enum APIRoute {
  Films = '/films',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Similar = '/similar',
  Promo = '/promo',
}

export enum ReducerType {
  User = 'userReducer',
  Main = 'mainReducer',
  Film = 'filmReducer'
}

