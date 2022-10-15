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

type AppProps = {
  mockFilms: FilmType[]
}

function App(props: AppProps): JSX.Element {
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
              mockFilms={props.mockFilms}
            />
          }
        >
        </Route>
        <Route path="/login" element={<SignIn></SignIn>}></Route>
        <Route
          path="/mylist"
          element={
            <PrivateRoute authStatus={AuthStatus.Authorized}>
              <MyList mockFilms={props.mockFilms}/>
            </PrivateRoute>
          }
        >
        </Route>
        <Route path="/films/:id">
          <Route index element={<Film mockFilms={props.mockFilms}></Film>}></Route>
          <Route path="review" element={<AddReview mockFilm={props.mockFilms[0]}></AddReview>}></Route>
        </Route>

        <Route path="/player/:id" element={<VideoPlayer mockFilms={props.mockFilms}></VideoPlayer>}></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
