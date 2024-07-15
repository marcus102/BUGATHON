import React from 'react';
import { DropdownMenu } from '../../utils/ButtonSection';
import classes from './SecondNavbarCmp.module.css';
import {
  faInbox,
  faBell,
  faBug,
  faPlus,
  faEllipsis,
  faSliders,
  faNewspaper,
  faHome,
  faGear,
  faDesktop,
  faFile,
} from '@fortawesome/free-solid-svg-icons';
import { faMoon, faQuestionCircle, faSun, faUser } from '@fortawesome/free-regular-svg-icons';
import ApiIcon from '../../assets/icons/API.svg';
import ServiceIcon from '../../assets/icons/service.svg';
import AssignedBug from './second_navabar_options/AssignedBugCmp';
import Notification from './second_navabar_options/NotificationCmp';
import Adjust from './second_navabar_options/AdjustCmp';
import Inbox from './second_navabar_options/InboxCmp';
import Search from '../../utils/SearchSection';
import { Link } from 'react-router-dom';

const MENU_OPTIONS = [
  { id: '1', icon: faBug, label: 'Assigned Bug', icon_2: null },
  { id: '2', icon: faInbox, label: 'Inbox', icon_2: null },
  { id: '3', icon: faBell, label: 'Notifications', icon_2: null },
  { id: '4', icon: faSliders, label: 'Adjust', icon_2: null },
];

const CREATE_MENU = [
  { id: 'bug_report', icon: faBug, label: 'Bug Report', icon_2: null, href: null },
  { id: 'reusable_code', icon: faInbox, label: 'Reusable Code', icon_2: null, href: null },
  { id: 'blog_post', icon: faNewspaper, label: 'Blog Post', icon_2: null, href: null },
];

const SEARCH_DROP_DOWN = [
  {
    id: 'Quick Actions',
    children: [
      { id: '1', title: 'Home', icon: faHome },
      { id: '2', title: 'Settings', icon: faGear },
      { id: '3', title: 'Help', icon: faQuestionCircle },
    ],
  },
  {
    id: 'Theme',
    children: [
      { id: '1', title: 'Light Mode', icon: faSun },
      { id: '2', title: 'Night Mode', icon: faMoon },
      { id: '3', title: 'System Mode', icon: faDesktop },
    ],
  },
  {
    id: 'APIs',
    children: [
      { id: '1', title: 'API 1', icon: ApiIcon },
      { id: '2', title: 'API 2', icon: ApiIcon },
      { id: '3', title: 'API 3', icon: ApiIcon },
    ],
  },
  {
    id: 'Docs',
    children: [
      { id: '1', title: 'Doc 1', icon: faFile },
      { id: '2', title: 'Doc 2', icon: faFile },
      { id: '3', title: 'Doc 3', icon: faFile },
    ],
  },
  {
    id: 'Account',
    children: [{ id: '1', title: '@marcus ', icon: faUser }],
  },
  {
    id: 'Services',
    children: [
      { id: '1', title: 'Service 1', icon: ServiceIcon },
      { id: '2', title: 'Service 2', icon: ServiceIcon },
      { id: '3', title: 'Service 3', icon: ServiceIcon },
    ],
  },
  {
    id: 'Other',
    children: [
      { id: '1', title: 'Other 1', icon: null },
      { id: '2', title: 'Other 2', icon: null },
      { id: '3', title: 'Other 3', icon: null },
    ],
  },
];

const INBOX_DATA = [];

const renderChildComponent = (id) => {
  switch (id) {
    case '1':
      return <AssignedBug />;
    case '2':
      return <Inbox />;
    case '3':
      return <Notification />;
    case '4':
      return <Adjust />;
    default:
      return null;
  }
};

function SecondNavbar() {
  return (
    <div className={`row align-items-center ${classes.nav_main_container}`}>
      {/* NEW */}

      <div className="col-md-2 col-4 d-flex justify-content-start ">
        <DropdownMenu
          dropDownMenuStyle={classes.create_drop_down_menu}
          dropDownIconTextStyle={classes.new_button_container}
          buttonLabel={'New'}
          buttonIcon={faPlus}
          menuItems={CREATE_MENU}
          post={'new'}
        />
      </div>
      {/* SEARCH */}

      <div className="col-md-8 col-lg-5 col-7  justify-content-center ">
        <Search />
      </div>
      {/* DROP DOWN OPTIONS */}

      <div className="col-lg-5 d-none d-lg-flex justify-content-end gap-3 ">
        {MENU_OPTIONS.map((data) => (
          <DropdownMenu
            key={data.id}
            dropDownMenuStyle={classes.header_option_menu2}
            dropDownIconTextStyle={classes.header_option_button}
            buttonIcon={data.icon}
            buttonLabel={data.label}
            children={renderChildComponent(data.id)}
          />
        ))}
      </div>

      <div className="col-1 d-lg-none d-flex justify-content-end">
        <DropdownMenu
          dropDownMenuStyle={classes.dorp_down_menu}
          buttonIcon={faEllipsis}
          children={
            <>
              {MENU_OPTIONS.map((data) => (
                <DropdownMenu
                  key={data.id}
                  dropDownMenuStyle={`${classes.header_option_menu} ${
                    data.id === '1' && classes.assigned_bug_menu
                  } ${data.id === '2' && classes.inbox_menu} ${
                    data.id === '3' && classes.notification_menu
                  } ${data.id === '4' && classes.adjust_menu}`}
                  dropDownIconTextStyle={classes.header_option_button}
                  buttonIcon={data.icon}
                  buttonLabel={data.label}
                  children={renderChildComponent(data.id)}
                />
              ))}
            </>
          }
        />
      </div>
    </div>
  );
}

export default SecondNavbar;
