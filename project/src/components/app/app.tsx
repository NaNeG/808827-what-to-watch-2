import { Route, Routes } from 'react-router-dom';
import { ReducerType } from '../../const';
import { useAppSelector } from '../../hooks';
import AddReview from '../../pages/add-review/add-review';
import Film from '../../pages/film/film';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import Main from '../../pages/main/main';
import MyList from '../../pages/my-list/my-list';
import { NotFound } from '../../pages/not-found/not-found';
import SignIn from '../../pages/sign-in/sign-in';
import VideoPlayer from '../../pages/video-player/video-player';
import PrivateRoute from '../private-route/private-route';

function App(): JSX.Element {
  const isLoading = useAppSelector((state) => state[ReducerType.Main].dataIsLoading);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
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
      >
      </Route>
      <Route path="/films/:id">
        <Route index element={<Film />}></Route>
        <Route path="review" element={<AddReview></AddReview>}></Route>
      </Route>

      <Route
        path="/player/:id"
        element={<VideoPlayer></VideoPlayer>}
      >
      </Route>
      <Route path="*" element={<NotFound></NotFound>}></Route>
    </Routes>
  );
}

export default App;
