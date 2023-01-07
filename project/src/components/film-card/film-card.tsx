import { useState } from 'react';
import { Link } from 'react-router-dom';
import Videoplayer from '../videoplayer/videoplayer';

type FilmCardProps = {
  id: number;
  posterSrc: string;
  posterAlt?: string;
  name: string;
  videoLink: string;
};

export default function FilmCard(props: FilmCardProps) {
  const [isHighlighted, setIsHighlighted] = useState(false);
  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={() => setIsHighlighted(true)}
      onMouseLeave={() => setIsHighlighted(false)}
      data-testid='film-card'
    >
      <div className="small-film-card__image">
        {isHighlighted ? (
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
        <Link to={`/films/${props.id}`} className="small-film-card__link" data-testid='film-link'>
          {props.name}
        </Link>
      </h3>
    </article>
  );
}
