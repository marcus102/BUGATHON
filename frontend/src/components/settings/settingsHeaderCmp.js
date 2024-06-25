import React from 'react';
import classes from './settingsHeaderCmp.module.css';
import Icon from '../../utils/IconSection';
import { IconButton } from '../../utils/ButtonSection';
import Text from '../../utils/TextSection';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';

function Header({ title, titleIcon }) {
  return (
    <div className={classes.header_main_container}>
      <div className={classes.header_title_container}>
        <Icon icon={faUser} />
        <Text unwrap={true} label16={'General Profile'} />
      </div>
      <IconButton icon={faSearch} />
    </div>
  );
}

export default Header;
