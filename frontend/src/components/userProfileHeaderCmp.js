import React, { useState } from 'react';
import classes from './userProfileHeaderCmp.module.css';
import { PlaneButton } from '../utils/ButtonSection';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faExclamationCircle, faUserLock } from '@fortawesome/free-solid-svg-icons';
import CustomUserProfilePreview from './custom/CustomUserProfilePreviewCmp';

// OTHER USERS PROFILE SECTION (POST OWNERS, ETC...)

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
      <CustomUserProfilePreview
        METADATA={DUMMY_GUEST_USER_PROFILE}
        username={username}
        hideFollow={false}
        hideEdit={true}
        profileMode={username}
        profileImg={profileImg}
        profession={profession}
      />
      {!hideFollow && (
        <PlaneButton
          unwrap={true}
          label12Style={classes.follow_label12_style}
          onClick={handleFollowToggle}
          label12={!isFollowing ? 'Follow' : 'Following'}
        />
      )}
    </div>
  );
}

export default UserProfileHeader;
