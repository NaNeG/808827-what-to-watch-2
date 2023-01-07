import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilmByID } from '../../store/action';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import LoadingScreen from '../loading-screen/loading-screen';

dayjs.extend(duration);

export default function VideoPlayer() {
  const filmId = Number(useParams().id);
  const film = useAppSelector((state) => state.filmReducer.film);
  const isFilmLoadingStatus = useAppSelector((state) => state.filmReducer.isFilmLoading);

  const playerRef = useRef<HTMLVideoElement | null>(null);
  const playerDivRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();

  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(film ? film?.runTime * 60 : 0);

  const clickPlayButtonHandler = () => {
    setIsPlaying(!isPlaying);
  };

  const fullscreenHandler = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      playerDivRef.current?.requestFullscreen();
    }
  };

  useEffect(() => {
    if (isPlaying) {
      setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }
  });

  useEffect(() => {
    if (playerRef.current !== null) {
      if (isPlaying) {
        playerRef.current.play();
      } else {
        playerRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    dispatch(fetchFilmByID(filmId.toString()));
  }, [filmId, dispatch]);

  useEffect(() => {
    if (film)
    {setTimeLeft(film?.runTime * 60);}
  }, [film]);

  if (isFilmLoadingStatus) {
    return <LoadingScreen />;
  }

  return (
    <div className="player" ref={playerDivRef}>
      <video
        src={film?.videoLink}
        className="player__video"
        poster={film?.posterImage}
        ref={playerRef}
      >
      </video>

      <Link to={`/films/${film?.id}`} type="button" className="player__exit">
        Exit
      </Link>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress
              className="player__progress"
              value="0"
              max="100"
            >
            </progress>
            <div className="player__toggler" style={{ left: `${film ? (film?.runTime * 60 - timeLeft) / (film?.runTime * 60) * 100 : 0}%` }}>
              Toggler
            </div>
          </div>
          <div className="player__time-value">
            {' '}
            {dayjs
              .duration(timeLeft || 0, 'seconds')
              .format(`${timeLeft || 0 > 3600 ? 'H[:]m[:]ss' : 'm[:]ss'}`)}
          </div>
        </div>

        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            data-testid='player-play'
            onClick={clickPlayButtonHandler}
          >
            {isPlaying ? (
              <>
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"></use>
                </svg>
                <span>Pause</span>
              </>
            ) : (
              <>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </>
            )}
          </button>
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen" onClick={fullscreenHandler}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}
