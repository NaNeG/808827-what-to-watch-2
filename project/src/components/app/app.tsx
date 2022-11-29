import Main from '../../pages/main/main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from '../../pages/sign-in/sign-in';
import MyList from '../../pages/my-list/my-list';
import Film from '../../pages/film/film';
import AddReview from '../../pages/add-review/add-review';
import VideoPlayer from '../../pages/video-player/video-player';
import { NotFound } from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { ReducerType } from '../../const';

function App(): JSX.Element {
  const isLoading = useAppSelector((state) => state[ReducerType.Main].dataIsLoading);
  const films = useAppSelector((state) => state[ReducerType.Main].films);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<SignIn></SignIn>}></Route>
        <Route
          path="/mylist"
          element={
            <PrivateRoute>
              <MyList />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/films/:id">
          <Route index element={<Film />}></Route>
          <Route path="review" element={<AddReview></AddReview>}></Route>
        </Route>

        <Route
          path="/player/:id"
          element={<VideoPlayer mockFilms={films}></VideoPlayer>}
        ></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
