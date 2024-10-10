import React, { useState, useEffect } from 'react';
import classes from './userProfileHeaderCmp.module.css';
import { PlaneButton } from '../utils/ButtonSection';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowRightFromBracket,
  faExclamationCircle,
  faGear,
  faUserLock,
} from '@fortawesome/free-solid-svg-icons';
import CustomUserProfilePreview from './custom/CustomUserProfilePreviewCmp';
import { useRouteLoaderData } from 'react-router-dom';
import { getAuthToken } from '../utils/authSection';
import { PORT } from '../http_requests/authentication';
import axios from 'axios';

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
  const followingsArray = fetchData?.data?.followings;
  const followersId = followingsArray.map((data) => data.followerId);
  const currentUserUsername = fetchData?.data.username;
  const currentUserId = fetchData?.data.id;

  const isFollower = followersId.includes(currentUserId);

  useEffect(() => {
    setIsFollowing(isFollower);
  }, [isFollower]);

  const handleFollowToggle = async () => {
    const token = getAuthToken();

    if (!token) {
      console.error('No token available');
      return null;
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    try {
      if (!isFollowing) {
        await axios.post(`${PORT}api/v1/followers/follow/${userId}`, {}, { headers });
        console.log('Followed!!');
        setIsFollowing(true);
      } else {
        await axios.post(`${PORT}api/v1/followers/unfollow/${userId}`, {}, { headers });
        setIsFollowing(false);
        console.log('Unfollowed!!');
      }
    } catch (error) {
      console.error('Error fetching data:', error.response.data);
      return null;
    }
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

  const CURRENT_USER_PROFILE = [
    {
      id: username,
      engagement: [
        { id: '1.1', title: 'Followers', total: followersCount, icon: null },
        { id: '1.2', title: 'Followings', total: followingCount, icon: null },
        { id: '1.3', title: 'Star', total: starCount, icon: faStar },
      ],
      buttons: [
        { id: '1.4', title: 'Settings', icon: faGear },
        { id: '1.5', title: 'Logout', icon: faArrowRightFromBracket },
      ],
    },
  ];

  return (
    <div className={classes.header_profile_container}>
      <CustomUserProfilePreview
        METADATA={currentUserUsername === username ? CURRENT_USER_PROFILE : GUEST_USER_PROFILE}
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
          label12={isFollowing ? 'Following' : 'Follow'}
        />
      )}
    </div>
  );
}

export default UserProfileHeader;
