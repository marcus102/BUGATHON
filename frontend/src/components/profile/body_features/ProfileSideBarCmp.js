import React, { useContext } from 'react';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import classes from './ProfileSideBarCmp.module.css';
import { Image } from '../../../utils/MediaSection';
import images from '../../../assets/images/people.jpg';
import { IconTextButton } from '../../../utils/ButtonSection';
import {
  faArrowPointer,
  faArrowRightFromBracket,
  faBug,
  faBugSlash,
  faChartSimple,
  faCode,
  faEdit,
  faFeather,
  faGear,
  faHouse,
  faRankingStar,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { HorizontalScrollView, VerticalScrollView } from '../../../utils/ScrollViewsSection';

const SIDE_BAR_DATA = [
  { id: 'General', icon_: faArrowPointer, is_my_profile: null },
  { id: 'Analytics', icon_: faArrowPointer, is_my_profile: null },
  { id: 'Ranking', icon_: faArrowPointer, is_my_profile: null },
  { id: 'Bug Reports', icon_: faArrowPointer, is_my_profile: null },
  { id: 'Bug Fixes', icon_: faArrowPointer, is_my_profile: null },
  { id: 'Reusable Code', icon_: faArrowPointer, is_my_profile: null },
  { id: 'Blog', icon_: faArrowPointer, is_my_profile: null },
  { id: 'Delete Account', icon_: faArrowPointer, is_my_profile: true },
  { id: 'Logout', icon_: null, is_my_profile: true },
  { id: 'Settings', icon_: null, is_my_profile: true },
  { id: 'Block This Account ', icon_: null, is_my_profile: false },
];

export function ProfileSideBar({ isMyProfile }) {
  const { profileSideBarButtonHandler, profileSideBarButton } = useContext(ManagmentSystem);
  return (
    <div className={`d-none d-xl-flex ${classes.profile_page_side_bar_main_container}`}>
      <VerticalScrollView
        children={
          <>
            <Image
              src={images}
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
                    inconTextButtonStyle={classes.side_bar_icon_text_button_container}
                    label={data.id}
                    icon_={profileSideBarButton === data.id ? data.icon_ : undefined}
                    onClick={() => profileSideBarButtonHandler(data.id)}
                  />
                )
              );
            })}

            {/* {SIDE_BAR_DATA.map((data) => (
              <>
                {isMyProfile === true && [null, true].includes(data.is_my_profile) && (
                  <IconTextButton
                    key={data.id}
                    inconTextButtonStyle={classes.side_bar_icon_text_button_container}
                    label={data.id}
                    icon_={profileSideBarButton === data.id ? data.icon_ : undefined}
                    onClick={() => profileSideBarButtonHandler(data.id)}
                  />
                )}

                {isMyProfile === false && [null, false].includes(data.is_my_profile) && (
                  <IconTextButton
                    key={data.id}
                    inconTextButtonStyle={classes.side_bar_icon_text_button_container}
                    label={data.id}
                    icon_={profileSideBarButton === data.id ? data.icon_ : undefined}
                    onClick={() => profileSideBarButtonHandler(data.id)}
                  />
                )}
              </>
            ))} */}
          </>
        }
      />
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
