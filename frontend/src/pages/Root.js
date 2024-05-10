import FirstNavBar from '../components/navigation_bar/FirstNavbarCmp';
// import { Outlet, useNavigation } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import classes from './Root.module.css'
import Footer from '../components/footer/footerCmp';

function RootLayout() {
  //   const navigation = useNavigation();
  return (
    <div className={classes.root_main_container}>
      <FirstNavBar />
      <main>
        {/* {navigation.state === "loading" && <p>Loading...</p>} */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
