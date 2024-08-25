import React from 'react';
import classes from './SignUpCmp.module.css';
import Colors from '../../constants/colors';
import { Input } from '../../utils/InputSection';
import { SolidButton } from '../../utils/ButtonSection';
import { CheckBox } from '../../utils/InputSection';
import Text from '../../utils/TextSection';
import Icon from '../../utils/IconSection';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import Link from '../../utils/LinkSection';
import { Form } from 'react-router-dom';

function SignUp() {
  return (
    <Form method="post" className={classes.signUpForm}>
      <Text textStyle={classes.sign_up_title_container} h1={'Sign Up'} />
      <>
        <div className="row">
          <div className="col-12 col-lg-6">
            <Input
              id="firstName"
              type="text"
              name="firstName"
              placeholder={'required'}
              label={'First Name'}
            />
          </div>
          <div className="col-12 col-lg-6">
            <Input
              id="lastName"
              type="text"
              name="lastName"
              placeholder={'required'}
              label={'Last Name'}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-6">
            <Input
              id="email"
              type="email"
              name="email"
              placeholder={'user@example.com'}
              label={'Email Address'}
            />
          </div>
          <div className="col-12 col-lg-6">
            <Input
              id="username"
              type="text"
              name="username"
              placeholder={'username'}
              label={'Username'}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-6">
            <Input
              id="password"
              type="password"
              name="password"
              placeholder={'*******'}
              label={'Password'}
            />
          </div>
          <div className="col-12 col-lg-6">
            <Input
              id="passwordConfirm"
              type="password"
              name="passwordConfirm"
              placeholder={'*******'}
              label={'Confirm Password'}
            />
          </div>
        </div>
      </>

      <div className={[classes.steps_container].join(' ')}>
        <div className="row justify-content-start">
          <div className="col-auto">
            <Icon icon={faCircle} color={Colors.gray_aaaaaa5e} />
          </div>
          <div className="col">
            <Text label12={'Password must be at least 20 characters long'} />
          </div>
        </div>
        <div className="row justify-content-start">
          <div className="col-auto">
            <Icon icon={faCircle} color={Colors.gray_aaaaaa5e} />
          </div>
          <div className="col">
            <Text label12={'Your password must contain digit(s)'} />
          </div>
        </div>
        <div className="row justify-content-start">
          <div className="col-auto">
            <Icon icon={faCircle} color={Colors.gray_aaaaaa5e} />
          </div>
          <div className="col">
            <Text label12={'Your password must contain symbol(s)'} />
          </div>
        </div>
      </div>

      <div className={['d-flex justify-content-start gap-1', classes.checkbox_container].join(' ')}>
        <CheckBox label12={'By taking this action, you agree to our'} />
        <Link children12={'terms & conditions .'} />
      </div>

      <SolidButton
        buttonMainContainerStyle={classes.sign_up_button_container}
        buttonStyle={classes.sign_up_button}
        label={'Sign Up'}
      />
    </Form>
  );
}

export default SignUp;
