import React, { useContext } from 'react';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import classes from './settingsSideBarCmp.module.css';
import {
  faArrowPointer,
  faAt,
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
import { HorizontalScrollView, VerticalScrollView } from '../../utils/ScrollViewsSection';

const SIDE_BAR_DATA = [
  { id: 'General Profile', icon: faUser, icon_: faArrowPointer, underline: false },
  { id: 'Account Setting', icon: faUserGear, icon_: faArrowPointer, underline: true },
  { id: 'Appearance', icon: faPaintBrush, icon_: faArrowPointer, underline: true },
  { id: 'Accessibility', icon: faChildReaching, icon_: faArrowPointer, underline: false },
  { id: 'Notifications', icon: faBell, icon_: faArrowPointer, underline: true },
  { id: 'Email', icon: faAt, icon_: faArrowPointer, underline: false },
  {
    id: 'Authentication',
    icon: faShieldHalved,
    icon_: faArrowPointer,
    underline: false,
  },
  { id: 'Sessions', icon: faTowerBroadcast, icon_: faArrowPointer, underline: true },
  { id: 'Moderation', icon: faPersonCircleExclamation, icon_: faArrowPointer, underline: true },
  { id: 'Bug Report', icon: faBug, icon_: faArrowPointer, underline: false },
  { id: 'Bug Fixes', icon: faBugSlash, icon_: faArrowPointer, underline: false },
  { id: 'Reusable Code', icon: faCode, icon_: faArrowPointer, underline: true },
  { id: 'Reminders', icon: faClock, icon_: faArrowPointer, underline: true },
  { id: 'Authorization', icon: faComputer, icon_: faArrowPointer, underline: true },
];

export function SideBar() {
  const { settingSideBarButtonHandler, settingSideBarButton } = useContext(ManagmentSystem);
  return (
    <div className={`d-none d-xl-flex ${classes.side_bar_main_container}`}>
      <VerticalScrollView
        METADATA={SIDE_BAR_DATA}
        activeButton={settingSideBarButton}
        onClick={settingSideBarButtonHandler}
      />
    </div>
  );
}

export function SideBar2() {
  const { settingSideBarButtonHandler, settingSideBarButton } = useContext(ManagmentSystem);
  return (
    <div className={`d-flex d-xl-none ${classes.side_bar_main_container}`}>
      <HorizontalScrollView
        METADATA={SIDE_BAR_DATA}
        activeButton={settingSideBarButton}
        onClick={settingSideBarButtonHandler}
      />
    </div>
  );
}
