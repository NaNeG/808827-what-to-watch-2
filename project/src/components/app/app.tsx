import Main from '../../pages/main/main';

function App(): JSX.Element {
  return (
    <Main
      previewMovieTitle="The Grand Budapest Hotel"
      previewMovieGenre="Drama"
      previewMovieCreatedDate={2014}
    />
  );
}

export default App;
