import { useState } from 'react';
import { FilmType } from '../../types/film.type';
import { ReviewType } from '../../types/review.type';
import { default as DetailsTab } from '../details/details';
import { default as OverviewTab } from '../overview/overview';
import ReviewsList from '../reviews-list/reviews-list';

type TabsProps = {
  film: FilmType;
  reviews: ReviewType[];
};

enum DescriptionTabs {
  Overview,
  Details,
  Reviews,
}

export default function Tabs(props: TabsProps) {
  const [selectedTab, setSelectedTab] = useState(DescriptionTabs.Overview);

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li
            className={`film-nav__item ${
              selectedTab === DescriptionTabs.Overview &&
              'film-nav__item--active'
            }`}
          >
            <a
              className="film-nav__link"
              onClick={(event) => {
                setSelectedTab(DescriptionTabs.Overview);
              }}
            >
              Overview
            </a>
          </li>
          <li
            className={`film-nav__item ${
              selectedTab === DescriptionTabs.Details &&
              'film-nav__item--active'
            }`}
          >
            <a
              className="film-nav__link"
              onClick={(event) => {
                setSelectedTab(DescriptionTabs.Details);
              }}
            >
              Details
            </a>
          </li>
          <li
            className={`film-nav__item ${
              selectedTab === DescriptionTabs.Reviews &&
              'film-nav__item--active'
            }`}
          >
            <a
              className="film-nav__link"
              onClick={(event) => {
                setSelectedTab(DescriptionTabs.Reviews);
              }}
            >
              Reviews
            </a>
          </li>
        </ul>
      </nav>

      {selectedTab === DescriptionTabs.Overview && (
        <OverviewTab
          rating={props.film.rating}
          scoresCount={props.film.scoresCount}
          description={props.film.description}
          director={props.film.director}
          starring={props.film.starring}
        />
      )}

      {selectedTab === DescriptionTabs.Details && (
        <DetailsTab
          director={props.film.director}
          starring={props.film.starring}
          runTime={props.film.runTime}
          genre={props.film.genre}
          released={props.film.released}
        />
      )}

      {selectedTab === DescriptionTabs.Reviews && (
        <ReviewsList reviews={props.reviews} />
      )}
    </div>
  );
}
