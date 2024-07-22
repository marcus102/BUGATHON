import React from 'react';
import classes from './HomePage.module.css';
import HomeWindow from '../components/home_window/HomeWindowCmp';

function HomePage() {
  return (
    <div className={classes.home_main_container}>
      <HomeWindow />
    </div>
  );
}

export default HomePage;
