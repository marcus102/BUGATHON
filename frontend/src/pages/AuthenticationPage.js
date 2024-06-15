import React, { useContext } from 'react';
import { ManagmentSystem } from '../store/AppGeneralManagmentSystem';
import classes from './AuthenticationPage.module.css';
import { Overlay } from '../utils/OverlaySection';
import SignUp from '../components/authentication/SignUpCmp';
import SignIn from '../components/authentication/SignInCmp';
import ConfirmationCode from '../components/authentication/ConfirmationCodeCmp';
import { OutlinedButton } from '../utils/ButtonSection';

function Authentication() {
  const { currentAuthStatus, currentAuthStatusHandler } = useContext(ManagmentSystem);
  return (
    <Overlay keyId={'auth'} overlayStyle={classes.overlay_container}>
      {(currentAuthStatus === 'signUp' || currentAuthStatus === 'signIn') && (
        <div className={classes.outline_button_container}>
          <OutlinedButton
            buttonMainContainerStyle={classes.outline_button_second_container}
            buttonStyle={[
              classes.outline_button,
              currentAuthStatus === 'signIn' ? classes.active_outline_button : undefined,
            ].join(' ')}
            label={'Sign In'}
            onClick={() => currentAuthStatusHandler('signIn')}
          />
          <OutlinedButton
            buttonMainContainerStyle={classes.outline_button_second_container}
            buttonStyle={[
              classes.outline_button,
              currentAuthStatus === 'signUp' ? classes.active_outline_button : undefined,
            ].join(' ')}
            label={'Sign Up'}
            onClick={() => currentAuthStatusHandler('signUp')}
          />
        </div>
      )}
      {currentAuthStatus === 'signUp' && <SignUp />}
      {currentAuthStatus === 'signIn' && <SignIn />}
      {currentAuthStatus === 'codeConfirm' && <ConfirmationCode />}
    </Overlay>
  );
}

export default Authentication;
