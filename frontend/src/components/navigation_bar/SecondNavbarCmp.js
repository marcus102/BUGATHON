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
} from '@fortawesome/free-solid-svg-icons';
import AssignedBug from './second_navabar_options/AssignedBugCmp';
import Notification from './second_navabar_options/NotificationCmp';
import Adjust from './second_navabar_options/AdjustCmp';
import Inbox from './second_navabar_options/InboxCmp';
import Search from '../../utils/SearchSection';

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
