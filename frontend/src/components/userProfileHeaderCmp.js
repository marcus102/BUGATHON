import React, { useState } from 'react';
import classes from './userProfileHeaderCmp.module.css';
import { PlaneButton } from '../utils/ButtonSection';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faExclamationCircle, faUserLock } from '@fortawesome/free-solid-svg-icons';
import CustomUserProfilePreview from './custom/CustomUserProfilePreviewCmp';
import { useRouteLoaderData } from 'react-router-dom';

function UserProfileHeader({
  firstName,
  lastName,
  username,
  userId,
  profession,
  profileImg,
  hideFollow,
  followersCount,
  followingCount,
  starCount,
  role,
}) {
  const [isFollowing, setIsFollowing] = useState(false);
  const { fetchData } = useRouteLoaderData('root');
  const currentUserUsername = fetchData?.data.username;
  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  const GUEST_USER_PROFILE = [
    {
      id: username,
      engagement: [
        { id: '1.1', title: 'Followers', total: followersCount, icon: null },
        { id: '1.2', title: 'Followings', total: followingCount, icon: null },
        { id: '1.3', title: 'Star', total: starCount, icon: faStar },
      ],
      buttons: [
        { id: '1.4', title: 'Report This Account', icon: faExclamationCircle },
        { id: '1.5', title: 'Block This Account', icon: faUserLock },
      ],
    },
  ];

  return (
    <div className={classes.header_profile_container}>
      <CustomUserProfilePreview
        METADATA={GUEST_USER_PROFILE}
        username={username}
        hideEdit={true}
        profileImg={profileImg}
        profession={profession}
        userRole={role}
        userId={userId}
        userFullName={`${firstName} ${lastName}`}
        hideFollow={currentUserUsername === username ? true : false}
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
