import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import ReviewForm from '../../components/review-form/review-form';
import UserBlock from '../../components/user-block/user-block';
import { ReducerType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilmByID, setDataIsLoading } from '../../store/action';
import { mainReducer } from '../../store/main-reducer';
import AuthStatus from '../../types/auth-status.enum';

export default function AddReview() {
  const id = Number(useParams().id);

  const film = useAppSelector((state) => state[ReducerType.Film].film);
  const authStatus = useAppSelector(
    (state) => state.userReducer.authorizationStatus
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(setDataIsLoading(true));
    dispatch(fetchFilmByID(id.toString()));
    // dispatch(setDataIsLoading(false));
  }, [id, dispatch]);

  if (authStatus === AuthStatus.NoAuth) {
    return <Navigate to={'/'} />;
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film?.backgroundImage} alt={film?.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <a href="main.html" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${id}`} className="breadcrumbs__link">
                  {film?.name}
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={`/films/${id}/review`} className="breadcrumbs__link">
                  Add review
                </Link>
              </li>
            </ul>
          </nav>

          <UserBlock />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img
            src={film?.posterImage}
            alt={`${film?.name} poster`}
            width="218"
            height="327"
          />
        </div>
      </div>

      <div className="add-review">
        <ReviewForm />
      </div>
    </section>
  );
}
