import Main from '../../pages/main/main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from '../../pages/sign-in/sign-in';
import MyList from '../../pages/my-list/my-list';
import Film from '../../pages/film/film';
import AddReview from '../../pages/add-review/add-review';
import VideoPlayer from '../../pages/video-player/video-player';
import { NotFound } from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import { ReviewType } from '../../types/review.type';
import {useAppSelector } from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

type AppProps = {
  reviews: ReviewType[];
}

function App(props: AppProps): JSX.Element {
  const isLoading = useAppSelector((state) => state.dataIsLoading);
  const films = useAppSelector((state) => state.films);

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
            <PrivateRoute>
              <MyList />
            </PrivateRoute>
          }
        >
        </Route>
        <Route path="/films/:id">
          <Route index element={<Film film={films[0]} reviews={props.reviews}></Film>}></Route>
          <Route path="review" element={<AddReview mockFilm={films[0]}></AddReview>}></Route>
        </Route>

        <Route path="/player/:id" element={<VideoPlayer mockFilms={films}></VideoPlayer>}></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
