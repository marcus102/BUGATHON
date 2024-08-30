import React from 'react';
import classes from './MediaSection.module.css';

export function Image({ src, alt, imgContainerStyle, imgStyle }) {
  return (
    <div className={`${classes.image_main_container} ${imgContainerStyle}`}>
      <img className={`${classes.image} ${imgStyle}`} src={src} alt={!alt ? 'image' : alt} />
    </div>
  );
}

export function Video({ src, videoContainerStyle, videoStyle }) {
  return (
    <div className={`${classes.video_main_container} ${videoContainerStyle}`}>
      <video src={src} className={`${classes.video} ${videoStyle}`} controls />
    </div>
  );
}

export function Audio({ src, audioContainerStyle, audioStyle }) {
  return (
    <div className={`${classes.audio_main_container} ${audioContainerStyle}`}>
      <audio src={src} className={`${classes.audio} ${audioStyle}`} controls />
    </div>
  );
}

export function File({ id, onChange }) {
  return <input type="file" id={id} style={{ display: 'none' }} onChange={onChange} />;
}
