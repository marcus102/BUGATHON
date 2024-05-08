import React, { useContext } from 'react';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import classes from './ConfirmationCodeCmp.module.css';
import Colors from '../../constants/colors';
import Text from '../../utils/TextSection';
import { RowOfSquares } from '../../utils/InputSection';
import { SolidButton, IconButton } from '../../utils/ButtonSection';
import Link from '../../utils/LinkSection';
import { faRotateRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

function ConfirmationCode() {
  const { overlayHandler, currentAuthStatusHandler } = useContext(ManagmentSystem);
  return (
    <form action="">
      <Text textStyle={classes.code_confirm_title_container} h1={'Confirmation Code'} />
      <RowOfSquares />
      <Link icon={faRotateRight} linkStyle={classes.resend_code} children12={"haven't received code"} />
      <SolidButton
        onClick={overlayHandler}
        buttonContainerStyle={classes.sign_in_button_container}
        label={'Confirm'}
      />
      <div className={classes.cancel_button_container}>
        <IconButton
          icon={faChevronLeft}
          onClick={() => currentAuthStatusHandler('signUp')}
          colorOnMouseUp={Colors.red_FF2B2B}
          colorOnMouseDown={Colors.red_ff3c3c}
          inconButtonStyle={classes.cancel_button}
        />
      </div>
    </form>
  );
}

export default ConfirmationCode;
