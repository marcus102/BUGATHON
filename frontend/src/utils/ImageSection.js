import React from 'react';
import classes from './ImageSection.module.css';

function Image({ src, alt, imgContainerStyle, imgStyle }) {
  return (
    <div className={[classes.image_main_container, imgContainerStyle].join(' ')}>
      <img className={[classes.image, imgStyle].join(' ')} src={src} alt={!alt ? 'image' : alt} />
    </div>
  );
}

export default Image;
