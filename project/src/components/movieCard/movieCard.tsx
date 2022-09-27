type MovieCardProps = {
  imgSrc: string,
  imgAlt: string,
  movieLink: string,
  movieName: string,
}

export default function MovieCard(props: MovieCardProps) {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img
          src={props.imgSrc}
          alt={props.imgAlt}
          width="280"
          height="175"
        />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href={props.movieLink}>
          {props.movieName}
        </a>
      </h3>
    </article>
  );
}
