import React, { useContext } from 'react';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import classes from './SignInCmp.module.css';
import { Input } from '../../utils/InputSection';
import { SolidButton, PlaneButton } from '../../utils/ButtonSection';
import Text from '../../utils/TextSection';
import { Form } from 'react-router-dom';

function SignIn() {
  // const { overlayHandler } = useContext(ManagmentSystem);
  return (
    <Form method="post" className={classes.signInForm}>
      <Text textStyle={classes.sign_in_title_container} h1={'Sign In'} />
      <Input
        id="email"
        type="email"
        name="email"
        placeholder={'required'}
        label={'Email Address'}
      />
      <Input
        id="password"
        type="password"
        name="password"
        placeholder={'*******'}
        label={'Password'}
      />
      <PlaneButton
        buttonContainerMainContainer={classes.forgot_password_container}
        label12={'forgot password'}
      />
      <SolidButton
        buttonMainContainerStyle={classes.sign_in_button_container}
        buttonStyle={classes.sign_in_button}
        label={'Sign In'}
      />
    </Form>
  );
}

export default SignIn;
