import React from 'react';
import classes from './ScrollViewsSection.module.css';
import { IconTextButton, PlaneButton } from './ButtonSection';
import Line from './LineSection';

export function HorizontalScrollView({ METADATA, children, onClick, activeButton }) {
  return (
    <div className={classes.horizontal_scroll_view_container}>
      {METADATA &&
        METADATA.map((data) => (
          <div key={data.id}>
            {data.icon && (
              <IconTextButton
                unwrap={true}
                inconTextButtonStyle={`${classes.side_bar_icon_text_button_container} ${
                  activeButton === data.id && classes.active_side_bar_icon_text_button_container
                }`}
                icon={data.icon}
                label={data.id}
                onClick={() => onClick(data.id)}
              />
            )}

            {!data.icon && (
              <PlaneButton
                unwrap={true}
                buttonContainerMainContainer={
                  activeButton === data.id && classes.side_bar_plane_button_container
                }
                label14={data.id}
                onClick={() => onClick(data.id)}
              />
            )}
          </div>
        ))}
      {children}
    </div>
  );
}

export function VerticalScrollView({ METADATA, children, onClick, activeButton }) {
  return (
    <div className={classes.vertical_scroll_view_container}>
      {METADATA &&
        METADATA.map((data) => (
          <div key={data.id}>
            <IconTextButton
              unwrap={true}
              inconTextButtonStyle={classes.side_bar_icon_text_button_container_2}
              icon={data.icon}
              label={data.id}
              icon_={data.id === activeButton && data.icon_}
              onClick={() => onClick(data.id)}
            />

            {data.underline === true && <Line direction={'horizontal'} />}
          </div>
        ))}
      {children}
    </div>
  );
}
