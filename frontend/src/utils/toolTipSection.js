import React, { useContext } from 'react';
import { ManagmentSystem } from '../store/AppGeneralManagmentSystem';
import classes from './toolTipSection.module.css';
import Text from './TextSection';

function ToolTip({ children, tooltipMessage, customClass, toolTipStyle }) {
  const { systemTheme } = useContext(ManagmentSystem);
  return (
    <div className={`${classes.tool_tip_container} ${customClass}`}>
      <span className={classes.tool_tip_child}>{children}</span>
      <Text
        textStyle={`${
          systemTheme === 'dark_mode' ? classes.tool_tip : classes.tool_tip_
        } ${toolTipStyle}`}
        label10={tooltipMessage}
      />
    </div>
  );
}

export default ToolTip;
