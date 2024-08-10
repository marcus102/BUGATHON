import React, { useState, useContext } from 'react';
import { ManagmentSystem } from '../store/AppGeneralManagmentSystem';
import classes from './userProfileHeaderCmp.module.css';
import { PlaneButton } from '../utils/ButtonSection';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faExclamationCircle, faUserLock } from '@fortawesome/free-solid-svg-icons';
import CustomUserProfilePreview from './custom/CustomUserProfilePreviewCmp';
import { DUMMY_USERS } from '../data/Database';
import { useRouteLoaderData } from 'react-router-dom';

// OTHER USERS PROFILE SECTION (POST OWNERS, ETC...)

function UserProfileHeader({ username, profession, profileImg, hideFollow }) {
  const [isFollowing, setIsFollowing] = useState(false);
  // const { fetchData } = useRouteLoaderData('root');
  // const currentUser = fetchData.data;

  // const profileImg = currentUser.image?.find(
  //   (targetImg) => targetImg.username === currentUser.username
  // );

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  const { currentProfileId } = useContext(ManagmentSystem);

  const currentUser =
    currentProfileId && DUMMY_USERS.find((user) => user.username === currentProfileId);

  const DUMMY_GUEST_USER_PROFILE = currentUser && [
    {
      id: currentUser.id,
      engagement: [
        { id: '1.1', title: 'Followers', total: currentUser.followersCount, icon: null },
        { id: '1.2', title: 'Followings', total: currentUser.followingCount, icon: null },
        { id: '1.3', title: 'Star', total: currentUser.starCount, icon: faStar },
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
        METADATA={DUMMY_GUEST_USER_PROFILE}
        username={username}
        hideEdit={true}
        profileImg={profileImg}
        profession={profession}
        userRole={currentUser?.role}
        userFullName={`${currentUser?.firstName} ${currentUser?.lastName}`}
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
