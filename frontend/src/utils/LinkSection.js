import React from 'react';
import classes from './LinkSection.module.css';
import Icon from './IconSection';

function Link({ underline, href, children16, children12, icon, size, color, linkStyle }) {
  return (
    <div className={[classes.link_container, linkStyle].join(' ')}>
      {children12 ? (
        <a className={[classes.link12, underline && classes.underline_link].join(' ')} href={href}>
          {children12}
          {icon ? <Icon icon={icon} size={size} color={color} /> : undefined}
        </a>
      ) : undefined}

      {children16 ? (
        <a className={[classes.link16, underline && classes.underline_link].join(' ')} href={href}>
          {children16}
          {icon ? <Icon icon={icon} size={size} color={color} /> : undefined}
        </a>
      ) : undefined}
    </div>
  );
}

export default Link;
