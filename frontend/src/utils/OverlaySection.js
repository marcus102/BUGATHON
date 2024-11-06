import React, { useContext } from 'react';
import Colors from '../constants/colors';
import classes from './OverlaySection.module.css';
import { ManagmentSystem } from '../store/AppGeneralManagmentSystem';
import { IconButton } from './ButtonSection';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export function Overlay({
  keyId,
  children,
  header,
  headerIcon,
  headerIconColorOnMouseUp,
  headerIconColorOnMouseDown,
  overlayStyle,
  overlayChildStyle,
}) {
  const { overlay, overlayHandler, systemTheme } = useContext(ManagmentSystem);

  return (
    <>
      {overlay.open && overlay.keyId === keyId && (
        <div className={classes.overlay_container}>
          <div
            className={`${
              systemTheme === 'dark_mode'
                ? classes.overlay_second_container
                : classes.overlay_second_container_
            } ${overlayStyle}`}
          >
            {!header ? (
              <div className={classes.overlay_cancel_button_container}>
                <IconButton
                  icon={!headerIcon ? faXmark : headerIcon}
                  onClick={overlayHandler}
                  colorOnMouseUp={
                    !headerIconColorOnMouseUp ? Colors.red_FF2B2B : headerIconColorOnMouseUp
                  }
                  colorOnMouseDown={
                    !headerIconColorOnMouseDown ? Colors.red_ff3c3c : headerIconColorOnMouseDown
                  }
                />
              </div>
            ) : (
              header
            )}
            <div className={[classes.overlay_child_container, overlayChildStyle].join(' ')}>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
