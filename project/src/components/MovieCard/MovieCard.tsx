type MovieCardProps = {
  posterSrc: string,
  posterAlt: string,
  movieLink: string,
  name: string,
}

export default function MovieCard(props: MovieCardProps) {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img
          src={props.posterSrc}
          alt={props.posterAlt}
          width="280"
          height="175"
        />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href={props.movieLink}>
          {props.name}
        </a>
      </h3>
    </article>
  );
}
