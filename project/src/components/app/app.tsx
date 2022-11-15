import Main from '../../pages/main/main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from '../../pages/sign-in/sign-in';
import MyList from '../../pages/my-list/my-list';
import Film from '../../pages/film/film';
import AddReview from '../../pages/add-review/add-review';
import VideoPlayer from '../../pages/video-player/video-player';
import { NotFound } from '../../pages/not-found/not-found';
import AuthStatus from '../../types/auth-status.enum';
import PrivateRoute from '../private-route/private-route';
import { FilmType } from '../../types/film.type';
import { ReviewType } from '../../types/review.type';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilms, fillFilms } from '../../store/action';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

type AppProps = {
  mockFilms: FilmType[];
  reviews: ReviewType[];
}

function App(props: AppProps): JSX.Element {
  const isLoading = useAppSelector(state => state.dataIsLoading);

  if (isLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Main
              previewMovieTitle="The Grand Budapest Hotel"
              previewMovieGenre="Drama"
              previewMovieCreatedDate={2014}
            />
          }
        >
        </Route>
        <Route path="/login" element={<SignIn></SignIn>}></Route>
        <Route
          path="/mylist"
          element={
            <PrivateRoute authStatus={AuthStatus.Authorized}>
              <MyList />
            </PrivateRoute>
          }
        >
        </Route>
        <Route path="/films/:id">
          <Route index element={<Film film={props.mockFilms[0]} reviews={props.reviews}></Film>}></Route>
          <Route path="review" element={<AddReview mockFilm={props.mockFilms[0]}></AddReview>}></Route>
        </Route>

        <Route path="/player/:id" element={<VideoPlayer mockFilms={props.mockFilms}></VideoPlayer>}></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
