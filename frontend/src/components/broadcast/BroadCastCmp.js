import React, { useState } from 'react';
import classes from './BroadCastCmp.module.css';
import Text from '../../utils/TextSection';
import { IconButton } from '../../utils/ButtonSection';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function BroadCast({ h1Title, h2Title, h3Title, h4Title, h5Title, h6Title, p16, p12, children }) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      {(h1Title || h2Title || h3Title || h4Title || h5Title || h6Title || p16 || p12) &&
        isVisible && (
          <div className={classes.broadcast_main_container}>
            {(h1Title || h2Title || h3Title || h4Title || h5Title || h6Title) && (
              <Text h1={h1Title} h2={h2Title} h3={h3Title} h4={h4Title} h5={h5Title} h6={h6Title} />
            )}
            {(p16 || p12) && <Text p16={p16} p12={p12} />}
            {children}
            
            <div className={classes.cancel_button_container}>
              <IconButton
                icon={faXmark}
                onClick={() => {
                  setIsVisible(false);
                }}
              />
            </div>
          </div>
        )}
    </>
  );
}

export default BroadCast;
