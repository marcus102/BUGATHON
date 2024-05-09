import React from 'react';
import Authentication from './AuthenticationPage';
import BroadCast from '../components/broadcast/BroadCastCmp';
import HomeWindow from '../components/home_window/HomeWindowCmp';

function Home() {
  return (
    <div>
      <BroadCast
        h6Title={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }
      />
      <Authentication />
      <HomeWindow />
    </div>
  );
}

export default Home;
