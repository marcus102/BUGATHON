import React from 'react';
import classes from './HomePage.module.css';
import Authentication from './AuthenticationPage';
import HomeWindow from '../components/home_window/HomeWindowCmp';

function HomePage() {
  return (
    <div className={classes.home_main_container}>
      <Authentication />
      <HomeWindow />
    </div>
  );
}

export default HomePage;
