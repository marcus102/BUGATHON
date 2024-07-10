import React from 'react';
import classes from './relatedReviewsCmp.module.css';
import Text from '../../../utils/TextSection';
import { IconButton } from '../../../utils/ButtonSection';
import ToolTip from '../../../utils/toolTipSection';
import ReviewCard from '../../reviews/ReviewCardCmp';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

const DUMMY_REVIEWS = [
  {
    id: '1',
    username: '',
    profile: '',
    profession: '',
    active_stars: 4,
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis.',
  },
  {
    id: '2',
    username: '',
    profile: '',
    profession: '',
    active_stars: 2,
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis.',
  },
  {
    id: '3',
    username: '',
    profile: '',
    profession: '',
    active_stars: 5,
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis.',
  },
  {
    id: '4',
    username: '',
    profile: '',
    profession: '',
    active_stars: 2,
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis.',
  },
  {
    id: '5',
    username: '',
    profile: '',
    profession: '',
    active_stars: 3,
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis.',
  },

  {
    id: '6',
    username: '',
    profile: '',
    profession: '',
    active_stars: 3,
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis.',
  },

  {
    id: '7',
    username: '',
    profile: '',
    profession: '',
    active_stars: 2,
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis.',
  },

  {
    id: '8',
    username: '',
    profile: '',
    profession: '',
    active_stars: 4,
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis.',
  },
  {
    id: '9',
    username: '',
    profile: '',
    profession: '',
    active_stars: 1,
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis.',
  },
  {
    id: '10',
    username: '',
    profile: '',
    profession: '',
    active_stars: 4,
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis.',
  },
];

function RelatedReviews({ onClick }) {
  return (
    <div className={classes.expanded_card_reviews_main_container}>
      <div className={classes.expanded_card_reviews_header_container}>
        <Text h5={'Reviews'} />
        <ToolTip
          children={<IconButton icon={faArrowDown} onClick={onClick} />}
          tooltipMessage={'Skip To Next'}
        />
      </div>
      <hr className={classes.body_horizontal_line_container} />
      <div className={`${classes.review_container}`}>
        {DUMMY_REVIEWS.map((data) => (
          <ReviewCard key={data.id} activeStars={data.active_stars} reviewBody={data.review} />
        ))}
      </div>
    </div>
  );
}

export default RelatedReviews;
