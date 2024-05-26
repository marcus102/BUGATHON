import React from 'react';
import classes from './LinkSection.module.css';
import Icon from './IconSection';

function Link({
  underline,
  href,
  children16,
  children12,
  children14,
  icon,
  icon_2,
  icon_link,
  size,
  color,
  linkContainer,
  linkStyle,
}) {
  return (
    <div className={`${linkContainer} ${classes.link_container}`}>
      {children12 && (
        <a
          className={`
            ${underline && classes.underline_link} ${classes.link12} ${
            linkStyle ? linkStyle : classes.link_default_color
          }`}
          href={href}
        >
          {icon && <Icon icon={icon} size={size} color={color} />}
          {children12}
          {icon_2 && <Icon icon={icon_2} size={size} color={color} />}
        </a>
      )}

      {children14 && (
        <a
          className={`
            ${underline && classes.underline_link} ${classes.link14} ${
            linkStyle ? linkStyle : classes.link_default_color
          }`}
          href={href}
        >
          {icon && <Icon icon={icon} size={size} color={color} />}
          {children14}
          {icon_2 && <Icon icon={icon_2} size={size} color={color} />}
        </a>
      )}

      {children16 && (
        <a
          className={`
            ${underline && classes.underline_link} ${
            linkStyle ? linkStyle : classes.link_default_color
          } ${classes.link16}`}
          href={href}
        >
          {icon && <Icon icon={icon} size={size} color={color} />}
          {children16}
          {icon_2 && <Icon icon={icon_2} size={size} color={color} />}
        </a>
      )}

      {icon_link && (
        <a href={href}>
          <Icon icon={icon_link} size={size} color={color} />
        </a>
      )}
    </div>
  );
}

export default Link;
