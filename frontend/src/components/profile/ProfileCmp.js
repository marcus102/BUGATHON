import React from 'react';
import classes from './ProfileCmp.module.css';
import Image from '../../utils/ImageSection';
import { IconTextButton, DropdownMenu } from '../../utils/ButtonSection';
import GeneralUserInfo from './GeneralUserInfoCmp';
import images from '../../assets/images/people.jpg';
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

const ProfilePage = () => {
  return (
    <div className={classes.profile_page_main_container}>
      <div className={classes.profile_page_side_bar_main_container}>
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
              icon_={data.icon_}
            />
          ))}
        </div>
      </div>
      <div className={classes.profile_contents_main_container}>
        <GeneralUserInfo />
      </div>
    </div>
  );
};

export default ProfilePage;
