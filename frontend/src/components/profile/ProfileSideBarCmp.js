import React, { useContext } from 'react';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import classes from './ProfileSideBarCmp.module.css';
import Image from '../../utils/ImageSection';
import images from '../../assets/images/people.jpg';
import { IconTextButton } from '../../utils/ButtonSection';
import {
  faArrowPointer,
  faArrowRightFromBracket,
  faEdit,
  faGear,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';

const SIDE_BAR_DATA = [
  { id: 'General', icon: null, icon_: faArrowPointer },
  { id: 'Analytics', icon: null, icon_: faArrowPointer },
  { id: 'Ranking', icon: null, icon_: faArrowPointer },
  { id: 'Bug Reports', icon: null, icon_: faArrowPointer },
  { id: 'Bug Fixes', icon: null, icon_: faArrowPointer },
  { id: 'Reusable Code', icon: null, icon_: faArrowPointer },
  { id: 'Blog', icon: null, icon_: faArrowPointer },
  { id: 'Delete Account', icon: faTrashCan, icon_: faArrowPointer },
  { id: 'Logout', icon: faArrowRightFromBracket, icon_: null },
  { id: 'Settings', icon: faGear, icon_: null },
];

export function ProfileSideBar() {
  const { profileSideBarButtonHandler, profileSideBarButton } = useContext(ManagmentSystem);
  return (
    <div className={`d-none d-xl-flex ${classes.profile_page_side_bar_main_container}`}>
      <div className={classes.side_bar_options_list_main_container}>
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
      </div>
    </div>
  );
}

export function ProfileSideBar2() {
  const { profileSideBarButtonHandler } = useContext(ManagmentSystem);
  return (
    <div className={`d-flex d-xl-none ${classes.profile_page_side_bar_main_container_2}`}>
      {SIDE_BAR_DATA.map((data) => (
        <IconTextButton
          key={data.id}
          inconTextButtonStyle={classes.side_bar_icon_text_button_container_2}
          label={data.id}
          icon={data.icon}
          onClick={() => profileSideBarButtonHandler(data.id)}
        />
      ))}
    </div>
  );
}
