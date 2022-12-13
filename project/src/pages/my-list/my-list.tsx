import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import FilmCard from '../../components/film-card/film-card';
import UserBlock from '../../components/user-block/user-block';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoriteFilms } from '../../store/action';
import AuthStatus from '../../types/auth-status.enum';


export default function MyList() {
  const favoriteFilms = useAppSelector((state) => state.mainReducer.favoriteFilms);
  const authStatus = useAppSelector((state) => state.userReducer.authorizationStatus);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authStatus === AuthStatus.Authorized) {
      dispatch(fetchFavoriteFilms());
    }
  }, [authStatus, dispatch]);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={'/'} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">
          My list <span className="user-page__film-count">9</span>
        </h1>
        <UserBlock/>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          {favoriteFilms.map((film) => <FilmCard key={film.id} id={film.id} name={film.name} posterSrc={film.previewImage} videoLink={film.videoLink}/>)}
        </div>
      </section>

      <footer className="page-footer">
        <div className="logo">
          <Link to={'/'} className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}
