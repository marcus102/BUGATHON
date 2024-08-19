import React, { useContext } from 'react';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import classes from './ProfileSideBarCmp.module.css';
import { Image } from '../../../utils/MediaSection';
import { IconTextButton } from '../../../utils/ButtonSection';
import { faArrowPointer } from '@fortawesome/free-solid-svg-icons';
import { HorizontalScrollView, VerticalScrollView } from '../../../utils/ScrollViewsSection';
import defaultProfile from '../../../assets/images/general_profile.svg';
import FileUpload from '../../../utils/fileUploadManagerSection';
import { useRouteLoaderData } from 'react-router-dom';
import { createProfile, editProfile } from '../../../http_requests/imageUploadHttp';
import axios from 'axios';
import { getAuthToken } from '../../../utils/authSection';
import { PORT } from '../../../http_requests/authentication';

const SIDE_BAR_DATA = [
  { id: 'General', icon_: faArrowPointer, is_my_profile: null, isColored: false },
  { id: 'Analytics', icon_: faArrowPointer, is_my_profile: null, isColored: false },
  { id: 'Ranking', icon_: faArrowPointer, is_my_profile: null, isColored: false },
  { id: 'Bug Reports', icon_: faArrowPointer, is_my_profile: null, isColored: false },
  { id: 'Bug Fixes', icon_: faArrowPointer, is_my_profile: null, isColored: false },
  { id: 'Reusable Code', icon_: faArrowPointer, is_my_profile: null, isColored: false },
  { id: 'Blog', icon_: faArrowPointer, is_my_profile: null, isColored: false },
  { id: 'Admin Dashboard', icon_: faArrowPointer, is_my_profile: null, isColored: false },
  { id: 'Delete Account', icon_: faArrowPointer, is_my_profile: true, isColored: true },
  { id: 'Logout', icon_: null, is_my_profile: true, isColored: true },
  { id: 'Settings', icon_: null, is_my_profile: true, isColored: false },
  { id: 'Block This Account ', icon_: null, is_my_profile: false, isColored: true },
];

export function ProfileSideBar({ isMyProfile, profileImg }) {
  const {
    profileSideBarButtonHandler,
    profileSideBarButton,
    myProfileImgHandler,
    myProfileImg,
    usersListHandler,
  } = useContext(ManagmentSystem);
  const { tokenData } = useRouteLoaderData('root');

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

  const getAllUsers = async (id) => {
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
      const response = await axios.get(`${PORT}api/v1/users`, {
        headers,
      });
      console.log('Success!!', response.data);
      usersListHandler(response.data);

      profileSideBarButtonHandler(id);
    } catch (error) {
      console.error('Error updating settings:', error.response.data);
      return null;
    }
  };

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

        {SIDE_BAR_DATA?.map((data, index) => {
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
                onClick={() => {
                  if (data.id === 'Admin Dashboard') {
                    getAllUsers(data.id);
                  } else {
                    profileSideBarButtonHandler(data.id);
                  }
                }}
              />
            )
          );
        })}
      </VerticalScrollView>
    </div>
  );
}

export function ProfileSideBar2() {
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
