import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { postComment } from '../../store/action';

export default function ReviewForm() {
  const id = Number(useParams().id).toString();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [starRating, setStarRating] = useState(NaN);
  const [reviewContent, setReviewContent] = useState('');
  const [isSubmitDisabledByText, setIsSubmitDisabledByText] = useState(true);
  const [isSubmitDisabledByRating, setIsSubmitDisabledByRating] = useState(true);

  const reviewTextChangeHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewContent(evt.target.value);
    if (evt.target.value.length >= 50 && evt.target.value.length <= 400) {
      setIsSubmitDisabledByText(false);
    } else {
      setIsSubmitDisabledByText(true);
    }
  };
  const starRatingChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setStarRating(parseInt(evt.target.value, 10));
    if (evt.target.value) {
      setIsSubmitDisabledByRating(false);
    } else {
      setIsSubmitDisabledByRating(true);
    }
  };

  const reviewSubmitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(postComment({filmId: id, rating: starRating, comment: reviewContent})); // todo: navigate async
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
          <button className="add-review__btn" type="submit" disabled={isSubmitDisabledByText || isSubmitDisabledByRating}>
            Post
          </button>
        </div>
      </div>
    </form>
  );
}
