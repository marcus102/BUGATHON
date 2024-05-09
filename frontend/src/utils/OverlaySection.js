import React, { useContext } from 'react';
import Colors from '../constants/colors';
import classes from './OverlaySection.module.css';
import { ManagmentSystem } from '../store/AppGeneralManagmentSystem';
import { Modal, Button } from 'react-bootstrap';
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
  const { overlay, overlayHandler } = useContext(ManagmentSystem);

  return (
    <>
      {overlay.open && overlay.keyId === keyId && overlay.layout === 'overlay' && (
        <div className={classes.overlay_container}>
          <div className={[classes.overlay_second_container, overlayStyle].join(' ')}>
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

export function MenuModal({ children, keyId }) {
  const { overlay, overlayHandler } = useContext(ManagmentSystem);
  return (
    <Modal
      show={overlay.open && overlay.keyId === keyId && overlay.layout === 'menu'}
      onHide={() => overlayHandler(null, null)}
      className={classes.modal}
    >
      <Modal.Body className={classes.modal_body}>
        {children}
        <Button variant="secondary" onClick={() => overlayHandler(null, null)}>
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );
}
