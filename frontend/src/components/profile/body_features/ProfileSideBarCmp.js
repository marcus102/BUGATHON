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
  { id: 'General', icon: faHouse, icon_: faArrowPointer },
  { id: 'Analytics', icon: faChartSimple, icon_: faArrowPointer },
  { id: 'Ranking', icon: faRankingStar, icon_: faArrowPointer },
  { id: 'Bug Reports', icon: faBug, icon_: faArrowPointer },
  { id: 'Bug Fixes', icon: faBugSlash, icon_: faArrowPointer },
  { id: 'Reusable Code', icon: faCode, icon_: faArrowPointer },
  { id: 'Blog', icon: faFeather, icon_: faArrowPointer },
  { id: 'Delete Account', icon: faTrashCan, icon_: faArrowPointer },
  { id: 'Logout', icon: faArrowRightFromBracket, icon_: null },
  { id: 'Settings', icon: faGear, icon_: null },
];

export function ProfileSideBar() {
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
            <IconTextButton
              inconTextButtonStyle={classes.side_bar_profile_edit_button}
              label={'Edit Pofile'}
              icon_={faEdit}
            />
            {SIDE_BAR_DATA.map((data) => (
              <IconTextButton
                key={data.id}
                inconTextButtonStyle={classes.side_bar_icon_text_button_container}
                label={data.id}
                icon={data.icon}
                icon_={profileSideBarButton === data.id ? data.icon_ : undefined}
                onClick={() => profileSideBarButtonHandler(data.id)}
              />
            ))}
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
