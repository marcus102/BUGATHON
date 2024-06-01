import React from 'react';
import classes from './toolTipSection.module.css';
import Text from './TextSection';

function ToolTip({ children, tooltipMessage, customClass, toolTipStyle }) {
  return (
    <div className={`${classes.tool_tip_container} ${customClass}`}>
      <span className={classes.tool_tip_child}>{children}</span>
      <Text textStyle={`${classes.tool_tip} ${toolTipStyle}`} label10={tooltipMessage} />
    </div>
  );
}

export default ToolTip;
