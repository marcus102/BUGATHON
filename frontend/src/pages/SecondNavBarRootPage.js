import React from 'react';
import SecondNavbar from '../components/navigation_bar/SecondNavbarCmp';
import { Outlet } from 'react-router-dom';

function SecondNavBarRoot() {
  return (
    <>
      <SecondNavbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default SecondNavBarRoot;
