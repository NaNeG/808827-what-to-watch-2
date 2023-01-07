import {Fragment} from 'react';
import convertRating from '../../helpers/convert-score';

type OverviewProps = {
  rating: number,
  scoresCount: number,
  description: string,
  director: string,
  starring: string[]
}

export default function Overview(props: OverviewProps) {
  return (
    <Fragment>
      <div className="film-rating">
        <div className="film-rating__score">{props.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{convertRating(props.rating)}</span>
          <span className="film-rating__count">{props.scoresCount}</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{props.description}</p>

        <p className="film-card__director"><strong>Director: {props.director}</strong></p>

        <p className="film-card__starring">
          <strong>Starring: {props.starring.join(', ')} and other</strong>
        </p>
      </div>
    </Fragment>
  );
}
