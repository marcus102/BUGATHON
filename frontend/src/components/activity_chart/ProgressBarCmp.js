import React, { useState, useEffect } from 'react';
import classes from './ProgressBarCmp.module.css'

const ProgressBar = ({ percent }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Update the width of the progress bar based on the percent prop
    setWidth(percent);
  }, [percent]);

  return (
    <div className={`${classes.progress_bar_main_container}`}>
      <div className="progress" style={{ width: `${width}%` }}>
        {width > 0 && <span className={`${classes.progress_text}`}>{`${width}%`}</span>}
      </div>
    </div>
  );
};

export default ProgressBar;
