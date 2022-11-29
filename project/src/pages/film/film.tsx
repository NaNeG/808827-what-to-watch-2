import { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import SimilarFilms from '../../components/similar-films/similar-films';
import Tabs from '../../components/tabs/tabs';
import UserBlock from '../../components/user-block/user-block';
import { ReducerType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  fetchCommentsByID,
  fetchFilmByID,
  fetchSimilarByID,
  setDataIsLoading,
} from '../../store/action';
import { mainReducer } from '../../store/main-reducer';
import AuthStatus from '../../types/auth-status.enum';
import { NotFound } from '../not-found/not-found';

export default function Film() {
  const id = Number(useParams().id);

  const film = useAppSelector((state) => state[ReducerType.Film].film);
  const reviews = useAppSelector((state) => state[ReducerType.Film].comments);
  const similar = useAppSelector((state) => state[ReducerType.Film].similar);
  const authStatus = useAppSelector((state) => state[ReducerType.User].authorizationStatus);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(setDataIsLoading(true));
    dispatch(fetchFilmByID(id.toString()));
    dispatch(fetchSimilarByID(id.toString()));
    dispatch(fetchCommentsByID(id.toString()));
    // dispatch(setDataIsLoading(false));
  }, [id, dispatch]);

  if (!film) {
    return <NotFound />;
  }
  return (
    <Fragment>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <div className="logo">
              <Link to={'/'} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <UserBlock />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <Link
                  to={`/player/${film.id}`}
                  className="btn btn--play film-card__button"
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>
                <Link
                  to={'/mylist'}
                  className="btn btn--list film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </Link>
                {authStatus === AuthStatus.Authorized && (
                  <Link
                    to={`/films/${film.id}/review`}
                    className="btn film-card__button"
                  >
                    Add review
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img
                src={film.posterImage}
                alt={`${film.name} poster`}
                width="218"
                height="327"
              />
            </div>
            <Tabs film={film} reviews={reviews} />
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <SimilarFilms films={similar} currentFilm={film} />
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
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
