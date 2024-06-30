import React, { useContext } from 'react';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import classes from './settingsHeaderCmp.module.css';
import Icon from '../../utils/IconSection';
import { IconButton } from '../../utils/ButtonSection';
import Text from '../../utils/TextSection';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';

function Header({ title, titleIcon }) {
  const { settingSideBarButton } = useContext(ManagmentSystem);
  return (
    <div className={classes.header_main_container}>
      <Text unwrap={true} h4={settingSideBarButton} />
      <IconButton icon={faSearch} />
    </div>
  );
}

export default Header;
