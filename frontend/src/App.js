import React, { useContext, useEffect } from 'react';
import { ManagmentSystem } from './store/AppGeneralManagmentSystem.js';
import Routing from './Routing.js';
import classes from './App.module.css';

function App() {
  const { systemTheme, systemThemeHandler } = useContext(ManagmentSystem);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      systemThemeHandler(theme);
    }
  }, [systemTheme]);

  return (
    <div
      className={
        systemTheme === 'dark_mode' ? classes.rootWindowContainer : classes.rootWindowContainer_
      }
    >
      <Routing />
    </div>
  );
}

export default App;
