import React from 'react';
import classes from './LandingWindowCmp.module.css';
import Text from '../../utils/TextSection';
import { SolidButton } from '../../utils/ButtonSection';
import { useNavigate } from 'react-router-dom';

function LandingWindow() {
    const navigate = useNavigate();
  return (
    <>
      <Text h1={'LANDING PAGE...'} />
      <SolidButton label={'Get Started'}/>
    </>
  );
}
