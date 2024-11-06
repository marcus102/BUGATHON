import React, { useContext } from 'react';
import { ManagmentSystem } from '../store/AppGeneralManagmentSystem';
import classes from './IconSection.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Colors from '../constants/colors';

function Icon({ icon, size, rotation, flip, color, iconContainerStyle }) {
  const { systemTheme } = useContext(ManagmentSystem);
  return (
    <div className={[classes.icon_container, iconContainerStyle].join(' ')}>
      <FontAwesomeIcon
        icon={icon}
        color={
          !color ? (systemTheme === 'dark_mode' ? Colors.white_ : Colors.black_background) : color
        }
        size={size}
        rotation={rotation}
        flip={flip}
      />
    </div>
  );
}

export default Icon;
