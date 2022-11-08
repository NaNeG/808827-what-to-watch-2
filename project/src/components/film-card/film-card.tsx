import { Link } from 'react-router-dom';
import Videoplayer from '../videoplayer/videoplayer';

type FilmCardProps = {
  id: number;
  posterSrc: string;
  posterAlt?: string;
  name: string;
  isHighlighted: boolean;
  videoLink: string;
  onFilmCardHover: (id: number) => void;
};

export default function FilmCard(props: FilmCardProps) {
  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={() => props.onFilmCardHover(props.id)}
      onMouseLeave={() => props.onFilmCardHover(NaN)}
    >
      <div className="small-film-card__image">
        {props.isHighlighted ? (
          <Videoplayer poster={props.posterSrc} videoLink={props.videoLink}/>
        ) : (
          <img
            src={props.posterSrc}
            alt={props.posterAlt}
            width="280"
            height="175"
          />
        )}
      </div>
      <h3 className="small-film-card__title">
        <Link to={`/films/${props.id}`} className="small-film-card__link">
          {props.name}
        </Link>
      </h3>
    </article>
  );
}
