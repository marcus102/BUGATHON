import React from 'react';
import classes from './ScrollViewsSection.module.css';
import { IconTextButton, PlaneButton } from './ButtonSection';
import Line from './LineSection';

export function HorizontalScrollView({ METADATA, children, onClick, activeButton }) {
  return (
    <div className={classes.horizontal_scroll_view_container}>
      {METADATA.map((data) => (
        <>
          {data.icon && (
            <IconTextButton
              key={data.id}
              unwrap={true}
              inconTextButtonStyle={classes.side_bar_icon_text_button_container_2}
              icon={data.icon}
              label={data.id}
              icon_={data.id === activeButton && data.icon_}
              onClick={onClick}
            />
          )}

          {!data.icon && (
            <PlaneButton key={data.id} unwrap={true} label14={data.label} onClick={onClick} />
          )}
        </>
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
              onClick={onClick}
            />

            {data.underline === true && <Line direction={'horizontal'} />}
          </div>
        ))}
      {children}
    </div>
  );
}
