import FirstNavBar from '../components/navigation_bar/FirstNavbarCmp';
// import { Outlet, useNavigation } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import classes from './Root.module.css';
import Footer from '../components/footer/footerCmp';
import ScrollToTop from '../components/scroll_to_top/ScrollToTopCmp';
import BroadCast from '../components/broadcast/BroadCastCmp';
import LandingWindow from '../components/landing/LandingWindowCmp';
import { getAuthToken } from '../utils/authSection';

function RootLayout() {
  const token = getAuthToken();
  if (!token) {
    return <LandingWindow />;
  } else {
    return (
      <div className={classes.root_main_container}>
        <BroadCast
          h6Title={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
          }
        />
        <FirstNavBar />
        <main>
          <Outlet />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    );
  }
}

export default RootLayout;
