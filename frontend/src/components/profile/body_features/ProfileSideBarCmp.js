import React, { useContext } from 'react';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import classes from './ProfileSideBarCmp.module.css';
import { Image } from '../../../utils/MediaSection';
import { IconTextButton } from '../../../utils/ButtonSection';
import { faArrowPointer } from '@fortawesome/free-solid-svg-icons';
import { HorizontalScrollView, VerticalScrollView } from '../../../utils/ScrollViewsSection';
import defaultProfile from '../../../assets/images/general_profile.svg';
import FileUpload from '../../../utils/fileUploadManagerSection';
import { useRouteLoaderData, useNavigate } from 'react-router-dom';
import { createProfile, editProfile } from '../../../http_requests/imageUploadHttp';
import axios from 'axios';
import { getAuthToken } from '../../../utils/authSection';
import { PORT } from '../../../http_requests/authentication';

const SIDE_BAR_DATA = [
  {
    id: 'General',
    icon_: faArrowPointer,
    is_my_profile: null,
    isColored: false,
    allowed_to: 'all',
  },
  {
    id: 'Analytics',
    icon_: faArrowPointer,
    is_my_profile: null,
    isColored: false,
    allowed_to: 'all',
  },
  {
    id: 'Ranking',
    icon_: faArrowPointer,
    is_my_profile: null,
    isColored: false,
    allowed_to: 'all',
  },
  {
    id: 'Bug Reports',
    icon_: faArrowPointer,
    is_my_profile: null,
    isColored: false,
    allowed_to: 'all',
  },
  {
    id: 'Bug Fixes',
    icon_: faArrowPointer,
    is_my_profile: null,
    isColored: false,
    allowed_to: 'all',
  },
  {
    id: 'Reusable Codes',
    icon_: faArrowPointer,
    is_my_profile: null,
    isColored: false,
    allowed_to: 'all',
  },
  {
    id: 'Blog Posts',
    icon_: faArrowPointer,
    is_my_profile: null,
    isColored: false,
    allowed_to: 'all',
  },
  {
    id: 'Admin Dashboard',
    icon_: faArrowPointer,
    is_my_profile: null,
    isColored: false,
    allowed_to: 'admin',
  },
  {
    id: 'Delete Account',
    icon_: faArrowPointer,
    is_my_profile: true,
    isColored: true,
    allowed_to: [],
  },
  { id: 'Logout', icon_: null, is_my_profile: true, isColored: true, allowed_to: 'all' },
  { id: 'Settings', icon_: null, is_my_profile: true, isColored: false, allowed_to: 'all' },
  {
    id: 'Block This Account ',
    icon_: null,
    is_my_profile: false,
    isColored: true,
    allowed_to: 'all',
  },
];

export function ProfileSideBar({ isMyProfile, profileImg, userRole }) {
  const {
    profileSideBarButtonHandler,
    profileSideBarButton,
    myProfileImgHandler,
    myProfileImg,
    usersListHandler,
    userBugReportsListHandler,
    userBugFixesListHandler,
    userReusableCodesListHandler,
    userBlogPostsListHandler,
  } = useContext(ManagmentSystem);
  const { tokenData, fetchData } = useRouteLoaderData('root');
  const currentUser = fetchData?.data;
  const navigate = useNavigate();

  let profile = profileImg;

  const handleAddProfileClick = async (file) => {
    const myProfile = await createProfile(tokenData, file);
    myProfileImgHandler(myProfile.imageUrl);
    profile = myProfileImg;
  };

  const handleEditProfileClick = async (file) => {
    const myProfile = await editProfile(tokenData, file);
    myProfileImgHandler(myProfile.imageUrl);
    profile = myProfileImg;
  };

  const ClickHandler = (id) => {
    if (id === 'Admin Dashboard') {
      getAllUsers(id);
    } else if (id === 'Settings') {
      navigate(`/settings`);
    } else if (
      id === 'Bug Reports' ||
      id === 'Bug Fixes' ||
      id === 'Reusable Codes' ||
      id === 'Blog Posts'
    ) {
      getUserPosts(id);
    } else if (id === 'Logout') {
      localStorage.removeItem('token');
      localStorage.removeItem('expiration');
      navigate('/auth?mode=signin');
    } else {
      profileSideBarButtonHandler(id);
    }
  };

  const getAllUsers = async (id) => {
    const token = getAuthToken();

    if (!token) {
      console.error('No token available');
      return [];
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(`${PORT}api/v1/users`, {
        headers,
      });
      console.log('Success!!', response.data);
      usersListHandler(response.data);

      profileSideBarButtonHandler(id);
    } catch (error) {
      console.error('Error fetching users for the admin:', error.response.data);
      return [];
    }
  };

  const getUserPosts = async (id) => {
    const token = getAuthToken();

    if (!token) {
      console.error('No token available');
      return [];
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    let URL;

    if (id === 'Bug Reports') {
      URL = 'bug_reports';
    } else if (id === 'Bug Fixes') {
      URL = 'bug_fixes';
    } else if (id === 'Reusable Codes') {
      URL = 'reusable_codes';
    } else if (id === 'Blog Posts') {
      URL = 'blogs';
    }

    try {
      const response = await axios.get(`${PORT}api/v1/${URL}?user=${currentUser.id}`, {
        headers,
      });
      console.log('Success!!', response.data);

      if (id === 'Bug Reports') {
        userBugReportsListHandler(response.data);
      } else if (id === 'Bug Fixes') {
        userBugFixesListHandler(response.data);
      } else if (id === 'Reusable Codes') {
        userReusableCodesListHandler(response.data);
      } else if (id === 'Blog Posts') {
        userBlogPostsListHandler(response.data);
      }

      profileSideBarButtonHandler(id);
    } catch (error) {
      console.error('Error updating settings:', error.response.data);
      return [];
    }
  };

  // Filter the sidebar data based on the user's role
  const filteredSideBarData = SIDE_BAR_DATA.filter(
    (item) => item.allowed_to === 'all' || item.allowed_to === userRole
  );

  return (
    <div className={`d-none d-xl-flex ${classes.profile_page_side_bar_main_container}`}>
      <VerticalScrollView>
        <Image
          src={profile ? profile : defaultProfile}
          alt={'user profile picture'}
          imgContainerStyle={classes.profile_images_container}
          imgStyle={classes.profile_images}
        />
        {isMyProfile && (
          <FileUpload
            btnType={profile ? 'edit_profile' : 'add_profile'}
            type="image"
            onFileSelect={profile ? handleEditProfileClick : handleAddProfileClick}
          />
        )}

        {filteredSideBarData?.map((data, index) => {
          const showButton =
            (isMyProfile && [null, true].includes(data.is_my_profile)) ||
            (!isMyProfile && [null, false].includes(data.is_my_profile));

          return (
            showButton && (
              <IconTextButton
                key={`${data.id}-${index}`}
                inconTextButtonStyle={`${classes.side_bar_icon_text_button_container}`}
                inconTextLabel16Style={data.isColored && classes.colored_text}
                label={data.id}
                icon_={profileSideBarButton === data.id ? data.icon_ : undefined}
                onClick={() => ClickHandler(data.id)}
              />
            )
          );
        })}
      </VerticalScrollView>
    </div>
  );
}

export function ProfileSideBar2({ userRole }) {
  const { profileSideBarButtonHandler, profileSideBarButton } = useContext(ManagmentSystem);
  return (
    <div className={`d-flex d-xl-none`}>
      <HorizontalScrollView
        METADATA={SIDE_BAR_DATA}
        onClick={profileSideBarButtonHandler}
        activeButton={profileSideBarButton}
      />
    </div>
  );
}
