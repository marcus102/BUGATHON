import React, { useState } from 'react';
import classes from './FirstNavbarCmp.module.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { OutlinedButton } from '../../utils/ButtonSection';
import { NavLink } from 'react-router-dom';
import { faArrowRightFromBracket, faGear, faStar } from '@fortawesome/free-solid-svg-icons';
import CustomUserProfilePreview from '../custom/CustomUserProfilePreviewCmp';
import Text from '../../utils/TextSection';
import { useNavigate } from 'react-router-dom';

const DUMMY_GUEST_USER_PROFILE = [
  {
    id: '1',
    engagement: [
      { id: '1.1', title: 'Followers', total: '100K', icon: null },
      { id: '1.2', title: 'Followings', total: '30K', icon: null },
      { id: '1.3', title: 'Star', total: '10K', icon: faStar },
    ],
    buttons: [
      { id: 'settings', title: 'Settings', icon: faGear },
      { id: 'logout', title: 'Logout', icon: faArrowRightFromBracket },
    ],
  },
];

function FirstNavBar() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [activeKey, setActiveKey] = useState('/');
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

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
        <Navbar.Collapse className={[classes.navbar_collapse_container].join(' ')}>
          <Nav
            className={classes.nav_link_container}
            activeKey={activeKey}
            onSelect={(selectedKey) => {
              setActiveKey(selectedKey);
            }}
          >
            <Nav.Item>
              <NavLink
                className={classes.nav_link}
                to="/chronobug"
                onClick={() => setActiveKey('/chronobug')}
              >
                <Text label14Style={classes.label14Style} label14={'ChronoBug'} />
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                className={classes.nav_link}
                to="/services"
                onClick={() => setActiveKey('/services')}
              >
                <Text label14Style={classes.label14Style} label14={'Services'} />
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                className={classes.nav_link}
                to="/blog"
                onClick={() => setActiveKey('/blog')}
              >
                <Text label14Style={classes.label14Style} label14={'Blog'} />
              </NavLink>
            </Nav.Item>
          </Nav>
          <Nav className={classes.buttons_container}>
            {!isVisible && (
              <OutlinedButton
                unwrap={true}
                buttonMainContainerStyle={classes.auth_button_main_container}
                buttonStyle={classes.auth_button_container}
                label="Sign In"
                onClick={() => {
                  navigate(`/auth?mode=${'signin'}`);
                }}
              />
            )}
            {isVisible && (
              <CustomUserProfilePreview
                METADATA={DUMMY_GUEST_USER_PROFILE}
                username={'marcus'}
                hideFollow={true}
                hideEdit={false}
                mainProfile={true}
                profileMode={'me'}
              />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default FirstNavBar;
