import { Link } from 'react-router-dom';

type FilmCardProps = {
  id: number;
  posterSrc: string;
  posterAlt: string;
  name: string;
  isHighlighted: boolean;
  onFilmCardHover: (id: number) => void;
  children: React.ReactNode
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
          <img
            src={props.posterSrc}
            alt={props.posterAlt}
            width="280"
            height="175"
          />
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
        <Link to={'/films/123'} className="small-film-card__link">
          {props.name}
        </Link>
      </h3>
    </article>
  );
}
