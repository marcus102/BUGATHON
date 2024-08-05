import React, { useContext } from 'react';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import classes from './AuthCmp.module.css';
import SignUp from '../../components/authentication/SignUpCmp';
import SignIn from '../../components/authentication/SignInCmp';
import ConfirmationCode from '../../components/authentication/ConfirmationCodeCmp';
import { OutlinedButton, IconTextButton } from '../../utils/ButtonSection';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Authentication() {
  const { currentAuthStatus, currentAuthStatusHandler } = useContext(ManagmentSystem);
  const navigate = useNavigate();

  return (
    <div className={classes.root_container}>
      <div className={classes.main_container}>
        <IconTextButton
          unwrap={true}
          inconTextButtonStyle={classes.cancelButton}
          icon={faArrowLeftLong}
          label={'Back Home'}
          onClick={() => navigate('/')}
        />
        {(currentAuthStatus === 'signUp' || currentAuthStatus === 'signIn') && (
          <div className={classes.outline_button_container}>
            <OutlinedButton
              buttonMainContainerStyle={classes.outline_button_second_container}
              buttonStyle={`${classes.outline_button} ${
                currentAuthStatus === 'signIn' ? classes.active_outline_button : undefined
              }`}
              label={'Sign In'}
              onClick={() => {
                navigate(`?mode=${'signin'}`);
                currentAuthStatusHandler('signIn');
              }}
            />
            <OutlinedButton
              buttonMainContainerStyle={classes.outline_button_second_container}
              buttonStyle={`${classes.outline_button} ${
                currentAuthStatus === 'signUp' ? classes.active_outline_button : undefined
              }`}
              label={'Sign Up'}
              onClick={() => {
                navigate(`?mode=${'signup'}`);
                currentAuthStatusHandler('signUp');
              }}
            />
          </div>
        )}
        {currentAuthStatus === 'signUp' && <SignUp />}
        {currentAuthStatus === 'signIn' && <SignIn />}
        {currentAuthStatus === 'codeConfirm' && <ConfirmationCode />}
      </div>
    </div>
  );
}

export default Authentication;
