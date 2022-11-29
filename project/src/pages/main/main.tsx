import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import FilmList from '../../components/film-list/film-list';
import GenreFilter from '../../components/genre-filter/genre-filter';
import UserBlock from '../../components/user-block/user-block';
import { ReducerType } from '../../const';
import { useAppSelector } from '../../hooks';

export default function Main() {
  const promo = useAppSelector(state => state[ReducerType.Main].promo);
  return (
    <Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img
            src={promo?.backgroundImage}
            alt={promo?.name}
          />
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

          <UserBlock/>


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
                <span className="film-card__genre">
                  {promo?.genre}
                </span>
                <span className="film-card__year">
                  {promo?.released}
                </span>
              </p>

              <div className="film-card__buttons">
                <Link
                  to={'/player/123'}
                  className="btn btn--play film-card__button"
                  type="button"
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenreFilter />
          <FilmList/>
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
