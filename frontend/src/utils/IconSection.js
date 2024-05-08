import React from 'react';
import classes from './IconSection.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Colors from '../constants/colors';

function Icon({ icon, size, rotation, flip, color, iconContainerStyle }) {
  return (
    <div className={[classes.icon_container, iconContainerStyle].join(' ')}>
      <FontAwesomeIcon
        icon={icon}
        color={!color ? Colors.white_ : color}
        size={size}
        rotation={rotation}
        flip={flip}
      />
    </div>
  );
}

export default Icon;
