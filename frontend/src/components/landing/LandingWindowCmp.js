import React from 'react';
import classes from './LandingWindowCmp.module.css';
import Text from '../../utils/TextSection';
import { SolidButton } from '../../utils/ButtonSection';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../../utils/authSection';

function LandingWindow() {
  const navigate = useNavigate();
  const token = getAuthToken();

  const clickHandler = () => {
    if (!token) {
      navigate('/auth?mode=signin');
    } else {
      navigate('/');
    }
  };
  return (
    <div className={classes.landing_main_container}>
      <Text h1={'WELCOME TO THE LANDING PAGE... 😉'} />
      <SolidButton label={'Get Started'} onClick={clickHandler} />
    </div>
  );
}

export default LandingWindow;
