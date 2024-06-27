import React from 'react';
import classes from './settingsSideBarCmp.module.css';
import {
  faA,
  faArrowPointer,
  faBell,
  faBug,
  faBugSlash,
  faChildReaching,
  faClock,
  faCode,
  faComputer,
  faPaintBrush,
  faPersonCircleExclamation,
  faShieldHalved,
  faTowerBroadcast,
  faUser,
  faUserGear,
} from '@fortawesome/free-solid-svg-icons';
import Image from '../../utils/ImageSection';
import Text from '../../utils/TextSection';
import Line from '../../utils/LineSection';
import { ButtonContainer, IconTextButton } from '../../utils/ButtonSection';
import profileImg from '../../assets/images/people.jpg';

const SIDE_BAR_DATA = [
  { id: 'General Profile', icon: faUser, icon_: faArrowPointer, underline: false },
  { id: 'Account Setting', icon: faUserGear, icon_: faArrowPointer, underline: true },
  { id: 'Appearance', icon: faPaintBrush, icon_: faArrowPointer, underline: true },
  { id: 'Accessibility', icon: faChildReaching, icon_: faArrowPointer, underline: false },
  { id: 'Notifications', icon: faBell, icon_: faArrowPointer, underline: true },
  { id: 'Edit Email', icon: faA, icon_: faArrowPointer, underline: false },
  {
    id: 'Authentication',
    icon: faShieldHalved,
    icon_: faArrowPointer,
    underline: false,
  },
  { id: 'Sessions', icon: faTowerBroadcast, icon_: faArrowPointer, underline: true },
  { id: 'Moderation', icon: faPersonCircleExclamation, icon_: faArrowPointer, underline: true },
  { id: 'Bug Report ', icon: faBug, icon_: faArrowPointer, underline: false },
  { id: 'Bug Fixes', icon: faBugSlash, icon_: faArrowPointer, underline: false },
  { id: 'Reusable Code ', icon: faCode, icon_: faArrowPointer, underline: true },
  { id: 'Reminders', icon: faClock, icon_: faArrowPointer, underline: true },
  { id: 'Authorization', icon: faComputer, icon_: faArrowPointer, underline: true },
];

export function SideBar() {
  return (
    <div className={` d-none d-xl-flex ${classes.side_bar_main_container}`}>
      {/* <ButtonContainer
        buttonContainerMainContainer={classes.side_bar_header_container}
        children={
          <>
            <Image
              imgContainerStyle={classes.side_bar_image_container}
              imgStyle={classes.side_bar_image}
              src={profileImg}
              alt={'Profile'}
            />
            <Text label16={'@marcus'} />
          </>
        }
      /> */}
      {/* <Line direction={'horizontal'} /> */}
      <div className={classes.side_bar_content_container}>
        {SIDE_BAR_DATA.map((data) => (
          <div key={data.id} className={classes.side_bar_content_container_2}>
            <IconTextButton
              unwrap={true}
              inconTextButtonStyle={classes.side_bar_icon_text_button}
              icon={data.icon}
              label={data.id}
              icon_={data.icon_}
            />
            {data.underline === true && <Line direction={'horizontal'} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SideBar2() {
  // const { profileSideBarButtonHandler } = useContext(ManagmentSystem);
  return (
    <div className={`d-flex d-xl-none ${classes.profile_page_side_bar_main_container_2}`}>
      {SIDE_BAR_DATA.map((data) => (
        <div key={data.id} className={classes.side_bar_content_container_2}>
          <IconTextButton
            unwrap={true}
            inconTextButtonStyle={classes.side_bar_icon_text_button_container_2}
            icon={data.icon}
            label={data.id}
            icon_={data.icon_}
          />
        </div>
      ))}
    </div>
  );
}
