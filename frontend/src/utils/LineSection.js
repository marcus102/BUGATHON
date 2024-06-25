import React from 'react';
import PropTypes from 'prop-types';
import classes from './LineSection.module.css';

function Line({ direction }) {
  return <hr className={direction === 'vertical' ? classes.vertical_line : classes.line_main} />;
}

Line.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
};

Line.defaultProps = {
  direction: 'horizontal',
};

export default Line;
