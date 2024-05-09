import React, { useState, useContext } from 'react';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import classes from './FirstNavbarCmp.module.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { SolidButton, OutlinedButton } from '../../utils/ButtonSection';
import { NavLink } from 'react-router-dom';

function FirstNavBar() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [activeKey, setActiveKey] = useState('/');

  const { overlayHandler, currentAuthStatusHandler } = useContext(ManagmentSystem);

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Toggle
          className={classes.toggle}
          aria-controls="basic-navbar-nav"
          onClick={() => setShowOverlay(!showOverlay)}
        />
        <Navbar.Brand className={classes.brand_style} as={NavLink} to="/">
          BUGATHON
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-center">
          <Nav
            className={classes.nav_link_container}
            activeKey={activeKey}
            onSelect={(selectedKey) => {
              setActiveKey(selectedKey);
            }}
          >
            <Nav.Item>
              <NavLink
                className={[
                  activeKey === '/' ? 'text-primary' : classes.link_style,
                  classes.nav_link,
                ].join(' ')}
                to="/"
                onClick={() => setActiveKey('/')}
              >
                Home
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                className={[
                  activeKey === '/chronobug' ? 'text-primary' : classes.link_style,
                  classes.nav_link,
                ].join(' ')}
                to="/chronobug"
                onClick={() => setActiveKey('/chronobug')}
              >
                ChronoBug
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                className={[
                  activeKey === '/services' ? 'text-primary' : classes.link_style,
                  classes.nav_link,
                ].join(' ')}
                to="/services"
                onClick={() => setActiveKey('/services')}
              >
                Services
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                className={[
                  activeKey === '/blog' ? 'text-primary' : classes.link_style,
                  classes.nav_link,
                ].join(' ')}
                to="/blog"
                onClick={() => setActiveKey('/blog')}
              >
                Blog
              </NavLink>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
        <div className={classes.buttons_container}>
          <SolidButton
            buttonMainContainerStyle={classes.auth_button_main_container}
            buttonContainerStyle={classes.auth_button_container}
            label="Sign Up"
            onClick={() => {
              overlayHandler('auth', 'overlay');
              currentAuthStatusHandler('signUp');
            }}
          />
          <OutlinedButton
            buttonMainContainerStyle={classes.auth_button_main_container}
            buttonContainerStyle={classes.auth_button_container}
            // buttonStyle={classes.auth_button}
            label="Sign In"
            onClick={() => {
              overlayHandler('auth', 'overlay');
              currentAuthStatusHandler('signIn');
            }}
          />
        </div>
      </Container>
    </Navbar>
  );
}

export default FirstNavBar;

// import React, { useState, useContext } from 'react';
// import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
// import classes from './FirstNavbarCmp.module.css';
// import { Navbar, Nav, Container } from 'react-bootstrap';
// import { SolidButton, OutlinedButton } from '../../utils/ButtonSection';
// import { NavLink } from "react-router-dom";

// function FirstNavBar() {
//   const [showOverlay, setShowOverlay] = useState(false);
//   const [activeKey, setActiveKey] = useState('#home');

//   const { overlayHandler, currentAuthStatusHandler } = useContext(ManagmentSystem);

//   return (
//     <Navbar expand="lg">
//       <Container>
//         <Navbar.Toggle
//           className={classes.toggle}
//           aria-controls="basic-navbar-nav"
//           onClick={() => setShowOverlay(!showOverlay)}
//         />
//         <Navbar.Brand className={classes.brand_style} href="#">
//           BUGATHON
//         </Navbar.Brand>
//         <Navbar.Collapse className="justify-content-center">
//           <Nav
//             className={classes.nav_link_container}
//             activeKey={activeKey}
//             onSelect={(selectedKey) => {
//               setActiveKey(selectedKey);
//             }}
//           >
//             <Nav.Link
//               className={activeKey === '#home' ? 'text-primary' : `${classes.link_style}`}
//               href="#home"
//             >
//               Home
//             </Nav.Link>
//             <Nav.Link
//               className={activeKey === '#chronoBug' ? 'text-primary' : `${classes.link_style}`}
//               href="#chronoBug"
//             >
//               ChronoBug
//             </Nav.Link>
//             <Nav.Link
//               className={activeKey === '#services' ? 'text-primary' : `${classes.link_style}`}
//               href="#services"
//             >
//               Services
//             </Nav.Link>
//             <Nav.Link
//               className={activeKey === '#blog' ? 'text-primary' : `${classes.link_style}`}
//               href="#blog"
//             >
//               Blog
//             </Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//         <div className={classes.buttons_container}>
//           <SolidButton
//             buttonStyle={classes.button_style}
//             label={'Sign Up'}
//             onClick={() => {
//               overlayHandler();
//               currentAuthStatusHandler('signUp');
//             }}
//           />
//           <OutlinedButton
//             buttonStyle={classes.button_style}
//             label={'Sign In'}
//             onClick={() => {
//               overlayHandler();
//               currentAuthStatusHandler('signIn');
//             }}
//           />
//         </div>
//       </Container>
//     </Navbar>
//   );
// }

// export default FirstNavBar;
