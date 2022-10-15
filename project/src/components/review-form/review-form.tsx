import { ChangeEvent, Fragment, useState } from 'react';

export default function ReviewForm() {
  const [starRating, setStarRating] = useState('10');
  const [reviewContent, setReviewContent] = useState('');

  const reviewTextChangeHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewContent(evt.target.value);
  };
  const starRatingChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setStarRating(evt.target.value);
  };
  // const reviewSubmitHandler = (evt) => {
  //   const data = {starRating: starRating, reviewContent: reviewContent};
  // };

  return (
    <form action="#" className="add-review__form">
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
