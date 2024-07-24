import React from 'react';
import classes from './LineSection.module.css';

function Line({ direction }) {
  return <hr className={direction === 'vertical' ? classes.vertical_line : classes.line_main} />;
}

export default Line;
