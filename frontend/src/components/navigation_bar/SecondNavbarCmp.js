import React from 'react';
import Colors from '../../constants/colors';
// import { Modal, Button } from 'react-bootstrap';
import { SolidButton, IconTextButton } from '../../utils/ButtonSection';
import classes from './SecondNavbarCmp.module.css';
import {
  faInbox,
  faBell,
  faAdjust,
  faBug,
  faPlus,
  faEllipsis,
  faSliders,
} from '@fortawesome/free-solid-svg-icons';
import Search from '../../utils/SearchSection';
import { DropdownMenu } from '../../utils/ButtonSection';

const MENU_OPTIONS = [
  { id: '1', icon: faBug, label: 'Critical Bug', icon_2: null, href: null },
  { id: '2', icon: faInbox, label: 'Inbox', icon_2: null, href: null },
  { id: '3', icon: faBell, label: 'Notifications', icon_2: null, href: null },
  { id: '4', icon: faAdjust, label: 'Adjust', icon_2: null, href: null },
];

function SecondNavbar() {
  return (
    <div className={classes.nav_main_container}>
      <div className="row align-items-center ">
        <div className="col-md-2 col-4 d-flex justify-content-start ">
          <SolidButton
            buttonMainContainerStyle={classes.new_button_main_container}
            buttonContainerStyle={classes.new_button_container}
            buttonStyle={classes.new_button}
            icon={faPlus}
            color={Colors.white_}
            label="New"
          />
        </div>

        <div className="col-md-8 col-lg-5 col-7  justify-content-center ">
          <Search />
        </div>

        <div className="col-lg-5 d-none d-lg-flex justify-content-end ">
          <IconTextButton icon={faBug} label="Critical Bug" />
          <IconTextButton icon={faInbox} label="Inbox" />
          <IconTextButton icon={faBell} label="Notifications" />
          <IconTextButton icon={faSliders} label="Adjust" />
        </div>

        <div className="col-1 d-lg-none d-flex justify-content-end">
          <DropdownMenu buttonIcon={faEllipsis} menuItems={MENU_OPTIONS} />
        </div>
      </div>
    </div>
  );
}

export default SecondNavbar;
