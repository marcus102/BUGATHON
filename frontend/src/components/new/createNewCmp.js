import React from 'react';
import classes from './createNewCmp.module.css';
import { IconButton, IconTextButton } from '../../utils/ButtonSection';
import { faArrowLeftLong, faEye } from '@fortawesome/free-solid-svg-icons';
import ToolTip from '../../utils/toolTipSection';
import Line from '../../utils/LineSection';
import { useNavigate, useSearchParams } from 'react-router-dom';

function CreateNew({ children }) {
  const navigation = useNavigate();

  // const [searchParams] = useSearchParams();
  // const current_post = searchParams.get('post');
  // const current_username = searchParams.get('username');

  return (
    <div className={classes.main_container}>
      <div className={classes.button_container}>
        <ToolTip tooltipMessage={'Go Back'}>
          <IconButton icon={faArrowLeftLong} onClick={() => navigation('/')} />
        </ToolTip>
        <IconTextButton
          inconTextButtonStyle={classes.icon_text_button}
          icon={faEye}
          label={'Show Preview'}
        />
      </div>
      <Line />
      {children}
    </div>
  );
}

export default CreateNew;
