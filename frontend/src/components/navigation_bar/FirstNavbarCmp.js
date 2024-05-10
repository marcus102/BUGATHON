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
    <Navbar expand="lg" className={classes.fixedNavbar}>
      <Container>
        <Navbar.Toggle
          className={classes.toggle}
          aria-controls="basic-navbar-nav"
          onClick={() => setShowOverlay(!showOverlay)}
        />
        <Navbar.Brand className={classes.brand_style} as={NavLink} to="/">
          BUGATHON
        </Navbar.Brand>
        <Navbar.Collapse
          className={[classes.navbar_collapse_container].join(' ')}
        >
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
          <Nav className={classes.buttons_container}>
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
              label="Sign In"
              onClick={() => {
                overlayHandler('auth', 'overlay');
                currentAuthStatusHandler('signIn');
              }}
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default FirstNavBar;
