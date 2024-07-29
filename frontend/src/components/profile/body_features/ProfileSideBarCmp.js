import React, { useContext } from 'react';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import classes from './ProfileSideBarCmp.module.css';
import { Image } from '../../../utils/MediaSection';
import { IconTextButton } from '../../../utils/ButtonSection';
import { faArrowPointer, faEdit } from '@fortawesome/free-solid-svg-icons';
import { HorizontalScrollView, VerticalScrollView } from '../../../utils/ScrollViewsSection';

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
  const { profileSideBarButtonHandler, profileSideBarButton } = useContext(ManagmentSystem);
  return (
    <div className={`d-none d-xl-flex ${classes.profile_page_side_bar_main_container}`}>
      <VerticalScrollView>
        <Image
          src={profileImg}
          alt={'user profile picture'}
          imgContainerStyle={classes.profile_images_container}
          imgStyle={classes.profile_images}
        />
        {isMyProfile && (
          <IconTextButton
            inconTextButtonStyle={classes.side_bar_profile_edit_button}
            label={'Edit Pofile'}
            icon_={faEdit}
          />
        )}

        {SIDE_BAR_DATA.map((data) => {
          const showButton =
            (isMyProfile && [null, true].includes(data.is_my_profile)) ||
            (!isMyProfile && [null, false].includes(data.is_my_profile));

          return (
            showButton && (
              <IconTextButton
                key={data.id}
                inconTextButtonStyle={`${classes.side_bar_icon_text_button_container}`}
                inconTextLabel16Style={data.isColored && classes.colored_text}
                label={data.id}
                icon_={profileSideBarButton === data.id ? data.icon_ : undefined}
                onClick={() => profileSideBarButtonHandler(data.id)}
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
