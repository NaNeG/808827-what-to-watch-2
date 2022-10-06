import Main from '../../pages/Main/Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from '../../pages/SignIn/SignIn';
import MyList from '../../pages/MyList/MyList';
import Film from '../../pages/Film/Film';
import AddReview from '../../pages/AddReview/AddReview';
import VideoPlayer from '../../pages/VideoPlayer/VideoPlayer.tsx';
import { NotFound } from '../../pages/NotFound/NotFound';
import AuthStatus from '../../types/AuthStatus.enum';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

function App(): JSX.Element {
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
            <PrivateRoute authStatus={AuthStatus.NoAuth}>
              <MyList />
            </PrivateRoute>
          }
        >
        </Route>
        <Route path="/films/:id">
          <Route index element={<Film></Film>}></Route>
          <Route path="review" element={<AddReview></AddReview>}></Route>
        </Route>

        <Route path="/player/:id" element={<VideoPlayer></VideoPlayer>}></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
