import FirstNavBar from '../components/navigation_bar/FirstNavbarCmp';
// import { Outlet, useNavigation } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import Text from '../utils/TextSection';
import Footer from '../components/footer/footerCmp';

function RootLayout() {
  //   const navigation = useNavigation();
  return (
    <>
      <FirstNavBar />
      <main>
        {/* {navigation.state === "loading" && <p>Loading...</p>} */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default RootLayout;
