import { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FilmList from '../../components/film-list/film-list';
import GenreFilter from '../../components/genre-filter/genre-filter';
import UserBlock from '../../components/user-block/user-block';
import { ReducerType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  changePromoFavoriteStatus,
  fetchFavoriteFilms,
  setFavoriteCount
} from '../../store/action';
import AuthStatus from '../../types/auth-status.enum';

export default function Main() {
  const promo = useAppSelector((state) => state[ReducerType.Main].promo);
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(
    (state) => state.userReducer.authorizationStatus
  );
  const favoriteCount = useAppSelector(
    (state) => state.mainReducer.favoriteCount
  );

  const favoriteAddHandler = () => {
    dispatch(
      changePromoFavoriteStatus({
        filmId: promo?.id || NaN,
        status: promo?.isFavorite ? 0 : 1,
      })
    );
    if (promo?.isFavorite) {
      dispatch(setFavoriteCount(favoriteCount - 1));
    } else {
      dispatch(setFavoriteCount(favoriteCount + 1));
    }
  };

  useEffect(() => {
    if (authStatus === AuthStatus.Authorized) {
      dispatch(fetchFavoriteFilms());
    }
  }, [authStatus, dispatch]);

  return (
    <Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promo?.backgroundImage} alt={promo?.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <div className="logo">
            <a className="logo__link" href="/">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <UserBlock />
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img
                src={promo?.posterImage}
                alt={promo?.name}
                width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promo?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promo?.genre}</span>
                <span className="film-card__year">{promo?.released}</span>
              </p>

              <div className="film-card__buttons">
                <Link
                  to={`/player/${promo?.id}`}
                  className="btn btn--play film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>

                {authStatus === AuthStatus.Authorized && (
                  <button
                    className="btn btn--list film-card__button"
                    onClick={favoriteAddHandler}
                  >
                    {promo?.isFavorite ? (
                      <span>✓</span>
                    ) : (
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add"></use>
                      </svg>
                    )}
                    <span>My list</span>
                    <span className="film-card__count">{favoriteCount}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenreFilter />
          <FilmList />
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light" href="/">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </Fragment>
  );
}
