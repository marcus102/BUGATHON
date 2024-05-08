import FirstNavBar from '../components/navigation_bar/FirstNavbarCmp';
// import { Outlet, useNavigation } from "react-router-dom";
import { Outlet } from 'react-router-dom';

function RootLayout() {
  //   const navigation = useNavigation();
  return (
    <>
      <FirstNavBar />
      <main>
        {/* {navigation.state === "loading" && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
