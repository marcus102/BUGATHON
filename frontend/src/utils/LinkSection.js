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
  size,
  color,
  linkContainer,
  linkStyle,
}) {
  return (
    <div className={!linkContainer ? classes.link_container : linkContainer}>
      {children12 && (
        <a
          className={[
            underline && classes.underline_link,
            classes.link12,
            !linkStyle ? classes.link_default_color : linkStyle,
          ].join(' ')}
          href={href}
        >
          {children12}
          {icon && <Icon icon={icon} size={size} color={color} />}
        </a>
      )}

      {children14 && (
        <a
          className={[
            underline && classes.underline_link,
            classes.link14,
            !linkStyle ? classes.link_default_color : linkStyle,
          ].join(' ')}
          href={href}
        >
          {children14}
          {icon && <Icon icon={icon} size={size} color={color} />}
        </a>
      )}

      {children16 && (
        <a
          className={[
            underline && classes.underline_link,
            classes.link16,
            !linkStyle ? classes.link_default_color : linkStyle,
          ].join(' ')}
          href={href}
        >
          {children16}
          {icon && <Icon icon={icon} size={size} color={color} />}
        </a>
      )}

      {icon && <a href={href}>{icon && <Icon icon={icon} size={size} color={color} />}</a>}
    </div>
  );
}

export default Link;
