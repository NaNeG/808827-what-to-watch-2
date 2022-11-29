import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { postComment } from '../../store/action';

export default function ReviewForm() {
  const id = Number(useParams().id).toString();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [starRating, setStarRating] = useState('10');
  const [reviewContent, setReviewContent] = useState('');

  const reviewTextChangeHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewContent(evt.target.value);
  };
  const starRatingChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setStarRating(evt.target.value);
  };

  const reviewSubmitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(postComment({filmId: id, rating: parseInt(starRating, 10), comment: reviewContent}));
    navigate(`/films/${id}`);
  };

  return (
    <form action="#" className="add-review__form" onSubmit={reviewSubmitHandler}>
      <div className="rating" >
        <div className="rating__stars">
          {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((rating) => (
            <Fragment key={rating}>
              <input
                className="rating__input"
                id={`star-${rating}`}
                type="radio"
                name="rating"
                value={rating.toString()}
                onChange={starRatingChangeHandler}
              />
              <label className="rating__label" htmlFor={`star-${rating}`}>
                Rating {rating}
              </label>
            </Fragment>
          ))}
        </div>
      </div>
      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder={'Review Text'}
          value={reviewContent}
          onChange={reviewTextChangeHandler}
        >
        </textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">
            Post
          </button>
        </div>
      </div>
    </form>
  );
}
