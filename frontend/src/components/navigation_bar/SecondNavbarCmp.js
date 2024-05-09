import React, { useContext } from 'react';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import Colors from '../../constants/colors';
// import { Modal, Button } from 'react-bootstrap';
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
import { MenuModal } from '../../utils/OverlaySection';

function SecondNavbar() {
  const { overlayHandler } = useContext(ManagmentSystem);
  // const [showMenu, setShowMenu] = useState(false);
  // const handleMenuToggle = () => setShowMenu(!showMenu);

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
            onClick={() => overlayHandler('menu_navber', 'menu')}
          />
        </div>
      </div>

      <MenuModal keyId={'menu_navber'}>
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
        <IconTextButton inconTextButtonStyle={classes.icon_button} icon={faAdjust} label="Adjust" />
      </MenuModal>
    </div>
  );
}

export default SecondNavbar;
