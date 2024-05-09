import React from 'react';
import classes from './LinkSection.module.css';
import Icon from './IconSection';

function Link({ underline, href, children16, children12, icon, size, color, linkContainer, linkStyle }) {
  return (
    <div className={[classes.link_container, linkContainer].join(' ')}>
      {children12 ? (
        <a className={[underline && classes.underline_link, classes.link12, linkStyle].join(' ')} href={href}>
          {children12}
          {icon ? <Icon icon={icon} size={size} color={color} /> : undefined}
        </a>
      ) : undefined}

      {children16 ? (
        <a className={[underline && classes.underline_link, classes.link16, linkStyle].join(' ')} href={href}>
          {children16}
          {icon ? <Icon icon={icon} size={size} color={color} /> : undefined}
        </a>
      ) : undefined}

      {icon ? (
        <a href={href}>{icon ? <Icon icon={icon} size={size} color={color} /> : undefined}</a>
      ) : undefined}
    </div>
  );
}

export default Link;
