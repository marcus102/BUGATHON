import React, { useState } from 'react';
import Colors from '../../constants/colors';
import { Modal, Button } from 'react-bootstrap';
import { SolidButton, IconTextButton, IconButton } from '../../utils/ButtonSection';
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

function SecondNavbar() {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => setShowMenu(!showMenu);

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
          <IconButton
            className={classes.menu_button}
            icon={faEllipsis}
            onClick={handleMenuToggle}
          />
        </div>
        
      </div>

      <Modal show={showMenu} onHide={handleMenuToggle} className={classes.modal}>
        <Modal.Body className={classes.modal_body}>
          <IconTextButton
            inconTextButtonStyle={classes.icon_button}
            icon={faBug}
            label="Critical Bug"
          />
          <IconTextButton inconTextButtonStyle={classes.icon_button} icon={faInbox} label="Inbox" />
          <IconTextButton
            inconTextButtonStyle={classes.icon_button}
            icon={faBell}
            label="Notifications"
          />
          <IconTextButton
            inconTextButtonStyle={classes.icon_button}
            icon={faAdjust}
            label="Adjust"
          />
          <Button variant="secondary" onClick={handleMenuToggle}>
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SecondNavbar;
