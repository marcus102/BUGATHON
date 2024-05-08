import React, { useContext } from 'react';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import Colors from '../../constants/colors';
import classes from './SignInCmp.module.css';
import { Input } from '../../utils/InputSection';
import { SolidButton, IconButton } from '../../utils/ButtonSection';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Text from '../../utils/TextSection';
import Link from '../../utils/LinkSection';

function SignIn() {
  const { overlayHandler } = useContext(ManagmentSystem);
  return (
    <form action="">
      <Text textStyle={classes.sign_in_title_container} h1={'Sign In'} />
      <Input placeholder={'required'} label={'Email Address/Username'} />
      <Input placeholder={'*******'} label={'Password'} type={'password'} />
      <Link linkStyle={classes.forgot_password_container} children12={'forgot password'} />
      <SolidButton
        onClick={() => overlayHandler('auth')}
        buttonContainerStyle={classes.sign_in_button_container}
        label={'Sign In'}
      />
      <div className={classes.cancel_button_container}>
        <IconButton
          icon={faXmark}
          onClick={() => overlayHandler('auth')}
          colorOnMouseUp={Colors.red_FF2B2B}
          colorOnMouseDown={Colors.red_ff3c3c}
          inconButtonStyle={classes.cancel_button}
        />
      </div>
    </form>
  );
}

export default SignIn;
