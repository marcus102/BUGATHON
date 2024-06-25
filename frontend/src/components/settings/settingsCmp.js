import React from 'react';
import classes from './settingsCmp.module.css';
import Header from './settingsHeaderCmp';
import SideBar from './settingsSideBarCmp';
import Body from './settingsBodyCmp';
import Line from '../../utils/LineSection';

function Settings() {
  return (
    <div className={classes.settings_main_container}>
      <SideBar />
      <div className={classes.settings_body_container}>
        <Header />
        <Line direction={'horizontal'} />
        <div className={classes.body_container}>
          <Body />
        </div>
      </div>
    </div>
  );
}

export default Settings;
