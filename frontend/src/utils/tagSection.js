import React from 'react';
import classes from './tagSection.module.css';
import Text from './TextSection';
import Image from './ImageSection';
import Icon from './IconSection';
import ToolTip from './toolTipSection';

function Tag({
  tagContainerStyle,
  tooltipMessage,
  icon,
  iconContainerStyle,
  src,
  alt,
  imgContainerStyle,
  imgStyle,
  label,
  labelStyle,
}) {
  return (
    <ToolTip
      children={
        <div className={`${classes.tag_main_container} ${tagContainerStyle}`}>
          {icon && <Icon iconContainerStyle={iconContainerStyle} icon={icon} />}
          {src && (
            <Image imgContainerStyle={imgContainerStyle} imgStyle={imgStyle} src={src} alt={alt} />
          )}
          {label && <Text unwrap={true} label12Style={labelStyle} label12={label} />}
        </div>
      }
      tooltipMessage={tooltipMessage}
    />
  );
}

export default Tag;
