import React, { useContext } from 'react';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import classes from './SignInCmp.module.css';
import { Input } from '../../utils/InputSection';
import { SolidButton } from '../../utils/ButtonSection';
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
    </form>
  );
}

export default SignIn;
