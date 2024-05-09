import React from 'react';
import classes from './toolTipSection.module.css';
import Text from './TextSection';

function ToolTip({ children, tooltipMessage, customClass }) {
  return (
    <div className={[classes.tool_tip_container, customClass].join(' ')}>
      <span className={classes.tool_tip_child}>{children}</span>
      <div className={classes.tool_tip}>
        <Text label10={tooltipMessage}/>
      </div>
    </div>
  );
}

export default ToolTip;
