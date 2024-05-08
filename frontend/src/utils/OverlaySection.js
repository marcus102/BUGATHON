import React, { useContext } from 'react';
import classes from './OverlaySection.module.css';
import { ManagmentSystem } from '../store/AppGeneralManagmentSystem';

export function Overlay({ keyId, children, header, overlayStyle, overlayChildStyle }) {
  const { overlay } = useContext(ManagmentSystem);

  return (
    <>
      {overlay.open && overlay.overlay === keyId  && (
        <div className={classes.overlay_container}>
          <div className={[classes.overlay_second_container, overlayStyle].join(' ')}>
            {header}
            <div className={[classes.overlay_child_container, overlayChildStyle].join(' ')}>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
