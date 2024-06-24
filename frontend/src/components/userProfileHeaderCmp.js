import React, { useState } from 'react';
import classes from './userProfileHeaderCmp.module.css';
import Text from '../utils/TextSection';
import { OutlinedButton } from '../utils/ButtonSection';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faExclamationCircle, faUserLock } from '@fortawesome/free-solid-svg-icons';
import CustomUserProfilePreview from './custom/CustomUserProfilePreviewCmp';

const DUMMY_GUEST_USER_PROFILE = [
  {
    id: '1',
    engagement: [
      { id: '1.1', title: 'Followers', total: '100K', icon: null },
      { id: '1.2', title: 'Followings', total: '30K', icon: null },
      { id: '1.3', title: 'Star', total: '10K', icon: faStar },
    ],
    buttons: [
      { id: '1.4', title: 'Report This Account', icon: faExclamationCircle },
      { id: '1.5', title: 'Block This Account', icon: faUserLock },
    ],
  },
];

function UserProfileHeader({ username, profession, profileImg, hideFollow }) {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className={classes.header_profile_container}>
      <div className={classes.profile_container}>
        <CustomUserProfilePreview
          METADATA={DUMMY_GUEST_USER_PROFILE}
          username={'marcus'}
          hideFollow={false}
          hideEdit={true}
        />
      </div>
      {!hideFollow && (
        <OutlinedButton
          buttonMainContainerStyle={classes.follow_button_container}
          buttonStyle={classes.follow_button}
          onClick={handleFollowToggle}
        >
          <Text
            label12Style={classes.follow_label12_style}
            label12={!isFollowing ? 'Follow' : 'Unfollow'}
          />
        </OutlinedButton>
      )}
    </div>
  );
}

export default UserProfileHeader;
