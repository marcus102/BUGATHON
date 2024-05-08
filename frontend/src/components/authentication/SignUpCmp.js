import React, { useContext } from 'react';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import classes from './SignUpCmp.module.css';
import Colors from '../../constants/colors';
import { Input } from '../../utils/InputSection';
import { SolidButton, IconButton } from '../../utils/ButtonSection';
import { CheckBox } from '../../utils/InputSection';
import Text from '../../utils/TextSection';
import Icon from '../../utils/IconSection';
import { faCircle, faXmark } from '@fortawesome/free-solid-svg-icons';
import Link from '../../utils/LinkSection';

function SignUp() {
  const { currentAuthStatusHandler, overlayHandler } = useContext(ManagmentSystem);
  return (
    <form action="">
      <Text textStyle={classes.sign_up_title_container} h1={'Sign Up'} />
      <>
        <div className="row">
          <div className="col-12 col-lg-6">
            <Input placeholder={'required'} label={'First Name'} />
          </div>
          <div className="col-12 col-lg-6">
            <Input placeholder={'required'} label={'Last Name'} />
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-6">
            <Input placeholder={'user@example.com'} label={'Email Address'} />
          </div>
          <div className="col-12 col-lg-6">
            <Input placeholder={'username'} label={'Username'} />
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-6">
            <Input placeholder={'*******'} label={'Password'} type={'password'} />
          </div>
          <div className="col-12 col-lg-6">
            <Input placeholder={'*******'} label={'Confirm Password'} type={'password'} />
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
        <Link children12={'terms'} />
        <Text label12={'and'} />
        <Link children12={'conditions'} />
        <Text label12={'.'} />
      </div>

      <SolidButton
        onClick={() => currentAuthStatusHandler('codeConfirm')}
        buttonContainerStyle={classes.sign_up_button_container}
        label={'Sign Up'}
      />
      <div className={classes.cancel_button_container}>
        <IconButton
          icon={faXmark}
          onClick={overlayHandler}
          colorOnMouseUp={Colors.red_FF2B2B}
          colorOnMouseDown={Colors.red_ff3c3c}
          inconButtonStyle={classes.cancel_button}
        />
      </div>
    </form>
  );
}

export default SignUp;
