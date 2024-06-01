import React from 'react';
import classes from './ReviewCardCmp.module.css';
import UserProfileHeader from '../userProfileHeaderCmp';
import Icon from '../../utils/IconSection';
import Text from '../../utils/TextSection';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function ReviewCard({ username, profession, profileImg, reviewBody, activeStars }) {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <Icon
      key={index}
      color={index < activeStars ? classes.activeStar : classes.inactiveStar}
      iconContainerStyle={index < activeStars ? classes.activeStar : classes.inactiveStar}
      icon={faStar}
    />
  ));
  return (
    <div className={classes.review_card_main_container}>
      <UserProfileHeader
        hideFollow={true}
        username={username}
        profession={profession}
        profileImg={profileImg}
      />
      <div className={classes.review_card_stars_container}>{stars}</div>
      <Text textStyle={classes.review_card_content_container} p12={reviewBody} />
    </div>
  );
}

export default ReviewCard;
